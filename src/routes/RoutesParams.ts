export enum Routes {
  LOGIN = 'Login',
  SIGN_UP = 'Sign Up',
  FORGOT_PASSWORD = 'Forgot Password',
  PASSWORD_RESET_CONFIRMATION = 'Password Reset Confirmation',
  RESET_PASSWORD_WITH_CODE = 'Reset Password With Code',
  DASHBOARD = 'Dashboard',
}

export type AppScreensParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.SIGN_UP]: undefined;
  [Routes.DASHBOARD]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.PASSWORD_RESET_CONFIRMATION]: {email: string};
  [Routes.RESET_PASSWORD_WITH_CODE]: {code: string} | undefined;
};
