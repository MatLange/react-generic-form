import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Navigation from "../components/Navigation";
import PageDisplay from "../components/PageDisplay";
import {supabase} from "../datahandling/databasehandling";
import {Step, StepLabel, Stepper, ThemeProvider} from "@material-ui/core";
import {validationSchemas} from "../validations/validationSchemas";
import {yupResolver} from "@hookform/resolvers/yup";

const Todo = ({todo, onDelete} : any) => {
    const [isCompleted,
        setIsCompleted] = useState(todo.is_complete)

    const toggle = async() => {
        try {
            const {data, error} : any = await supabase
                .from('formData')
                .update({
                    is_complete: !isCompleted
                })
                .eq('id', todo.id)
                .single()
            if (error) {
                throw new Error(error)
            }
            setIsCompleted(data.is_complete)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <li
            onClick={(e) => {
            e.preventDefault();
            toggle();
        }}
            className="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="text-sm leading-5 font-medium truncate">{todo.task}</div>
                </div>
                <div>
                    <input
                        className="cursor-pointer"
                        onChange={(e) => toggle()}
                        type="checkbox"
                        checked={isCompleted
                        ? true
                        : false}/>
                </div>
                <button
                    onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                }}
                    className="w-4 h-4 ml-2 border-2 hover:border-black rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </li>
    )
}

const Alert = ({text} : any) => (
    <div className="rounded-md bg-red-100 p-4 my-3">
        <div className="text-sm leading-5 text-red-700">{text}</div>
    </div>
)

export default function FormWizard({
    theme,
    user
} : any) {

    const [page,
        setPage] = useState(0);
    const [completed,
        setCompleted] = useState(false);
    const [formDataId,
            setFormDataId] = useState("");
    const [formData,
        setFormData] = useState([] as any[]);
    const [newTaskText,
        setNewTaskText] = useState('');
    const [errorText,
        setError] = useState('');

    let formDataValues;
    useEffect(() => {
        //addTodo("Hunz");
        fetchFormData();
    }, []);
    const currentValidationSchema = validationSchemas[page];
    const formMethods = useForm({resolver: yupResolver(currentValidationSchema), values:formData, mode: 'all'});
    const {errors, isValid} = formMethods.formState;      


    const fetchFormData = async() => {
        const {data: formData, error} : any = await supabase
            .from('formData')
            .select('id, fieldData')
            .order('id', {ascending: true})
            .single();
        const fieldData = formData?.fieldData;
        console.log('formData: ' + JSON.stringify(fieldData));
        if (error) 
            console.log('error', error)
        else 
            setFormData(JSON.parse(fieldData) as any)
            setFormDataId(formData?.id as any)
        return formData;
    };

    const addTodo = async(name : any) => {
        const firstName = name.trim();
        if (firstName.length) {
            const {data: todo, error} : any = await supabase
                .from('formData')
                .insert({firstName})
                .single();
            if (error) 
                setError(error.message)
            else 
                setFormData([...formData,todo]);
        }
    }

    const updateData = async (tableName: string, id:string, dataRecord:any)  => {
        try {
          const { data:formData, error } = await supabase
            .from("formData")
            .update({ ...dataRecord })
            .eq('id', id)
            .single();
          if (error) {
            throw error;
          } else {
            const fieldData = formData?.fieldData;
            //setFormData(fieldData as any)
          }
          //setIsCompleted(data.is_complete)
        } catch (error) {
          console.log('error', error);
        }
    };

    const deleteTodo = async(id : any) => {
        try {
            await supabase
                .from('formData')
                .delete()
                .eq('id', id);
            setFormData(formData.filter((x : any) => x.id != id))
        } catch (error) {
            console.log('error', error)
        }
    }

    const onSubmit = (data : any) => {
        // display form data on success setCompleted(true);
        console.log("FormData: " + formData);
        const fieldData = data;
        updateData("", formDataId, { "fieldData": JSON.stringify(data, null, 4) });
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    function handleReadData(e : any) {
        //e.preventDefault();
    }

    function onInvalid(data : any) {
        // display form data on success
        formMethods.trigger();
    }
    /** Nnavigation between steps */
    const rightArrow = "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updated" +
            "At=1634410703345";
    const leftArrow = "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updated" +
            "At=1634410703363";
    const fieldGroups = ["Step One", "Step Two", "Step Three", "Confirm"];
    
    function isLastStep() {
        return page === fieldGroups.length - 1;
    }

    const handleSave = (e : any) => {
        if (isLastStep()) {
            //formMethods.handleSubmit(onSubmit, onInvalid);
            setCompleted(true);
        } else {
            handleNext(e);
        }
    };

    const handleNext = async(e : any) => {
        if (isLastStep()) {
            setCompleted(true);
        }
        //handleReadData(e);
        const isStepValid = await formMethods.trigger();
        if (isStepValid) {
            setPage((prevActiveStep) => prevActiveStep + 1);
        }
    };
    
    const handleBack = () => {
        setPage((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setPage(0);
        formMethods.reset();
    };

    function handleOnClick(e : any) {
        formMethods.handleSubmit(onSubmit, onInvalid);
        setPage(page + 1);
    }
    
    const eventHandlerFunctions = {handleNext, handleBack, handleSave};

    return (
        <> 
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <div className='flex flex-col justify-between min-w-[500px] min-h-[200px]'>
            <div className="card m-3">
                <div>
                    <p className="card-header">Registration wizard</p>
                </div>
                <div className="card-body"></div>
                <ThemeProvider theme={theme}>
                    <Stepper activeStep={page}>
                        {(fieldGroups || []).map((label : any, index : any) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <FormProvider { ...formMethods }>
                        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                            <PageDisplay completed={completed} page={page} formMethods={formMethods}/>
                            <Navigation eventHandler={eventHandlerFunctions} isValid={isValid} page={page} fieldGroups={fieldGroups}/>
                        </form>
                    </FormProvider>
                </ThemeProvider>
            </div>
        </div>
    </Box> 
    </>
)
}