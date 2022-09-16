import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Color} from "../../../interfaces/color";
import {fromEvent, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";

const DEFAULT_COLORS: Color[] = [
  { code: '#F1C40F', name: 'blue' },
  { code: '#1ABC9C', name: 'aqua' },
  { code: '#2980B9', name: 'teal' },
  { code: '#9B59B6', name: 'olive' },
  { code: '#8E44AD', name: 'green' },
  { code: '#ECF0F1', name: 'lime' },
  { code: '#E67E22', name: 'yellow' },
  { code: '#34495E', name: 'orange' },
  { code: '#E74C3C', name: 'maroon' },
  { code: '#000000', name: 'black' },
  { code: '#F1C40F', name: 'blue' },
  { code: '#1ABC9C', name: 'aqua' },
  { code: '#2980B9', name: 'teal' },
  { code: '#9B59B6', name: 'olive' },
  { code: '#8E44AD', name: 'green' },
  { code: '#ECF0F1', name: 'lime' },
  { code: '#E67E22', name: 'yellow' },
  { code: '#34495E', name: 'orange' },
  { code: '11111', name: 'maroon' },
  { code: '#000000', name: 'black' }
]

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss'],

})
export class ColorsListComponent implements AfterViewInit, OnDestroy {
  selectedColor = '';
  pickedColorIndex = -1;

  @Input() colorList: Color[] = [];
  @Output() pickedColor = new EventEmitter<string>();

  private unsubscribe$ = new Subject<void>();

  get colorListSource(): Color[] {
    return this.colorList.length > 0 ? this.colorList : DEFAULT_COLORS;
  }

  constructor() { }

  getColorFromPicker(colorIndex: number): void {
    this.pickedColorIndex = colorIndex;
    this.selectedColor = this.colorListSource[colorIndex].code;
    this.pickedColor.emit(this.selectedColor);
  }

  ngAfterViewInit(): void {
    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowRight'),
        tap(() => {
          this.pickedColorIndex++;

          if (this.pickedColorIndex > this.colorList.length - 1) {
            this.pickedColorIndex = 0;
          }
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowLeft'),
        tap(() => {
          this.pickedColorIndex--;

          if (this.pickedColorIndex < 0) {
            this.pickedColorIndex = this.colorList.length - 1;
          }
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowDown'),
        tap(() => {
          if (this.pickedColorIndex > this.colorList.length - 5) {
            this.pickedColorIndex -= this.colorList.length - 5
          } else {
            this.pickedColorIndex += 5;
          }
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'ArrowUp'),
        tap(() => {
          if (this.pickedColorIndex < 5) {
            this.pickedColorIndex += this.colorList.length - 5;
          } else {
            this.pickedColorIndex -= 5;
          }
        }),
        takeUntil(this.unsubscribe$),
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
