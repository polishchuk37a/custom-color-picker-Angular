import {Component} from '@angular/core';
import {Color} from "../../interfaces/color";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent {
  isColorPickerDropdownOpen = false;
  color = '#000000';

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

  constructor() {
  }

  openColorPickerDropdown(): void {
    this.isColorPickerDropdownOpen = !this.isColorPickerDropdownOpen;
  }

  setColorFromPicker(colorFromPicker: string): void {
     this.color = colorFromPicker;
  }
}
