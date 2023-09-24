 import * as React from "react";
 import TextField from '@mui/material/TextField';
 import { FormControl, TextFieldProps } from "@material-ui/core";
import {
  Controller,
  get,
  useController,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";
export const TextAreaController = (props:UseControllerProps & TextFieldProps)  => {
  const { field, fieldState } = useController(props);  
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
                    id={props.name}
                    multiline
                    rows={4}
                    label={props.name}
                    helperText={errorText ? errorText : ""}
                    error={!!errorText} 
                    defaultValue={props.defaultValue}       
                    variant="outlined"
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

