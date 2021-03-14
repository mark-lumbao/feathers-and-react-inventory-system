import React, { HtmlHTMLAttributes } from 'react';
import { Field } from 'react-final-form';
import {
  TextField, StandardTextFieldProps, LinearProgress,
} from '@material-ui/core';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import { optionProps } from 'forms/shared/types';

export type FieldAutoCompleteProps = HtmlHTMLAttributes<any>
  & {
    name: string;
    options: optionProps[];
    fetching?: boolean;
    textInputProps?: StandardTextFieldProps;
  }
  & Partial<AutocompleteProps<any, any, any, any>>

const FieldAutoComplete = ({
  name, textInputProps, fetching = false, ...rest
}: FieldAutoCompleteProps) => (
  <Field
    name={name}
    render={({ input: { onChange, ...inputProps } }) => (
      <Autocomplete
        {...rest}
        {...inputProps}
        onChange={(_event, value) => {
          onChange(value);
        }}
        getOptionLabel={(option: optionProps) => option.label}
        renderInput={(params) => (
          <>
            <TextField
              {...textInputProps}
              {...params}
              label={fetching ? 'Loading values ...' : textInputProps.label}
            />
            <LinearProgress hidden={!fetching} />
          </>
        )}
      />
    )}
  />
);

export default FieldAutoComplete;
