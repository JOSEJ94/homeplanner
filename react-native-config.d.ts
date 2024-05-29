declare module 'react-native-config' {
  export interface NativeConfig {
    RN_API_URL: string;
    RN_GOOGLE_CLIENT_ID: string;
    RN_BUG_TICKET_ID: string;
    RN_BUG_TICKET_SECRET: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
