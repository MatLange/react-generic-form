import StepOne from "./formSteps/StepOne";
import StepThree from "./formSteps/StepThree";
import StepTwo from "./formSteps/StepTwo";
import WizardResult from "./formSteps/WizardResult";

const PageDisplay = ({completed, page, formMethods}:any) => {
  if (completed === true) {}

  if (page === 0) {
      return <StepOne control={formMethods.control} register={formMethods.register}/>;
  } else if (page === 1) {
      return <StepTwo control={formMethods.control} register={formMethods.register}/>;
  } else if (page === 2) {
      return <StepThree control={formMethods.control} register={formMethods.register}/>;
  } else if (page === 3) {
      return <WizardResult {...formMethods}/>;
  }
};
export default PageDisplay;
