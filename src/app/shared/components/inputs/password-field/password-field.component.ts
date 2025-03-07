import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SizeType } from '@core/constants';
import { BaseInputProps } from '@core/interfaces/base-input.interface';
import { BaseInput } from '../base-input';
import { InputErrorComponent } from '../input-error/input-error.component';

type LabelLocation = 'top' | 'hide';

export interface PasswordFieldProps extends BaseInputProps {
  labelLoc?: LabelLocation;
  size?: SizeType;
  hideError?: boolean;
}

@Component({
  selector: 'app-password-field',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  templateUrl: './password-field.component.html',
  styleUrl: './password-field.component.scss',
})
export class PasswordFieldComponent extends BaseInput implements OnInit {
  @Input({ required: true }) props!: PasswordFieldProps;
  @Input() fControl!: FormControl;
  @Input() fGroup!: FormGroup;
  @Input() disabled = false;

  showPassword = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeForm(this.props, {
      formControl: this.fControl,
      formGroup: this.fGroup,
    });
  }
}
