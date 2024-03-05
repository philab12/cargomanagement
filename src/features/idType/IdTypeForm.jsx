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
import { selectIdTypeById, useAddNewIdTypeMutation, useUpdateIdTypeMutation } from "./idTypeApiSlice";
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';


export default function IdTypeForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_id_type = useSelector((state) => selectIdTypeById(state, selectIdd))


  const [addNewIdType, {isLoading}] = useAddNewIdTypeMutation();
  const [updateIdType, {isLoading:updateLoading}] = useUpdateIdTypeMutation();

  //get single idType
  // const idTypeData = useSelector(state => selectIdTypeById(state,id))

  // if(isEdit && selectPagee === MODALNAMES.IDTYPEMODAL){
  //   formik.values.id_type = view_id_type?.id_type;
  //   formik.values.is_active = view_id_type?.is_active === "YES" ? true : false;
  // } 


// //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.IDTYPEMODAL){
//       formik.values.id_type = data?.data?.id_type;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-idTypeEdit','get-id-type',isEdit.id,performEditIdType,onSuccessView, onErrorView);


// const performInIdType = (id_type_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, id_type_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, id_type_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }



// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-id-type', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Id Type Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-id-type"]);
//   successNotification("Id Type Updated Successfully");

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


//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInIdType, onSuccess, onError);


  const formik = useFormik({
      initialValues: {
        id_type: selectPagee === MODALNAMES.IDTYPEMODAL ? view_id_type?.id_type : "",
        is_active: selectPagee === MODALNAMES.IDTYPEMODAL ? view_id_type?.is_active === "YES" ? true : false : true,
      },
      onSubmit: async (values, onSubmitProps) => {

         // console.log('onSubmit', values)
         values.is_active = values.is_active === true ? "YES" : "NO";


         if(selectPagee === MODALNAMES.IDTYPEMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateIdType(values).unwrap()
            successNotification("Id Type Updated Successfully");
            handleCloseModal();
           }catch(error){
             errorNotification(error?.data.message)
           }

         

         } else {

          try{
            await addNewIdType(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Id Type Added Successfully");

          }catch(error){

            errorNotification(error?.data.message)


          }


         }

      },
      validationSchema: Yup.object({
        id_type: Yup.string().required("Id Type is required")
      })
  });

  return (
    <>
    <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <div className="mb-2 block">
              <Label htmlFor="id_type" value="ID Type" />
            </div>
            <TextInput 
              id="id_type"              
              name="id_type" 
              type="text" 
              placeholder="ID Type" 
              required 
              value={formik.values.id_type} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.id_type && formik.touched.id_type && formik.errors.id_type}</div>
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
