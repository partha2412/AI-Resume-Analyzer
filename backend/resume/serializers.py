from rest_framework import serializers
from .models import Resume, Skill


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name"]


class ResumeSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Resume
        fields = [
            "id",
            "name",
            "year",
            "passing_year",
            "sgpa",
            "backlogs",
            "file",
            "uploaded_at",
            "skills",
        ]
