import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectAllCourierCategorys, selectCourierCategoryById, useAddNewCourierCategoryMutation, useUpdateCourierCategoryMutation } from './courierCategoryApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';
import { selectAllCourierTypes } from '../courierType/courierTypeApiSlice';

const URL = "/courier-cate";
const COURIERTYPEURL = "/courier-type/allCourierType";

export default function CourierCategoryForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_courier_cate = useSelector((state) => selectCourierCategoryById(state, selectIdd))
  const data_courier_type = useSelector(selectAllCourierTypes);

  const [addNewCourierCategory, {isLoading}] = useAddNewCourierCategoryMutation();
  const [updateCourierCategory, {isLoading:updateLoading}] = useUpdateCourierCategoryMutation();

  //Get Courier Type Combo/Select Box
//   const performGetCourierType = (id) => {
//     return axiosPrivate.get(`${COURIERTYPEURL}`);
//   }


//   const onSuccessCourierType = () => {}
//   const onErrorCourierType = () => {}
//  const {data:data_courier_type} = useQueryData("combo-courier-type",performGetCourierType,onSuccessCourierType, onErrorCourierType)

// //Info For Editing Courier Cate
//   const performEditCourierCate = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }

  

//   //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.COURIERCATEMODAL){
//       formik.values.courier_type_id = data?.data?.courier_type_id;
//       formik.values.courier_cate = data?.data?.courier_cate;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };

// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-courierCateEdit','get-courier-cate',isEdit.id,performEditCourierCate,onSuccessView, onErrorView);


// const performInCourierCate = (courier_cate_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, courier_cate_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, courier_cate_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }





// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-courier-cate', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Courier Category Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-courier-cate"]);
//   successNotification("Courier Category Updated Successfully");

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



//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInCourierCate, onSuccess, onError);



  const formik = useFormik({
      initialValues: {
        courier_type_id:  selectPagee === MODALNAMES.COURIERCATEMODAL ? view_courier_cate?.courier_type_id : "",
        courier_cate: selectPagee === MODALNAMES.COURIERCATEMODAL ? view_courier_cate?.courier_cate : "",
        is_active: selectPagee === MODALNAMES.COURIERCATEMODAL ? view_courier_cate?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)

         values.is_active = values.is_active === true ? "YES" : "NO";
         if(selectPagee === MODALNAMES.COURIERCATEMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateCourierCategory(values).unwrap()
            successNotification("Courier Category Updated Successfully");
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
            await addNewCourierCategory(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Courier Category Added Successfully");

          }catch(error){

            errorNotification(error?.data.message)


          }

        }

      },
      validationSchema: Yup.object({
        courier_type_id: Yup.string().required("Type is required"),
        courier_cate: Yup.string().required("Category Name is required")
      })
  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="courier_type_id" value="Category Type" />
                </div>
                <Select 
                  id="courier_type_id" 
                  name="courier_type_id" 
                  required
                  value={formik.values.courier_type_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Choose a Type --</option>
                  {
                      data_courier_type?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.courier_type}</option>
                      })
                  }
                </Select> 
                <div className="error">{formik.errors.courier_type_id && formik.touched.courier_type_id && formik.errors.courier_type_id}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="courier_cate" value="Category Name" />
                </div>
                <TextInput 
                  id="courier_cate" 
                  name="courier_cate" 
                  type="text" 
                  placeholder="Category Name" 
                  required 
                  value={formik.values.courier_cate} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.courier_cate && formik.touched.courier_cate && formik.errors.courier_cate}</div>
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
