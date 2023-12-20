from happytransformer import HappyTextToText
from happytransformer import TTSettings
import json
import sys

text = "gec: " +input()
happy_tt = HappyTextToText("T5", "prithivida/grammar_error_correcter_v1")
settings = TTSettings(do_sample=True, top_k=10, temperature=0.5,  min_length=1, max_length=100)
result = happy_tt.generate_text(text, args=settings)
print(json.dumps({"type":"message","data":result.text.encode("utf-8")}))
sys.stdout.flush()




















