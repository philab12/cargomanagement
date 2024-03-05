import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Label, TextInput, Select, Checkbox } from 'flowbite-react';
import { useState, useEffect } from 'react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import { useQuery} from "react-query"

import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { useSelector } from 'react-redux';
import { selectCourierPriceById, useAddNewCourierPriceMutation, useUpdateCourierPriceMutation } from './courierPriceApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';
import { selectAllCourierTypes } from '../courierType/courierTypeApiSlice';
import { selectAllCourierCategorys } from '../courierCate/courierCategoryApiSlice';
import { selectAllTrips } from '../tripSetup/tripApiSlice';
import { selectAllWeightUnits } from '../weightUnit/weightUnitApiSlice';

const URL = "/courier-price";
const COURIERTYPEURL = "/courier-type/allCourierType";
const COURIERCATEURL = "/courier-cate/allCourierCate";
const TRIPSETUPURL = "/trip-setup/allTripSetup";
const UNITTYPEURL = "/unit-type/allUnitType";

export default function CourierPriceForm({handleCloseModal}) {
  // const [getCourierType, setGetCourierType] = useState();
  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

 // const [get_courier_type, setGetCourierType] = useState([]);
  const [data_courier_cate, set_courier_cate] = useState([]);

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_courier_price = useSelector((state) => selectCourierPriceById(state, selectIdd))

  const view_all_courier_type = useSelector(selectAllCourierTypes)
  const data_courier_type = view_all_courier_type.filter(c_type => c_type.is_active === "YES");


  
  const view_all_courier_cate = useSelector(selectAllCourierCategorys)
  //const data_courier_cate = view_all_courier_cate.filter(c_cate => c_cate.is_active === "YES");
  // const data_courier_cate = view_all_courier_cate.filter(c_cate => c_cate.courier_type_id === get_courier_type);

  const view_all_trip = useSelector(selectAllTrips)
  const data_trip_setup = view_all_trip.filter(trip => trip.is_active === "YES");

  const view_all_weight_unit = useSelector(selectAllWeightUnits)
  const data_weight_unit = view_all_weight_unit.filter(w_unit => w_unit.is_active === "YES");
  

  const [addNewCourierPrice, {isLoading}] = useAddNewCourierPriceMutation();
  const [updateCourierPrice, {isLoading:updateLoading}] = useUpdateCourierPriceMutation();

  const setGetCourierType = (courier_type_id) => {
    console.log(view_all_courier_cate)

    const data_courier_cate = view_all_courier_cate.filter(c_cate => c_cate.is_active === "YES" && c_cate.courier_type_id === courier_type_id);

    // console.log(view_all_courier_cate)

    set_courier_cate(data_courier_cate)
    // console.log(data_courier_cate)

  } 


  useEffect(() => {

    if(selectPagee === MODALNAMES.COURIERPRICEMODAL){
      setGetCourierType(view_courier_price?.courier_type_id)
     // console.log(data_courier_cate)
    }
    

  },[selectPagee])



  //Get Courier Type - Combo Box
//   const performGetCourierType = (id) => {
//     return axiosPrivate.get(`${COURIERTYPEURL}`);
//   }

//   const onSuccessCourierType = () => {}
//   const onErrorCourierType = () => {}
//  const {data:data_courier_type} = useQueryData("combo-courier-type",performGetCourierType,onSuccessCourierType, onErrorCourierType)



//  //Get Courier Cate - Combo bOx
//  const get_courier_cate = (courier_type_id) => {
//   return axiosPrivate.get(`${COURIERCATEURL}/${courier_type_id}`);
// }


//  const {data:data_courier_cate} = useQuery(['combo-courier-cate', getCourierType], () => get_courier_cate(getCourierType),{
//   enabled: !!getCourierType
// });

// //Trip Setup - Combo
// const performGetTripSetup = (id) => {
//   return axiosPrivate.get(`${TRIPSETUPURL}`);
// }

// const onSuccessTripSetup = () => {}
// const onErrorTripSetup = () => {}
// const {data:data_trip_setup} = useQueryData("combo-trip-setup",performGetTripSetup,onSuccessTripSetup, onErrorTripSetup)



// //Weight Unit - Combo
// const performGetWeightUnit = (id) => {
//   return axiosPrivate.get(`${UNITTYPEURL}`);
// }

// const onSuccessWeightUnit = () => {}
// const onErrorWeightUnit = () => {}
// const {data:data_weight_unit} = useQueryData("combo-weight-unit",performGetWeightUnit,onSuccessWeightUnit, onErrorWeightUnit)


// const performEditPrice = (id) => {
//   return axiosPrivate.get(`${URL}/${id}`);
// }


//   //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.COURIERPRICEMODAL){
//       formik.values.trip_setup_id = data?.data?.trip_setup_id;
//       formik.values.courier_type_id = data?.data?.courier_type_id;
//       setGetCourierType(data?.data?.courier_type_id);
//       formik.values.courier_cate_id = data?.data?.courier_cate_id;

//       formik.values.unit_type_id = data?.data?.unit_type_id;
//       formik.values.weight = data?.data?.weight;
//       formik.values.price = data?.data?.price;
//       formik.values.insurance_price = data?.data?.insurance_price;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     //console.log(data)
// };
// const onErrorView = (error) => {
//    // console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-courierPriceEdit','get-courier-price',isEdit.id,performEditPrice,onSuccessView, onErrorView);

// const performInCourierPrice = (courier_price_data) => {
//   if(isEdit.isEdit === false){
//   return axiosPrivate.post(URL, courier_price_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });
// } else {

//   return axiosPrivate.patch(`${URL}/${isEdit.id}`, courier_price_data, {
//     headers: {'Content-Type': "application/json"},
//     withCredentials: true
//   });

// }
// }







// const onSuccess = (data, variables) => {
//   if(isEdit.isEdit === false){

//     console.log(data);

//   queryClient.setQueryData('get-courier-price', (oldQueryData) => {
//     return {
//      ...oldQueryData,
//      data: [data.data, ...oldQueryData.data]
//     }
  
//   })


//   successNotification("Courier Price Added Successfully");

//   formik.isSubmitting = false;
//   formik.setSubmitting = false;
//   formik.resetForm();

// } else {

//   queryClient.invalidateQueries(["get-courier-price"]);
//   successNotification("Courier Price Updated Successfully");

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

//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInCourierPrice, onSuccess, onError);



  const formik = useFormik({
      initialValues: {
        trip_setup_id: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.trip_setup_id : "",
        courier_type_id: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.courier_type_id : "",
        courier_cate_id: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.courier_cate_id  : "",
        unit_type_id: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.unit_type_id : "",
        weight: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.weight : "",
        price: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.price : "",
        insurance_price: selectPagee === MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.insurance_price : 0.00,
        is_active: MODALNAMES.COURIERPRICEMODAL ? view_courier_price?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values, onSubmitProps) => {
        //  console.log('onSubmit', values)
        values.is_active = values.is_active === true ? "YES" : "NO";
        values.price = parseFloat(values.price).toFixed(2);
        values.insurance_price = parseFloat(values.insurance_price).toFixed(2);
        
        if(selectPagee === MODALNAMES.COURIERPRICEMODAL){


          values.id = selectIdd

          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateCourierPrice(values).unwrap()
            successNotification("Courier Price Updated Successfully");
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
            await addNewCourierPrice(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Courier Price Added Successfully");

          }catch(error){

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
        trip_setup_id: Yup.string().required("Trips is required"),
        courier_type_id: Yup.string().required("Courier Type is required"),
        courier_cate_id: Yup.string().required("Category is required"),
        weight: Yup.string().required("Weight is required"),
        unit_type_id: Yup.string().required("Unit is required"),
        price: Yup.number().required("Price is required").positive(),
        insurance_price: Yup.number().notRequired(),
      })
  });




  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="trip_setup_id" value="Trips" />
                </div>
                <Select 
                  id="trip_setup_id" 
                  name="trip_setup_id" 
                  required
                  value={formik.values.trip_setup_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose a Trip --</option>
                    {
                        data_trip_setup?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.trip_name}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.trip_setup_id && formik.touched.trip_setup_id && formik.errors.trip_setup_id}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="courier_type_id" value="Courier Types" />
                </div>
                <Select 
                  id="courier_type_id" 
                  name="courier_type_id" 
                  required
                  value={formik.values.courier_type_id} 
                  onChange={formik.handleChange}
                  onBlur={() => setGetCourierType(formik.values.courier_type_id)}
                >
                    <option value="">-- Choose A Courier Type --</option>
                    {
                        data_courier_type?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.courier_type}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.courier_type_id && formik.touched.courier_type_id && formik.errors.courier_type_id}</div>
            </div>
          </div>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-2/4'>
                <div className="mb-2 block">
                <Label htmlFor="courier_cate_id" value="Courier Category" />
                </div>
                <Select 
                  id="courier_cate_id" 
                  name="courier_cate_id" 
                  required
                  value={formik.values.courier_cate_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose A Courier Category --</option>
                    {
                        data_courier_cate?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.courier_cate}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.courier_cate_id && formik.touched.courier_cate_id && formik.errors.courier_cate_id}</div>
            </div>
            <div className='w-1/4 ml-2'>
                <div className="mb-2 block">
                <Label htmlFor="weight" value="Weight" />
                </div>
                <TextInput 
                  id="weight" 
                  name="weight" 
                  type="number" 
                  placeholder="Weight"
                  value={formik.values.weight} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.weight && formik.touched.weight && formik.errors.weight}</div>
            </div>
            <div className='w-1/4'>
                <div className="mb-2 block">
                <Label htmlFor="unit_type_id" value="Weight Unit" />
                </div>
                <Select 
                  id="unit_type_id" 
                  name="unit_type_id" 
                  required
                  value={formik.values.unit_type_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose A Weight Unit --</option>
                    {
                        data_weight_unit?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.unit_type}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.unit_type_id && formik.touched.unit_type_id && formik.errors.unit_type_id}</div>
            </div>
          </div>

          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
                </div>
                <TextInput 
                  id="price" 
                  name="price" 
                  type="number" 
                  step="0.01"
                  placeholder="Price"
                  value={formik.values.price} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.price && formik.touched.price && formik.errors.price}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="insurance_price" value="Insurance Price" />
                </div>
                <TextInput 
                  id="insurance_price" 
                  name="insurance_price" 
                  type="number" 
                  step="0.01"
                  placeholder="Insurance Price"
                  value={formik.values.insurance_price} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.insurance_price && formik.touched.insurance_price && formik.errors.insurance_price}</div>
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

          <Button type='submit'>{!isEdit.isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
