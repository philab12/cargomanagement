import { Form, Formik } from 'formik'
// import { Form, Formik, FormikConfig, FormikHelpers, FormikValues } from 'formik'
import React, { useState } from 'react'
import FormNavigation from './FormNavigation';
import { Step, StepLabel, Stepper } from '@mui/material';

// interface Props extends FormikConfig<FormikValues> {
//     children: React.ReactNode
// }

const MultiStepForm = ({
    children, initialValues, onSubmit
}) => {

    const [stepNumber, setStepNumber] = useState(0);
    const steps = React.Children.toArray(children);

    const [snapShot, setSnapshot] = useState(initialValues);

    const step = steps[stepNumber];
    const totalSteps = steps.length;
    const isLastStep = stepNumber === totalSteps - 1;

    const next = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber + 1);
    }

    const previous = (values) => {
        setSnapshot(values);
        setStepNumber(stepNumber - 1);
    }

    const handleSubmit = (values, actions) => {
        if (step.props.onSubmit) {
             step.props.onSubmit(values)
        }

        if (isLastStep) {
            return onSubmit(values, actions)
        } else {
            actions.setTouched({})
            next(values)
        }
    }

    return (
        <div>
            <Formik initialValues={snapShot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
                {
                    formik => <Form>
                        <Stepper activeStep={stepNumber}>
                            {steps.map(currentStep => { 
                                const label = currentStep.props.stepName; 
                                return <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step> 
                                })}
                        </Stepper>
                        {step}

                        <FormNavigation isLastStep={isLastStep} hasPrevious={stepNumber > 0} onBackClick={() => previous(formik.values)} />
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }) => children