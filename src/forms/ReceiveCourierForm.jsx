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
import { selectTransactionById, useUpdateReceiveTransactionMutation } from '../features/transaction/transactionApiSlice';
import { selectAllIdTypes } from '../features/idType/idTypeApiSlice';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

const URL = "/transaction-detail/receive-Edit";
const URLL = "/transaction-detail";
const SecurityURL = "/usecurity-question";

export default function ReceiveCourierForm({handleCloseModal}) {

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const data = useSelector((state) => selectTransactionById(state, selectIdd));

  const [checkValue, setCheckValue] = useState(false);


  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const gettransDate = formattedDate;

      //Get all Id Type
      const get_all_IdType = useSelector(selectAllIdTypes)
      const data_idType = get_all_IdType.filter(idType => idType.is_active == "YES");

  const [updateReceiveTransaction, {isLoading:updateLoading}] = useUpdateReceiveTransactionMutation();

  const formik = useFormik({
      initialValues: {
        tracking_number : selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.tracking_number : "",
        sender_id : selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.sender_id : "",
        receiver_id : selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.receiver_id : "",
        sender_fullname : selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.sender.fname + " "+data?.sender.lname  : "",
        receiver_fullname : selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.receiver.fname + " "+data?.receiver.lname  : "",
        weight: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.weight : "",
        price: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.price : "",
        extra_price: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.extra_price : "",
        total_cost: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.total_cost : "",
        flight_number:selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.flight_number : "",
        security_question: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.security_question?.security_question : "",
        answer: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.answer : "",
        received_by_someone_else: selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? data?.received_by_someone_else : false,
        receipient_fullname: selectPagee === MODALNAMES.receipient_fullname ? data?.receipient_fullname : "",
        receipient_contact: selectPagee === MODALNAMES.receipient_contact ? data?.receipient_contact : "",
        receipient_id_type: selectPagee === MODALNAMES.receipient_id_type ? data?.receipient_id_type : "",
        receipient_id_number: selectPagee === MODALNAMES.receipient_id_number ? data?.receipient_id_number : "",
        collected_date:selectPagee === MODALNAMES.RECEIVECOURIERMODAL ? gettransDate : gettransDate,
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)
        //  values.is_active = values.is_active === true ? "YES" : "NO";

        if(selectPagee === MODALNAMES.RECEIVECOURIERMODAL){


          values.id = selectIdd

          console.log(selectIdd)
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateReceiveTransaction(values).unwrap()
            successNotification("Package Collected");
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

        //received_by_someone_else: Yup.boolean().required("Received By Someone Else Is Required"),

        receipient_fullname: checkValue ? Yup.string().max(200, "Receipient Fullname Exceeds The Maximum Length").required("Receipient Fullname Is Required") : Yup.string().notRequired(),
        


        receipient_contact: checkValue ? Yup.string().max(15, "Receipient Contact Exceeds The Maximum Length").required("Receipient Contact Is Required") : Yup.string().notRequired(),


   

        receipient_id_type: checkValue ? Yup.string().required("Receipient Id Type Is Required") : Yup.string().notRequired(),

        
        // receipient_id_number:  Yup.string().when('received_by_someone_else', {
        //   is: true,
        //   then: Yup.string().max(200, "Receipient Id Number Exceeds The Maximum Length").required("Receipient Id Number Is Required"),
        // }),

        receipient_id_number: checkValue ? Yup.string().max(200, "Receipient Id Number Exceeds The Maximum Length").required("Receipient Id Number Is Required") : Yup.string().notRequired(),

        collected_date: Yup.date().required("Collection Date Is Required"),

      })
  });

  return (
    <>
    <h2>{updateLoading ? "Loading..." : ""}</h2>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="sender_fullname " value="Sender Fullname" />
            </div>
            <TextInput 
              id="sender_fullname"              
              name="sender_fullname" 
              type="text" 
              placeholder="Sender Fullname" 
              required 
              readOnly
              value={formik.values.sender_fullname} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.sender_fullname  && formik.touched.sender_fullname  && formik.errors.sender_fullname }</div>
          </div>




          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="receiver_fullname " value="Receiver Fullname" />
            </div>
            <TextInput 
              id="receiver_fullname"              
              name="receiver_fullname" 
              type="text" 
              placeholder="Receiver Fullname" 
              required 
              readOnly
              value={formik.values.receiver_fullname} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.receiver_fullname  && formik.touched.receiver_fullname  && formik.errors.receiver_fullname }</div>
          </div>




          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor=" weight" value="Weight" />
            </div>
            <TextInput 
              id=" weight"              
              name=" weight" 
              type="text" 
              placeholder="Weight" 
              required 
              readOnly
              value={formik.values.weight} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.weight  && formik.touched.weight  && formik.errors.weight }</div>
          </div>
          </div>





          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="price " value="Price" />
            </div>
            <TextInput 
              id="price"              
              name="price" 
              type="text" 
              placeholder="Price" 
              required 
              readOnly
              value={formik.values.price} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.price  && formik.touched.price  && formik.errors.price }</div>
          </div>




          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="extra_price" value="Extra Price" />
            </div>
            <TextInput 
              id="extra_price"              
              name="extra_price" 
              type="text" 
              placeholder="Extra Cost" 
              required 
              readOnly
              value={formik.values.extra_price} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.extra_price  && formik.touched.extra_price  && formik.errors.extra_price }</div>
          </div>




          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="total_cost" value="Weight" />
            </div>
            <TextInput 
              id=" total_cost"              
              name=" total_cost" 
              type="text" 
              placeholder="Total Cost" 
              required 
              readonly
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
              readonly
              value={formik.values.flight_number} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.flight_number  && formik.touched.flight_number  && formik.errors.flight_number }</div>
          </div>


          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="security_question" value="Security Question" />
            </div>
            <TextInput 
              id="security_question"              
              name="security_question" 
              type="text" 
              placeholder="Security Question" 
              required 
              readonly
              value={formik.values.security_question} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.security_question  && formik.touched.security_question  && formik.errors.security_question }</div>
          </div>





          <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="answer" value="Answer" />
            </div>
            <TextInput 
              id="answer"              
              name="answer" 
              type="text" 
              placeholder="Answer" 
              required 
              readonly
              value={formik.values.answer} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.answer  && formik.touched.answer  && formik.errors.answer }</div>
          </div>
            </div>



           
            <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="collected_date" value="Collection Date" />
            </div>
            <TextInput name="collected_date" 
              type="date" 
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="Date" 
              readOnly
              required 
              value={formik.values.collected_date} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  />
            <div className="error">{formik.errors.collected_date  && formik.touched.collected_date  && formik.errors.collected_date}</div>
          </div>




            <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-full'>
            <div className="mb-2 block">
                <Label htmlFor="received_by_someone_else" value="On Behalf?" />
              </div>
            <Checkbox 
                id="received_by_someone_else"
                name="received_by_someone_else"
                checked={formik.values.received_by_someone_else} 
                //onChange={formik.handleChange}
                onChange={e => {
                  formik.setFieldValue("received_by_someone_else",e.target.checked);

                  setCheckValue(e.target.checked);
                   
               }}
                onBlur={formik.handleBlur}
              />
              {formik.values.received_by_someone_else}
              <div className="error">{formik.errors.received_by_someone_else && formik.touched.received_by_someone_else && formik.errors.received_by_someone_else}</div>
              </div>


             {
              formik.values.received_by_someone_else && (
                 <>
                <div className='w-full'>
                <div className="mb-2 block">
                  <Label htmlFor="receipient_fullname" value="Reciepient Fullname" />
                </div>
                <TextInput 
                  id="receipient_fullname"              
                  name="receipient_fullname" 
                  type="text" 
                  placeholder="Reciepient Fullname" 
                  required 
                  value={formik.values.receipient_fullname} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.receipient_fullname  && formik.touched.receipient_fullname  && formik.errors.receipient_fullname }</div>
                </div>
           
           <div className='w-full'>
            <div className="mb-2 block">
              <Label htmlFor="receipient_contact" value="Reciepient Contact" />
            </div>
            <TextInput 
              id="receipient_contact"              
              name="receipient_contact" 
              type="text" 
              placeholder="Reciepient Contact" 
              required 
              value={formik.values.receipient_contact} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.receipient_contact  && formik.touched.receipient_contact  && formik.errors.receipient_contact }</div>
            </div>

            
          
            </>

              )
             }
            </div>
          



            {

             formik.values.received_by_someone_else && (

               <div className='flex w-full gap-5 items-start justify-between mb-3'>

                 <div className='w-full'>
                <div className="mb-2 block">
                  <Label htmlFor="receipient_id_type" value="Reciepient Id Type" />
                </div>
                <Select 
                  id="receipient_id_type" 
                  name="receipient_id_type" 
                  required
                  value={formik.values.receipient_id_type} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose An Id Type --</option>
                    {
                        data_idType?.map((d) => {
                            return <option value={d.id_type} key={d.id} >{d.id_type}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.receipient_id_type  && formik.touched.receipient_id_type  && formik.errors.receipient_id_type}</div>
                </div>


                <div className='w-full'>
                <div className="mb-2 block">
              <Label htmlFor="receipient_id_number" value="Reciepient Id Number" />
            </div>
            <TextInput 
              id="receipient_id_number"              
              name="receipient_id_number" 
              type="text" 
              placeholder="Reciepient Id Number" 
              required 
              value={formik.values.receipient_id_number} 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="error">{formik.errors.receipient_id_number  && formik.touched.receipient_id_number  && formik.errors.receipient_id_number }</div>
            </div>


                </div>

             )
            }



         
          <Button type='submit'>Collect</Button>
      </form>
    </>
  );
}
