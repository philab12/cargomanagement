import { Button } from '@mui/material';
// import { FormikValues } from 'formik';
import React from 'react'

// interface Props  {
//     hasPrevious?: boolean;
//     onBackClick: (values: FormikValues) => void;
//     isLastStep: boolean;
// }

function FormNavigation(props) {
  return (
    <div className='flex mt-[50px] justify-between'>
        {
            props.hasPrevious && <Button variant="contained" type="button" onClick={props.onBackClick}>Back</Button>
        }
        <Button type='submit' variant='contained'  color='primary'>{props.isLastStep ? 'Submit' : 'Next'}</Button>
    </div>
  )
}

export default FormNavigation