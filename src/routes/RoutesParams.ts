export enum Routes {
  ACCOUNT = 'Account',
  CHAT_LIST = 'Chat List',
  CHORES_LIST = 'Chores List',
  DASHBOARD = 'Dashboard',
  FAMILY = 'Family',
  FORGOT_PASSWORD = 'Forgot Password',
  LOGIN = 'Login',
  PASSWORD_RESET_CONFIRMATION = 'Password Reset Confirmation',
  RESET_PASSWORD_WITH_CODE = 'Reset Password With Code',
  SIGN_UP = 'Sign Up',
}

export type AppScreensParamList = {
  [Routes.ACCOUNT]: undefined;
  [Routes.CHAT_LIST]: undefined;
  [Routes.CHORES_LIST]: undefined;
  [Routes.DASHBOARD]: undefined;
  [Routes.FAMILY]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.LOGIN]: undefined;
  [Routes.PASSWORD_RESET_CONFIRMATION]: {email: string};
  [Routes.RESET_PASSWORD_WITH_CODE]: {code: string} | undefined;
  [Routes.SIGN_UP]: undefined;
};
