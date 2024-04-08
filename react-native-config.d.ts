declare module 'react-native-config' {
  export interface NativeConfig {
    RN_API_URL: string;
    RN_GOOGLE_CLIENT_ID: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
