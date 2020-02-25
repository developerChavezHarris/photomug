import { Component, OnInit } from "@angular/core";

// new imports
import { FormGroup, FormBuilder } from "@angular/forms";
import { ApiService } from "../../api-service/api.service";

import { FileObject } from "../../home/objects/file-object";

@Component({
  selector: "app-upload-base",
  templateUrl: "./upload-base.component.html",
  styleUrls: ["./upload-base.component.css"]
})
export class UploadBaseComponent implements OnInit {
  DJANGO_SERVER = "HTTP://127.0.0.1:8000";
  createAlbumForm: FormGroup;
  photoUploadForm: FormGroup;
  
  createAlbumResponse;
  albums;

  photoUploadResponse;
  deletePhotoAlbumResponse;
  getPhotosInAlbumResponse;
  photos_exist_in_album;
  deleteIndivPhotoResponse;

  listOfFilesToUpload;

  nameOfFilesToUpload: Array<FileObject> = [];
  fileObj;
  photos_in_album: Array<FileObject> = [];

  loading;

  file: File;

  constructor(private apiService: ApiService, public formBuilder: FormBuilder) {
    this.createAlbumForm = this.formBuilder.group({
      album_name: [""],
      album_visibility: [""],
      album_description: [""]
    });
  }

  ngOnInit() {
    this.photoUploadForm = this.formBuilder.group({
      album: [""],
      image: [""]
    });

    this.getAlbums();
  }

  getAlbums() {
    this.apiService.getAlbums().subscribe(
      res => {
        this.albums = res;

        console.log(this.albums)
        if(this.albums.length == 0) {
          this.albums = false;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  createAlbum(event: any) {
    const formData = new FormData();
    this.createAlbumResponse = null;
    formData.append("album_name", event.target.album_name.value);
    formData.append("album_visibility", event.target.album_visibility.value);
    formData.append("album_description", event.target.album_description.value);

    this.apiService.createAlbum(formData).subscribe(
      res => {
        this.createAlbumResponse = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // Uploading images to the album
  onFilesSelected(event: any) {
    if (event.target.files.length > 0) {
      this.listOfFilesToUpload = Array.from(event.target.files);

      for (let index = 0; index < this.listOfFilesToUpload.length; index++) {
        const file_name = this.listOfFilesToUpload[index].name;
        this.fileObj = new FileObject();
        this.fileObj.fileID = file_name;
        this.nameOfFilesToUpload.push(this.fileObj);
      }
    }
  }

  deletePhoto(i) {
    this.nameOfFilesToUpload.splice(i, 1);

    this.listOfFilesToUpload.splice(i, 1);

    console.log(this.listOfFilesToUpload);
  }

  uploadPhotos(event: any) {
    for (var file of this.listOfFilesToUpload) {
      this.photoUploadForm.get("image").setValue(file);
      const formData = new FormData();

      // Upload one file
      formData.append("file", this.photoUploadForm.get("image").value);
      formData.append("album", event.target.album_name_upload.value);

      this.apiService.uploadPhoto(formData).subscribe(
        res => {
          this.photoUploadResponse = res;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deletePhotoAlbum(albumId) {
    this.apiService.deletePhotoAlbum(albumId).subscribe(
      res => {
        this.deletePhotoAlbumResponse = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getPhotosInAlbum(albumId) {
    this.photos_exist_in_album = false;
    this.photos_in_album = [];
    this.apiService.getPhotosInAlbum(albumId).subscribe(
      res => {
        this.getPhotosInAlbumResponse = res;
        this.getPhotosInAlbumResponse.forEach(photo => {
          this.fileObj = new FileObject();
          this.fileObj.fileID = photo.id;
          this.fileObj.filePath = this.DJANGO_SERVER + photo.file;
          this.fileObj.likes = photo.likes;
          this.fileObj.album = photo.album;
          this.photos_in_album.push(this.fileObj);
          if (this.photos_in_album.length > 0) {
            this.photos_exist_in_album = true;
          } else {
            this.photos_exist_in_album = false;
          }
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteIndivPhoto(photoId) {
    this.deleteIndivPhotoResponse = false;
    this.apiService.deleteIndivPhoto(photoId).subscribe(
      res => {
        this.deleteIndivPhotoResponse = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}
