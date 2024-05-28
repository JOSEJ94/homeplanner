import React, {useState, useEffect, useMemo} from 'react';
import {
  Image,
  Animated,
  StyleProp,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import {AppTheme} from '../themes/Theme';
import {useTheme} from '@react-navigation/native';
import {Skeleton} from 'moti/skeleton';
import FastImage, {Source} from 'react-native-fast-image';

interface RoundedImageProps {
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  placeholderUri?: string | null;
  sourceUri?: string | null;
  style?: StyleProp<ViewStyle>;
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const RoundedImage = ({
  imageStyle,
  onPress,
  placeholderUri,
  sourceUri,
  style,
}: RoundedImageProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const opacity = new Animated.Value(0);

  const triggerAnimationWhenLoadFinished = () => {
    if (!error) {
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (sourceUri) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [sourceUri]);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setLoaded(true));
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setLoaded(false));
  };

  return (
    <Skeleton colorMode="light" radius={styles.image.borderRadius}>
      <Pressable
        pointerEvents={onPress ? 'auto' : 'none'}
        onPress={onPress}
        style={[styles.container, style]}>
        {placeholderUri && !loaded && (
          <Image
            source={{uri: placeholderUri}}
            style={[styles.image, imageStyle]}
          />
        )}
        <AnimatedFastImage
          source={{
            uri: sourceUri || '',
          }}
          onError={() => {
            setError(true);
          }}
          onLoadStart={() => {
            setError(false);
          }}
          style={[
            styles.image,
            // FIXME: Incorrect style type here
            imageStyle as any,
            {
              opacity: opacity,
            },
          ]}
          onLoad={fadeIn}
          onLoadEnd={triggerAnimationWhenLoadFinished}
        />
      </Pressable>
    </Skeleton>
  );
};

export default RoundedImage;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 60,
      width: 60,
    },
    image: {
      position: 'absolute',
      borderRadius: 30,
      height: 60,
      width: 60,
    },
  });
