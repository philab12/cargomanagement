import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { phoneRegExp } from '../../globalVariables/regExpressions';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectBranchById, useAddNewBranchMutation, useUpdateBranchMutation } from './branchApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';


export default function BranchForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_branch = useSelector((state) => selectBranchById(state, selectIdd))

  const [addNewBranch, {isLoading}] = useAddNewBranchMutation();
  const [updateBranch, {isLoading:updateLoading}] = useUpdateBranchMutation();


  // const performEditBranch = (id) => {
  //   return axiosPrivate.get(`${URL}/${id}`);
  // }


  //    //View Info For Editing
  //    const onSuccessView = (data) => {
  //     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.BRANCHMODAL){
  //       formik.values.branch = data?.data?.branch;
  //       formik.values.branch_code = data?.data?.branch_code;
  //       formik.values.location = data?.data?.location;
  //       formik.values.email = data?.data?.email;
  //       formik.values.contact = data?.data?.contact;
  //       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
  //       formik.values.is_main_branch = data?.data?.is_main_branch === "YES" ? true : false;
  //     }
  //     //console.log(data)
  // };
  // const onErrorView = (error) => {
  //    // console.log("error",error);
  //    // navigate("/login", {state: {from: location}, replace:true})
  // };


  // const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-branchEdit','get-branch',isEdit.id,performEditBranch,onSuccessView, onErrorView);


  
  // const performInBranch = (courier_stage_data) => {
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
  
  //   queryClient.setQueryData('get-branch', (oldQueryData) => {
  //     return {
  //      ...oldQueryData,
  //      data: [data.data, ...oldQueryData.data]
  //     }
    
  //   })
  
  
  //   successNotification("Branch Added Successfully");
  
  //   formik.isSubmitting = false;
  //   formik.setSubmitting = false;
  //   formik.resetForm();
  
  // } else {
  
  //   queryClient.invalidateQueries(["get-branch"]);
  //   successNotification("Branch Updated Successfully");
  
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
  
  
  //   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInBranch, onSuccess, onError);


  
  const formik = useFormik({
      initialValues: {
          branch: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.branch : "",
          location: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.location : "",
          contact: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.contact : "",
          email: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.email : "",
          branch_code: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.branch_code : "",
          is_active: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.is_active === "YES" ? true : false : true,
          is_main_branch: selectPagee === MODALNAMES.BRANCHMODAL ? view_branch?.is_main_branch === "YES" ? true : false : false
      },
      onSubmit: async (values, onSubmitProps) => {
          //console.log('onSubmit', values)
          values.is_active = values.is_active === true ? "YES" : "NO";
          values.is_main_branch = values.is_main_branch === true ? "YES" : "NO";

          if(selectPagee === MODALNAMES.BRANCHMODAL){


            values.id = selectIdd
  
            
            try{
  
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              await updateBranch(values).unwrap()
              successNotification("Branch Updated Successfully");
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
              await addNewBranch(values).unwrap()
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              successNotification("Branch Added Successfully");
  
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
          branch: Yup.string().required("Branch Name is required"),
          branch_code: Yup.string().required("Branch Name is required"),
          location: Yup.string().required("Branch Location is required"),
          contact: Yup.string().required("Branch Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 15 digits"),
          email: Yup.string().required("Branch Email is required").email("Invalid email address")
      })
  });

  return (
    <>
        <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
        <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
        <div className='flex w-full gap-5 items-start justify-between mb-3'>

          <div className='w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="branch" value="Branch" />
            </div>
            <TextInput 
              id="branch" 
              name="branch" 
              type="text" 
              placeholder="Branch" 
              required 
              value={formik.values.branch} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.branchName && formik.touched.branchName && formik.errors.branchName}</div>
          </div>

          <div className='w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="branch_code" value="Branch Code" />
            </div>
            <TextInput 
              id="branch_code" 
              name="branch_code" 
              type="text" 
              placeholder="Branch Code" 
              required 
              value={formik.values.branch_code} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.branch_code && formik.touched.branch_code && formik.errors.branch_code}</div>
          </div>
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/3'>
              <div className="mb-2 block">
                <Label htmlFor="location" value="Location" />
              </div>
              <TextInput 
                id="location" 
                name="location" 
                type="text" 
                placeholder="Location" 
                required 
                value={formik.values.location} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.location && formik.touched.location && formik.errors.location}</div>
            </div>
            <div className='w-1/3'>
              <div className="mb-2 block">
                <Label htmlFor="contact" value="Telephone" />
              </div>
              <TextInput 
                id="contact" 
                name="contact" 
                type="text" 
                placeholder="Telephone" 
                required 
                value={formik.values.contact} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.contact && formik.touched.contact && formik.errors.contact}</div>
            </div>
            <div className='w-1/3'>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Email" 
                required 
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.email && formik.touched.email && formik.errors.email}</div>
            </div>
          </div>
          <div className='flex w-full gap-5 items-start justify-normal'>
            <div className='w-1/12'>
              <div className="mb-2 block">
                <Label htmlFor="is_active" value="Active?" />
              </div>
              <Checkbox 
                id='is_active' 
                name="is_active"
                checked={formik.values.is_active} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='w-1/12'>
              <div className="mb-2 block">
                <Label htmlFor="is_main_branch" value="Main?" />
              </div>
              <Checkbox 
                id='is_main_branch' 
                name="is_main_branch" 
                value={formik.values.is_main_branch} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
