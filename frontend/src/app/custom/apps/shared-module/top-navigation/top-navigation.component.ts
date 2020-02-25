import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css']
})
export class TopNavigationComponent implements OnInit {

  faHome = faHome;
  faCloud = faCloudUploadAlt;
  logoPath: string;

  constructor() { 
    this.logoPath = '../../../../../assets/logo/logo.png'
   }

  ngOnInit() {
  }

}
