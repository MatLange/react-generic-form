import React, {useEffect, useState} from "react";
import StepOne from "../components/formSteps/StepOne";
import StepTwo from "../components/formSteps/StepTwo";
import StepThree from "../components/formSteps/StepThree";
import WizardResult from "../components/formSteps/WizardResult";
import TodoList from "./FormWizard";
import {useRouter} from "next/router";
import {FormProvider, useForm} from "react-hook-form";
import {validationSchemas} from "../validations/validationSchemas";
import {
    addData,
    dataFetcher,
    dataPoster,
    dataUpdater,
    deleteData,
    fetchData,
    updateData
} from "../datahandling/datahandling";

import {yupResolver} from "@hookform/resolvers/yup";
import {
    Button,
    ButtonProps,
    createMuiTheme,
    Paper,
    Step,
    StepLabel,
    Stepper,
    ThemeProvider
} from "@material-ui/core";
import Box from "@mui/material/Box";
import {makeStyles} from "@material-ui/core";
import {supabase} from "../datahandling/databasehandling";
import {Auth} from "@supabase/ui";
import useSWR from "swr";
import { useUser } from "../context/user";

const fruits = [
    {
        id: 1,
        name: "Bananas 🍌"
    }, {
        id: 2,
        name: "Strawberries 🍓"
    }, {
        id: 3,
        name: "Kiwis 🥝"
    }, {
        id: 4,
        name: "Blueberries 🫐"
    }, {
        id: 5,
        name: "Watermelon 🍉"
    }
]

const FormTitles = ["Sign Up", "Personal Info", "Other"];
const fetcher = (url : string) => fetch(url).then((res) => res.json());

//export async function getServerSideProps({ params }:any) {
/* export async function getStaticProps() {
    const newRecord = {
        "task": "Clean staircase",
        //"user_id": user.id,
        //"inserted_at": new Date().getTime(),
      };    

      const { newData:data } = await addData("todos", {...newRecord});
      const { data:todos } = await fetchData("todos", "*");
      const formData = todos;
    //const { data } = await supabase.from(tableName).select(columnNames).eq("user_id", userId);
    //    const updateRecord = data[0] || undefined;
    //     if (updateRecord) {
    //       updateRecord.task = "Mess up living room";
    //     }
    //      updateData("todos", updateRecord).then((update : any) => {
    //           const upd = update;
    //     }); 
        
    //     const newRecord = {
    //       "task": "Clean staircase",
    //       "user_id": user.id,
    //       //"inserted_at": new Date().getTime(),
    //     };    
  
    //     addData("todos", {...newRecord}, user.id).then((newData:any) => {
    //       const d = newData;
    //     });         
    //      deleteData("todos", updateRecord.id).then((del : any) => {
    //           const d = del;
    //       }); 
    //const { data: posts, error } = await supabase.from('posts').select('*');
  
     console.log("formData: "+ formData);
    return {
      props: {
        formData,
      },
    };
  } */


const Home = ({formData}:any) => {
    const router = useRouter();

    const formStep = router.query.step ?? 0;
    // const { data, error } = useSWR('/api/hello', dataFetcher); alert((data as
    // any)?.toString()); get functions to build form with useForm() hook
    const goToStep = (step : any, asPath : string) => {
        router.push(`/?step=${step}`, asPath);
    };
    function handleReadData(e : any) {
        // e.preventDefault();
        const newItem = {
            "id": 8222,
            "uid": "a15c1f1d-9e4e-4dc7-9c45-c04412fc5064",
            "name": "Nuxt.js",
            "language": "JavaScript"
        };
        // ToDo: Remove tests Only for testing purposes: Create item
        dataPoster("/api/hello", JSON.stringify(newItem)).then((data : any) => {
            console.log(data);
            // Only for testing purposes: update item
            newItem.uid = data
                ?.item
                    ?.uid;
            newItem.name = "Nixt.js";
            // ToDo: updateItem needs to be corrected
            dataUpdater("/api/hello", JSON.stringify(newItem)).then((data : any) => {
                console.log(data);
            });
        });
    }

    const [page,
        setPage] = useState(0);
    const [completed,
        setCompleted] = useState(false);

    const currentValidationSchema = validationSchemas[page];
    // const { register, handleSubmit, reset, trigger, control, formState } =
    // useForm({...currentValidationSchema, mode: 'all'});
    
/*     const formMethods = useForm({resolver: yupResolver(currentValidationSchema), defaultValues: {
        firstName: 'Hans',
        lastName: 'Dampf'
      }, mode: 'all'});
 */
    /*   const formMethods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange"
  });
 */
    //const {errors, isValid} = formMethods.formState;

/*     const [formData,
        setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        username: "",
        nationality: "",
        other: ""
    }); */

    function onSubmit(data : any) {
        // display form data on success setCompleted(true);

        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));

        return false;
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

    const handleSave = async(e : any) => {
        if (isLastStep()) {
            await formMethods.handleSubmit(onSubmit, onInvalid);
            setCompleted(true);
        } else {
            await handleNext(e);
        }
    };

    const handleNext = async(e : any) => {
        if (isLastStep()) {
            setCompleted(true);
        }
        handleReadData(e);
        const isStepValid = await formMethods.trigger();
        if (isStepValid) 
            setPage((prevActiveStep) => prevActiveStep + 1);
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

    const AuthForm = () => {
        return ( 
          <div className="w-full h-full flex justify-center items-center p-4">
            <div>
                <Auth
                    supabaseClient={supabase}
                    providers={['google', 'github']}
                    socialLayout="horizontal"
                    socialButtonSize="xlarge"/>
            </div>
          </div>
    )
  };

    //some styling
    const theme = createMuiTheme({
        palette: {
            type: "light"
        }
    });
    const useStyles = makeStyles((theme) => ({
        layout: {
            width: "auto",
            marginLeft: theme.spacing(0.5),
            marginRight: theme.spacing(0.5),
            [
                theme
                    .breakpoints
                    .up(600 + theme.spacing(2) * 2)
            ]: {
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto"
            }
        },
        button: {
            marginRight: theme.spacing(1)
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            minHeight: "25vh"
        },
        paper: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(2),
            [
                theme
                    .breakpoints
                    .up(600 + theme.spacing(3) * 2)
            ]: {
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3)
            }
        }
    }));
    
    //const sessionUser = supabase.auth.user();
    const {user} = Auth.useUser();
    //const classes = useStyles();
    /* if (error) return <div>Failed to load</div>;
//Handle the loading state
if (!data) return <div>Loading...</div>;

console.log(data); */
    return (
        <div>
            {!user
                ? (<AuthForm/>)
                : (
                <div
                className="w-full h-full flex flex-col justify-center items-center p-4"
                style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
                >                
          <TodoList formData={formData} completed={completed} fieldGroups={fieldGroups} theme={theme} page={page} user={supabase.auth.user()} />
                 <button
                    className="btn-black w-full mt-12"
                    onClick={async () => {
                    const { error } = await supabase.auth.signOut()
                    if (error) console.log('Error logging out:', error.message)
                    }}
                >
                    Logout
                </button>
              </div>)}
        </div>
    )
}

export default Home;