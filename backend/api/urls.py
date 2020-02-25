from django.urls import path
from .views import *

urlpatterns = [
    path('search', FileUploadSearchView.as_view()),
    path('home_page_images', HomePageImagesView.as_view()),
    path('like_photo', LikePhoto.as_view()),
    path('index', IndexPublicImages.as_view()),
    path('get_albums', GetAlbums.as_view()),
    path('upload_photo', UploadPhoto.as_view()),
    
    path('create_album', CreateAlbum.as_view()),
    path('delete_album', DeleteAlbum.as_view()),
    path('get_photos_in_album', GetPhotosInAlbum.as_view()),
    path('delete_indiv_photo', DeleteIndivPhoto.as_view()),
]
