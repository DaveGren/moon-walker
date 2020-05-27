import { Component, Input, Renderer2, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mw-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

})
export class CardsComponent {

  @ViewChild('image', { static: true })
  public image: ElementRef;

  @Input() public title: string;
  @Input() public imageUrl: string;
  @Input() public description: string;

  constructor(
    private renderer: Renderer2
  ) { }

  replaceImage(): void {
    this.renderer.setAttribute(this.image.nativeElement, 'src', this.imageUrl)
  }
}
