import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input } from '@angular/core';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [
    trigger('zoomAnimation', [
      transition(':enter', [
        animate(
          '500ms ease-out',
          keyframes([
            style({
              opacity: 0,
              transform: 'scale(0.5) rotate(-10deg)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'scale(1.05) rotate(2deg)',
              offset: 0.7,
            }),
            style({ opacity: 1, transform: 'scale(1) rotate(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CardComponent {
  @Input() book!: Book;
}
