import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { File } from "../../../model/file.model"

@Injectable({
  providedIn: "root"
})
export class ApiService {
  DJANGO_SERVER: string = "http://127.0.0.1:8000";
  record: any;
  records: File[];

  constructor(private http: HttpClient) {}

  // getFiles() {
  //   return this.http.get<any>(
  //     this.DJANGO_SERVER + "/dataset/home_page_images",
  //     {
  //       reportProgress: true
  //     }
  //   );
  // }

  getFiles():Observable<File[]> {
    return this.http.get<any>(
      this.DJANGO_SERVER + "/dataset/home_page_images",
      {
        reportProgress: true
      }
    );
  }

  uploadFile(formData) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/search",
      formData,
      {
        reportProgress: true
      }
    );
  }

  uploadPhoto(formData) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/upload_photo",
      formData,
      {
        reportProgress: true
      }
    );
  }

  indexPublicImages() {
    return this.http.get<any>(this.DJANGO_SERVER + "/dataset/index", {
      reportProgress: true
    });
  }

  // Get all the albums
  getAlbums() {
    return this.http.get<any>(this.DJANGO_SERVER + "/dataset/get_albums", {
      reportProgress: true
    });
  }

  createAlbum(formData) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/create_album",
      formData,
      {
        reportProgress: true
      }
    );
  }

  likePhoto(fileID) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/like_photo",
      fileID,
      {
        reportProgress: true
      }
    );
  }

  deletePhotoAlbum(albumId) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/delete_album",
      albumId,
      {
        reportProgress: true
      }
    );
  }

  getPhotosInAlbum(albumId) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/get_photos_in_album",
      albumId,
      {
        reportProgress: true
      }
    );
  }

  deleteIndivPhoto(photoId) {
    return this.http.post<any>(
      this.DJANGO_SERVER + "/dataset/delete_indiv_photo",
      photoId,
      {
        reportProgress: true
      }
    );
  }
}
