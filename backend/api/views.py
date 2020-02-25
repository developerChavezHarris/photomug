from django.shortcuts import render
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import File
from .models import Album
# from .models import PhotoLike
from .serializers import FileSerializer
from .serializers import FileSearchSerializer
from .serializers import AlbumSerializer
# from .serializers import PhotoLikeSerializer


# USAGE
# python search.py --index index.csv --query queries/103100.png --result-path dataset

# import the necessary packages
from pyimagesearch.colordescriptor import ColorDescriptor
from pyimagesearch.searcher import Searcher
import argparse
import glob
import cv2
import os
import shutil

# initialize the image descriptor
cd = ColorDescriptor((8, 12, 3))


# Create your views here

result_dict = {}


class FileUploadSearchView(APIView):
    parser_class = (FileUploadParser)
    instance = None

    def post(self, request, *args, **kwargs):

        file_search_serializer = FileSearchSerializer(data=request.data)

        file_name = request.FILES['file'].name

        if file_search_serializer.is_valid():

            if(os.path.isfile('media/uploads/'+file_name)):
                os.remove('media/uploads/'+file_name)

            instance = file_search_serializer.save()

            query = cv2.imread('media/uploads/'+file_name)
            features = cd.describe(query)

            seacher = Searcher('media/indexer/index.csv')

            results = seacher.search(features)

            instance.delete()
            os.remove('media/uploads/'+file_name)

            result_dict = {}

            # Loop over the results
            for (score, resultID) in results:
                result_dict.update({score: resultID})

            print(result_dict)
            return Response(result_dict, status=status.HTTP_201_CREATED)
        else:
            return Response(file_search_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HomePageImagesView(APIView):

    def get(self, request, *args, **kwargs):
        files = File.objects.order_by('-likes')[0:80]

        files_serializer = FileSerializer(files, many=True)
        return Response(files_serializer.data, status=status.HTTP_200_OK)


class CreateAlbum(APIView):

    def post(self, request, *args, **kwargs):

        album_serializer = AlbumSerializer(data=request.data)
        print('request to create album')
        if album_serializer.is_valid():
            print('album_serializer is valid')
            album_serializer.save()
            print(request.data)
            return Response(album_serializer.data, status=status.HTTP_200_OK)


class DeleteAlbum(APIView):

    def post(self, request, *args, **kwargs):

        album_id = request.data
        album = Album.objects.get(id=album_id)
        photos_assoc_with_album = File.objects.filter(album=album)
        album.delete()
        photos_assoc_with_album.delete()
        album_deleted_res = {
            'album_name': str(album)
        }
        return Response(album_deleted_res, status=status.HTTP_200_OK)


class GetPhotosInAlbum(APIView):

    def post(self, request, *args, **kwargs):

        album_id = request.data
        album_to_get = Album.objects.get(id=album_id)
        photos_in_album = File.objects.filter(album=album_to_get)

        file_serializer = FileSerializer(photos_in_album, many=True)
        return Response(file_serializer.data, status=status.HTTP_200_OK)


class LikePhoto(APIView):
    def post(self, request, *args, **kwargs):
        file_id = request.data
        file = File.objects.get(id=file_id)
        file.likes = file.likes + 1
        file.save()
        like_photo_res = {
            'photo_liked': str(file),
        }
        return Response(like_photo_res, status=status.HTTP_200_OK)


class DeleteIndivPhoto(APIView):
    def post(self, request, *args, **kwargs):
        file_id = request.data
        photo_to_delete = File.objects.get(id=file_id)
        photo_to_delete.delete()
        delete_indiv_photo_res = {
            'photo_deleted': str(photo_to_delete)
        }
        return Response(delete_indiv_photo_res, status=status.HTTP_202_ACCEPTED)


class UploadPhoto(APIView):

    def post(self, request, *args, **kwargs):

        album_to_get = request.data['album']
        # get the album instance from the albums model
        album = Album.objects.get(album_name=album_to_get)

        model = File(file=request.data['file'], album=album)

        model.save()

        resp = {'upload_photo_res': 'photo uploaded'}
        return Response(resp, status=status.HTTP_201_CREATED)


class GetAlbums(APIView):
    def get(self, request, *args, **kwargs):
        albums = Album.objects.all()
        album_serializer = AlbumSerializer(albums, many=True)
        return Response(album_serializer.data, status=status.HTTP_200_OK)


class IndexPublicImages(APIView):
    # os.remove('media/indexer/index.csv')
    def get(self, rquest, *args, **kwargs):

        # f.close()
        output = open('media/indexer/index.csv', "w+")

        for imagePath in glob.glob('media' + "/*.png"):
            # extract the image ID (i.e. the unigue filename) from the image
            # path and load the image itself
            imageID = imagePath[imagePath.rfind("/") + 1:]
            image = cv2.imread(imagePath)

            # describe the image
            features = cd.describe(image)

            # write the features to file
            features = [str(f) for f in features]
            output.write("%s,%s\n" % (imageID, ",".join(features)))

        # close the index file
        output.close()

        response_dict = {"response": "dataset indexed sucessfully"}
        return Response(response_dict, status=status.HTTP_200_OK)
