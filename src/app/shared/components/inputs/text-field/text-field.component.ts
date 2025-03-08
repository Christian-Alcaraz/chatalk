import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
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
  @Input() fcName!: string;

  constructor(controlContainer: ControlContainer) {
    super(controlContainer);
  }

  ngOnInit(): void {
    this.fcName = this.fcName ?? this.props.fcName;

    this.initFormControl(this.fcName, this.props.validators);

    if (this.props.type === 'number' && this.fControl) {
      this.fControl.valueChanges.subscribe((value) => {
        if (value === '') {
          this.fControl.setValue(null, { emitEvent: false });
        } else if (!isNaN(value)) {
          this.fControl.setValue(Number(value), { emitEvent: false });
        }
      });
    }
  }
}
