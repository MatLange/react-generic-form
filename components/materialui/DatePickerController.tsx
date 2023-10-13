 import * as React from "react";
 import { InputLabel, TextFieldProps } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { localeDatePattern } from "../../dates/dateFormat";

import {
  Controller,
  get,
  UseControllerProps,
  UseControllerReturn,
} from "react-hook-form";

export const DatePickerController = (props : UseControllerProps & UseControllerReturn & DatePickerProps<any> & TextFieldProps)  => {
  const  { field }:UseControllerReturn = props as UseControllerReturn;  
  const {...customProps}:DatePickerProps<any> = props as DatePickerProps<any>;

  return (

    <Controller
      {...field}
      {...customProps}    
      render={({ field: { onChange, onBlur, name, value, ref }, formState, fieldState }) => {
        const error = get(formState.errors, props.name);
        const errorText = fieldState.invalid ? error.message : "";      
        return (
        <div>
        <FormControl variant="standard" error={!!error}>
         <DatePicker
          {...field}
          format={localeDatePattern}   
          slotProps={{
            textField: {
              required: true,
              error: !!errorText,
              helperText: errorText ? errorText : "",
              value: value || null
            },
          }}               
          label={props.label}
          onChange={(newValue) =>
            onChange({ target: { name, value: newValue } })
          }          
          value={value || null} // return updated value
         />          
{/*         <FormHelperText error={!!errorText}>{errorText}</FormHelperText>
 */}      </ FormControl>
      </div> )
        }
    }
      />
  );
};

