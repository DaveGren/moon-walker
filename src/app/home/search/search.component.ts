import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mw-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public search$: FormControl = new FormControl('');

  @Output()
  public onInputChange$: EventEmitter<string> = new EventEmitter<string>();

  private inputSubscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.inputSubscription = this.watchOnSearchChange();
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

  private watchOnSearchChange(): Subscription {
    return this.search$.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(
        ((searchPhrase) => this.onInputChange$.emit(searchPhrase))
      );
  }

}
