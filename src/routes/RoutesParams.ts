import {Icon} from '../shared/modules/IconPicker';

export enum Routes {
  ACCOUNT = 'Account',
  CHAT_LIST = 'Chat List',
  CHORES_LIST = 'Chores List',
  COLOR_PICKER = 'Color Picker',
  COMMUNICATION_SETTINGS = 'Communication Settings',
  DASHBOARD = 'Dashboard',
  FAMILY = 'Family',
  FORGOT_PASSWORD = 'Forgot Password',
  HOME = 'Home',
  ICON_PICKER = 'Icon Picker',
  INVITE_FAMILY_MEMBER = 'Invite Family Member',
  LOGIN = 'Login',
  PASSWORD_RESET_CONFIRMATION = 'Password Reset Confirmation',
  RESET_PASSWORD_WITH_CODE = 'Reset Password With Code',
  ROOM_EDITOR = 'Room Editor',
  SIGN_UP = 'Sign Up',
  TAB_BAR = 'Tab Bar',
}

export type AppScreensParamList = {
  [Routes.ACCOUNT]: undefined;
  [Routes.CHAT_LIST]: undefined;
  [Routes.CHORES_LIST]: undefined;
  [Routes.COLOR_PICKER]: {
    currentColor?: string;
    onColorSelected: (color: string) => void;
  };
  [Routes.COMMUNICATION_SETTINGS]: undefined;
  [Routes.DASHBOARD]: undefined;
  [Routes.FAMILY]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.HOME]: undefined;
  [Routes.ICON_PICKER]: {
    currentIcon?: Icon;
    onIconSelected: (icon: Icon) => void;
  };
  [Routes.INVITE_FAMILY_MEMBER]: {email: string} | undefined;
  [Routes.LOGIN]: undefined;
  [Routes.PASSWORD_RESET_CONFIRMATION]: {email: string};
  [Routes.RESET_PASSWORD_WITH_CODE]: {code: string} | undefined;
  [Routes.ROOM_EDITOR]: {groupId: string; id?: string} | undefined;
  [Routes.SIGN_UP]: undefined;
  [Routes.TAB_BAR]: undefined;
};
