import pdfplumber
import docx
import spacy
import re

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Skill database
SKILLS_DB = [
    "python", "java", "c", "c++", "sql", "django", "flask",
    "react", "javascript", "html", "css", "machine learning",
    "data analysis", "mongodb", "nodejs"
]


def extract_text(uploaded_file):
    """
    Extract text from PDF or DOCX uploaded file
    """
    text = ""
    content_type = uploaded_file.content_type

    try:
        # PDF file
        if content_type == "application/pdf":
            with pdfplumber.open(uploaded_file) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""

        # DOCX file
        elif content_type in [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ]:
            doc = docx.Document(uploaded_file)
            for para in doc.paragraphs:
                text += para.text + " "

        else:
            raise ValueError("Unsupported file type")

    except Exception as e:
        print("Text extraction error:", e)
        return ""

    return text.lower()


def extract_skills(text):
    """
    Extract skills from resume text safely
    """
    found_skills = set()
    text = text.lower()

    for skill in SKILLS_DB:
        skill_lower = skill.lower()

        # Handle single-letter skills like "c"
        if len(skill_lower) == 1:
            pattern = rf"\b{re.escape(skill_lower)}\b"
            if re.search(pattern, text):
                found_skills.add(skill)

        # Handle multi-letter skills
        else:
            if skill_lower in text:
                found_skills.add(skill)

    return list(found_skills)
