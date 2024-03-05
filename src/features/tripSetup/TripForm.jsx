import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Label, TextInput, Checkbox, Select } from 'flowbite-react';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useQueryClient} from "react-query";
import {successNotification  } from  "../../otherFunc/notification";
import {errorNotification  } from '../../otherFunc/notification';
import { useMutationInitialInsert, useSingleData, useQueryData  } from "../../hooks/useQueryy";
import useAuth from '../../hooks/useAuth';
import {MODALNAMES} from "../../otherFunc/customDataTypes";
// import { useQuery} from "react-query"

import { useSelector } from 'react-redux';
import { selectTripById, useAddNewTripMutation, useUpdateTripMutation } from './tripApiSlice';
import { selectIsEdit, selectPage, selectId} from '../../features/auth/authSlice';
import { selectAllBranchs } from '../branch/branchApiSlice';

const URL = "/trip-setup";
const BRANCHURL = "/branch";

export default function TripForm({handleCloseModal}) {

  // const axiosPrivate = useAxiosPrivate();
  // const queryClient = useQueryClient();
  // const {isEdit, setIsEdit} = useAuth();

  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const selectIdd = useSelector(selectId);
  const view_trip = useSelector((state) => selectTripById(state, selectIdd))

  const data_all_branch = useSelector(selectAllBranchs);
  const data_branch = data_all_branch.filter(branch => branch.is_active === "YES");

  const [addNewTrip, {isLoading}] = useAddNewTripMutation();
  const [updateTrip, {isLoading:updateLoading}] = useUpdateTripMutation();


//     //Get Courier Type - Combo Box
//     const performGetBranch = (id) => {
//       return axiosPrivate.get(`${BRANCHURL}`);
//     }
  
//     const onSuccessCourierCate = () => {}
//     const onErrorCourierCate = () => {}
//    const {data:data_branch} = useQueryData("combo-branch",performGetBranch,onSuccessCourierCate, onErrorCourierCate)

//   const performEditTrip = (id) => {
//     return axiosPrivate.get(`${URL}/${id}`);
//   }

// //View Info For Editing
//   const onSuccessView = (data) => {
//     if(isEdit.isEdit === true && isEdit.page === MODALNAMES.TRIPMODAL){
//       formik.values.trip_name = data?.data?.trip_name;
//       formik.values.duration = data?.data?.duration;
//       formik.values.from_branch_id = data?.data?.from_branch_id;
//       formik.values.to_branch_id = data?.data?.to_branch_id;
//       formik.values.is_active = data?.data?.is_active === "YES" ? true : false;
//     }
//     console.log(data)
// };
// const onErrorView = (error) => {
//     console.log("error",error);
//    // navigate("/login", {state: {from: location}, replace:true})
// };


// const {isLoading:isLoading1, data:data1, isError:isError1, error:error1, isFetching:isFetching1, refetch:refetch} = useSingleData('get-tripEdit','get-trip',isEdit.id,performEditTrip,onSuccessView, onErrorView);

//   const performInTrip = (trip_data) => {
//     if(isEdit.isEdit === false){
//     return axiosPrivate.post(URL, trip_data, {
//       headers: {'Content-Type': "application/json"},
//       withCredentials: true
//     });
//   } else {

//     return axiosPrivate.patch(`${URL}/${isEdit.id}`, trip_data, {
//       headers: {'Content-Type': "application/json"},
//       withCredentials: true
//     });

//   }
//   }


//   const onSuccess = (data, variables) => {
//     if(isEdit.isEdit === false){

//     queryClient.setQueryData('get-trip', (oldQueryData) => {
//       return {
//        ...oldQueryData,
//        data: [...oldQueryData.data, data.data]
//       }
    
//     })


//     successNotification("Trip Added Successfully");

//     formik.isSubmitting = false;
//     formik.setSubmitting = false;
//     formik.resetForm();

//   } else {

//     queryClient.invalidateQueries(["get-trip"]);
//     successNotification("Trip Updated Successfully");

//     formik.isSubmitting = false;
//     formik.setSubmitting = false;
//     setIsEdit({isEdit:false, page:"", id:""})
//     handleCloseModal();


//   }


   
 
    

      
//   }

//   const onError = (error) => {
 
//   // console.log("errrrr",error)
//    errorNotification(error.response.data.message)

//   }

//   const {mutate,data, isLoading, Loading, isError, error} = useMutationInitialInsert(performInTrip, onSuccess, onError);


  const formik = useFormik({
      initialValues: {
        trip_name: selectPagee === MODALNAMES.TRIPMODAL ? view_trip?.trip_name : "",
        duration: selectPagee === MODALNAMES.TRIPMODAL ? view_trip?.duration : "",
        from_branch_id: selectPagee === MODALNAMES.TRIPMODAL ? view_trip?.from_branch_id.toLowerCase() : "",
        to_branch_id: selectPagee === MODALNAMES.TRIPMODAL ? view_trip?.to_branch_id.toLowerCase() : "",
        is_active: selectPagee === MODALNAMES.TRIPMODAL ? view_trip?.is_active === "YES" ? true : false : true
      },
      onSubmit: async (values,onSubmitProps) => {
        //  console.log('onSubmit', values)
          
          values.is_active = values.is_active === true ? "YES" : "NO";

          if(selectPagee === MODALNAMES.TRIPMODAL){


            values.id = selectIdd
  
            
            try{
  
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              await updateTrip(values).unwrap()
              successNotification("Trip Setup Updated Successfully");
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
              await addNewTrip(values).unwrap()
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              successNotification("Trip Setup Added Successfully");
  
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
        trip_name: Yup.string().required("Trip Name is required"),
        duration: Yup.string().required("Trip Duration is required"),
        from_branch_id: Yup.string().required("Where is the Trip From?"),
        to_branch_id: Yup.string().required("Where is the Trip To?")
      })
  });

  return (
    <>
      <form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
            <div className='w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="trip_name" value="Trip Name" />
              </div>
              <TextInput 
                id="trip_name"
                name="trip_name" 
                type="text" 
                placeholder="Trip Name" 
                required 
                value={formik.values.trip_name} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.trip_name && formik.touched.trip_name && formik.errors.trip_name}</div>
            </div>

            
            <div className='w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="duration" value="Duration" />
              </div>
              <TextInput 
                id="duration"
                name="duration" 
                type="text" 
                placeholder="Duration" 
                required 
                value={formik.values.duration} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">{formik.errors.duration && formik.touched.duration && formik.errors.duration}</div>
            </div>
          </div>
          <div className='flex w-full gap-5 items-start justify-between mb-3'>
          <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="from_branch_id" value="From Branch" />
                </div>
                <Select 
                  id="from_branch_id" 
                  name="from_branch_id" 
                  required
                  value={formik.values.from_branch_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose A From Branch --</option>
                    {
                        data_branch?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.branch}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.from_branch_id && formik.touched.from_branch_id && formik.errors.from_branch_id}</div>
            </div>
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="to_branch_id" value="To Branch" />
                </div>
                <Select 
                  id="to_branch_id" 
                  name="to_branch_id" 
                  required
                  value={formik.values.to_branch_id} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">-- Choose A From Branch --</option>
                    {
                        data_branch?.map((d) => {
                            return <option value={d.id} key={d.id}>{d.branch}</option>
                        })
                    }
                </Select>
                <div className="error">{formik.errors.to_branch_id && formik.touched.to_branch_id && formik.errors.to_branch_id}</div>
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
          <Button type='submit'>{!isEdit ? "Submit" : "Update"}</Button>
      </form>
    </>
  );
}
