import fitz  # PyMuPDF
import docx
import re


def extract_text(uploaded_file):
    text = ""
    content_type = getattr(uploaded_file, "content_type", "")

    try:
        # ---------- PDF ----------
        if content_type == "application/pdf":
            pdf_bytes = uploaded_file.read()

            # IMPORTANT: reset pointer for future use
            uploaded_file.seek(0)

            doc = fitz.open(stream=pdf_bytes, filetype="pdf")

            for page in doc:
                page_text = page.get_text("text")
                if page_text:
                    text += page_text + "\n"

            doc.close()

        # ---------- DOC / DOCX ----------
        elif content_type in (
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
        ):
            doc = docx.Document(uploaded_file)
            for para in doc.paragraphs:
                if para.text:
                    text += para.text + "\n"

        else:
            raise ValueError(f"Unsupported file type: {content_type}")

    except Exception as e:
        print("❌ Text extraction error:", e)
        return ""

    return text.lower().strip()

def extract_skills(text):
    """
    Extract skills dynamically, avoiding project names, GitHub usernames,
    emails, and personal names.
    """
    lines = text.splitlines()
    skills_lines = []
    capture = False

    STOP_HEADERS = {
        "education", "experience", "projects", "internship",
        "certifications", "summary", "objective",
        "achievements", "contact", "email", "gpa"
    }

    SKILLS_HEADER_PATTERN = re.compile(
        r"\b(skills|technical skills|key skills|computer skills)\b",
        re.IGNORECASE
    )

    # -------- STEP 1: Capture skills section --------
    for line in lines:
        clean = re.sub(r"[•:\-\|]", " ", line).strip()

        if not capture and SKILLS_HEADER_PATTERN.search(clean):
            capture = True
            continue

        if capture and any(h in clean.lower() for h in STOP_HEADERS):
            break

        if capture and clean:
            skills_lines.append(clean)

    # -------- Fallback if no explicit skills header --------
    if not skills_lines:
        skills_lines = lines[:12]

    # -------- STEP 2: Split skills --------
    skills_text = " ".join(skills_lines)
    raw_skills = re.split(r"[,\n/•|]", skills_text)

    # -------- STEP 3: Clean & filter --------
    skills = set()
    for skill in raw_skills:
        skill = skill.strip()

        # keep only valid characters
        skill = re.sub(r"[^a-zA-Z0-9+.#-]", "", skill)

        # filtering rules
        if (
            2 <= len(skill) <= 20
            and not re.search(r"\d{2,}", skill)  # avoids IDs/usernames
            and not skill.startswith(("http", "www"))
        ):
            skills.add(skill.lower())

    skills = sorted(skills)
    print("🎯 SKILLS TO SEND TO FRONTEND:", skills)
    return skills
