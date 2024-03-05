import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Label, TextInput, Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { phoneRegExp } from '../../globalVariables/regExpressions';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES, USERLEVEL} from "../../otherFunc/customDataTypes";
import { useQuery} from "react-query"

import { useSelector } from 'react-redux';
import { selectUserById, useAddNewUserMutation, useUpdateUserMutation } from './userApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';
import { selectCurrentRole } from '../../features/auth/authSlice';
import { selectAllBranchs } from '../branch/branchApiSlice';


// const URL = "/users";
// const BRANCHURL = "/branch/allActiveBranches";
// const ISMAINBRANCHURL = "/branch";
// data_branch

export default function UserForm({handleCloseModal}) {



  const selectPagee = useSelector(selectPage);
  const isEdit = useSelector(selectIsEdit);
  const user_roles = useSelector(selectCurrentRole);
  const selectIdd = useSelector(selectId);
  const view_user = useSelector((state) =>  selectUserById(state, selectIdd))
  const data_all_branch = useSelector(selectAllBranchs);
  const data_branch = data_all_branch.filter(bran => bran.is_active === "YES")

  const [addNewUser, {isLoading}] = useAddNewUserMutation();
  const [updateUser, {isLoading:updateLoading}] = useUpdateUserMutation();

  // console.log(selectPagee);
  // console.log(MODALNAMES.USERMODAL);




//   //Check If It Is Main Branch
//   const performCheckMainBranch = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }



// const get_branchMainBranch = (id) => {
//   return axiosPrivate.get(`${ISMAINBRANCHURL}/${id}`);
// }


// const {data:mainData, isLoading:mainLoading, refetch:mainRefetch} = useQuery(['get-branchMainBranch', getBranch_id],  () => get_branchMainBranch(getBranch_id),{
//   enabled: !!getBranch_id,
//   // onSuccessMainBranch,
//   // onErrorMainBranch
// })



// //For Combo
//   const performGetBranch = (id) => {
//     return axiosPrivate.get(`${BRANCHURL}`);
//   }


//   const onSuccessBranch = () => {}
//   const onErrorBranch = () => {}
//  const {data:data_branch} = useQueryData("combo-branch",performGetBranch,onSuccessBranch, onErrorBranch)


//   const performEditUser = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }


//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.USERMODAL){
//       formik.values.fname = data?.data?.fname;
//       formik.values.lname = data?.data?.lname;
//       formik.values.email = data?.data?.email;
//       formik.values.contact = data?.data?.contact;
//       formik.values.branch_id = data?.data?.branch_id;
//       setGetBranch_id(data?.data?.branch_id);
//       //mainRefetch();
//       formik.values.user_level = data?.data?.user_level;
//       formik.values.password = data?.data?.password;
//       formik.values.confirm_password = data?.data?.password;
//       formik.values.status = data?.data?.status;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };



// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-userEdit','get-user',isEdit.id,performEditUser,onSuccessView, onErrorView);


// const performInUser = (user_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, user_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, user_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }



// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//   queryClient.setQueryData('get-user', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("User Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-user"]);
//   successNotification("User Updated Successfully");

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



   
//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInUser, onSuccess, onError);


  const formik = useFormik({
      initialValues: {
        fname: selectPagee === MODALNAMES.USERMODAL ? view_user?.fname : "",
        lname: selectPagee === MODALNAMES.USERMODAL ? view_user?.lname : "",
        email: selectPagee === MODALNAMES.USERMODAL ? view_user?.email : "",
        contact: selectPagee === MODALNAMES.USERMODAL ? view_user?.contact : "",
        user_level: selectPagee === MODALNAMES.USERMODAL ? view_user?.user_level : "",
        branch_id: selectPagee === MODALNAMES.USERMODAL ? view_user?.branch_id : "",
        password:selectPagee === MODALNAMES.USERMODAL ? view_user?.password : "",
        confirm_password:selectPagee === MODALNAMES.USERMODAL ? view_user?.password : "",
        status:selectPagee === MODALNAMES.USERMODAL ? view_user?.status : "",
      },

      onSubmit: async (values, onSubmitProps) => {
        //  console.log('onSubmit', values)
        if(selectPagee === MODALNAMES.USERMODAL){


          values.id = selectIdd

          delete values.person;

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateUser(values).unwrap()
            successNotification("User Updated Successfully");
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
            await addNewUser(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("User Added Successfully");

          }catch(error){
             console.log(error)
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
        fname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("First Name is required"),
        lname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("Last Name is required"),
        email: Yup.string().required("Branch Email is required").email("Invalid email address"),
        contact: Yup.string().required("Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 10 digits"),
        user_level: Yup.string().required("User Level is required"),
     branch_id: user_roles === USERLEVEL.SUPER_ADMIN ? Yup.string().required("Please Select Branch") : Yup.string().notRequired(),
        status: Yup.string().required("Status Is Required"),
        password: isEdit === false ? Yup.string().required("Password Is Required")
        .test("regex", "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase", val => {
           let regExp = new RegExp(
              "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
            );
            //console.log(regExp.test(val), regExp, val);
            return regExp.test(val);
        }) : Yup.string().notRequired(),

confirm_password:Yup.string().oneOf([Yup.ref("password"),''], "Confirm Password Does Not Match Password"),

      }),


  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="fname" value="First Name" /> */}
                <div className='font-semibold text-sm'>First Name <span className="text-passionRed">*</span></div>
                </div>
                <TextInput 
                  id="fname"
                  name="fname" 
                  type="text" 
                  placeholder="First Name" 
                  required 
                  value={formik.values.fname} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.fname && formik.touched.fname && formik.errors.fname}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="lname" value="Last Name" /> */}
                <div className='font-semibold text-sm'>Last Name <span className="text-passionRed">*</span></div>
                </div>
                <TextInput 
                  id="lname"
                  name="lname" 
                  type="text" 
                  placeholder="Last Name" 
                  required 
                  value={formik.values.lname} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.lname && formik.touched.lname && formik.errors.lname}</div>
            </div>


            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="email" value="Email" /> */}
                <div className='font-semibold text-sm'>Email <span className="text-passionRed">*</span></div>
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
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
      
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="contact" value="Telephone" /> */}
                <div className='font-semibold text-sm'>Telephone <span className="text-passionRed">*</span></div>
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

             
              {
                user_roles === USERLEVEL.SUPER_ADMIN &&
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="branch_id" value="Branch" /> */}
                <div className='font-semibold text-sm'>Branch <span className="text-passionRed">*</span></div>
                </div>
                <Select 
                  id="branch_id"
                  name="branch_id" 
                  required
                  value={formik.values.branch_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose a Branch --</option>
                    {
                      data_branch?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.branch}</option>
                      })
                  }
           
                </Select>
                <div className="error">{formik.errors.branch_id && formik.touched.branch_id && formik.errors.branch_id}</div>
            </div>
             }





