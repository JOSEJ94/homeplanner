import React from 'react';
import Checkbox, {CheckboxProps} from './Checkbox';

interface CompletionCheckboxProps
  extends Omit<CheckboxProps, 'emptyIcon' | 'fullIcon'> {}

const CompletionCheckbox = (props: CompletionCheckboxProps) => (
  <Checkbox
    {...props}
    fullIcon="check-circle"
    emptyIcon="checkbox-blank-circle-outline"
  />
);

export default CompletionCheckbox;
