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
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';
import { selectAllCourierTypes } from '../courierType/courierTypeApiSlice';
import { selectAllConsolidatedPackages, selectConsolidatedPackageById, useAddNewConsolidatedPackageMutation, useUpdateConsolidatedPackageMutation } from './consolidatedPackageApiSlice';
import { selectAllTransactions } from '../transaction/transactionApiSlice';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const URL = "/courier-cate";
const COURIERTYPEURL = "/courier-type/allCourierType";

export default function ConsolidatedPackageForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();
  const [transactionDetailCombo, setTransactionDetailCombo] = useState()

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_consolidate_package = useSelector((state) => selectConsolidatedPackageById(state, selectIdd))
  const data_trans_det = useSelector(selectAllTransactions);
  const get_cons_trans = useSelector(selectAllConsolidatedPackages);
  const data_trans = get_cons_trans.filter((info) => info.transaction_detail_id);
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  
  





  const [addNewConsolidatedPackage, {isLoading}] = useAddNewConsolidatedPackageMutation();
  const [updateConsolidatedPackage, {isLoading:updateLoading}] = useUpdateConsolidatedPackageMutation();

   const getTransDetail = () => {
    const getTransNotInCons = data_trans_det.filter((info) => !data_trans.includes(info.id));
    setTransactionDetailCombo(getTransNotInCons)
   }

   useEffect(() => {

    getTransDetail();

   },[])

  const formik = useFormik({
      initialValues: {
        transaction_detail_id:  selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES ? view_consolidate_package?.transaction_detail_id : null,
        flight_number: selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES ? view_consolidate_package?.flight_number : "",
        consolidated_date: selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES ? view_consolidate_package?.consolidated_date : formattedDate
      },
      onSubmit: async (values, onSubmitProps) => {
         // console.log('onSubmit', values)

         if(selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES){


          values.id = selectIdd



          
          try{

            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            await updateConsolidatedPackage(values).unwrap()
            successNotification("Consolidated Package Updated Successfully");
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

            //values.consolidated_date = format(values.consolidated_date, 'yyyy-MM-dd');
           // values.consolidated_date = new Date(values.consolidated_date);

          try{
            await addNewConsolidatedPackage(values).unwrap()
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            getTransDetail()
            successNotification("Consolidated Package Added Successfully");


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
        transaction_detail_id: selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES ? Yup.string().required("Transaction Detail is required") : Yup.array().required("Transaction Detail is required"),
        flight_number: Yup.string().required("Flight Number is required"),
        consolidated_date: Yup.date().required("Consolidated Date is required"),
      })
  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="transaction_detail_id" value="Transaction Detail" />
                </div>
                <Select 
                  id="transaction_detail_id" 
                  name="transaction_detail_id" 
                  multiple
                  required
                  value={formik.values.transaction_detail_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Choose a Type --</option>
                  {
                      transactionDetailCombo?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.tracking_number} - {d.receiver_branch.branch}</option>
                      })
                  }
                </Select> 
                <div className="error">{formik.errors.transaction_detail_id && formik.touched.transaction_detail_id && formik.errors.transaction_detail_id}</div>
            </div>

            <div className='w-1/2'>
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
                <div className="error">{formik.errors.flight_number && formik.touched.flight_number && formik.errors.flight_number}</div>
            </div>
          </div>
          <div className='flex w-full gap-5 items-center justify-normal'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="consolidated_date" value="Consolidated Date" />
                </div>
                <TextInput 
                  id="consolidated_date" 
                  name="consolidated_date" 
                  type="date" 
                  placeholder="Consolidated Date" 
                  required 
                  value={formik.values.consolidated_date} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.consolidated_date && formik.touched.consolidated_date && formik.errors.consolidated_date}</div>
            </div>
          </div>
          <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
