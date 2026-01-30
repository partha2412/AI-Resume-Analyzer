from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from jobs.models import Job
from .ml_model import match_resume_with_jobs

def match_jobs(request):
    resume_text = request.GET.get("resume")

    if not resume_text:
        return JsonResponse({"error": "resume text required"}, status=400)

    jobs = Job.objects.all()
    results = match_resume_with_jobs(resume_text, jobs)

    return JsonResponse({"matches": results})
