import Box from "@mui/material/Box";

type GivenValueProps = {
  givenValue: string
}

const GivenValue = ({ givenValue }: GivenValueProps) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500'>
      {givenValue}
    </span>
  )
}
const WizardResult = (props: any ) => {
  const { getValues } = props; 
  const nameAndTitle = getValues("firstName") + " " + getValues("lastName") + " ";

  return (
    <Box flexDirection="column"
                  display="flex"
                  alignItems="center" p={2}>
        <div className='flex flex-col justify-between min-w-[500px] min-h-[200px]'>
          <div className='flex flex-col gap-2'>
            <p className='text-xl'>
              Hello{" "}
              {nameAndTitle.length !== 0 ? (
                <GivenValue givenValue={`, ${nameAndTitle}`} />
              ) : (
                "there"
              )}
              !
            </p>  
          </div>
        </div>
    </Box>        
  )
}

export default WizardResult
