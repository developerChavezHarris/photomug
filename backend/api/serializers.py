from rest_framework import serializers
from .models import File
from .models import Album
from .models import FileSearch
# from .models import PhotoLike

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"

class FileSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileSearch
        fields = "__all__"


class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = "__all__"


# class PhotoLikeSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PhotoLike
#         fields = "__all__"
