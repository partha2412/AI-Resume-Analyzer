from django.db import models

class Resume(models.Model):
    # Google Form fields
    name = models.CharField(max_length=100)
    year = models.IntegerField()
    passing_year = models.IntegerField()
    sgpa = models.FloatField()
    backlogs = models.IntegerField()

    # Resume data
    file = models.FileField(upload_to="resumes/")
    extracted_text = models.TextField(blank=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Skill(models.Model):
    name = models.CharField(max_length=100)

    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE,
        related_name="skills"
    )

    def __str__(self):
        return self.name
