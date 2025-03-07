import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PasswordFieldComponent } from '@shared/components/inputs/password-field/password-field.component';
import { TextFieldComponent } from '@shared/components/inputs/text-field/text-field.component';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    TextFieldComponent,
    PasswordFieldComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  form!: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
      retypePassword: [''],
    });

    console.log(this.form);
  }

  submit() {}
}
