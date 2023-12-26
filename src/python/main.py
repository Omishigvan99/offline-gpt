#core imports
import os
import sys
import json
from threading import Thread
from fpdf import FPDF
#langchain imports
from langchain.chains import ConversationalRetrievalChain
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.llms import LlamaCpp
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders import PyPDFLoader

#globals
history=[]
summarizeHistory=[]
grammarHistory=[]

# function to chat with the bot
def conversation_chat(query, chain, history):
    result = chain({"question": query, "chat_history": history})
    history.append((query, result["answer"]))

    bytetext=result["answer"]
    print_json("message",bytetext)

#function to create conversational chain
def create_conversational_chain(vector_store):
    llm = LlamaCpp(
        streaming=True,
        model_path="./src/python/ml-models/harborwater-open-llama-3b-v2-wizard-evol-instuct-v2-196k-Q4_0.gguf",
        temperature=0.55,
        top_p=1,
        verbose=False,
        n_ctx=15000,
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(search_kwargs={"k": 4}),
        memory=memory,
    )
    return chain


#function to print python dict as json
def print_json(type, data):
    print(json.dumps({"type":type, "data":data}),flush=True)
    sys.stdout.flush()

#function to load pdf and return text
def loadPdf(path):
    text=[]
    print_json("console",os.getcwd())
    loader = PyPDFLoader(path)
    text.extend(loader.load())
    return text

#function to return a conversational chain
def createChain(text,type):

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(text)
    vector_store = FAISS.from_documents(text_chunks, embedding=embeddings)
 

    chain = create_conversational_chain(vector_store)
    return chain

# function for summarizing the document
def summarizeDocument(chain,text="summarize this document"):
    conversation_chat(text, chain, summarizeHistory)

# fucntion for grammar correction
def grammarCorrection(chain,text="correct the grammar"):
    conversation_chat(text, chain, grammarHistory)

# function for chat
def chat(chain,text):
    conversation_chat(text, chain, history)

#function to create chat thread
def createChatThread(chain):
    global history

    switch={
        "summarize": summarizeDocument,
        "chat": chat,
        "grammar": grammarCorrection,
        "exit": sys.exit,
    }


    def target(chain):
        print_json("message","ready for input")
        while True:
            inputText = input()
            data=json.loads(inputText)
            switch[data["type"]](chain,data["text"])
            
                  
    thread=Thread(target=target,args=(chain,))
    return thread

if __name__ == "__main__":
    print_json("message","process initiated")
    print_json("console",f"current directory: {os.getcwd()} ")
    print_json("console","Enter the pdf link to summarize or Text to summarize")
    inputText = input()

    inputText=json.loads(inputText)
    if inputText["type"]=="pdf":
        print_json("console","Loading pdf...")
        text=loadPdf(inputText["path"])
    else:
        text=inputText["text"]
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size = 15)
        pdf.cell(200, 10, txt = text, 
                ln = 1, align = 'C')
        
        pdf.output("GFG.pdf") 
        text=loadPdf("GFG.pdf")

    print_json("console","Creating conversational chain...")
    chain=createChain(text,inputText["type"])
    print_json("console","Starting chat...")
    thread=createChatThread(chain)
    thread.start()
    