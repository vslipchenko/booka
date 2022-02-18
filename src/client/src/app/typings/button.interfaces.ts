import {ThemePalette} from '@angular/material/core';
import {TooltipPosition} from '@angular/material/tooltip/tooltip';

interface ButtonComponentBase {
  ariaLabel: string;
  disabled: boolean;
  icon: string;
  svgIcon: string;
  color: ThemePalette;
}

export interface ButtonComponent extends ButtonComponentBase {
  text: string;
}

export interface FabButtonComponent extends ButtonComponentBase {
  tooltipText: string;
  tooltipPosition: TooltipPosition;
}

export interface RadioGroupItem {
  title: string;
  value: unknown;
  disabled?: boolean;
}
