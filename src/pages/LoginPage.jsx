import Logo from '../assets/img/passionAirLogo2.png'
import LoginForm from '../features/auth/LoginForm'
import { useSelector } from 'react-redux'
import { selectForgotPassword, selectResetPassword } from '../features/auth/authSlice';

function LoginPage() {

    const forgot = useSelector(selectForgotPassword);
    const reset = useSelector(selectResetPassword);

    return (
        <>
            <div className='LoginBG'>
                <div className='loginHolder'>
                    <img src={Logo} alt="" className='w-32 m-auto mb-2' />
                    <div className='rounded-xl bg-passionBeige min-w-fit overflow-hidden'>
                        <div className='bg-passionBlack p-5 text-white'>
                            <h1 className='text-xl'>{!forgot ? !reset ? 'Welcome to' : null : null}PassionAir<br/> 
            <span className='font-semibold'>{!forgot ? !reset ? 'Courier Management' : 'Reset Password' :  'Forgot Password'}</span>
                            </h1>
                        </div>
                        <div className='p-5'>
                            <LoginForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage