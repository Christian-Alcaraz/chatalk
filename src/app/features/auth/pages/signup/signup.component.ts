import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PasswordFieldComponent } from '@shared/components/inputs/password-field/password-field.component';
import { TextFieldComponent } from '@shared/components/inputs/text-field/text-field.component';
import { GoogleOAuthService } from '@shared/services/api/oauth2/google/google-oauth.service';

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
  private router = inject(Router);
  private googleOAuthService = inject(GoogleOAuthService);

  form!: FormGroup;

  constructor() {
    this.form = this.formBuilder.group(
      {
        email: ['', { updateOn: 'blur' }],
        password: [''],
        confirmPassword: [''],
      },
      { validator: this._comparePasssword('password', 'confirmPassword') },
    );

    console.log(this.form);
  }

  submit() {}

  redirectToGoogleOAuth() {
    this.googleOAuthService.consentLogin();
  }

  navigateToLogin() {
    this.router.navigate(['auth', 'login']);
  }

  private _comparePasssword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatchWithControl: 'password' });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
