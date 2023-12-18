#core imports
import os
import sys
import json
from threading import Thread

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
        temperature=0.75,
        top_p=1,
        verbose=False,
        n_ctx=9096,
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(search_kwargs={"k": 2}),
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
def createChain(text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=20)
    text_chunks = text_splitter.split_documents(text)

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        model_kwargs={"device": "cpu"},
    )

    vector_store = FAISS.from_documents(text_chunks, embedding=embeddings)

    chain = create_conversational_chain(vector_store)
    return chain

#function to create chat thread
def createChatThread(chain):
    global history
    def target(chain):
        while True:
            inputText = input()
            if(inputText=="exit"):
                break
            
            conversation_chat(inputText, chain, history)
        
    thread=Thread(target=target,args=(chain,))
    return thread

if __name__ == "__main__":
    print_json("message","Hello, I am your summarization bot. How may i help you?")
    print_json("console",f"current directory: {os.getcwd()} ")
    print_json("console","Enter the pdf link to summarize")
    inputText = input()
    print_json("console","Loading pdf...")
    text=loadPdf(inputText)
    print_json("console","Creating conversational chain...")
    chain=createChain(text)
    print_json("console","Starting chat...")
    thread=createChatThread(chain)
    thread.start()
    