import React from 'react';
import { Field } from 'react-final-form';
import { StandardTextFieldProps, TextField } from '@material-ui/core';

export interface FieldInputTextProps extends StandardTextFieldProps {
  name: string;
}

const FieldInputText = ({ name, ...rest }: FieldInputTextProps) => (
  <Field
    name={name}
    render={({ input }) => (
      <TextField {...input} {...rest} />
    )}
  />
);

export default FieldInputText;
