 import * as React from "react";
 import TextField from '@mui/material/TextField';
import { InputLabel, MenuItem, SelectProps, TextFieldProps } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import {
  Controller,
  get,
  UseControllerProps,
  UseControllerReturn,
  UseFormRegister,
} from "react-hook-form";

export type MenuItemsProps = {
  menuItems?: Array<any>;
};


export const MultiSelectController = (props : UseControllerProps & UseControllerReturn & SelectProps & MenuItemsProps)  => {
    const  { field }:UseControllerReturn = props as UseControllerReturn;  
  const {...customProps}:SelectProps = props as SelectProps;
  const [menuItem, setMenuItem] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof menuItem>) => {
    const {
      target: { value },
    } = event;
    const name = menuItem || [].find((item : any) => {
      return ( item.value === value );
    })
    setMenuItem(
      // On autofill we get a stringified value.
      
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const renderValue = (selected:any) => {
    const selectedTexts = selected.map((selectedId:any) => {      
      return (props?.menuItems || []).find((menuItem) => menuItem.id === selectedId)?.name 
    });
     return selectedTexts.join(', ');    
  };

  return (

    <Controller
      {...field}
      {...customProps}    
      render={({ field: { onChange, onBlur, value, ref }, formState, fieldState }) => {
        const error = get(formState.errors, props.name);
        const errorText = fieldState.invalid ? error.message : "";      
        return (
        <div>
        <FormControl variant="standard">
          <InputLabel error={!!errorText} id="demo-multiple-checkbox-label" required={customProps.required} htmlFor="demo-multiple-checkbox">{props.label}</InputLabel> 
         <Select
          {...field}           
          fullWidth={true} 
          id="demo-multiple-checkbox"
          multiple
          input={<OutlinedInput />}
          error={!!errorText} 
          defaultValue={props.defaultValue}             
          renderValue={renderValue}
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched
          value={value || []} // return updated value
          ref={ref} // set ref for focus management               input={<OutlinedInput label="Tag" />}
        >
     {props.menuItems?.map((item, index) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={menuItem.indexOf(item.id) > -1} />
                <ListItemText primary={item.name} />              
              </MenuItem>
              )
        })}      
        </Select>
        <FormHelperText error={!!errorText} id="outlined-weight-helper-text">{errorText}</FormHelperText>
      </ FormControl>
      </div> )
        }
    }
      />
  );
};

