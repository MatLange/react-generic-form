import React, { useState } from "react";
import  StepOne  from "../components/formSteps/StepOne";
import  StepTwo  from "../components/formSteps/StepTwo";
import  StepThree  from "../components/formSteps/StepThree";
import  WizardResult  from "../components/formSteps/WizardResult";
import { useRouter } from "next/router";
import { FormProvider, 
  useForm,
} from 'react-hook-form';
import { validationSchemas } from "../validations/validationSchemas";
import { dataFetcher, dataPoster, dataUpdater } from "../datahandling/datahandling";

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonProps, createMuiTheme, Paper, Step, StepLabel, Stepper,ThemeProvider } from "@material-ui/core";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import useSWR from 'swr';



const fruits = [
  { id: 1, name: "Bananas 🍌" },
  { id: 2, name: "Strawberries 🍓" },
  { id: 3, name: "Kiwis 🥝" },
  { id: 4, name: "Blueberries 🫐" },
  { id: 5, name: "Watermelon 🍉" },
]

const FormTitles = ["Sign Up", "Personal Info", "Other"];
const fetcher = (url:string) => fetch(url).then((res) => res.json());

const Home = () => {
  const router = useRouter();
  const formStep = router.query.step ?? 0;
  const { data, error } = useSWR('/api/hello', dataFetcher);
  const d = data;
  //alert((data as any)?.toString());  

  // get functions to build form with useForm() hook
  const goToStep = (step : any, asPath:string) => {
    router.push(`/?step=${step}`, asPath);
  };

  function handleReadData(e:any) {
    // e.preventDefault();
    const newItem = {
      "id": 8222,
      "uid": "a15c1f1d-9e4e-4dc7-9c45-c04412fc5064",
      "name": "Nuxt.js",
      "language": "JavaScript",
    };
    // ToDo: Remove tests
    // Only for testing purposes: Create item 
    dataPoster("/api/hello", JSON.stringify(newItem)).then((data:any) => {
      console.log(data);
      // Only for testing purposes: update item 
      const uid = data?.uid;
      data.name = "Nixt.js";
      // ToDo: updateItem needs to be corrected
      dataUpdater("/api/hello", JSON.stringify(data)).then((data:any) => {
        console.log(data);
      });
    });
  }


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logo: formData.logo,
          title: formData.title,
          standard: formData.standard,
          twitter: formData.twitter,
          discord: formData.discord,
          telegram: formData.telegram,
          userId: session?.user?.email, // We're assuming you are storing user in your component's state
        }),
      });

      if (response.ok) {
        console.log("form successfully submitted");
        // Handle success - maybe show a notification or redirect the user
      } else {
        console.log("submission failed");
        // Handle error - show a notification or handle error
      }
    } catch (error) {
      return error;
    }
  };

  const [page, setPage] = useState(0);
  const [completed, setCompleted] = useState(false);


  const currentValidationSchema = validationSchemas[page];  
  //const { register, handleSubmit, reset, trigger, control, formState } = useForm({...currentValidationSchema, mode: 'all'});
  const formMethods = useForm({resolver: yupResolver(currentValidationSchema), mode: 'all'});

/*   const formMethods = useForm({
    shouldUnregister: false,
    defaultValues,
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange"
  });  
 */  const { errors, isValid } = formMethods.formState;



  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
  });

  function onSubmit(data:any) {
    // display form data on success
    //setCompleted(true);

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    
    return false;
  }    

  function onInvalid(data:any) {
    // display form data on success
    formMethods.trigger();
  }    
  /** Nnavigation between steps */
  const rightArrow = "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/next-arrow_1pmaQTqF3.svg?updatedAt=1634410703345"
  const leftArrow  = "https://ik.imagekit.io/lrjseyuxi3m/youtube/Form/back-arrow_ZBmeHiBP3.svg?updatedAt=1634410703363"
  const fieldGroups =[
    "Step One",
    "Step Two",
    "Step Three",
    "Confirm",
  ]  

  function isLastStep() {
    return page === fieldGroups.length - 1;
  }

  const handleSave = async (e:any) => {
    if (isLastStep()) {
      await formMethods.handleSubmit(onSubmit, onInvalid);
      setCompleted(true);
    } else {
      await handleNext(e);
    }
  };

  const handleNext = async (e:any) => {
    if (isLastStep()) {
      setCompleted(true);
    }
    handleReadData(e);
    const isStepValid = await formMethods.trigger();
    if (isStepValid) setPage((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setPage((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setPage(0);
    formMethods.reset();
  };


  function handleOnClick (e:any) {
    formMethods.handleSubmit(onSubmit, onInvalid);
    setPage(page + 1);
  }

 const SaveButton = (props:ButtonProps) => {
  return <Button
  {...props}
  color="primary" 
  variant="contained" 
  type="button" onClick={handleNext}>
  SAVE
  </Button>
};

const NextButton = (props:ButtonProps) => {
return <Button 
{...props}
color="primary" 
variant="contained"            
type="button" onClick={handleNext}>
  NEXT
</Button>  
};

const BackButton = (props:ButtonProps) => {
  return       <Button 
  {...props}
  color="primary" 
  variant="contained"     
  type="button" onClick={handleBack}>
    BACK
  </Button>
  }; 

  const Navigation = () => {
    const isValidisValid = isValid;
    if (page  === fieldGroups.length-1) {     
      return  <Box
      display="flex"
      justifyContent="space-around"
      style={{ paddingTop: "5vh" }}
    >
              <BackButton />
              <SaveButton/>
            </Box>
    }
    else if (page  < fieldGroups.length-1 && page  > 0) {     
      return  <Box
      display="flex"
      justifyContent="space-around"
      style={{ paddingTop: "5vh" }}
    >
              <BackButton />
              <NextButton/>
            </Box>
    }
    else if (page  === 0 ) {
        return                 <Box
                  display="flex"
                  justifyContent="space-around"
                  style={{ paddingTop: "5vh" }}
                >
        <BackButton disabled={true}/>
        <NextButton/>
      </Box>
    }
  };

  const PageDisplay = () => {
    if (completed === true) {
    }

    if (page === 0) {
      return <StepOne control={formMethods.control} register={formMethods.register} />;        
    } else if (page === 1) {
      return <StepTwo control={formMethods.control} register={formMethods.register} />;             
    } else if (page === 2) {
      return <StepThree control={formMethods.control} register={formMethods.register} />;          
    } else if (page === 3) { 
      return <WizardResult {...formMethods} />;             
    }    
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
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
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
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  }
}));

//const classes = useStyles();
if (error) return <div>Failed to load</div>;
//Handle the loading state
if (!data) return <div>Loading...</div>;

console.log(data);
  return (
<>
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >       
<div className='flex flex-col justify-between min-w-[500px] min-h-[200px]'>
      <div className="card m-3">
      <h5 className="card-header">Registration wizard</h5>
        <div className="card-body"></div>  
  <ThemeProvider theme={theme}>
        <Stepper activeStep={page}>
          {fieldGroups.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>    
          <FormProvider {...formMethods}>        
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <PageDisplay />
              <Navigation/>          
            </form>
          </FormProvider>          
          </ThemeProvider>          
          </div>
      </div>    
          </Box>          
        </>
  )
}

export default Home;