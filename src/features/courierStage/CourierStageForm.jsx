import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Modal, Checkbox, Label, TextInput } from 'flowbite-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectCourierStageById, useAddNewCourierStageMutation, useUpdateCourierStageMutation } from './courierStageApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';


// const URL = "/courier-send-stages-setup";

export default function CourierStageForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_stage_type = useSelector((state) => selectCourierStageById(state, selectIdd))

  const [addNewCourierStage, {isLoading}] = useAddNewCourierStageMutation();
  const [updateCourierStage, {isLoading:updateLoading}] = useUpdateCourierStageMutation();

  // const performEditCourierStage = (id) => {
  //   return axiosPrivate.get(`${URL}/${id}`);
  // }



  //   //View Info For Editing
  //   const onSuccessView = (data) => {
  //     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.COURIERSTAGEMODAL){
  //       formik.values.stage = data?.data?.stage;
  //       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
  //     }
  //     //console.log(data)
  // };
  // const onErrorView = (error) => {
  //    // console.log("error",error);
  //    // navigate("/login", {state: {from: location}, replace:true})
  // };



  // const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-courierStageEdit','get-courier-stage',isEdit.id,performEditCourierStage,onSuccessView, onErrorView);
  


  // const performInCourierStage = (courier_stage_data) => {
  //   if(isEdit.isEdit === false){
  //   return axiosPrivate.post(URL, courier_stage_data, {
  //     headers: {'Content-Type': "application/json"},
  //     withCredentials: true
  //   });
  // } else {
  
  //   return axiosPrivate.patch(`${URL}/${isEdit.id}`, courier_stage_data, {
  //     headers: {'Content-Type': "application/json"},
  //     withCredentials: true
  //   });
  
  // }
  // }




  // const onSuccess = (data, variables) => {
  //   if(isEdit.isEdit === false){
  
  //   queryClient.setQueryData('get-courier-stage', (oldQueryData) => {
  //     return {
  //      ...oldQueryData,
  //      data: [data.data, ...oldQueryData.data]
  //     }
    
  //   })
  
  
  //   successNotification("Courier Stage Added Successfully");
  
  //   formik.isSubmitting = false;
  //   formik.setSubmitting = false;
  //   formik.resetForm();
  
  // } else {
  
  //   queryClient.invalidateQueries(["get-courier-stage"]);
  //   successNotification("Courier Stage Updated Successfully");
  
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
  
  
  //   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInCourierStage, onSuccess, onError);

  
  const formik = useFormik({
      initialValues: {
        stage: selectPagee === MODALNAMES.COURIERSTAGEMODAL ? view_stage_type?.stage : "",
        is_active: selectPagee === MODALNAMES.COURIERSTAGEMODAL ? view_stage_type?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)
         values.is_active = values.is_active === true ? "YES" : "NO";
         if(selectPagee === MODALNAMES.COURIERSTAGEMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateCourierStage(values).unwrap()
            successNotification("Courier Stage Updated Successfully");
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
            await addNewCourierStage(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Courier Stage Added Successfully");

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
        stage: Yup.string().required("Stage is required")
      })
  });

  return (
    <>

<form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
<h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="stage" value="Category Stage" />
                </div>
                <TextInput 
                  id="stage" 
                  name="stage" 
                  type="text" 
                  placeholder="Category Stage" 
                  required 
                  value={formik.values.stage} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.stage && formik.touched.stage && formik.errors.stage}</div>
            </div>
          </div>
          <div className='flex w-full gap-5 items-center justify-normal'>
            <div className='w-1/12'>
              <div className="mb-2 block">
                <Label htmlFor="is_active" value="Active?" />
              </div>
              <Checkbox 
                id='is_active' 
                name='is_active' 
                checked={formik.values.is_active} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.is_active && formik.touched.is_active && formik.errors.is_active}</div>
            </div>
          </div>
          <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>


          </>
  );
}
