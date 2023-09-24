 import * as React from "react";
 import TextField from '@mui/material/TextField';
import { FormControl, TextFieldProps } from "@material-ui/core";
import {
  Controller,
  get,
  UseControllerProps,
  UseControllerReturn,
} from "react-hook-form";
export const TextInputController = (props: UseControllerProps & UseControllerReturn & TextFieldProps)  => {
  const  { field }:UseControllerReturn = props as UseControllerReturn;  
  const {...customProps}:TextFieldProps = props as TextFieldProps;

  return (
    <Controller
      {...field}
      {...customProps}    
      render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => {
        const error = get(formState.errors, props.name);
        const errorText = fieldState.invalid ? error.message : "";      
        return (
        <>
        <FormControl variant="standard">
          <TextField {...field} 
                    fullWidth={true}
                    id={props.name}
                    required={props.required}
                    label={props.label}
                    helperText={errorText ? errorText : ""}
                    error={!!errorText} 
                    defaultValue={props.defaultValue}       
                    variant="outlined"
                    margin="normal"
                    onChange={onChange} // send value to hook form
                    onBlur={onBlur} // notify when input is touched
                    value={value} // return updated value
                    ref={ref} // set ref for focus management      
      /> </FormControl>
      </> )
        }
    }
      />
  );
};

