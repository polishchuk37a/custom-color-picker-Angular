import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Color} from "../../../interfaces/color";
import {fromEvent, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";

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

  constructor() { }

  getColorFromPicker(colorIndex: number): void {
    this.pickedColorIndex = colorIndex;
    this.selectedColor = this.colorList[colorIndex].code;
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
