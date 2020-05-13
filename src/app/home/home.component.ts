import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public astreoids$: any;

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.featchList();
  }

  applayParams(searchPhrase: string): void {
    this.featchList(searchPhrase);
  }

  featchList(searchPhrase?) {
    this.astreoids$ = this.homeService.get(searchPhrase);
  }

  getObject(string): string {
    return JSON.stringify(string)
  }
}
