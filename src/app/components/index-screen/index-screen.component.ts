import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index-screen',
  templateUrl: './index-screen.component.html',
  styleUrls: ['./index-screen.component.scss']
})
export class IndexScreenComponent {

  public constructor(private titleService: Title){
    titleService.setTitle("eduapp | Index");
  }
}
