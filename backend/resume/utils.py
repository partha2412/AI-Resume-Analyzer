import pdfplumber
import docx
import re

def extract_text(uploaded_file):
    text = ""
    content_type = uploaded_file.content_type

    try:
        if content_type == "application/pdf":
            with pdfplumber.open(uploaded_file) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        elif content_type in [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ]:
            doc = docx.Document(uploaded_file)
            for para in doc.paragraphs:
                text += para.text + "\n"
        else:
            raise ValueError("Unsupported file type")
    except Exception as e:
        print("❌ Text extraction error:", e)
        return ""

    return text.lower()


def extract_skills(text):
    """
    Extract skills dynamically, avoid project names, Github, or personal names.
    """
    lines = text.splitlines()
    skills_lines = []
    capture = False

    STOP_HEADERS = [
        "education", "experience", "projects",
        "internship", "certifications",
        "summary", "objective", "achievements",
        "contact", "email", "gpa"
    ]

    SKILLS_HEADER_PATTERN = re.compile(
        r"\b(skills|technical skills|key skills|computer skills)\b",
        re.IGNORECASE
    )

    # STEP 1: Capture Skills Section
    for line in lines:
        clean = re.sub(r"[•:\-\|]", "", line).strip()
        if not capture and SKILLS_HEADER_PATTERN.search(clean):
            capture = True
            continue
        if capture and any(h in clean.lower() for h in STOP_HEADERS):
            break
        if capture and clean:
            skills_lines.append(clean)

    # Fallback if no header
    if not skills_lines:
        skills_lines = lines[:12]

    # STEP 2: Split by commas, slashes, bullets
    skills_text = " ".join(skills_lines)
    raw_skills = re.split(r"[,\n/•|]", skills_text)

    # STEP 3: Clean and filter skills
    skills = set()
    for skill in raw_skills:
        skill_clean = skill.strip()
        # Keep letters, numbers, +, #, ., - only
        skill_clean = re.sub(r"[^a-zA-Z0-9+.#-]", "", skill_clean)
        # Skip too short, too long, with digits in the middle (likely usernames)
        if 1 <= len(skill_clean) <= 15 and not re.search(r"\d", skill_clean[1:]):
            skills.add(skill_clean.lower())

    skills = sorted(skills)
    print("🎯 SKILLS TO SEND TO FRONTEND:", skills)
    return skills
