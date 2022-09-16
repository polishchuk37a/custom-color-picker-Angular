import {Component} from '@angular/core';
import {FormBuilder, ValidationErrors} from "@angular/forms";
import {hexColorValidator} from "./shared/hexColorValidator";
import {Color} from "../interfaces/color";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorForm = this.formBuilder.group({
    color: ['#000000', hexColorValidator]
  })

  userColorList: Color[] = [
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
  ]

  constructor(private readonly formBuilder: FormBuilder) {
  }
}

