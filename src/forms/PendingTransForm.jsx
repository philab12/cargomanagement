import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../otherFunc/notification";
import {errorNotification  } from '../otherFunc/notification';
import { useMutationInitialInsert, useSingleData  } from "../hooks/useQueryy";
import useAuth from '../hooks/useAuth';
import {MODALNAMES, PAYMENT_STATUS} from "../otherFunc/customDataTypes";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectId, selectIsEdit, selectPage } from '../features/auth/authSlice';
import { selectTransactionById, useUpdatePendingTransactionMutation } from '../features/transaction/transactionApiSlice';
import { format, parseISO } from 'date-fns';


// const URL = "/transaction-detail";

export default function PendingTransForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const gettransDate = formattedDate;
  
  //setGetTransDate(formattedDate);

  const navigate = useNavigate();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const data = useSelector((state) => selectTransactionById(state, selectIdd))

  const [updatePendingTransaction, {isLoading:updateLoading}] = useUpdatePendingTransactionMutation();

  

  const formik = useFormik({
      initialValues: {
        tracking_number : selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.tracking_number : "",
        sender_id : selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.sender_id : "",
        receiver_id : selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.receiver_id : "",
        sender_fullname : selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.sender.fname + " "+data?.sender.lname  : "",
        receiver_fullname : selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.receiver.fname + " "+data?.receiver.lname  : "",
        weight: selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.weight : "",
        price: selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.price : "",
        extra_price: selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.extra_price : "",
        total_cost: selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.total_cost : "",
        payment_status: PAYMENT_STATUS.PAID,
        mode_of_payment:selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.mode_of_payment : "",
        receipt_number:selectPagee === MODALNAMES.PENDINGTRANSMODAL ? data?.receipt_number : "",
        trans_date:selectPagee === MODALNAMES.PENDINGTRANSMODAL ? gettransDate : gettransDate,
        //trans_date:gettransDate,
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)
        //  values.is_active = values.is_active === true ? "YES" : "NO";

        if(selectPagee === MODALNAMES.PENDINGTRANSMODAL){


          values.id = selectIdd

          console.log(selectIdd)
          try{

            const dataa =  await updatePendingTransaction(values).unwrap()

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
           // const data= await addNewTransaction(values).unwrap()
            successNotification("Transaction Successfully");
            localStorage.setItem("track_receipt", JSON.stringify(dataa))
            handleCloseModal();
            navigate("/receipt");
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
        mode_of_payment: Yup.string().required("Mode Of Payment Is Required"),
        receipt_number: Yup.string().required("Receipt Number").max(200, "Should not be more than 200 characters"),
        trans_date: Yup.date().required("Transaction Date Is Required"),
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
                <Label htmlFor="mode_of_payment" value="Mode Of Payment" />
                </div>
                <Select 
                  id="mode_of_payment" 
                  name="mode_of_payment" 
                  required
                  value={formik.values.mode_of_payment} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="CASH">CASH</option>
                    <option value="POS">POS</option>
                    <option value="MOBILE MONEY">MOBILE MONEY</option>
                    <option value="CREDIT CARD">CREDIT CARD</option>
                
                </Select>
                <div className="error">{formik.errors.mode_of_payment && formik.touched.mode_of_payment && formik.errors.mode_of_payment}</div>
                </div>


                <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="receipt_number" value="Receipt Number" />
            </div>
            <TextInput name="receipt_number" 
              type="text" 
              placeholder="Receipt Number" 
              required 
              value={formik.values.receipt_number} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  />
            <div className="error">{formik.errors.receipt_number  && formik.touched.receipt_number  && formik.errors.receipt_number }</div>
          </div>


                <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="trans_date" value="Transaction Date" />
            </div>
            <TextInput name="trans_date" 
              type="date" 
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="Date" 
              readOnly
              required 
              value={formik.values.trans_date} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  />
            <div className="error">{formik.errors.trans_date  && formik.touched.trans_date  && formik.errors.trans_date }</div>
          </div>




            </div>
            


         
          <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
