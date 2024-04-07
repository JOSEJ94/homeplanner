import React, {useState, useEffect, ReactNode} from 'react';
import {Animated, Easing, StyleProp, ViewStyle} from 'react-native';

interface ShakeViewProps {
  isActive: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ShakeView: React.FC<ShakeViewProps> = ({isActive, children, style}) => {
  const [shakeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isActive) {
      startShaking();
    } else {
      stopShaking();
    }
  }, [isActive]);

  const startShaking = () => {
    Animated.loop(
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const stopShaking = () => {
    shakeAnimation.setValue(0);
  };

  // Interpolate the animated value for applying transform style
  const shakeTransform = shakeAnimation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-1.5deg', '0deg', '1.5deg', '0deg'],
  });

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{rotate: shakeTransform}],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export default ShakeView;
