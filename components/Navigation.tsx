import Box from "@mui/material/Box";
import {
    Button,
    ButtonProps,
} from "@material-ui/core";

export type EventProps = {
    handleNext?: any;
    handleBack?: any;
    handleSave?: any;
  };
export type EventHandlerProps = {
    eventhandler?: EventProps;
  };

const SaveButton = (props : ButtonProps & EventHandlerProps) => {
     return <Button
        {...props}
        color="primary"
        variant="contained"
        type="submit"
>
        SAVE
    </Button>
};

const NextButton = (props : ButtonProps & EventHandlerProps) => {
    return <Button
        {...props}
        color="primary"
        variant="contained"
        type="button"
        onClick={(event) => props?.eventhandler?.handleNext(event)}>
        NEXT
    </Button>
};

const BackButton = (props : ButtonProps & EventHandlerProps) => {
    return <Button
        {...props}
        color="primary"
        variant="contained"
        type="button"
        onClick={(event) => props?.eventhandler?.handleBack(event)}>
        BACK
    </Button>
};

const Navigation = ({isValid, page, fieldGroups, eventHandler}:any) => {
    const isValidisValid = isValid;
    if (page === fieldGroups.length - 1) {
        return <Box
            display="flex"
            justifyContent="space-around"
            style={{
            paddingTop: "5vh"
        }}>
            <BackButton eventhandler={eventHandler} />
            <SaveButton eventhandler={eventHandler} />
        </Box>
    } else if (page < fieldGroups.length - 1 && page > 0) {
        return <Box
            display="flex"
            justifyContent="space-around"
            style={{
            paddingTop: "5vh"
        }}>
            <BackButton eventhandler={eventHandler} />
            <NextButton eventhandler={eventHandler} />
        </Box>
    } else if (page === 0) {
        return <Box
            display="flex"
            justifyContent="space-around"
            style={{
            paddingTop: "5vh"
        }}>
            <BackButton eventhandler={eventHandler}  disabled={true}/>
            <NextButton eventhandler={eventHandler} />
        </Box>
    }
};
export default Navigation;
