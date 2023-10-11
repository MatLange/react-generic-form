import Box from "@mui/material/Box";
import {
    Button,
    ButtonProps,
} from "@material-ui/core";

const SaveButton = (props : ButtonProps) => {
    return <Button
        {...props}
        color="primary"
        variant="contained"
        type="button"
        onClick={() => console.log("")}>
        SAVE
    </Button>
};

const NextButton = (props : ButtonProps) => {
    return <Button
        {...props}
        color="primary"
        variant="contained"
        type="button"
        onClick={() => console.log("")}>
        NEXT
    </Button>
};

const BackButton = (props : ButtonProps) => {
    return <Button
        {...props}
        color="primary"
        variant="contained"
        type="button"
        onClick={() => console.log("")}>
        BACK
    </Button>
};

const Navigation = ({isValid, page, fieldGroups}:any) => {
        const isValidisValid = isValid;
        if (page === fieldGroups.length - 1) {
            return <Box
                display="flex"
                justifyContent="space-around"
                style={{
                paddingTop: "5vh"
            }}>
                <BackButton/>
                <SaveButton/>
            </Box>
        } else if (page < fieldGroups.length - 1 && page > 0) {
            return <Box
                display="flex"
                justifyContent="space-around"
                style={{
                paddingTop: "5vh"
            }}>
                <BackButton/>
                <NextButton/>
            </Box>
        } else if (page === 0) {
            return <Box
                display="flex"
                justifyContent="space-around"
                style={{
                paddingTop: "5vh"
            }}>
                <BackButton disabled={true}/>
                <NextButton/>
            </Box>
        }
};
export default Navigation;
