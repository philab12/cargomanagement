import { useFormik } from 'formik'
import {useState, useEffect} from "react";
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
// import { useMutationInitialInsert } from "../../hooks/useQueryy";
// import useAuth from "../../hooks/useAuth";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import axios from "../../api/axios";

import {useDispatch, useSelector} from "react-redux"
import { selectForgotPassword, selectResetPassword, setCredentials, setForgotPassword, setResetPassword } from './authSlice';
import { useLoginMutation } from './authApiSlice';
import { errorNotification, successNotification } from '../../otherFunc/notification'; 
import usePersist from "../../hooks/usePersist"
import { useForgotUserMutation, useResetPasswordMutation, useVerifyAccountMutation, useVerifyResetLinkMutation } from '../user/userApiSlice';





// const LOGIN_URL = "/auth/login";


// const performLogin = (login) => {
//     return axios.post(LOGIN_URL, login,{
//       headers: {'Content-Type': "application/json"},
//       withCredentials: true
//     });
//   }

export default function LoginForm() {   
    
    // const {setAuth, persist, setPersist} = useAuth();
    // const [authError, setAuthError] = useState(null);
    const forgot = useSelector(selectForgotPassword);
    const resetP = useSelector(selectResetPassword);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";
    const {reset} = useParams();
    const {verify} = useParams();
 

    const [forgotUser, {isLoading:isForgotLoading}] = useForgotUserMutation();
    const [verifyResetLink, {isLoading:isResetVLoading}] = useVerifyResetLinkMutation();
    const [resetPassword, {isLoading:resetLoading}] = useResetPasswordMutation();
    const [verifyAccount, {isLoading:verifyLoading}] = useVerifyAccountMutation();


    const [login, {isLoading}] = useLoginMutation()
    const [persist, setPersist] = usePersist()

    useEffect(() => {
      const runReset = async () => {
       if(reset){
        dispatch(setResetPassword(true))
        try{
        await verifyResetLink(reset).unwrap()
        console.log(resetP);
        }catch(error){
         // errorNotification(error?.data.message)
          errorNotification("Reset Not Successful")

        }
       }
      }

      runReset()
    },[])




    useEffect(() => {
      const runVerify = async () => {
       if(verify){
        try{
        await verifyAccount(verify).unwrap()
        successNotification("Verified Successfully");
        }catch(error){
         // errorNotification(error?.data.message)
          errorNotification("User Still Not Verified")

        }
       }
      }

      runVerify()
    },[])

    const handleForgot = () => {
      dispatch(setForgotPassword(true))
    }

    const handleReturnLogin = () => {
      dispatch(setForgotPassword(false))
    }


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
        },

        onSubmit: async (values, onSubmitProps) => {
            // console.log('onSubmit', values)
            if(!forgot && !resetP){
            try{
             const {access_token,branch_id, roles} = await login(values).unwrap()
            // console.log(dataa)
             dispatch(setCredentials({access_token,branch_id, roles, email:formik.values.email, password:""}))
              formik.isSubmitting = false;
              formik.setSubmitting = false;
              formik.resetForm();
              if(roles === "CASHIER"){
                navigate("/cashier", { replace: true });
              }else {
             navigate(from, { replace: true });
              }
            // navigate("/dashboard");
            }catch (err){
              console.log(err)
               let err_mess;
              if(!err.status){
                err_mess = "No Server Response"
              }else if(err.status === 400) {
                err_mess = "Missing Username Or Password"
              } else if(err.status === 403){
                err_mess = "Unauthorized"
              } else {
                err_mess = err.data?.message
              }

              errorNotification(err_mess)
               
            }
          }

            else if(!forgot && resetP){
             try{
              values.resetLink = reset

              await resetPassword(values).unwrap()
              onSubmitProps.setSubmitting(false)
              onSubmitProps.resetForm()
              successNotification("Password Reset Link Sent To Your Mail");
              dispatch(setResetPassword(false));
              navigate("/login");


             }catch(error){

              console.log(error);

              if(Array.isArray(error?.data.message))
              {
                errorNotification(error?.data.message[0])

              }else{
                errorNotification(error?.data.message)
              }

             }

            }


           else {

    
            
          try{
            await forgotUser(values).unwrap()
            // console.log("forrrrr")
            onSubmitProps.setSubmitting(false)
            onSubmitProps.resetForm()
            successNotification("Password Reset Link Sent To Your Mail");
            dispatch(setForgotPassword(false));

          }catch(error){
              console(error);
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
            email: !resetP ? Yup.string().required("Email is required").email("Invalid email address") : Yup.string().notRequired(),
            password: !forgot ? Yup.string().required("Password is required") : Yup.string().notRequired(),
            confirm_password: resetP ?  Yup.string().oneOf([Yup.ref("password"),''], "Confirm Password Does Not Match Password") : Yup.string().notRequired(),

        })
    });


    
  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  // useEffect(() => {
  //   persist === "undefined" ? setPersist(false) : setPersist(persist); 
  //   localStorage.setItem("persist", persist);

  // },[persist])
    

    return (
        <>
          {!forgot ? !resetP ?
          (
            <>
            <form className="flex max-w-md flex-col text-left" onSubmit={formik.handleSubmit}>
            <p>{isLoading ? "Loading..." : null}</p>
          
                <div>
                    <div className="block">
                    <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput id="email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="name@passionair.com" autoComplete='none' />
                    <span className='error'>
                        {formik.errors.email && formik.touched.email && formik.errors.email}
                    </span>
                </div>
                <div>
                    <div className="block">
                    <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput  id="password"  type="password" name="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="********"  autoComplete='none' />
                    <span className='error'>
                        {formik.errors.password && formik.touched.password && formik.errors.password}
                    </span>
                </div>
        
                {isLoading ?  <div>Loading...</div> : <Button type="submit" className='bg-passionBrown hover:!bg-passionGreen'>Submit</Button>}
            </form>

            <div className="flex items-center gap-2 mb-2">
                    <Checkbox  id="remember" name="remember" onChange={togglePersist} checked={persist}  />
                    <Label htmlFor="remember">Trust This Device ?</Label>
                    <Link to="#" onClick={handleForgot} htmlFor="remember" className='ml-9'>Forgot Password ?</Link>
                </div>
                </>
          )

              :
              (
                <>

<form className="flex max-w-md flex-col text-left" onSubmit={formik.handleSubmit}>
            <p>{isForgotLoading ? "Loading..." : null}</p>
           
            <div>
            <div className="block">
                    <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput  id="password"  type="password" name="password" value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="********"  autoComplete='none' />
                    <span className='error'>
                        {formik.errors.password && formik.touched.password && formik.errors.password}
                    </span>
                </div>
                <div>
                    <div className="block">
                    <Label htmlFor="confirm_password" value="Confirm Password" />
                    </div>
                    <TextInput  id="confirm_password"  type="password" name="confirm_password" value={formik.values.confirm_password}  onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="********"  autoComplete='none' />
                    <span className='error'>
                        {formik.errors.confirm_password && formik.touched.confirm_password && formik.errors.confirm_password}
                    </span>
                </div>
        
                {isLoading ?  <div>Loading...</div> : <Button type="submit" className='bg-passionBrown hover:!bg-passionGreen'>Reset Password</Button>}
            </form>

            <div className="flex items-center gap-2 mb-2">
                    <Link to="#" onClick={handleReturnLogin} htmlFor="remember" className='ml-9'>Return To Login ?</Link>
                </div>
                
                </>
              )
                :

            (
              <>

<form className="flex max-w-md flex-col text-left" onSubmit={formik.handleSubmit}>
            <p>{isForgotLoading ? "Loading..." : null}</p>
           
                <div>
                    <div className="block">
                    <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput id="email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="name@passionair.com" autoComplete='none' />
                    <span className='error'>
                        {formik.errors.email && formik.touched.email && formik.errors.email}
                    </span>
                </div>
              
        
                {isLoading ?  <div>Loading...</div> : <Button type="submit" className='bg-passionBrown hover:!bg-passionGreen'>Submit</Button>}
            </form>

            <div className="flex items-center gap-2 mb-2">
                    <Link to="#" onClick={handleReturnLogin} htmlFor="remember" className='ml-9'>Return To Login ?</Link>
                </div>

              </>
            )
          }

            
        </>
    )
}