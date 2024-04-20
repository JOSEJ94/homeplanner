import {Platform} from 'react-native';

/**
 * This helps you getting the native asset name for an image contained in the native app.
 * @param assetName the asset name
 * @returns an asset compliant name
 */
export const getStaticImageName = (assetName: string) => {
  const [name] = assetName.split('.');
  return Platform.select({
    android: `asset:/${assetName}`,
    ios: name,
  })!;
};
