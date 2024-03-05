import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
// import { useMutationInitialInsert, useSingleData  } from "../../hooks/useQueryy";
// import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectCourierTypeById, useAddNewCourierTypeMutation, useUpdateCourierTypeMutation } from './courierTypeApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';



export default function CourierTypeForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_courier_type = useSelector((state) => selectCourierTypeById(state, selectIdd))

  const [addNewCourierType, {isLoading}] = useAddNewCourierTypeMutation();
  const [updateCourierType, {isLoading:updateLoading}] = useUpdateCourierTypeMutation();


//   const performEditCourierType = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }

// //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.COURIERTYPEMODAL){
//       formik.values.courier_type = data?.data?.courier_type;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-courierTypeEdit','get-courier-type',isEdit.id,performEditCourierType,onSuccessView, onErrorView);


// const performInCourierType = (courier_type_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, courier_type_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, courier_type_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }



// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-courier-type', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Courier Type Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-courier-type"]);
//   successNotification("Courier Type Updated Successfully");

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


//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInCourierType, onSuccess, onError);


  const formik = useFormik({
      initialValues: {
        courier_type: selectPagee === MODALNAMES.COURIERTYPEMODAL ? view_courier_type?.courier_type : "",
        is_active: selectPagee === MODALNAMES.COURIERTYPEMODAL ? view_courier_type?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)

         values.is_active = values.is_active === true ? "YES" : "NO";
         if(selectPagee === MODALNAMES.COURIERTYPEMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateCourierType(values).unwrap()
            successNotification("Courier Type Updated Successfully");
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
            await addNewCourierType(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Courier Type Added Successfully");

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
        courier_type: Yup.string().required("Type Name is required")
      })
  });

  return (
    <>
  
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="courier_type" value="Type" />
            </div>
            <TextInput 
              id="courier_type"              
              name="courier_type" 
              type="text" 
              placeholder="Type" 
              required 
              value={formik.values.courier_type} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.courier_type && formik.touched.courier_type && formik.errors.courier_type}</div>
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
