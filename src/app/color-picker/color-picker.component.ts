import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Color} from "../../interfaces/color";
import {fromEvent, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit, AfterViewInit, OnDestroy {
  color = '#000000';

  isColorPickerDropdownOpen = false;
  isSelectFocused = false;

  @ViewChild('select') select: ElementRef | undefined;

  colorForm = this.formBuilder.group({
    color: ['']
  });

  private unsubscribe$ = new Subject<void>();

  colorList: Color[] = [
    { colorCode: '#F1C40F', colorName: 'blue' },
    { colorCode: '#1ABC9C', colorName: 'aqua' },
    { colorCode: '#2980B9', colorName: 'teal' },
    { colorCode: '#9B59B6', colorName: 'olive' },
    { colorCode: '#8E44AD', colorName: 'green' },
    { colorCode: '#ECF0F1', colorName: 'lime' },
    { colorCode: '#E67E22', colorName: 'yellow' },
    { colorCode: '#34495E', colorName: 'orange' },
    { colorCode: '#E74C3C', colorName: 'maroon' },
    { colorCode: '#000000', colorName: 'black' },
    { colorCode: '#F1C40F', colorName: 'blue' },
    { colorCode: '#1ABC9C', colorName: 'aqua' },
    { colorCode: '#2980B9', colorName: 'teal' },
    { colorCode: '#9B59B6', colorName: 'olive' },
    { colorCode: '#8E44AD', colorName: 'green' },
    { colorCode: '#ECF0F1', colorName: 'lime' },
    { colorCode: '#E67E22', colorName: 'yellow' },
    { colorCode: '#34495E', colorName: 'orange' },
    { colorCode: '#E74C3C', colorName: 'maroon' },
    { colorCode: '#000000', colorName: 'black' }
  ];

  constructor(private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.colorForm.get('color')?.valueChanges
      .pipe(
        tap(value => this.color = value),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  openColorPickerDropdown(): void {
    this.isColorPickerDropdownOpen = !this.isColorPickerDropdownOpen;
  }

  ngAfterViewInit(): void {
    fromEvent<MouseEvent>(this.select?.nativeElement, 'click')
      .pipe(
        tap(() => {
          this.select?.nativeElement.focus();
          this.isSelectFocused = true;
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    fromEvent<KeyboardEvent>(this.select?.nativeElement, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'Tab'),
        tap(() => {
          this.select?.nativeElement.focus();
          this.isSelectFocused = true;
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();

    fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event: KeyboardEvent) => event.key === 'Enter'),
        tap(() => {
          if (this.isSelectFocused) {
            this.isColorPickerDropdownOpen = !this.isColorPickerDropdownOpen;
          }
        }),
        takeUntil(this.unsubscribe$)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
