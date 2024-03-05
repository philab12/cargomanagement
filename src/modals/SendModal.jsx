import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Modal, Label, TextInput, Select } from 'flowbite-react';
import { FaTruck, FaPlaneDeparture, FaRegRectangleList  } from 'react-icons/fa6'
import { BiSolidUserDetail } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";
import { useState, useEffect } from 'react';
import MultiStepForm, { FormStep } from './MultiStepForm';
// import useAuth from '../hooks/useAuth';
import { COURIER_STAGES, PAYMENT_STATUS } from '../otherFunc/customDataTypes';
import { useFormik, Field, ErrorMessage, useFormikContext} from 'formik'
import * as Yup from 'yup'
import { useMutationInitialInsert, useSingleData, useQueryData , useSingleDataEnabled } from "../hooks/useQueryy";
import { phoneRegExp } from '../globalVariables/regExpressions';
import TextError from "../components/TextError";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Autocomplete, TextField } from '@mui/material';
import { useQuery} from "react-query"
import {successNotification  } from  "../otherFunc/notification";
import {errorNotification  } from '../otherFunc/notification';

import { TrixEditor } from 'react-trix';


import { format, parseISO } from 'date-fns';

import { selectIsEdit, selectPage, selectId, selectCurrentBranchId} from "../features/auth/authSlice";
import { selectAllCourierCategorys } from '../features/courierCate/courierCategoryApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCustomers, selectCustomerById } from '../features/customer/customerApiSlice';
import { selectAllIdTypes } from "../features/idType/idTypeApiSlice";
import { selectAllBranchs } from '../features/branch/branchApiSlice';
import { selectAllTrips } from '../features/tripSetup/tripApiSlice';
import { selectAllCourierPrices } from '../features/courierPrice/courierPriceApiSlice';
import { selectAllExtraCharges } from '../features/extraCharge/extraChargeApiSlice';
import { selectAllSecurityQuestions } from '../features/securityQuestion/securityQuestionApiSlice';
import { useAddNewTransactionMutation } from '../features/transaction/transactionApiSlice';
import { setTrackRep, setTrackingNumber } from '../features/transaction/transSlice';



const URL = "/transaction-detail/create_transaction_details";
const IDTYPES = "/id-types/allIdType"
const COURIERCATEURL = "/courier-cate/all/allCourierCateall";

const BRANCHURL = "/branch/allActiveBranchesNotB";
const SECURITYQUES = "/security-question/allSecurityQuestion";
const CUSTVIEWURL = "/customers"
const CUSTURL = "/customers/allCustomers";
const COURIERPRICEURL = "/courier-price";

