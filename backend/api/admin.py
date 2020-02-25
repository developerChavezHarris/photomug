from django.contrib import admin
from .models import File
from .models import Album
from .models import FileSearch
# from .models import PhotoLike

# Register your models here.
admin.site.register(File)
admin.site.register(Album)
admin.site.register(FileSearch)
# admin.site.register(PhotoLike)
