import pdfplumber

with pdfplumber.open(r'c:\Users\HinojosaDev\Downloads\Fotos Emprendimiento\HDV\HDV.pdf') as pdf:
    text = ''
    for page in pdf.pages:
        text += page.extract_text() + '\n'

print(text)