import React, {useState, useEffect, useMemo} from 'react';
import {
  Image,
  Animated,
  ImageSourcePropType,
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

interface RoundedImageProps {
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  placeholderSource?: ImageSourcePropType | undefined;
  source?: ImageSourcePropType | undefined;
  style?: StyleProp<ViewStyle>;
}

const RoundedImage = ({
  imageStyle,
  onPress,
  placeholderSource,
  source,
  style,
}: RoundedImageProps) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  const triggerAnimationWhenLoadFinished = () => setLoaded(true);

  useEffect(() => {
    if (source) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [source]);

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
      <Pressable onPress={onPress} style={[styles.container, style]}>
        {placeholderSource && !loaded && (
          <Image
            source={placeholderSource}
            style={[styles.image, imageStyle]}
          />
        )}
        <Animated.Image
          source={source}
          style={[
            styles.image,
            imageStyle,
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
