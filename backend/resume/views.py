from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Resume, Skill
from .serializers import ResumeSerializer   # ✅ IMPORT SERIALIZER
from .utils import extract_text, extract_skills
from rest_framework.parsers import MultiPartParser, FormParser


class UploadResumeView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # 🔴 REQUIRED

    def post(self, request):
        file = request.FILES.get("resume")

        print("FILES:", request.FILES)
        print("DATA:", request.data)


        if not file:
            return Response({"error": "No file uploaded"}, status=400)

        # Extract text
        text = extract_text(file)

        # Save resume
        resume = Resume.objects.create(
            file=file,
            extracted_text=text,
            name=request.data.get("name"),
            year=request.data.get("year"),
            passing_year=request.data.get("passing_year"),
            sgpa=request.data.get("sgpa"),
            backlogs=request.data.get("backlogs"),
        )

        # Extract & save skills
        skills = extract_skills(text)
        for skill in skills:
            Skill.objects.create(
                resume=resume,
                name=skill
            )

        serializer = ResumeSerializer(resume)
        return Response(serializer.data, status=201)
