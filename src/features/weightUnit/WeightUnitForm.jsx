import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectWeightUnitById, useAddNewWeightUnitMutation, useUpdateWeightUnitMutation } from './weightUnitApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';


// const URL = "/unit-type";

export default function WeightUnitForm({handleCloseModal}) {
  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_weight_unit = useSelector((state) => selectWeightUnitById(state, selectIdd))

  const [addNewWeightUnit, {isLoading}] = useAddNewWeightUnitMutation();
  const [updateWeightUnit, {isLoading:updateLoading}] = useUpdateWeightUnitMutation();


//   const performEditWeightUnit = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }



//   //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.WEIGHTUNITMODAL){
//       formik.values.unit_type = data?.data?.unit_type;
//       formik.values.alias = data?.data?.alias;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-weightUnitEdit','get-weight-unit',isEdit.id,performEditWeightUnit,onSuccessView, onErrorView);



// const performInWeightUnit = (weight_unit_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, weight_unit_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, weight_unit_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }




// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-weight-unit', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Weight Unit Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-weight-unit"]);
//   successNotification("Weight Unit Updated Successfully");

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


//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInWeightUnit, onSuccess, onError);






  const formik = useFormik({
      initialValues: {
        unit_type: selectPagee === MODALNAMES.WEIGHTUNITMODAL ? view_weight_unit?.unit_type : "",
        alias: selectPagee === MODALNAMES.WEIGHTUNITMODAL ? view_weight_unit?.alias : "",
        is_active: selectPagee === MODALNAMES.WEIGHTUNITMODAL ? view_weight_unit?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)

         values.is_active = values.is_active === true ? "YES" : "NO";

         if(selectPagee === MODALNAMES.WEIGHTUNITMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateWeightUnit(values).unwrap()
            successNotification("Weight Unit Updated Successfully");
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
            await addNewWeightUnit(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Weight Unit Added Successfully");

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
        unit_type: Yup.string().required("Weight Unit is required"),
        alias: Yup.string().required("Alias is required")
      })
  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-center justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="unit_type" value="Weight Unit" />
                </div>
                <TextInput 
                  id="unit_type" 
                  name="unit_type" 
                  type="text" 
                  placeholder="Weight Unit" 
                  required 
                  value={formik.values.unit_type} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.unit_type && formik.touched.unit_type && formik.errors.unit_type}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="alias" value="Alias" />
                </div>
                <TextInput 
                  id="alias" 
                  name="alias" 
                  type="text" 
                  placeholder="Alias" 
                  required 
                  value={formik.values.alias} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.alias && formik.touched.alias && formik.errors.alias}</div>
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
