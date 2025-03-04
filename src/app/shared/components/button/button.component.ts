import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Color, ColorType } from '@core/constants';
import { Size, SizeType } from '@core/constants/size.constant';

type ButtonType = 'solid' | 'outline' | 'text';

type FabButtonType = 'fab-solid' | 'fab-outline' | 'fab-icon';

interface BaseButtonProps {
  label?: string;
  color?: ColorType;
  size?: SizeType;
}

interface NotFabButtonProps extends BaseButtonProps {
  type?: ButtonType;
  prefixIcon?: string; //font-awesome class
  suffixIcon?: string; //font-awesome class
}

interface FabButtonProps extends BaseButtonProps {
  type?: FabButtonType;
  icon: string; //font-awesomeclass
}

export type ButtonProps = NotFabButtonProps | FabButtonProps;

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() props?: ButtonProps;
  @Input() disabled = false;
  @Output() onButtonClick = new EventEmitter<void>();

  fabTypes = ['fab-solid', 'fab-outline', 'fab-icon'];
  buttonTypes = {
    Solid: 'solid',
    Outline: 'outline',
    Text: 'text',
    FabSolid: 'fab-solid',
    FabOutline: 'fab-outline',
    FabIcon: 'fab-icon',
  };
  color = Color;
  size = Size;
  type!: string;

  ngOnInit(): void {
    this.type = this.props?.type ?? this.buttonTypes.Solid;
  }
}
