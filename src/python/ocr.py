from PIL import Image
import pytesseract
from pytesseract import image_to_string
import json

pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"
print(json.dumps({"type":"console","data":"input file path"}),flush=True)
filepath=input()
print(json.dumps({"type":"console","data":filepath}),flush=True)
txt = image_to_string(Image.open(filepath))
print(txt)