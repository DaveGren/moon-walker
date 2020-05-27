import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { tap, map } from 'rxjs/operators';
import { Pagination } from '../shared/pagination.model';
import { Card } from '../shared/card.model';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public searchList$: Observable<Card[]>;
  public totalItems: number;
  public hasSearchBegun: boolean = false;

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.fetchList();
  }

  applyParams(searchPhrase: string): void {
    this.fetchList(searchPhrase);
  }

  fetchList(searchPhrase?) {
    this.searchList$ = this.homeService.get(searchPhrase)
      .pipe(
        tap(({metadata: { total_hits }}: Pagination<Card>) => this.totalItems = total_hits),
        map(({ items }: Pagination<Card>) => items)
      );
  }

  changeStyle(): void {
    this.hasSearchBegun = true;
  }

  getObject(string): string {
    return JSON.stringify(string)
  }
}
