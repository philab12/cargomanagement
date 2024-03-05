import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectSecurityQuestionById, useAddNewSecurityQuestionMutation, useUpdateSecurityQuestionMutation } from './securityQuestionApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';


// const URL = "/security-question";

export default function SecurityQuestionForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_security_question = useSelector((state) => selectSecurityQuestionById(state, selectIdd))

  const [addNewSecurityQuestion, {isLoading}] = useAddNewSecurityQuestionMutation();
  const [updateSecurityQuestion, {isLoading:updateLoading}] = useUpdateSecurityQuestionMutation();

//   const performEditSecurityQuestion = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }

// //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.SECURITYQUESTIONMODAL){
//       formik.values.security_question = data?.data?.security_question;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-securityQuestionEdit','get-security-question',isEdit.id,performEditSecurityQuestion,onSuccessView, onErrorView);


// const performInSecurityQuestion = (security_question_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, security_question_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, security_question_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }



// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-security-question', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Security Question Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-security-question"]);
//   successNotification("Security Question Updated Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   setIsEdit({isEdit:false, page:"", id:""})
//   handleCloseModal();


// }

   
// }



// const onError = (error) => {
 
//   // console.log("errrrr",error)
//    errorNotification(error.response.data.message)

//   }


//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInSecurityQuestion, onSuccess, onError);


  const formik = useFormik({
      initialValues: {
        security_question: selectPagee === MODALNAMES.SECURITYQUESTIONMODAL ? view_security_question?.security_question : "",
        is_active: selectPagee === MODALNAMES.SECURITYQUESTIONMODAL ? view_security_question?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)
         values.is_active = values.is_active === true ? "YES" : "NO";


         if(selectPagee === MODALNAMES.SECURITYQUESTIONMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateSecurityQuestion(values).unwrap()
            successNotification("Security Question Updated Successfully");
            handleCloseModal();
           }catch(error){
            console.log(error)
            if(Array.isArray(error?.data.message))
            {
             errorNotification(error?.data.message[0])
            }else{
              errorNotification(error?.data.message)
            }
           }

         

         } else {

          try{
            await addNewSecurityQuestion(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Security Question Added Successfully");

          }catch(error){

            if(Array.isArray(error?.data.message))
            {
            errorNotification(error?.data.message)
            }else{
              errorNotification(error?.data.message)
            }



          }

        }

         
      },
      validationSchema: Yup.object({
        security_question: Yup.string().required("Scurity Question is required")
      })
  });

  return (
    <>
    
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="security_question" value="Security Question" />
            </div>
            <TextInput 
              id="security_question"              
              name="security_question" 
              type="text" 
              placeholder="Security Question" 
              required 
              value={formik.values.security_question} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.security_question && formik.touched.security_question && formik.errors.security_question}</div>
          </div>
          <div className='flex w-full gap-5 items-start justify-normal'>
            <div className='w-1/12'>
              <div className="mb-2 block">
                <Label htmlFor="is_active" value="Is Active?" />
              </div>
              <Checkbox 
                id="is_active"
                name="is_active"
                checked={formik.values.is_active} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.values.is_active}
              <div className="error">{formik.errors.is_active && formik.touched.is_active && formik.errors.is_active}</div>
            </div>
          </div>
          <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
