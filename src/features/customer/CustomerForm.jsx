import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import { phoneRegExp } from '../../globalVariables/regExpressions';
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import {MODALNAMES, USERLEVEL} from "../../otherFunc/customDataTypes";
import { useSelector } from 'react-redux';
import { selectAllCustomers, selectCustomerById, useAddNewCustomerMutation, useUpdateCustomerMutation } from './customerApiSlice';
import { selectIsEdit, selectPage, selectId, selectCurrentRole, selectCurrentToken} from '../../features/auth/authSlice';
import { selectAllCourierTypes } from '../courierType/courierTypeApiSlice';
import { selectAllBranchs } from '../branch/branchApiSlice';
import { selectAllIdTypes } from "../idType/idTypeApiSlice";
import { jwtDecode } from 'jwt-decode'

export default function CustomerForm({handleCloseModal}) {

  const token = useSelector(selectCurrentToken)
 
  const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_customer = useSelector((state) => selectCustomerById(state, selectIdd))
  const data_branch = useSelector(selectAllBranchs);
  const data_idType = useSelector(selectAllIdTypes);
  // console.log(data_idType)
  const auth_roles = useSelector(selectCurrentRole);

  const [addNewCustomer, {isLoading}] = useAddNewCustomerMutation();
  const [updateCustomer, {isLoading:updateLoading}] = useUpdateCustomerMutation();

  const formik = useFormik({
      initialValues: {
        fname: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.fname : "",
        lname: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.lname : "",
        contact: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.contact : "",
        email: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.email : "",
        branch_id: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.branch_id : auth_roles !== USERLEVEL.SUPER_ADMIN ? token_info.branch_id : "",
        id_type_id: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.id_type_id : "",
        id_number: selectPagee === MODALNAMES.CUSTOMERMODAL ? view_customer?.id_number : "",
      },
      onSubmit: async (values, onSubmitProps) => {
          // console.log('onSubmit', values)

          if(selectPagee === MODALNAMES.CUSTOMERMODAL){


            values.id = selectIdd
            
            try{
  
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              await updateCustomer(values).unwrap()
              successNotification("Customer Updated Successfully");
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
              await addNewCustomer(values).unwrap()
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              successNotification("Customer Added Successfully");
  
            }catch(error){
              
              console.log(error)
              if(Array.isArray(error?.data.message))
              {
               errorNotification(error?.data.message[0])
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
     branch_id: auth_roles === USERLEVEL.SUPER_ADMIN ? Yup.string().required("Please Select Branch") : Yup.string().notRequired(),
     id_type_id: Yup.string().required("Id Type is required"),
     id_number: Yup.string().required("Id Number is required"),    
    
    })
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
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>

            <div className='w-1/2'>
              <div className="mb-2 block">
              {/* <Label htmlFor="email" value="Email" /> */}
              <div className='font-semibold text-sm'>Email</div>
                </div>
                <TextInput 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="Email"  
                  value={formik.values.email} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.email && formik.touched.email && formik.errors.email}</div>
            </div>

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
            </div>


            <div className='flex w-full gap-5 items-start justify-between mb-3'>

            {
                auth_roles === USERLEVEL.SUPER_ADMIN &&
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
                {/* <Label htmlFor="id_type_id" value="Id Type" /> */}
                <div className='font-semibold text-sm'>ID Type</div>
                </div>
                <Select 
                  id="id_type_id"
                  name="id_type_id" 
                  value={formik.values.id_type_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose a Branch --</option>
                    {
                      data_idType?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.id_type}</option>
                      })
                  }
           
                </Select>
                <div className="error">{formik.errors.id_type_id && formik.touched.id_type_id && formik.errors.id_type_id}</div>
                </div>


                <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="id_number" value="Id Number" /> */}
                <div className='font-semibold text-sm'>ID Number</div>
                </div>
                <TextInput 
                  id="id_number" 
                  name="id_number" 
                  type="text" 
                  placeholder="Id Number" 
                  value={formik.values.id_number} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.id_number && formik.touched.id_number && formik.errors.id_number}</div>
                </div>


           </div>


          
           
                




                
                
          
          
            


           <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
