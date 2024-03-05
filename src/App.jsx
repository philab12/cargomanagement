import './App.css'
import { Routes, Route } from 'react-router-dom'
// import PersistLogin from "./components/PersistLogin"
import RequireAuth from "./features/auth/RequireAuth"

import DashboardPage from './pages/DashboardPage'
import RevenuePage from './pages/RevenuePage'
import CashierPage from './pages/CashierPage'
import CourierPage from './pages/CourierPage'
import CourierCategoriesPage from './pages/CourierCategoriesPage'
import CourierTypesPage from './pages/CourierTypesPage'
import CourierStagesPage from './pages/CourierStagesPage'
import CourierPricesPage from './pages/CourierPricesPage'
import StaffPage from './pages/StaffPage'
import UsersPage from './pages/UsersPage'
import TicketsPage from './pages/TicketsPage'
import LogsPage from './pages/LogsPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import BranchesPage from './pages/BranchesPage'
import CustomersPage from './pages/CustomersPage'
import NotificationsPage from './pages/NotificationsPage'
import WeightUnitsPage from './pages/WeightUnitsPage'
import TripsPage from './pages/TripsPage'
import Layout from "./components/Layout"
import UnauthorizePage from './pages/UnauthorizePage'
import PageNotFound from './pages/PageNotFound'
import ExtraChargePage from './pages/ExtraChargePage'
import IdTypesPage from './pages/IdTypesPage'
import HomePage from './pages/HomePage'
import PendingTransPage from './pages/PendingTransPage'
import InQueuePage from './pages/InQueuePage'
import SecurityQuestionPage  from './pages/SecurityQuestionPage'
import InvoiceComp from "./components/InvoiceComp"
import ReceiptComp from "./components/ReceiptComp"
import AWBComp from "./components/AWBComp"

import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin'
import InBoundPage from "./pages/InBoundPage"
import ReceivedCourierPage from "./pages/ReceivedCourierPage"
import CollectedCourierPage from "./pages/CollectedCourierPage"
import ConsolidatedPackagePage from './pages/consolidatedPackagePage'


const ROLES = {
  "SUPER_ADMIN":"SUPER ADMIN",
  "ADMIN":"ADMIN",
  "MANAGER":"MANAGER",
  "STAFF":"STAFF",
  "SUPERVISOR":"SUPERVISOR",
  "CASHIER":"CASHIER",
}



function App() {
  return (
    <>
    <Routes>
    
    
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/' element={<LoginPage/>}/>
    <Route path="/password/reset/:reset" element={<LoginPage />} />
    <Route path="/verify/:verify" element={<LoginPage />} />
    <Route path='/home' element={<HomePage/>}/>

       {/* reports */}
       <Route element={<PersistLogin />}>
  <Route element={<Prefetch />}>
       <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.SUPERVISOR]} />}>
    <Route path='/bill' element={<InvoiceComp />}/>
    <Route path='/receipt' element={<ReceiptComp />}/>
    <Route path='/awb' element={<AWBComp />}/>
  </Route>
  </Route>
  </Route>

 
 

      <Route path="/" element={<Layout />}>
      <Route path="/unauthorized" element={<UnauthorizePage />} />
      <Route path="/pagenotfound" element={<PageNotFound />} />
       </Route>
 

       <Route element={<PersistLogin />}>
        <Route element={<Prefetch />}>
       <Route path="/" element={<Layout />}>
      {/* <Route element={<PersistLogin />}>*/}
      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN]} />}> 
         <Route path='/trips' element={<TripsPage/>}/>
         <Route path='/courier-types' element={<CourierTypesPage/>}/>
         <Route path='/courier-categories' element={<CourierCategoriesPage/>}/>
         <Route path='/courier-stages' element={<CourierStagesPage/>}/>
         <Route path='/weight-units' element={<WeightUnitsPage/>}/>
         <Route path='/courier-pricing' element={<CourierPricesPage/>}/>
         <Route path='/extra-charge' element={<ExtraChargePage/>}/>
         <Route path='/id-types' element={<IdTypesPage/>}/>
         <Route path='/security-questions' element={<SecurityQuestionPage />}/>

      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.SUPERVISOR, ROLES.STAFF]} />}>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.SUPERVISOR]} />}>
      <Route path='/users' element={<UsersPage/>}/>
      <Route path='/customers' element={<CustomersPage/>}/>
      </Route>
      
      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.CASHIER]} />}>
      <Route path='/revenue' element={<RevenuePage/>}/>
      <Route path='/cashier' element={<CashierPage/>}/>
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.SUPERVISOR]} />}>
      <Route path='/consolidated-packages' element={<ConsolidatedPackagePage page="Consolidated"/>}/>

      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.STAFF, ROLES.SUPERVISOR, ROLES.CASHIER]} />}>
      <Route path='/branches' element={<BranchesPage/>}/>
      <Route path='/pendingTrans' element={<PendingTransPage page="All"/>}/>
      <Route path='/in-queue-courier' element={<InQueuePage page="All"/>}/>
      
      <Route path='/courier' element={<CourierPage page="All"/>}/>
      <Route path='/in-queue-courier' element={<CourierPage page="In Queue"/>}/>
      <Route path='/dispatched-courier' element={<CourierPage page="Dispatched"/>}/>
      <Route path='/inbound-courier' element={<InBoundPage page="Inbound"/>}/>
      <Route path='/collected-courier' element={<CollectedCourierPage page="Collected"/>}/>
      <Route path='/recieved-courier' element={<ReceivedCourierPage page="Received"/>}/>
      </Route>
      {/* <Route path='/staff' element={<StaffPage/>}/>
      <Route path='/tickets' element={<TicketsPage/>}/> */}
      <Route path='/logs' element={<LogsPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
      <Route path='/notifications' element={<NotificationsPage/>}/>
      </Route>
      </Route>
      </Route>
      {/* </Route> */}
      
    </Routes>
    </>



  )
}

export default App
