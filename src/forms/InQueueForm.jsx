import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../otherFunc/notification";
import {errorNotification  } from '../otherFunc/notification';
import { useMutationInitialInsert, useSingleData  } from "../hooks/useQueryy";
import useAuth from '../hooks/useAuth';
import {MODALNAMES} from "../otherFunc/customDataTypes";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { selectId, selectIsEdit, selectPage } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { selectTransactionById, useUpdateInQueueTransactionMutation } from '../features/transaction/transactionApiSlice';
import { format, parseISO } from 'date-fns';


export default function InQueueForm({handleCloseModal}) {

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const data = useSelector((state) => selectTransactionById(state, selectIdd))

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const gettransDate = formattedDate;

  const [updateInQueueTransaction, {isLoading:updateLoading}] = useUpdateInQueueTransactionMutation();


  const formik = useFormik({
      initialValues: {
        tracking_number : selectPagee === MODALNAMES.INQUEUEMODAL ? data?.tracking_number : "",
        sender_id : selectPagee === MODALNAMES.INQUEUEMODAL ? data?.sender_id : "",
        receiver_id : selectPagee === MODALNAMES.INQUEUEMODAL ? data?.receiver_id : "",
        sender_fullname : selectPagee === MODALNAMES.INQUEUEMODAL ? data?.sender.fname + " "+data?.sender.lname  : "",
        receiver_fullname : selectPagee === MODALNAMES.INQUEUEMODAL ? data?.receiver.fname + " "+data?.receiver.lname  : "",
        weight: selectPagee === MODALNAMES.INQUEUEMODAL ? data?.weight : "",
        price: selectPagee === MODALNAMES.INQUEUEMODAL ? data?.price : "",
        extra_price: selectPagee === MODALNAMES.INQUEUEMODAL ? data?.extra_price : "",
        total_cost: selectPagee === MODALNAMES.INQUEUEMODAL ? data?.total_cost : "",
        flight_number:"",
        dispatch_date:selectPagee === MODALNAMES.INQUEUEMODAL ? gettransDate : gettransDate,
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)
        //  values.is_active = values.is_active === true ? "YES" : "NO";

        if(selectPagee === MODALNAMES.INQUEUEMODAL){


          values.id = selectIdd

          console.log(selectIdd)
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateInQueueTransaction(values).unwrap()
            successNotification("Package Dispatched");
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
          }

      },
      validationSchema: Yup.object({
        flight_number: Yup.string().required("Flight Number Is Required"),
        dispatch_date: Yup.date().required("Dispatch Date Is Required"),
      })
  });

  return (
    <>
    <h2>{updateLoading ? "Loading..." : ""}</h2>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="sender_fullname " value="Sender Fullname" />
            </div>
            <TextInput 
              id="sender_fullname"              
              name="sender_fullname" 
              type="text" 
              placeholder="Sender Fullname" 
              required 
              value={formik.values.sender_fullname} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.sender_fullname  && formik.touched.sender_fullname  && formik.errors.sender_fullname }</div>
          </div>




          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="receiver_fullname " value="Receiver Fullname" />
            </div>
            <TextInput 
              id="receiver_fullname"              
              name="receiver_fullname" 
              type="text" 
              placeholder="Receiver Fullname" 
              required 
              value={formik.values.receiver_fullname} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.receiver_fullname  && formik.touched.receiver_fullname  && formik.errors.receiver_fullname }</div>
          </div>




          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor=" weight" value="Weight" />
            </div>
            <TextInput 
              id=" weight"              
              name=" weight" 
              type="text" 
              placeholder="Weight" 
              required 
              value={formik.values.weight} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.weight  && formik.touched.weight  && formik.errors.weight }</div>
          </div>
          </div>





          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price " value="Price" />
            </div>
            <TextInput 
              id="price"              
              name="price" 
              type="text" 
              placeholder="Price" 
              required 
              value={formik.values.price} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.price  && formik.touched.price  && formik.errors.price }</div>
          </div>




          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="extra_price" value="Extra Price" />
            </div>
            <TextInput 
              id="extra_price"              
              name="extra_price" 
              type="text" 
              placeholder="Extra Cost" 
              required 
              value={formik.values.extra_price} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.extra_price  && formik.touched.extra_price  && formik.errors.extra_price }</div>
          </div>




          <div className='mb-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="total_cost" value="Weight" />
            </div>
            <TextInput 
              id=" total_cost"              
              name=" total_cost" 
              type="text" 
              placeholder="Total Cost" 
              required 
              value={formik.values.total_cost} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.total_cost  && formik.touched.total_cost  && formik.errors.total_cost }</div>
          </div>
          </div>



          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="flight_number" value="Flight Number" />
            </div>
            <TextInput 
              id="flight_number"              
              name="flight_number" 
              type="text" 
              placeholder="Flight Number" 
              required 
              value={formik.values.flight_number} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.flight_number  && formik.touched.flight_number  && formik.errors.flight_number }</div>
          </div>



          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="dispatch_date" value="Dispatch Date" />
            </div>
            <TextInput name="dispatch_date" 
              type="date" 
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="Date" 
              readOnly
              required 
              value={formik.values.dispatch_date} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  />
            <div className="error">{formik.errors.dispatch_date  && formik.touched.dispatch_date  && formik.errors.dispatch_date }</div>
          </div>


            </div>


         
          <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
