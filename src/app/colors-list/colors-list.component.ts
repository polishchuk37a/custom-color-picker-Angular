import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Color} from "../../interfaces/color";

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss']
})
export class ColorsListComponent {
  selectedColor = '';

  @Input() colorList: Color[] = [];
  @Output() pickedColor = new EventEmitter<string>();
  pickedColorIndex = -1;

  constructor() { }

  getColorFromPicker(colorIndex: number): void {
    this.pickedColorIndex = colorIndex;
    this.selectedColor = this.colorList[colorIndex].colorCode;
    this.pickedColor.emit(this.selectedColor);
  }
}
