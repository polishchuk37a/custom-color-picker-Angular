import {Component} from '@angular/core';
import {FormBuilder, ValidationErrors} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorForm = this.formBuilder.group({
    color: ['#000000']
  })

  get isFormInvalid(): ValidationErrors | null | undefined{
    return this.colorForm.get('color')?.errors;
  }

  constructor(private readonly formBuilder: FormBuilder) {
  }
}

