import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Navigation from "../components/Navigation";
import PageDisplay from "../components/PageDisplay";
import {supabase} from "../datahandling/databasehandling";
import {Step, StepLabel, Stepper, ThemeProvider} from "@material-ui/core";

const Todo = ({todo, onDelete} : any) => {
    const [isCompleted,
        setIsCompleted] = useState(todo.is_complete)

    const toggle = async() => {
        try {
            const {data, error} : any = await supabase
                .from('todos')
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

function onSubmit(data : any) {
    // display form data on success setCompleted(true);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));

    return false;
}
export default function FormWizard({
    formdata,
    isValid,
    completed,
    formMethods,
    fieldGroups,
    theme,
    page,
    user
} : any) {
    const [todos,
        setTodos] = useState([]);
    const [newTaskText,
        setNewTaskText] = useState('');
    const [errorText,
        setError] = useState('');

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = async() => {
        const {data: todos, error} : any = await supabase
            .from('todos')
            .select('*')
            .order('id', {ascending: true});
        (todos || []).forEach((todo : any) => (console.log('data ' + todo.task)))

        if (error) 
            console.log('error', error)
        else 
            setTodos(todos)
    }
    const addTodo = async(taskText : any) => {
        const task = taskText.trim();
        if (task.length) {
            const {data: todo, error} : any = await supabase
                .from('todos')
                .insert({task, user_id: user.id})
                .single();
            if (error) 
                setError(error.message)
            else 
                setTodos([
                    ...todos,
                    todo
                ])
        }
    }

    const deleteTodo = async(id : any) => {
        try {
            await supabase
                .from('todos')
                .delete()
                .eq('id', id);
            setTodos(todos.filter((x : any) => x.id != id))
        } catch (error) {
            console.log('error', error)
        }
    }
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
                            <Navigation isValid={isValid} page={page} fieldGroups={fieldGroups}/>
                        </form>
                    </FormProvider>
                </ThemeProvider>
            </div>
        </div>
    </Box> 
    </>
)
}