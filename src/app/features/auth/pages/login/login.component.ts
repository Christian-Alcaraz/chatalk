import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PasswordFieldComponent } from '@shared/components/inputs/password-field/password-field.component';
import {
  TextFieldComponent,
  TextFieldProps,
} from '@shared/components/inputs/text-field/text-field.component';
import { AuthService } from '@shared/services/api/auth/auth.service';
import { GoogleOAuthService } from '@shared/services/api/oauth2/google/google-oauth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    TextFieldComponent,
    PasswordFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly googleOAuthService = inject(GoogleOAuthService);
  private readonly authService = inject(AuthService);

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
    // Attach this back
    // this.authService.login().subscribe({
    //   next: () => {},
    //   error: (err) => {
    //     console.error(err);
    //   },
    // });

    this.router.navigate(['portal']);
  }

  redirectToGoogleOAuth() {
    const href = this.googleOAuthService.getGoogleOAuthHREF();
    window.location.assign(href);
  }

  navigateToSignup() {
    this.router.navigate(['auth', 'signup']);
  }
}
