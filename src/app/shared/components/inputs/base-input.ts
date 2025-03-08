import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorType } from '@core/interfaces/base-input.interface';
import { valueMustMatchWithControlName } from '@shared/validators/custom-validators';

export class BaseInput {
  fControl!: FormControl;
  fGroup!: FormGroup;

  constructor(private _controlContainer: ControlContainer) {}

  initFormControl(fcName: string, validators?: Validators) {
    this.fGroup = this._controlContainer.control as FormGroup;
    this.fControl = this.fGroup.get(fcName) as FormControl;

    if (!this.fControl) {
      throw new Error(`${fcName} is not a valid form control`);
    }

    if (validators) {
      this._setFormValidators(validators);
    }
  }

  private _setFormValidators(validators: ValidatorType): void {
    const requirements = [];
    for (const [key, value] of Object.entries(validators)) {
      if (value) {
        switch (key) {
          case 'required':
            requirements.push(Validators.required);
            break;
          case 'minlength':
            requirements.push(Validators.minLength(value));
            break;
          case 'maxlength':
            requirements.push(Validators.maxLength(value));
            break;
          case 'min':
            requirements.push(Validators.min(value));
            break;
          case 'max':
            requirements.push(Validators.max(value));
            break;
          case 'email':
            requirements.push(Validators.email);
            break;
          case 'mustMatchWithControl':
            const matchingFormControl = this.fGroup.get(value) as FormControl;
            requirements.push(
              valueMustMatchWithControlName(matchingFormControl, value),
            );
            break;
        }
      }
    }
    if (requirements.length) {
      this.fControl.setValidators(Validators.compose(requirements));
    }
  }
}
