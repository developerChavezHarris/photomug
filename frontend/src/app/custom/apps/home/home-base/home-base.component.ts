import { Component, OnInit, ViewChild } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ApiService } from "../../api-service/api.service";
import { ConditionalExpr } from "@angular/compiler";

// Angular form import
import { FormBuilder, FormGroup } from "@angular/forms";

import { FileObject } from "../objects/file-object";
import { queryResultObject } from "../objects/search-result";

@Component({
  selector: "app-home-base",
  templateUrl: "./home-base.component.html",
  styleUrls: ["./home-base.component.css"]
})
export class HomeBaseComponent implements OnInit {
  // URL to the Django server
  DJANGO_SERVER = "http://127.0.0.1:8000";
  imageSearchForm: FormGroup;
  logoPath: string;

  @ViewChild('likes', {static: false}) likes;

  // Font awesome icons
  faSearch = faSearch;
  faImage = faImage;
  faHeart = faHeart;
  faDownload = faDownload;


  resultsFromImageQuery;
  homePageImagesResults;

  imageToQuery; 
  
  // Holds a boolean to determine if a query image was selected
  imageAttachCheck: boolean;
  // Holds the name of the selected image to query
  imageAttachName: string;

  homePageImages: Array<FileObject> = [];
  queryResults: Array<queryResultObject> = [];

  fileObj;
  queryResultObj;

  indexDatasetResults;
  likePhotoResponse;

  // Loader
  loading;

  previewImagePath;


  current_likes_str;

  // Declare image paths

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
    this.logoPath = "../../../../../assets/logo/logo.png";
  }

  ngOnInit() {
    this.imageSearchForm = this.formBuilder.group({
      image: [""]
    });

    this.getHomePageImages();

    this.indexDataset();
  }

  // Get the images for the home page
  getHomePageImages() {
    this.homePageImages = [];
    this.loading = true;
    //  Get all the images
    this.apiService.getFiles().subscribe(
      (res) => {
        this.homePageImagesResults = res;
        this.homePageImagesResults.forEach(image => {
          this.fileObj = new FileObject();
          this.fileObj.fileID = image.id;
          this.fileObj.filePath = this.DJANGO_SERVER + image.file;
          this.fileObj.likes = image.likes;
          this.homePageImages.push(this.fileObj);
        });

        this.loading = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  // index the dataset

  indexDataset() {
    this.apiService.indexPublicImages().subscribe(
      res => {
        this.indexDatasetResults = res;
      },
      err => {
        console.log(err);
      }
    );
  }


  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.previewImagePath = "";
      this.imageAttachCheck = true;
      this.imageAttachName = event.target.files[0].name;
      this.imageToQuery = event.target.files[0];
      this.imageSearchForm.get("image").setValue(this.imageToQuery);

      var reader = new FileReader();
      this.previewImagePath = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = _event => {
        this.previewImagePath = reader.result;
      };
    }
  }

  // When the query image form is submitted
  onSubmit(event) {
    this.loading = true;
    this.queryResults = [];

    const formData = new FormData();
    formData.append("file", this.imageSearchForm.get("image").value);

    this.apiService.uploadFile(formData).subscribe(
      res => {
        this.resultsFromImageQuery = res;
        // Loader
        this.loading = false;

        for (let key in this.resultsFromImageQuery) {
          let value = this.resultsFromImageQuery[key];
          this.queryResultObj = new queryResultObject();
          this.queryResultObj.score = key;
          this.queryResultObj.filePath = this.DJANGO_SERVER + "/media/" + value;
          this.queryResults.push(this.queryResultObj);
        }
      },

      err => {
        console.log(err);
      }
    );
  }

  likePhoto(fileID, current) {
    this.current_likes_str = current.children[1].innerText;

    const current_likes_num = + this.current_likes_str

    current.children[1].innerText = current_likes_num + 1

    this.likePhotoResponse = false;
    this.apiService.likePhoto(fileID).subscribe(
      res => {
        this.likePhotoResponse = res;
        // this.getHomePageImages();
      },
      err => {
        console.log(err);
      }
    );
  }
}
