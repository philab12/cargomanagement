import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import ProfilePic from '../assets/img/sampleProfilePic.jpg'
import { Link, useNavigate, Navigate, useLocation  } from 'react-router-dom'
import { FaBell } from 'react-icons/fa6'
import { NavList } from '../lists/allLinksList'
import SendModal from '../modals/SendModal'
import ExamineModal from '../modals/ExamineModal'
import { jwtDecode } from 'jwt-decode'
// import useLogout from "../hooks/useLogout";
// import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { USERLEVEL } from '../otherFunc/customDataTypes'
const NavbarComp = () => {

  const navigate = useNavigate();
  const {pathname} = useLocation();
  const location = useLocation();
  

  // console.log(token_info)

// const logout = useLogout()




  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if(isSuccess) navigate('/login');
  }, [isSuccess, navigate])



  

  const signOut =  () => sendLogout()


  const token = useSelector(selectCurrentToken)
  if(token === null){

    return <Navigate to="/login" state={{ from : location }} replace />
    
  }

  // let decoded = jwtDecode(token, { header: true });
  // let decode_string = decoded["exp"];
  // var current_time = Date.now() / 1000;
  // if(decode_string < current_time)
  // {
  //   return <Navigate to="/login" state={{ from : location }} replace />
  // }
 
  const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

  if(isLoading) return <p>Logging Out...</p>

  if(isError) return <p>Error: {error.data?.message}</p>


  return (

    
    <Navbar fluid className='bg-slate-200'>
      <Navbar.Toggle />
      <div className="flex md:order-2">

      
      {/* {(token.roles !== USERLEVEL.SUPER_ADMIN || token.roles !== USERLEVEL.CASHIER) ?  <SendModal/> : null } */}

      {token_info.roles === USERLEVEL.SUPER_ADMIN ? null : token_info.roles === USERLEVEL.CASHIER ? null : <SendModal/>}

        {/* <ExamineModal/> */}

        {/* notification */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className='p-2 mr-3 text-passionBrown text-2xl'>
              <FaBell/>
            </div>
          }>
          <Dropdown.Header>
                <h3 className="text-base font-semibold text-center">Notifications</h3>
          </Dropdown.Header>
          <Link to="/profile">
              <Dropdown.Item  className='items-start'>
                <div>
                  <img src={ProfilePic} alt="" className='w-10 mr-4 rounded-full'/>
                </div>
                <div className='max-w-xs text-left'>
                  <div className=''>New message from Bonnie: Hey! Check out the package i sent.</div>
                  <div className='text-xs text-passionBlue font-semibold'>5 mins ago</div>
                </div>
              </Dropdown.Item>
          </Link>
          <Link to="/notifications">
            <div className="text-center text-xs py-2 hover:bg-gray-100 font-semibold border-t border-t-gray-100">
              View All
            </div>
          </Link>
        </Dropdown>

        {/* profile pic */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={ ProfilePic } rounded />
          }
        >
            <Dropdown.Header>
                <span className="block text-sm">{token_info.fname}</span>
                <span className="block truncate text-sm font-medium">{token_info.email}</span>
            </Dropdown.Header>
            <Link to="/profile">
                <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Link to="/settings">
                <Dropdown.Item>Settings</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Link onClick={signOut} to="/login">
                <Dropdown.Item>Logout</Dropdown.Item>
            </Link>
        </Dropdown>
      </div>
      <Navbar.Collapse>
        <h2>PassionAir - {token_info.branch_name} {token_info.is_main === "YES" ? "- MAIN BRANCH" : null}[{token_info.roles}]</h2>
        <div className='md:hidden'>
          <NavList/>
        </div>             
      </Navbar.Collapse>
      
    </Navbar>
  );
}

export default NavbarComp