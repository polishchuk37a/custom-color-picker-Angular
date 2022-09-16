import {Component} from '@angular/core';
import {FormBuilder, ValidationErrors} from "@angular/forms";
import {hexColorValidator} from "./shared/hexColorValidator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorForm = this.formBuilder.group({
    color: ['#000000', hexColorValidator]
  })

  constructor(private readonly formBuilder: FormBuilder) {
  }
}

