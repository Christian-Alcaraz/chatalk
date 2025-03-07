import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SizeType } from '@core/constants';
import { BaseInputProps } from '@core/interfaces/base-input.interface';
import { BaseInput } from '../base-input';
import { InputErrorComponent } from '../input-error/input-error.component';

type LabelLocation = 'top' | 'hide';
type TextFieldType = 'text' | 'number' | 'email';

export interface TextFieldProps extends BaseInputProps {
  type: TextFieldType;
  labelLoc?: LabelLocation;
  size?: SizeType;
  hideError?: boolean;
}

@Component({
  selector: 'app-text-field',
  imports: [CommonModule, ReactiveFormsModule, InputErrorComponent],
  standalone: true,
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss',
})
export class TextFieldComponent extends BaseInput implements OnInit {
  @Input({ required: true }) props!: TextFieldProps;
  @Input() fControl!: FormControl;
  @Input() fGroup!: FormGroup;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.initializeForm(this.props, {
      formControl: this.fControl,
      formGroup: this.fGroup,
    });

    if (this.props.type === 'number' && this.formControl) {
      this.formControl.valueChanges.subscribe((value) => {
        if (value === '') {
          this.formControl.setValue(null, { emitEvent: false });
        } else if (!isNaN(value)) {
          this.formControl.setValue(Number(value), { emitEvent: false });
        }
      });
    }
  }
}
