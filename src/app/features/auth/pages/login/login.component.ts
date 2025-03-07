import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PasswordFieldComponent } from '@shared/components/inputs/password-field/password-field.component';
import {
  TextFieldComponent,
  TextFieldProps,
} from '@shared/components/inputs/text-field/text-field.component';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, TextFieldComponent, PasswordFieldComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  form!: FormGroup;

  formProps: Record<string, TextFieldProps | any> = {
    email: {
      fcName: 'email',
      type: 'email',
      placeholder: 'sample@email.com',
      labelLoc: 'hide',
      validators: {
        required: true,
        email: true,
      },
    },
    password: {
      fcName: 'password',
      placeholder: '',
      labelLoc: 'hide',
      validators: {
        required: true,
      },
    },
  };

  constructor() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  submit() {
    console.log(this.form);
  }
}
