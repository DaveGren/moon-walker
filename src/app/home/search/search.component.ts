import { Component, OnInit, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mw-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  public search$: FormControl = new FormControl('');

  @Output()
  public onInputHint$: EventEmitter<boolean> = new EventEmitter<boolean>();

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
        tap(() => this.onInputHint$.emit(true)),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(
        ((searchPhrase) => this.onInputChange$.emit(searchPhrase))
      );
  }

}
