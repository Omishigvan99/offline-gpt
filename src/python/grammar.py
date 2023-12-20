from happytransformer import HappyTextToText
from happytransformer import TTSettings

happy_tt = HappyTextToText("T5", "prithivida/grammar_error_correcter_v1")
text = "gec: " + "The meandering river, flanked by lush greenery and towering trees, winds its way through the serene valley, creating a picturesque scene that that captivates the imagination"
settings = TTSettings(do_sample=True, top_k=10, temperature=0.5,  min_length=1, max_length=100)
result = happy_tt.generate_text(text, args=settings)

print(result.text)






















