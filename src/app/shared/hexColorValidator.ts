import {AbstractControl} from "@angular/forms";

export function hexColorValidator(control: AbstractControl) {
  let colorCode = control.value;
  let regex = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

  return colorCode.match(regex) ? null : { notHexCode: 'Invalid HEX code' };
}
