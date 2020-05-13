import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeValue } from '@angular/platform-browser';

@Component({
  selector: 'mw-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],

})
export class CardsComponent implements OnChanges {

  public image: SafeValue;

  @Input() public title: string;
  @Input() public imageUrl: string;

  constructor(
    private domSantizer: DomSanitizer
  ) { }

  ngOnChanges(): void {
    this.image = this.domSantizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }

}
