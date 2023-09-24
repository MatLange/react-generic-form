import React from "react";
import { TextInputController } from "../materialui/TextInputController";
import { TextAreaController } from "../materialui/TextAreaController";
import { SelectController } from "../materialui/SelectController";
import { MultiSelectController } from "../materialui/MultiSelectController";
import Box from "@mui/material/Box";
import {
  Control,
  useController,
  UseControllerReturn,
  useFormContext,
  UseFormReturn,
} from "react-hook-form";

const vegetables = [
  { id: 1, name: "Cucumber 🍌" },
  { id: 2, name: "Tomatoes 🍓" },
  { id: 3, name: "Cabbage 🥝" },
  { id: 4, name: "Eggplant 🫐" },
  { id: 5, name: "Carrots 🍉" },
]  
 
function StepThree({
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
        <MultiSelectController required={true} control={control} {...useController({...register("vegetables")}) as UseControllerReturn} label="Which vegetables do you like?" name="vegetables"  menuItems={vegetables}/> 
        </Box>          
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>        
        <TextInputController control={control} {...useController({...register("wishes")}) as UseControllerReturn} label="wishes" name="wishes"/> 
        </Box>                
        <Box       sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }} mt={2}>        
        <TextAreaController control={control} {...useController({...register("comment")}) as UseControllerReturn} label="comment" name="comment"/> 
        </Box>        
      </Box>
      </>
    )
}

export default StepThree
