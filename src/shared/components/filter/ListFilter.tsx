import {
  FlatList,
  FlatListProps,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import Typography from '../Typography';
import {useTheme} from '@react-navigation/native';
import {AppTheme} from '../../themes/Theme';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

const ICON_SIZE = 12;

export interface ListOption<T> {
  label: string;
  value: T;
}

type OmittedProps = 'data' | 'renderItem';

interface ListFilterProps<T> extends Omit<FlatListProps<T>, OmittedProps> {
  options: ListOption<T>[];
  onPress?: (selectedValue: T | null) => void;
  selected?: ListOption<T> | null;
}

const ListFilter = <T,>({
  options,
  onPress,
  ListFooterComponent,
  ListHeaderComponent,
  selected,
}: ListFilterProps<T>) => {
  const theme = useTheme() as AppTheme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const renderItem = ({item}: {item: ListOption<T>}) => {
    const localOnPress = () => {
      if (onPress) {
        onPress(item.value);
      }
    };
    const isSelected = item.value === selected?.value;

    return (
      <Pressable onPress={localOnPress} style={styles.container}>
        <View style={styles.iconContainer}>
          {isSelected && (
            <FontistoIcon
              name="record"
              color={theme.colors.primary}
              size={ICON_SIZE}
            />
          )}
        </View>
        <Typography style={isSelected && styles.selectedOption}>
          {item.label}
        </Typography>
      </Pressable>
    );
  };

  return (
    <FlatList
      bounces={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      data={options}
      renderItem={renderItem}
    />
  );
};

export default ListFilter;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginVertical: theme.spacing,
      marginHorizontal: theme.spacing * 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      minWidth: 25,
      height: 20,
      justifyContent: 'center',
    },
    selectedOption: {
      color: theme.colors.primary,
    },
  });
