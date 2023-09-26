import React from "react";
import {
  Control,
  useController,
  UseControllerReturn,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { DatePickerController } from "../materialui/DatePickerController";
import { SelectController } from "../materialui/SelectController";
import { TextInputController } from "../materialui/TextInputController";
import Box from "@mui/material/Box";


const titles = [
  { id: 1, name: "Dr." },
  { id: 2, name: "Prof." },
  { id: 3, name: "Dr.Dr." },
]


function StepOne({
  control,
  register
}: {
  control: Control;
  register:any;
}) {

  return (
      <>
    <Box flexDirection="column"
                  display="flex"
                  alignItems="center" p={2}>
      <Box       sx={{
        '& .MuiFormControl-root': { m: 1, width: '50ch' },
        
      }} mt={2}>
        <SelectController control={control} required={true} {...useController(register("title")) as UseControllerReturn} label="Title" name="title"  menuItems={titles}/> 
        </Box>   
        <Box       sx={{
        '& .MuiFormControl-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <DatePickerController control={control} required={true}  {...useController(register("registrationDate")) as UseControllerReturn} label="registrationDate" name="registrationDate"/> 
        </Box>                      
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <TextInputController control={control} required={true}  {...useController(register("firstName")) as UseControllerReturn} label="firstName" name="firstName"/> 
        </Box>                
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <TextInputController control={control} required={true}  {...useController(register("lastName")) as UseControllerReturn} label="lastName" name="lastName"/> 
        </Box>        
        </Box>
      </>
    )
}

export default StepOne
