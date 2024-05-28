import {ListRenderItemInfo} from 'react-native';
import {FilterType} from '../shared/components/filter/Filter';
import {Icon} from '../shared/modules/IconPicker';

export enum Routes {
  ACCOUNT = 'Account',
  CHAT_LIST = 'Chat List',
  CHORES_LIST = 'Chores List',
  COLOR_PICKER = 'Color Picker',
  COMMUNICATION_SETTINGS = 'Communication Settings',
  DASHBOARD = 'Dashboard',
  ERROR_MODAL = 'Error Modal',
  FAMILY = 'Family',
  FORGOT_PASSWORD = 'Forgot Password',
  HOME = 'Home',
  ICON_PICKER = 'Icon Picker',
  INVITATION_RECEIVED_MODAL = 'Invitation Received Modal',
  INVITE_FAMILY_MEMBER = 'Invite Family Member',
  LOGIN = 'Login',
  OPTION_PICKER = 'Option Picker',
  PASSWORD_RESET_CONFIRMATION = 'Password Reset Confirmation',
  RESET_PASSWORD_WITH_CODE = 'Reset Password With Code',
  ROOM_EDITOR = 'Room Editor',
  SIGN_UP = 'Sign Up',
  TAB_BAR = 'Tab Bar',
  TASK_EDITOR = 'Task Editor',
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
  [Routes.ERROR_MODAL]: {title: string; message: string; onPress?: () => void};
  [Routes.FAMILY]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.HOME]: undefined;
  [Routes.ICON_PICKER]: {
    currentIcon?: Icon;
    onIconSelected: (icon: Icon) => void;
  };
  [Routes.INVITATION_RECEIVED_MODAL]: undefined;
  [Routes.INVITE_FAMILY_MEMBER]: {groupId: string};
  [Routes.LOGIN]: undefined;
  [Routes.OPTION_PICKER]: {
    label: string;
    type: FilterType;
    options: unknown[];
    ctaLabel?: string;
    selected?: unknown | unknown[];
    identityComparator?: (a: unknown, b: unknown) => boolean;
    renderItem: (
      selected: unknown,
      onPress: (item: ListRenderItemInfo<unknown>) => void,
      item: unknown,
    ) => React.JSX.Element;
    onOptionSelected?: (selected: unknown) => void;
  };
  [Routes.PASSWORD_RESET_CONFIRMATION]: {email: string};
  [Routes.RESET_PASSWORD_WITH_CODE]: {code: string} | undefined;
  [Routes.ROOM_EDITOR]: {groupId: string; id?: string};
  [Routes.SIGN_UP]: undefined;
  [Routes.TAB_BAR]: undefined;
  [Routes.TASK_EDITOR]: {id?: string; groupId: string};
};
