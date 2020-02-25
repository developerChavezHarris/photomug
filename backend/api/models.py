import os
from django.db import models
from django.core.files.storage import FileSystemStorage
from backend import settings
from django.contrib.auth.models import User

# Create your models here.
class Album(models.Model):
    album_name = models.CharField(max_length=256)
    album_visibility = models.CharField(max_length=10)
    album_description = models.CharField(max_length=1024)
    def __str__(self):
        return self.album_name

class File(models.Model):
    file = models.FileField(unique=True, blank=False, null=False)
    likes = models.IntegerField(default=0, null=True)
    album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True)
    def __str__(self):
        return self.file.name


class FileSearch(models.Model):
    file = models.FileField(upload_to='uploads/', blank=False, null=False)
    def __str__(self):
        return self.file.name        



# class PhotoLike(models.Model):
#     file = models.ForeignKey(File, on_delete=models.CASCADE)
#     like = models.BooleanField(default=True)
#     def __str__(self):
#         return str(self.file)
    

    

    