<div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="user_level" value="User Level" /> */}
                <div className='font-semibold text-sm'>User Level <span className="text-passionRed">*</span></div>
                </div>
                <Select 
                  id="user_level"
                  name="user_level" 
                  required
                  value={formik.values.user_level} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose a Level --</option>
                    {user_roles === USERLEVEL.SUPER_ADMIN && <option value="SUPER ADMIN">SUPER ADMIN</option>}
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="SUPERVISOR">SUPERVISOR</option>
                    <option value="STAFF">STAFF</option>
                    <option value="CASHIER">CASHIER</option>
           
                </Select>
                <div className="error">{formik.errors.user_level && formik.touched.user_level && formik.errors.user_level}</div>
            </div>


          </div>

          
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
         {
         isEdit === false &&
          <>

            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="password" value="Password" /> */}
                <div className='font-semibold text-sm'>Password {/*<span className="text-passionRed">*</span>*/}</div>
                </div>
                <TextInput 
                  id="password"
                  name="password" 
                  type="password" 
                  placeholder="Password" 
                 // required 
                  value={formik.values.password} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.password && formik.touched.password && formik.errors.password}</div>
            </div>



            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="confirm_password" value="Confirm Password" /> */}
                <div className='font-semibold text-sm'>Confirm Password {/*<span className="text-passionRed">*</span>*/}</div>
                </div>
                <TextInput 
                  id="confirm_password"
                  name="confirm_password" 
                  type="password" 
                  placeholder="Confirm Password" 
                //  required 
                  value={formik.values.confirm_password} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.confirm_password && formik.touched.confirm_password && formik.errors.confirm_password}</div>
            </div>

            </>
 
         }

            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="status" value="User Status" /> */}
                <div className='font-semibold text-sm'>User Status <span className="text-passionRed">*</span></div>
                </div>
                <Select 
                  id="status"
                  name="status" 
                  required
                  value={formik.values.status} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                     <option value="">--Please Select Status--</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  
                </Select>
                <div className="error">{formik.errors.status && formik.touched.status && formik.errors.status}</div>
            </div>
          </div>
          <Button type='submit'>Submit</Button>
      </form>
    </>
  );
}
