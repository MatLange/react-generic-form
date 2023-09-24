import React from "react";
import {
  Control,
  useController,
  UseControllerReturn,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";
import { TextInputController } from "../materialui/TextInputController"
import { MultiSelectController } from "../materialui/MultiSelectController"
import Box from "@mui/material/Box";

const fruits = [
  { id: 1, name: "Bananas 🍌" },
  { id: 2, name: "Strawberries 🍓" },
  { id: 3, name: "Kiwis 🥝" },
  { id: 4, name: "Blueberries 🫐" },
  { id: 5, name: "Watermelon 🍉" },
]


function StepTwo({
  control,
  register,
}: {
  control: Control;
  register: any;
}) {
  return (
    <>
    <Box flexDirection="column"
                  display="flex"
                  alignItems="center" p={2}>
      <Box       sx={{
        '& .MuiFormControl-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <MultiSelectController required={true} control={control} {...useController({...register("fruits")}) as UseControllerReturn} label="Which one is your favourite fruit?" name="fruits"  menuItems={fruits}/> 
        </Box>          
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <TextInputController control={control} {...useController({...register("address")}) as UseControllerReturn} label="address" name="address"/> 
        </Box>                
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>
        <TextInputController control={control} {...useController({...register("city")}) as UseControllerReturn} label="city" name="city"/> 
        </Box>        
        </Box>
      </>
    )
}

export default StepTwo
