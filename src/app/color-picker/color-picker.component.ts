import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Color} from "../../interfaces/color";
import {fromEvent, Subject} from "rxjs";
import {filter, takeUntil, tap} from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator,
} from "@angular/forms";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ColorPickerComponent,
      multi: true
    }
  ]
})
export class ColorPickerComponent implements AfterViewInit, OnDestroy, ControlValueAccessor, Validator {
  color = '';

  isColorPickerDropdownOpen = false;
  isSelectFocused = false;

  @ViewChild('select') select: ElementRef | undefined;

  private onChange: Function = (color: string) => {};
  private onTouched: Function = () => {};

  private unsubscribe$ = new Subject<void>();

  colorList: Color[] = [
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
  ];

  constructor() {
  }

  writeValue(color: string): void {
    this.color = color;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  openColorPickerDropdown(): void {
    this.isColorPickerDropdownOpen = !this.isColorPickerDropdownOpen;
  }

  setColorFromDropdown(color: string): void {
    this.onChange(color);
    this.color = color;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let colorCode = control.value;
    let regex = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

    return colorCode.match(regex) ? null : { notHexCode: 'Invalid HEX code' };
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
