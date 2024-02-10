from django.db import models

class File(models.Model):
    name = models.CharField(max_length=50)
    csv = models.FileField(upload_to='csvs')