export default function SendModal() {
 // const {auth, setTrackingNumber} = useAuth();
  // const branch_id = auth.branch_id
  const [openModal, setOpenModal] = useState(false);
  const [custSender,setCustSender] = useState(null);
  const [custReceiver,setCustReceiver] = useState(null);
  const [gettransDate, setGetTransDate] = useState(null);
  // const axiosPrivate = useAxiosPrivate();

  //Get Trans Data
  //const formikk = useFormikContext();

  const [trans_courier_cate_id,setCourier_cate_id] = useState(null);
  const [trans_receiving_branch_id,setTrans_receiving_branch_id] = useState(null);
  const [trans_weight,setTrans_weight] = useState(null);
  // const [trans_getPrice,setTrans_getPrice] = useState(null);
  const [courierPrice,setCourierPrice] = useState(0.00);
  const [courierExtraPrice,setCourierExtraPrice] = useState(0.00);
  const [totalPrice,setTotalPrice] = useState(0.00);
  const [senderIdType,setSenderIdType] = useState("");
  // const [trans_formPrice,setTrans_formPrice] = useState(null);
  const [view_receive_cust, setView_receive_cust] = useState({});
  const [view_send_cust, setView_send_cust] = useState({});
  const [trip_setup_id, setTrip_setup_id] = useState(null);
  const [trip_setup_err, setTrip_setup_err] = useState(null);
  const [errorPrice,setErrorPrice] = useState(null);




  // const isEdit = useSelector(selectIsEdit);
  // const selectPagee = useSelector(selectPage);
  // const selectIdd = useSelector(selectId);
  const dispatch = useDispatch();
  const branch_id = useSelector(selectCurrentBranchId)

  const view_all_courier_cates = useSelector(selectAllCourierCategorys)
  const data_courier_cate = view_all_courier_cates.filter(c_cate => c_cate.is_active === "YES");

  const data_cust = useSelector(selectAllCustomers)
  //const data_cust = view_all_cust.filter(cust => )




  const setGetCustSender = (id) => {
    const view_send_custt = data_cust.find(cust => cust.id == id)
    setView_send_cust(view_send_custt)
    setCustSender(id)
  }

  const setGetCustReceiver = (id) => {

    const view_receive_custt = data_cust.find(cust => cust.id == id);
    
    setView_receive_cust(view_receive_custt)

    // console.log(view_all_courier_cate)

    setCustReceiver(id)
    // console.log(data_courier_cate)

  }

    //Get all Id Type
    const get_all_IdType = useSelector(selectAllIdTypes)
    const data_idType = get_all_IdType.filter(idType => idType.is_active == "YES");


    
  const view_all_branchs = useSelector(selectAllBranchs)
  const data_branch = view_all_branchs.filter(branc => branc.is_active === "YES"  && branc.id != branch_id );

  const view_all_trips = useSelector(selectAllTrips);

  const view_all_courier_prices = useSelector(selectAllCourierPrices)
  const view_all_extra_prices = useSelector(selectAllExtraCharges)

  const view_all_security_questions = useSelector(selectAllSecurityQuestions)
  const data_security = view_all_security_questions.filter(sec => sec.is_active === "YES")


  const [addNewTransaction, {isLoading:isNLoading}] = useAddNewTransactionMutation();




 //Get Senders Id Type Selected To Validate If No Id Type Is Selected Then No Need For Validation
 const getSenderTypeId = (send_id_type) => {
  setSenderIdType(send_id_type);
 }


  useEffect(() => {

    const currentDate = new Date();
const formattedDate = format(currentDate, 'yyyy-MM-dd');
setGetTransDate(formattedDate);

  },[])



  const handlePrices = (weight, receive_branch_id, courier_cate_id) => {
   // setTrans_weight(weight)

  


    //console.log("ok")

    if(receive_branch_id && branch_id && weight && courier_cate_id){
      // console.log("All Triips",view_all_trips);
      const get_trip = view_all_trips.find((trip) => trip.from_branch_id == branch_id  && trip.to_branch_id == receive_branch_id && trip.is_active == "YES")


       //console.log("tripp",get_trip);

     

      if(get_trip){
       setTrip_setup_id(get_trip.id)

      // console.log("trip_idddd",get_trip.id)
      
 
       const get_courier_price = view_all_courier_prices.find(cp => cp.trip_setup_id == get_trip.id && cp.courier_cate_id == courier_cate_id && cp.weight == weight && cp.is_active == "YES")  

       

       //Check to get the max weight
       const getValues = view_all_courier_prices.filter(mcp => mcp.trip_setup_id == get_trip.id && mcp.courier_cate_id == courier_cate_id && mcp.is_active == "YES" )
       //const max = getValues.reduce((a, b) => { return Math.max(a.weight, b.weight) });
       let max = 0;
       let max_price = 0;

       console.log("length", getValues.length);

       for(let i = 0; i < getValues.length; i++){
       // console.log("mmmmmmmmmmmmmm",parseInt(getValues[i].weight))

          if(parseInt(getValues[i].weight) > max){
            max =  getValues[i].weight
            max_price =  getValues[i].price
          }
       }

  
       
       // console.log("booooooooooool",trans_weight, max)
         if(parseInt(weight) > parseInt(max)) {

           //get the max weight
          // setTrans_getPrice(max)
           setCourierPrice(max_price);

           //query to find the extra charge
           const getExtraPrice = view_all_extra_prices.find(ep => ep.trip_setup_id == get_trip.id && ep.courier_cate_id == courier_cate_id)

           console.log("Extra Pricee", view_all_extra_prices)

           if(getExtraPrice){
           setCourierExtraPrice(getExtraPrice.price)
           }else {
             setCourierExtraPrice(0)
           }
         
         }  else {
           //If Not Greater Than Max Weight
           setCourierExtraPrice(0)
           setCourierPrice(get_courier_price.price)
         }
         
   

        const total_price = parseFloat(courierPrice) + parseFloat(courierExtraPrice);
        setTotalPrice(parseFloat(total_price));


      }else{
        setTrip_setup_err("Please Ensure That Trip Is Setup")
      }
      
   }
  }





  const initialValues = {
    "transaction_detail":{

      item_description:"",
      inqueue_date:gettransDate,
      courier_cate_id:"",
      trip_setup_id:"",
      branch_id:branch_id,
      receive_branch_id:"",
      weight:"",
      price: "",
      extra_price:"",
      total_cost:"",
      courier_stage:"",
      payment_status:"",
      // receipt_number:"",

    },


    "sec":{
      security_question_id:"",
      answer:"",


    },


    "sender":{
      fname:"",
      lname:"",
      contact: "",
      email:"",
      id_type_id:null,
      id_number:"",
      branch_id:branch_id,
      id:""
     },

     "receiver":{
      fname:"",
      lname:"",
      contact: "",
      email:"",
      id_type_id:"",
      id_number:"",
      branch_id:"",
      id:""
     },
  };







  const validationSchema = Yup.object({
   
   
    transaction_detail: Yup.object({

      item_description: Yup.string().max(500, "Item Description Exceeds The Maximum Length").required("Item Description Is Required"),
      inqueue_date: Yup.date().required("Transaction Date Is Required"),
      courier_cate_id: Yup.string().required("Courier Category Is Required"),   
      //trip_setup_id: Yup.string().required("Please Select Trip"), 
      receive_branch_id: Yup.string().required("Branch Reciving Package"),
      weight: Yup.number().required("Weight is required").positive(),
      price: Yup.number().required("Price is required").positive(),
      extra_price: Yup.number().required("Extra Price is required"),
      total_cost: Yup.number().moreThan(0, 'Please Ensure That Courier Prices Are Setup Well').required("Total Price is required").positive(),
   }),




   sec: Yup.object({

    security_question_id: Yup.string().required("Security Question Is Required"),
    answer:Yup.string().max(500,"Answer Exceeds The Maximum Length").required("Answer Is Required"),
  
 }),





   sender: Yup.object({

    fname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("First Name Is Required"),
    lname: Yup.string().max(200, "Last Name Exceeds The Maximum Length").required("Last Name Is Required"),
    contact: Yup.string().required("Sender's Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 15 digits"),
    email: Yup.string().required("Sender's Email is required").email("Invalid email address"),
    id_type_id: Yup.string().notRequired(),
    id_number: senderIdType ? Yup.string().required("Id Number Is Required") : Yup.string().notRequired(),
 }),


 receiver: Yup.object({

  fname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("First Name Is Required"),
  lname: Yup.string().max(200, "Last Name Exceeds The Maximum Length").required("Last Name Is Required"),
  contact: Yup.string().required("Sender's Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 15 digits"),
  email: Yup.string().notRequired().email("Invalid email address"),
  id_type_id: Yup.string().required("Id Type Is Required"),
  id_number: Yup.string().required("Id Number Is Required"),
}),


  });






  
const  senderSchema = Yup.object({
    sender: Yup.object({
      fname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("First Name Is Required"),
      lname: Yup.string().max(200, "Last Name Exceeds The Maximum Length").required("Last Name Is Required"),
      contact: Yup.string().required("Sender's Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 15 digits"),
      email: Yup.string().notRequired().email("Invalid email address"),
      id_type_id: Yup.string().notRequired(),
      id_number: senderIdType  ? Yup.string().required("Id Number Is Required") : Yup.string().notRequired(),
   }),
  });




  



  const receiverSchema = Yup.object({
    receiver: Yup.object({
      fname: Yup.string().max(200, "First Name Exceeds The Maximum Length").required("First Name Is Required"),
      lname: Yup.string().max(200, "Last Name Exceeds The Maximum Length").required("Last Name Is Required"),
      contact: Yup.string().required("Sender's Telephone is required").matches(phoneRegExp, "Phone number is not valid").min(9, "Should not be less than 10 digits").max(15, "Should not be more than 15 digits"),
      email: Yup.string().notRequired().email("Invalid email address"),
      id_type_id: Yup.string().required("Id Type Is Required"),
      id_number: Yup.string().required("Id Number Is Required"),
   }),
  });




  


  const transactionDetailSchema = Yup.object({

    transaction_detail: Yup.object({

      item_description: Yup.string().max(500, "Item Description Exceeds The Maximum Length").required("Item Description Is Required"),
      inqueue_date: Yup.date().required("Transaction Date Is Required"),
      courier_cate_id: Yup.string().required("Courier Category Is Required"),   
      //trip_setup_id: Yup.string().required("Please Select Trip"), 
      receive_branch_id: Yup.string().required("Branch Reciving Package"),
      weight: Yup.number().required("Weight is required").positive(),
      price: Yup.number().required("Price is required").positive(),
      extra_price: Yup.number().required("Extra Price is required"),
      total_cost: Yup.number().required("Total Price is required").positive(),
   }),

    });






    const secSchema = Yup.object({

      sec: Yup.object({
  
    
        security_question_id: Yup.string().required("Security Question Is Required"),
        answer:Yup.string().max(500,"Answer Exceeds The Maximum Length").required("Answer Is Required"),
     }),
  
      });





      
      const navigate = useNavigate();



    const onSubmit =  async (values, onSubmitProps)  => {
      //useMutation(addUserSupport)
       //console.log("Form Data", values)
       values.transaction_detail.security_question_id = values.sec.security_question_id
       values.transaction_detail.answer = values.sec.answer
       values.transaction_detail.total_cost = parseFloat(values.transaction_detail.total_cost).toFixed(2);
      //  const date = parseISO(values.transaction_detail.trans_date)
      //  values.transaction_detail.trans_date = format(date, 'yyyy-mm-dd');
      // mutate(values);
       
       try{
      
        const data= await addNewTransaction(values).unwrap()
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        //console.log(data);

        successNotification(`Courier Setup Successfully, Tracking Number Is ${data.tracking_number}`);   
       localStorage.setItem("track_rep", JSON.stringify(data))
       setOpenModal(false)
        navigate("/bill");
      
       }catch(error){
        console.log(error)
        if(Array.isArray(error?.data.message))
        {
         errorNotification(error?.data.message[0])
        }else{
          errorNotification(error?.data.message)
        }
       }
      
      //  onClear()
    
    }


    // const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'TYPESCRIPT', 'REACT']

    const getCustomers = data_cust?.map((myCust) => ({
         "id": `${myCust.id}`,
         "label": `${myCust.fname} - ${myCust.lname} - ${myCust.contact} - ${myCust.email}`
    }))
    //console.log(value);

  return (

    <>
       <Link to="#" className='p-2 mr-3 text-passionGreen text-2xl' title="Send Package" onClick={() => setOpenModal(true)}>
        <FaPlaneDeparture />
      </Link>
     
    
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
      <Modal.Header>Courier</Modal.Header>
        <Modal.Body>
        <MultiStepForm  initialValues={initialValues}  onSubmit={onSubmit}>

      <FormStep stepName="Sender" onSubmit={() => {}} className="flex max-w-full flex-col gap-4" validationSchema={senderSchema}>

      <div className='flex w-full gap-5 items-start justify-between mb-3'>

        <div className='w-full'>
            <div className="mb-2 block">
              {/* <Label htmlFor="searchSender" value="Search Sender" /> */}
                <div className='font-semibold text-sm'>Search Sender</div>
            </div>
            {/* <div>
            <Autocomplete
             options ={skills}
             renderInput={(params) => <TextField {...params} />}
             //value={value}
             onChange={(event, newValue) => setValue(newValue)}
            />
            </div> */}

           <div>
            <Autocomplete
             options ={getCustomers}
             renderInput={(params) => <TextField {...params} />}
             //value={value}
             onChange={(event, newValue) => setGetCustSender(newValue.id)}
            />
            </div>
  

       
            {/* <ErrorMessage name="sender[0].fname" component={TextError} /> */}
          </div>
        </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="fname" value="First Name *"/> */}
              <div className='font-semibold text-sm'>First Name <span className="text-passionRed">*</span></div>
            </div>
           

            <Field className="formInput" name="sender.fname">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)

                    custSender ?  form.values.sender.fname = view_send_cust?.fname : form.values.sender.fname;
                    form.values.sender.branch_id =  branch_id;
                    form.values.sender.id =  custSender;
                       return <>

                <TextInput name="sender.fname" 
              type="text" 
              placeholder="First Name"
              readOnly={custSender ? true : false}
              required 
              value={form.values.sender.fname} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.fname" component={TextError} />
          </div>

          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="lname" value="Last Name" /> */}
              <div className='font-semibold text-sm'>Last Name <span className="text-passionRed">*</span></div>
            </div>
            <Field className="formInput" name="sender.lname">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custSender ?  form.values.sender.lname = view_send_cust?.lname : form.values.sender.lname;

                       return <>

                <TextInput name="sender.lname" 
              type="text" 
              placeholder="Last Name" 
              required 
              readOnly={custSender ? true : false}
              value={form.values.sender.lname} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.lname" component={TextError} />
          </div>

          </div>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="contact" value="Telephone" /> */}
              <div className='font-semibold text-sm'>Telephone <span className="text-passionRed">*</span></div>
            </div>
            <Field className="formInput" name="sender.contact">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custSender ?  form.values.sender.contact = view_send_cust?.contact : form.values.sender.contact;

                       return <>

                <TextInput name="sender.contact" 
              type="text" 
              placeholder="Sender's Telephone Number" 
              required 
              value={form.values.sender.contact} 
              onChange={form.handleChange}
              readOnly={custSender ? true : false}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.contact" component={TextError} />
          </div>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="email" value="Email" /> */}
              <div className='font-semibold text-sm'>Email</div>
            </div>
            <Field className="formInput" name="sender.email">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custSender ?  form.values.sender.email = view_send_cust?.email : form.values.sender.email;

                       return <>

                <TextInput name="sender.email" 
              type="text" 
              placeholder="Email" 
              value={form.values.sender.email} 
              onChange={form.handleChange}
              readOnly={custSender ? true : false}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.email" component={TextError} />
          </div>
           
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="id_type_id" value="Id Type" /> */}
                <div className='font-semibold text-sm'>ID Type</div>
                </div>
                <Field className="formInput" name="sender.id_type_id">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)

                custSender ?  form.values.sender.id_type_id = view_send_cust?.id_type_id : form.values.sender.id_type_id;
                getSenderTypeId(form.values.sender.id_type_id)

                       return <>

               <Select 
                  id="id_type_id" 
                  name="sender.id_type_id" 
                  value={form.values.sender.id_type_id} 
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                    <option value="">-- Choose An Id Type --</option>
                    {
                        data_idType?.map((d) => {
                            return <option value={d.id} key={d.id} >{d.id_type}</option>
                        })
                    }
                </Select>

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.id_type_id" component={TextError} />
             
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="id_number" value="Id Number" /> */}
                <div className='font-semibold text-sm'>ID Number</div>
                </div>
                <Field className="formInput" name="sender.id_number">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custSender ?  form.values.sender.id_number = view_send_cust?.id_number : form.values.sender.id_number;

                       return <>

                <TextInput name="sender.id_number" 
              type="text" 
              placeholder="Id Number" 
              value={form.values.sender.id_number} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sender.id_number" component={TextError} />
            </div>
          </div>


        

          {/* <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button> */}
      </FormStep>








      <FormStep stepName="Receiver" onSubmit={() => {}} className="flex max-w-full flex-col gap-4" validationSchema={receiverSchema}>


      <div className='flex w-full gap-5 items-start justify-between mb-3'>
      <div className='w-full'>
            <div className="mb-2 block">
              {/* <Label htmlFor="searchReceiver" value="Search Receiver" /> */}
              <div className='font-semibold text-sm'>Search Receiver</div>
            </div>
            {/* <div>
            <Autocomplete
             options ={skills}
             renderInput={(params) => <TextField {...params} />}
             //value={value}
             onChange={(event, newValue) => setValue(newValue)}
            />
            </div> */}

           <div>
            <Autocomplete
             options ={getCustomers}
             renderInput={(params) => <TextField {...params} />}
             //value={value}
             onChange={(event, newValue) => setGetCustReceiver(newValue.id)}
            />
            </div>
  

       
            {/* <ErrorMessage name="sender[0].fname" component={TextError} /> */}
          </div>
        </div>



          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="fname" value="First Name" /> */}
              <div className='font-semibold text-sm'>First Name <span className="text-passionRed">*</span></div>
            </div>
           

            <Field className="formInput" name="receiver.fname">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)

                    custReceiver ?  form.values.receiver.fname = view_receive_cust?.fname : form.values.receiver.fname;
                    form.values.receiver.id =  custReceiver;
                       return <>

                <TextInput name="receiver.fname" 
              type="text" 
              placeholder="First Name" 
              required 
              value={form.values.receiver.fname} 
              onChange={form.handleChange}
              readOnly={custReceiver ? true : false}
              onBlur={form.handleBlur}  />
          

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.fname" component={TextError} />
          </div>

          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="lname" value="Last Name" /> */}
              <div className='font-semibold text-sm'>Last Name <span className="text-passionRed">*</span></div>
            </div>
            <Field className="formInput" name="receiver.lname">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custReceiver ?  form.values.receiver.lname = view_receive_cust?.lname : form.values.receiver.lname;

                       return <>

                <TextInput name="receiver.lname" 
              type="text" 
              placeholder="Last Name" 
              required 
              readOnly={custReceiver ? true : false}
              value={form.values.receiver.lname} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.lname" component={TextError} />
          </div>

          </div>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="contact" value="Telephone" /> */}
              <div className='font-semibold text-sm'>Telephone <span className="text-passionRed">*</span></div>
            </div>
            <Field className="formInput" name="receiver.contact">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custReceiver ?  form.values.receiver.contact = view_receive_cust?.contact : form.values.receiver.contact;

                       return <>

                <TextInput name="receiver.contact" 
              type="text" 
              placeholder="Contact Name" 
              required 
              value={form.values.receiver.contact} 
              readOnly={custReceiver ? true : false}
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.contact" component={TextError} />
          </div>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="email" value="Email" /> */}
              <div className='font-semibold text-sm'>Email</div>
            </div>
            <Field className="formInput" name="receiver.email">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custReceiver ?  form.values.receiver.email = view_receive_cust?.email : form.values.receiver.email;

                       return <>

                <TextInput name="receiver.email" 
              type="text" 
              placeholder="Email" 
              // required 
              value={form.values.receiver.email} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.email" component={TextError} />
          </div>
           
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="id_type_id" value="Id Type" /> */}
                <div>ID Type <span className="text-passionRed">*</span></div>
                </div>
                <Field className="formInput" name="receiver.id_type_id">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custReceiver ?  form.values.receiver.id_type_id = view_receive_cust?.id_type_id : form.values.receiver.id_type_id;

                       return <>

               <Select 
                  id="id_type_id" 
                  name="receiver.id_type_id" 
                  required
                  value={form.values.receiver.id_type_id} 
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                    <option value="">-- Choose An Id Type --</option>
                    {
                        data_idType?.map((d) => {
                            return <option value={d.id} key={d.id} >{d.id_type}</option>
                        })
                    }
                </Select>

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.id_type_id" component={TextError} />
             
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="id_number" value="Id Number" /> */}
                <div className='font-semibold text-sm'>ID Number <span className="text-passionRed">*</span></div>
                </div>
                <Field className="formInput" name="receiver.id_number">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    custReceiver ?  form.values.receiver.id_number = view_receive_cust?.id_number : form.values.receiver.id_number;
                       return <>

                <TextInput name="receiver.id_number" 
              type="text" 
              placeholder="Id Number" 
              required 
              value={form.values.receiver.id_number} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="receiver.id_number" component={TextError} />
            </div>
          </div>


        

          {/* <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button> */}
      </FormStep>









      <FormStep stepName="Examine Package" onSubmit={() => {}} className="flex max-w-full flex-col gap-4" validationSchema={transactionDetailSchema}>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="item_description" value="Item Description" /> */}
              <div className='font-semibold text-sm'>Item Description <span className="text-passionRed">*</span></div>
            </div>
           

            <Field className="formInput" name="transaction_detail.item_description">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                       return <>

                <TextInput name="transaction_detail.item_description" 
              type="text" 
              placeholder="Item Description" 
              required 
              value={form.values.transaction_detail.item_description} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

            {/* <TrixEditor
                    {...field}
                    id="content"
                    onBlur={() => form.setFieldTouched('transaction_detail.item_description', true)}
                    className={`form-input block w-full border ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring focus:border-blue-300`}
                  /> */}

              

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.item_description" component={TextError} />
          </div>

          <div className='w-1/2'>
            <div className="mb-2 block">
              {/* <Label htmlFor="inqueue_date" value="Date" /> */}
              <div className='font-semibold text-sm'>Date <span className="text-passionRed">*</span></div>
            </div>
            <Field className="formInput" name="transaction_detail.inqueue_date">
                {
                  (props) => {
                       const {form,meta, field, error} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                       return <>

                 
                <TextInput name="transaction_detail.inqueue_date" 
              type="date" 
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="Date" 
              readOnly
              required 
              value={form.values.transaction_detail.inqueue_date} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.inqueue_date" component={TextError} />
          </div>

          </div>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="courier_cate_id" value="Courier Category" /> */}
                <div className='font-semibold text-sm'>Courier Category <span className="text-passionRed">*</span></div>
                </div>
                <Field className="formInput" name="transaction_detail.courier_cate_id">
                {
                  (props) => {
                       const {form,meta, field, error} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                 //   console.log("errr",form.errors.transaction_detail.courier_cate_id)

                  //  console.log("Courier Cateeeeeee",form.values.transaction_detail.courier_cate_id)
                       return <>

               <Select 
                 // id="courier_cate_id" 
                  name="transaction_detail.courier_cate_id" 
                  required
                  value={form.values.transaction_detail.courier_cate_id} 
                  onChange={form.handleChange}
                  //onBlur={setCourier_cate_id(form.values.transaction_detail.courier_cate_id)}
                  onBlur={form.handleBlur}
                >
                    <option value="">-- Choose A  Courier Category --</option>
                    {
                        data_courier_cate?.map((d) => {
                            return <option value={d.id} key={d.id} >{d.courier_cate}</option>
                        })
                    }
                </Select>

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.courier_cate_id" component={TextError} />
             
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="receive_branch_id" value="Receiving Branch" /> */}
                <div className='font-semibold text-sm'>Receiving Branch <span className="text-passionRed">*</span></div>
                </div>
                <Field className="formInput" name="transaction_detail.receive_branch_id">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)

                   // console.log("receiiii", form.values.transaction_detail.receive_branch_id)
                       return <>

               <Select 
                  //id="receive_branch_id" 
                  name="transaction_detail.receive_branch_id" 
                  required
                  value={form.values.transaction_detail.receive_branch_id} 
                  onChange={form.handleChange}
                  //onBlur={setTrans_receiving_branch_id(form.values.transaction_detail.receive_branch_id)}
                  onBlur={form.handleBlur}
                >
                    <option value="">-- Choose A Receiving Branch --</option>
                    {
                        data_branch?.map((d) => {
                            return <option value={d.id} key={d.id} >{d.branch}</option>
                        })
                    }
                </Select>

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.receive_branch_id" component={TextError} />
             
            </div>

           
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="weight" value="Weight" /> */}
                <div className='font-semibold text-sm'>Weight <span className="text-passionRed">*</span></div>
                </div>
                <Field className="formInput" name="transaction_detail.weight">
                {
                  (props) => {
                       const {form,meta, field, error} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                      
                    //form.values.transaction_detail.weight ? form.values.transaction_detail.trip_setup_id = trip_setup_id : "";
                   // form.values.transaction_detail.weight ? form.values.transaction_detail.price = courierPrice : "";
                    //form.values.transaction_detail.weight ? form.values.transaction_detail.extra_price = courierExtraPrice : "";
                    //form.values.transaction_detail.weight ? form.values.transaction_detail.total_cost = totalPrice : "";
                      // form.values.transaction_detail.weight = trans_weight
                     let courier_cate_id, receive_branch_idd, weightt = null

                      form.values.transaction_detail.courier_cate_id ? courier_cate_id = form.values.transaction_detail.courier_cate_id : null;
                      
                      form.values.transaction_detail.receive_branch_id ? receive_branch_idd = form.values.transaction_detail.receive_branch_id : null;

                      form.values.transaction_detail.weight ? weightt = form.values.transaction_detail.weight : null;

                      form.values.receiver.branch_id = receive_branch_idd

                      if(courier_cate_id && receive_branch_idd && weightt) {
                        handlePrices(weightt, receive_branch_idd, courier_cate_id)
                      }
                       return <>

                <TextInput name="transaction_detail.weight" 
              type="number" 
              placeholder="Weight" 
              required 
              value={form.values.transaction_detail.weight} 
              onChange={form.handleChange}
              //onBlur={handlePrices(form.values.transaction_detail.weight)} 
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.weight" component={TextError} />
            <div className="error">{errorPrice}</div>
            
            </div>






            <div className='w-1/2'>
                <Field className="formInput" name="transaction_detail.trip_setup_id">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                   // form.values.transaction_detail.trip_setup_id = data_courier_price_info?.data.trip_setup_id;

                   form.values.transaction_detail.trip_setup_id = trip_setup_id
                  //  console.log("trip_setup_form",form.values.transaction_detail.trip_setup_id)
             

                       return <>

                <TextInput name="transaction_detail.trip_setup_id" 
              type="hidden" 
              placeholder="Trip Setup" 
              required 
              value={form.values.transaction_detail.trip_setup_id} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.trip_setup_id" component={TextError} />
            </div>




            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="price" value="Price" /> */}
                <div className='font-semibold text-sm'>Price</div>
                </div>
                <Field className="formInput" name="transaction_detail.price">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    form.values.transaction_detail.price = courierPrice
                       return <>

                <TextInput name="transaction_detail.price" 
              type="number" 
              placeholder="Price" 
              step="0.01"
              readOnly
              required 
              value={form.values.transaction_detail.price} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.price" component={TextError} />
            </div>



            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="extra_price" value="Extra Price" /> */}
                <div className='font-semibold text-sm'>Extra Price</div>
                </div>
                <Field className="formInput" name="transaction_detail.extra_price">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                    //form.values.transaction_detail.extra_price = data_courier_price_info?.data.extra_price;
                    form.values.transaction_detail.extra_price = parseFloat(courierExtraPrice)
                       return <>

                <TextInput name="transaction_detail.extra_price" 
              type="number" 
              placeholder="Extra Price" 
              step="0.01"
              readOnly
              required 
              value={form.values.transaction_detail.extra_price} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.extra_price" component={TextError} />
            </div>
          </div>



          <div className='flex w-full gap-5 items-start justify-between mb-3'>

          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="total_price" value="Total Cost" /> */}
                <div className='font-semibold text-sm'>Total Cost</div>
                </div>
                <Field className="formInput" name="transaction_detail.total_cost">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)


                 //form.values.transaction_detail.total_cost = data_courier_price_info?.data.total_price;
                 form.values.transaction_detail.total_cost = totalPrice 
                 form.values.transaction_detail.courier_stage = COURIER_STAGES.INQUEUE;
                 form.values.transaction_detail.payment_status = PAYMENT_STATUS.PENDING;
                       return <>

                <TextInput name="transaction_detail.total_cost" 
              type="number" 
              placeholder="Total Cost" 
              step="0.01"
              readOnly
              required 
              value={form.values.transaction_detail.total_cost} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="transaction_detail.total_cost" component={TextError} />
            </div>

          </div>


        

          {/* <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button> */}
      </FormStep>
















      <FormStep stepName="Security Question" onSubmit={() => {}} className="flex max-w-full flex-col gap-4" validationSchema={secSchema}>
 
          <div className='flex w-full gap-5 items-start justify-between mb-3'>


          <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="security_question_id" value="Security Question" /> */}
                <div className='font-semibold text-sm'>Security Question</div>
                </div>
                <Field className="formInput" name="sec.security_question_id">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                       return <>

               <Select 
                  id="courier_cate_id" 
                  name="sec.security_question_id" 
                  required
                  value={form.values.sec.security_question_id} 
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                    <option value="">-- Choose A Security Question --</option>
                    {
                        data_security?.map((d) => {
                            return <option value={d.id} key={d.id} >{d.security_question}</option>
                        })
                    }
                </Select>

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sec.security_question_id" component={TextError} />
             
            </div>



            <div className='w-1/2'>
                <div className="mb-2 block">
                {/* <Label htmlFor="answer" value="Answer" /> */}
                <div className='font-semibold text-sm'>Answer</div>
                </div>
                <Field className="formInput" name="sec.answer">
                {
                  (props) => {
                       const {form,meta, field} = props
                      // console.log(form);
                     // console.log('Render Props', props)
                    // console.log("form", form)
                       return <>

                <TextInput name="sec.answer" 
              type="text" 
              placeholder="Answer" 
              required 
              value={form.values.sec.answer} 
              onChange={form.handleChange}
              onBlur={form.handleBlur}  />

                       </>
                  }
                }
            </Field>
       
            <ErrorMessage name="sec.answer" component={TextError} />
            </div>
 

           
          </div>

     




        

          {/* <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button> */}
      </FormStep>



      </MultiStepForm>
      </Modal.Body>
 
      </Modal>
    
     
    </>


  );
}
