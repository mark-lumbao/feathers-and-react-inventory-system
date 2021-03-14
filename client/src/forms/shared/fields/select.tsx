import React from 'react';
import { Field } from 'react-final-form';
import {
  Select, SelectProps, MenuItem, FormControl,
  InputLabel,
} from '@material-ui/core';
import { optionProps } from 'forms/shared/types';

export interface FieldSelectProps extends SelectProps {
  name: string;
  options: optionProps[];
}

const FieldSelect = ({
  name, options, placeholder, ...rest
}: FieldSelectProps) => (
  <Field
    name={name}
    render={({ input }) => (
      <FormControl>
        <InputLabel>{placeholder}</InputLabel>
        <Select {...input} {...rest}>
          {options.map(({ label, value }) => (
            <MenuItem value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

export default FieldSelect;
