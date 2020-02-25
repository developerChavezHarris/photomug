import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  logoPath: string;

  constructor() { 
    this.logoPath = '../../../../../assets/logo/logo.png'
   }

  ngOnInit() {
  }

}
