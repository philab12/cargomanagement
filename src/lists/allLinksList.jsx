import { Sidebar } from 'flowbite-react';
import { LuSettings2 } from "react-icons/lu";
import { HiCash, HiChartPie } from 'react-icons/hi';
import { FaBoxesPacking, FaUsers, FaUserGroup, FaTicket, FaClipboardList, FaBuilding, FaPeopleGroup, FaFolder, FaPlane } from 'react-icons/fa6';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { USERLEVEL } from '../otherFunc/customDataTypes';


const navItems = [
    {link: "Dashboard", path: "/dashboard", key: "1", linkIcon: <HiChartPie className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR, USERLEVEL.STAFF]},
    {link: "Branches", path: "/branches", key: "2", linkIcon: <FaBuilding className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    {link: "Customers", path: "/customers", key: "3", linkIcon: <FaPeopleGroup className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    // {link: "Revenue", path: "/revenue", key: "4", linkIcon: <HiCash className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER]},
    {link: "Report", path: "/revenue", key: "4", linkIcon: FaFolder, subLinks: [
        {slinks:["Revenue", "/revenue", "4a"],sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR]},
        {slinks:["Cashier", "/cashier", "4b"],sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR, USERLEVEL.STAFF, USERLEVEL.CASHIER]},
        // {slinks:["Courier Journey", "/courier-journey", "4c"],sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR]},
    ], roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.SUPERVISOR, USERLEVEL.STAFF, USERLEVEL.CASHIER]},
    
    
    {link: "Courier", path: "/courier", key: "5", linkIcon: FaPlane, subLinks: [
      {slinks:["Pending Transaction", "/pendingTrans", "5a"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR, USERLEVEL.CASHIER]},
        // ["All Courier", "/courier", "5b"],
        {slinks:["In Queue Courier", "/in-queue-courier", "5b"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
        {slinks:["Dispatched Courier", "/dispatched-courier", "5c"],sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
        {slinks:["Consolidate Package", "/consolidated-packages", "5d"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
        {slinks:["Inbound Courier", "/inbound-courier", "5e"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
        {slinks:["Received Courier", "/recieved-courier", "5f"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
        {slinks:["Collected Courier", "/collected-courier", "5g"], sroles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR]},
    ], roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN, USERLEVEL.MANAGER, USERLEVEL.STAFF, USERLEVEL.SUPERVISOR, USERLEVEL.CASHIER]},
    // {link: "Staff", path: "/staff", key: "6", linkIcon: <FaUsers className='sideBarLinkIcon'/>, subLinks: ""},
    {link: "End Users", path: "/users", key: "6", linkIcon: <FaUserGroup className='sideBarLinkIcon'/>, subLinks: "", roles:[USERLEVEL.SUPER_ADMIN, USERLEVEL.ADMIN]},
    // {link: "Support Tickets", path: "/tickets", key: "8", linkIcon: <FaTicket className='sideBarLinkIcon'/>, subLinks: ""},
    // {link: "User Logs", path: "/logs", key: "9", linkIcon: <FaClipboardList className='sideBarLinkIcon'/>, subLinks: ""},
    {link: "Setups", path: "/courier", key: "10", roles:[USERLEVEL.SUPER_ADMIN], linkIcon: LuSettings2, subLinks: [
      {slinks:["Trips", "/trips", "10a"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Courier Types", "/courier-types", "10b"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Courier Categories", "/courier-categories", "10c"],sroles:[USERLEVEL.SUPER_ADMIN]},
      // ["Courier Stages", "/courier-stages", "10d"],
      {slinks:["Courier Pricing", "/courier-pricing", "10d"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Extra Charge", "/extra-charge", "10e"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Weight Units", "/weight-units", "10f"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Id Types", "/id-types", "10g"],sroles:[USERLEVEL.SUPER_ADMIN]},
      {slinks:["Security Questions", "/security-questions", "10h"],sroles:[USERLEVEL.SUPER_ADMIN]},

  ]},

];

export function SidebarList(){ 

  const {pathname} = useLocation();
  const location = useLocation();

  
  const token = useSelector(selectCurrentToken)
  if(token === null){

    return <Navigate to="/login" state={{ from : location }} replace />
    
  }


  // let decoded = jwtDecode(token, { header: true });
  //       let decode_string = decoded["exp"];
  //       var current_time = Date.now() / 1000;
  //       if(decode_string < current_time)
  //       {
  //         return <Navigate to="/login" state={{ from : location }} replace />
  //       }
 
  const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

  

    return (
        <>
        {
        navItems.map(
            ({link, path, key, linkIcon, subLinks, roles}) =>  subLinks == "" ? 
            (
              roles.includes(token_info.roles) ?
          <NavLink to={path} key={key} className='sideBarLink'>
            {linkIcon}
            <div className='sideBarLinkName'>{link}</div>
          </NavLink> : null )  : 
          
            roles.includes(token_info.roles) &&
          <Sidebar.Collapse icon={linkIcon} label={link} key={key}>
            {subLinks.map(({sroles, slinks}) => (
               sroles.includes(token_info.roles) &&
              <NavLink className='sideBarSubLink' to={slinks[1]} key={slinks[2]}>{slinks[0]}</NavLink >
              
            )
          )}
          </Sidebar.Collapse>) 

        
        }
        </>
    )
}

export function NavList(){
    return (
        <>
        {
        navItems.map(
            ({link, path, key}) => 
            <NavLink to={path} key={key} className='NavLink'>
            {link}
            </NavLink>
          )
        }
        </>
    )
}

