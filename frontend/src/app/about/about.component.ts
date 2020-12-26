import { Component, OnInit } from '@angular/core';
import {DataGeneratorService} from "../data-generator.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private dataGenerator: DataGeneratorService) { }

  ngOnInit(): void {
  }

  generateData() {
    this.dataGenerator.generateData()
  }

}
