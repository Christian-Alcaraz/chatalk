import { FormControl, FormGroup, Validators } from '@angular/forms';

interface FormProps {
  formControl?: FormControl;
  formGroup?: FormGroup;
}

export class BaseInput {
  private _props: any;
  private _formProps!: FormProps;

  get formControl() {
    if (this._formProps?.formControl) {
      return this._formProps.formControl;
    }

    return this._formProps?.formGroup?.get(this._props.fcName) as FormControl;
  }

  initializeForm(props: any, formProps: FormProps) {
    if (!formProps?.formControl && !(props.fcName && formProps.formGroup)) {
      throw new Error(`${props.label} has no FormControl or FormGroup`);
    }
    this._props = props;
    this._formProps = formProps;
    this._initializeValidators();
  }

  private _initializeValidators(): void {
    if (!this._props?.validators) {
      return;
    }

    const validators = [];

    if (this._props.validators.required) {
      validators.push(Validators.required);
    }

    if (this._props.validators.email) {
      validators.push(Validators.email);
    }

    if (this._props.validators.max) {
      validators.push(Validators.max(this._props.max));
    }

    if (this._props.validators.maxLength) {
      validators.push(Validators.maxLength(this._props.maxLength));
    }

    if (this._props.validators.min) {
      validators.push(Validators.min(this._props.min));
    }

    if (this._props.validators.minLength) {
      validators.push(Validators.minLength(this._props.minlength));
    }

    for (const validator of validators) {
      if (!this.formControl.hasValidator(validator)) {
        this.formControl.setValidators(validators);
      }
    }
  }
}
