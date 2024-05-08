import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React, {useMemo} from 'react';

interface SpacerProps extends ViewProps {}

const Spacer = ({style, ...props}: SpacerProps) => {
  const styles = useMemo(() => createStyles(), []);

  return <View style={style || styles.spacer} {...props} />;
};

export default Spacer;

const createStyles = () =>
  StyleSheet.create({
    spacer: {
      flex: 1,
    },
  });
