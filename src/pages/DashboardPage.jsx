import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb, Card } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { HiHome } from 'react-icons/hi'
import { FaAngleRight, FaBoxesPacking, FaPlaneDeparture, FaMoneyBill1Wave } from 'react-icons/fa6'
import { BsBoxes } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { RiUserReceivedFill } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
import BranchesList from '../features/branch/BranchesList'
import CustomersList from "../features/customer/CustomersList"
import StaffList from '../lists/StaffList'
import UsersList from '../features/user/UsersList'
import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentBranchId, selectCurrentRole, selectPage } from '../features/auth/authSlice'
import { selectAllTransactions, useGetTransactionsQuery } from '../features/transaction/transactionApiSlice'
import { COURIER_STAGES, USERLEVEL } from '../otherFunc/customDataTypes'


function DashboardPage() {

    const [total_courier, setTotalCourier] = useState();
    const [total_in_queue, setTotalInQueue] = useState();
    const [total_dispatched, setTotalDispatch] = useState();
    const [total_delivered, setTotalDelivered] = useState();
    const [total_collected, setTotalCollected] = useState();
    const [total_revenue, setTotalRevenue] = useState();


    const dispatch = useDispatch();

    const selectPagee = useSelector(selectPage);
    const branch_id = useSelector(selectCurrentBranchId)
    const user_level = useSelector(selectCurrentRole)


   // console.log(branch_id)

    const {isLoading, isSuccess, isError, error } = useGetTransactionsQuery('TransList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const dataa = useSelector(selectAllTransactions);


    useEffect(() => {
    if(user_level === USERLEVEL.SUPER_ADMIN){
   const total_courierr = dataa.filter((info) => info.courier_stage !== COURIER_STAGES.COLLECTED).length;  
   setTotalCourier(total_courierr)

    } else {
    const total_courierr = dataa.filter((info) => info.courier_stage !== COURIER_STAGES.COLLECTED && info.branch_id === branch_id).length;  
    setTotalCourier(total_courierr)
}
},[dataa])




useEffect(() => {
    let total_in_queue;
    if(user_level === USERLEVEL.SUPER_ADMIN){
        total_in_queue = dataa.filter((info) => info.courier_stage === COURIER_STAGES.INQUEUE).length; 
        setTotalInQueue(total_in_queue) 
        } else {
           total_in_queue = dataa.filter((info) => info.courier_stage === COURIER_STAGES.INQUEUE && info.branch_id === branch_id).length;  
           setTotalInQueue(total_in_queue) 
        }
    },[dataa])

    useEffect(()=> {
        let total_dispatched;
        if(user_level === USERLEVEL.SUPER_ADMIN){
            total_dispatched = dataa.filter((info) => info.courier_stage === COURIER_STAGES.DISPATCH).length; 

            } else  if(user_level === USERLEVEL.MANAGER || user_level === USERLEVEL.ADMIN) {
                total_dispatched = dataa.filter((info) => info.courier_stage === COURIER_STAGES.DISPATCH && info.branch_id === branch_id).length;  
            }
            setTotalDispatch(total_dispatched)
        },[dataa])  
      


       useEffect(()=> {
            let total_delivered;
            if(user_level === USERLEVEL.SUPER_ADMIN){
                total_delivered = dataa.filter((info) => info.courier_stage === COURIER_STAGES.RECEIVED).length;  
                } else {
                    total_delivered = dataa.filter((info) => info.courier_stage === COURIER_STAGES.RECEIVED && info.branch_id === branch_id).length;  
                }
                setTotalDelivered(total_delivered)
            },[dataa])
        
            
            useEffect(()=> {
                let total_collected;
            if(user_level === USERLEVEL.SUPER_ADMIN){
                total_collected = dataa.filter((info) => info.courier_stage === COURIER_STAGES.COLLECTED).length;  
                } else {
                    total_collected = dataa.filter((info) => info.courier_stage === COURIER_STAGES.COLLECTED && info.receive_branch_id === branch_id).length;  
                }
                setTotalCollected(total_collected)
            },[dataa])


            useEffect(()=> {
                let total_revenue;

                if(user_level === USERLEVEL.SUPER_ADMIN){
                  total_revenue = dataa.reduce(function(accumulator, currentValue) {
                    
                    return accumulator += +currentValue.total_cost;
                      
                  }, 0);
                } else {
                    
                      
                        total_revenue = dataa.reduce(function(accumulator, currentValue) {
                            if(currentValue.branch_id === branch_id){
                            return accumulator += +currentValue.total_cost;
                            }
                              
                          }, 0);
                }
                setTotalRevenue(total_revenue)
            },[dataa])
    

    

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/dashboard')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <>
                  <Breadcrumb aria-label="Default breadcrumb example">
                            <Link to="/" className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                                <HiHome/>
                                Home
                                <FaAngleRight/>
                            </Link>
                            <Link className='text-sm font-semibold ml-2'>Dashboard</Link>
                        </Breadcrumb>
                        <div className='my-5 p-5 bg-white rounded-md'>
                            <h1 className='text-xl font-semibold'>Dashboard</h1>
                    
                                <section   className='grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-7'>
                                    <Card className='bg-passionRed text-white'>
                                        <div className='flex items-center justify-between'>
                                            <BsBoxes className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>Total Courier</div>
                                                <div className='text-5xl'>{total_courier}</div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className='bg-passionGreen text-white'>
                                        <div className='flex items-center justify-between'>
                                            <FaBoxesPacking className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>In Queue Courier</div>
                                                <div className='text-5xl'>{total_in_queue}</div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className='bg-passionOrange text-white'>
                                        <div className='flex items-center justify-between'>
                                            <FaPlaneDeparture className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>Dispatched Courier</div>
                                                <div className='text-5xl'>{total_dispatched}</div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className='bg-passionBlue text-white'>
                                        <div className='flex items-center justify-between'>
                                            <TbTruckDelivery className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>Delivered Courier</div>
                                                <div className='text-5xl'>{total_delivered}</div>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className='bg-passionBrown text-white'>
                                        <div className='flex items-center justify-between'>
                                            <RiUserReceivedFill className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>Collection</div>
                                                <div className='text-5xl'>{total_collected}</div>
                                            </div>
                                        </div>
                                    </Card>
                                    {
                                        (user_level === USERLEVEL.MANAGER || user_level === USERLEVEL.ADMIN || user_level === USERLEVEL.SUPER_ADMIN) &&
                                    <Card className='bg-passionBlack text-white'>
                                        <div className='flex items-center justify-between'>
                                            <FaMoneyBill1Wave className='text-5xl'/>
                                            <div className='text-center'>
                                                <div>Total Revenue</div>
                                                <div className='text-5xl'>¢{total_revenue}</div>
                                            </div>
                                        </div>
                                    </Card>
                                   }
                                </section>
                         
                            <section className='mt-14'>
                                <h3 className='font-semibold mb-5'>Branches</h3>
                                <div className='contentTable w-full'>
                                    <BranchesList/>
                                </div>
                            </section>
                            <section className='mt-14'>
                                <h3 className='font-semibold mb-5'>Customers</h3>
                                <div className='contentTable w-full'>
                                    <CustomersList/>
                                </div>
                            </section>
                            <section className='mt-14'>
                                <h3 className='font-semibold mb-5'>Staff</h3>
                                <div className='contentTable w-full'>
                                    <StaffList/>
                                </div>
                            </section>
                            <section className='mt-14'>
                                <h3 className='font-semibold mb-5'>End Users</h3>
                                <div className='contentTable w-full'>
                                    <UsersList/>
                                </div>
                            </section>
                        </div>
        </>
    )
}

export default DashboardPage