import {ThemePalette} from '@angular/material/core';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';

interface ButtonBase {
  ariaLabel: string;
  disabled: boolean;
  icon: string;
  svgIcon: string;
  color: ThemePalette;
}

export interface Button extends ButtonBase {
  text: string;
}

export interface FabButton extends ButtonBase {
  tooltipText: string;
  tooltipPosition: TooltipPosition;
}

export interface RadioGroupItem {
  title: string;
  value: unknown;
  disabled?: boolean;
}
