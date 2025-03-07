import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  imports: [],
  templateUrl: './input-error.component.html',
  styleUrl: './input-error.component.scss',
})
export class InputErrorComponent implements OnInit {
  @Input({ required: true }) fControl!: FormControl;
  @Input() labelProps!: string | null | undefined;

  errorMessage!: string;

  label!: string;

  ngOnInit(): void {
    this.label = this.labelProps || 'This field';

    const sentenceCaseRegex = /(?<=^|[.!?]\s)\w/g;
    this.fControl?.statusChanges.subscribe(() => {
      this.errorMessage = '';
      const errorList: any = {
        required: 'is required',
        email: 'is invalid format',
        max: 'has exceeded max number',
        maxlength: 'has exceeded max length',
        min: 'has exceeded min number',
        minlength: 'has exceeded min length',
        invalidenumvalue: 'must be valid',
        nan: 'must be a number',
        invaliddate: 'must be a date',
        expectedvaluetypeinvalid: 'has a invalid type/input.',
        passwordStrength:
          'must have atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
      };

      if (this.fControl?.errors) {
        const firstKey = Object.keys(this.fControl.errors)[0];
        if (firstKey === 'serverError') {
          const [errorCode, errorValue] =
            this.fControl.errors[firstKey].split(':');
          this.errorMessage = `${this.label} ${errorList[errorCode]}`.replace(
            sentenceCaseRegex,
            function (c) {
              return c.toUpperCase();
            },
          );
          return;
        }
        this.errorMessage = `${this.label} ${errorList[firstKey]}`.replace(
          sentenceCaseRegex,
          function (c) {
            return c.toUpperCase();
          },
        );
      }
    });
  }
}
