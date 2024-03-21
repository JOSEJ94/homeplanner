import {Theme} from '@react-navigation/native';
import {ColorValue} from 'react-native';
import {Insets} from 'react-native/types';

export const PALETTE = {
  dark00: '#000000',
  dark10: '#202020',
  dark20: '#151515',
  red: '#ec1d24',
  white: '#ffffff',
  subtle: '#BBBBBB',
  blue: '#4169e1',
  purple: '#42196e',
  lightPurple: '#e2cafc',
};

export const DEFAULT_SPACING = 8;
export const DEFAULT_HITSLOP = 10;
export const DEFAULT_ACTIVE_OPACITY_BUTTON = 0.6;

interface ColorClassification {
  [name: string]: string;
}

export interface AppTheme extends Theme {
  defaultOpacity: number;
  hitSlop: number;
  hitSlopInsets: Insets;
  spacing: number;
  text: {
    primary: string;
    secondary: string;
    subtle: string;
  };
  background: {
    primary: string;
    card: string;
  };
  [classification: string]:
    | ColorClassification
    | boolean
    | Insets
    | number
    | ColorValue
    | string;
}

export const lightTheme: AppTheme = {
  defaultOpacity: DEFAULT_ACTIVE_OPACITY_BUTTON,
  hitSlop: DEFAULT_HITSLOP,
  hitSlopInsets: {
    bottom: DEFAULT_HITSLOP,
    left: DEFAULT_HITSLOP,
    right: DEFAULT_HITSLOP,
    top: DEFAULT_HITSLOP,
  },
  spacing: DEFAULT_SPACING,
  colors: {
    background: PALETTE.white,
    border: PALETTE.subtle,
    card: PALETTE.white,
    notification: PALETTE.red,
    primary: PALETTE.blue,
    text: PALETTE.dark20,
  },
  dark: false,
  background: {
    primary: PALETTE.red,
    card: PALETTE.dark20,
  },
  text: {
    primary: PALETTE.white,
    secondary: PALETTE.dark00,
    subtle: PALETTE.subtle,
  },
  white: PALETTE.white,
  error: PALETTE.red,
  borderLight: PALETTE.subtle,
  warningStrong: PALETTE.purple,
  warningLight: PALETTE.lightPurple,
  disabled: PALETTE.subtle,
};
