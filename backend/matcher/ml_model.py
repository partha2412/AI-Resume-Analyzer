from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def match_resume_with_jobs(resume_text, jobs):
    # ✅ Normalize resume
    resume_text = resume_text.lower()

    # ✅ Normalize job skills
    job_texts = [job.skills.lower() for job in jobs]

    documents = [resume_text] + job_texts

    # ✅ FIXED VECTORIZER
    vectorizer = TfidfVectorizer(
        token_pattern=r"(?u)\b[a-zA-Z][a-zA-Z\+\#]*\b"
    )

    tfidf_matrix = vectorizer.fit_transform(documents)

    scores = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:]
    )[0]

    results = []
    for job, score in zip(jobs, scores):
        results.append({
            "title": job.title,
            "company": job.company,
            "match_percentage": round(score * 100, 2)
        })

    return sorted(results, key=lambda x: x["match_percentage"], reverse=True)
