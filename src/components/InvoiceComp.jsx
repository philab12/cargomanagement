import Logo from '../assets/img/passionAirLogo2.png';
import { Table } from 'flowbite-react';
import {useSelector } from 'react-redux';
import { selectTrackRep, selectTrackingNumber } from '../features/transaction/transSlice';
import { selectAllTransactions, selectTransactionById, useGetTransactionsQuery } from '../features/transaction/transactionApiSlice';
import { selectAllBranchs, selectBranchById, useGetBranchsQuery } from '../features/branch/branchApiSlice';
import { selectAllCustomers, selectCustomerById, useGetCustomersQuery } from '../features/customer/customerApiSlice';
import { selectAllTrips, selectTripById, useGetTripsQuery } from '../features/tripSetup/tripApiSlice';
import { useEffect, useState } from 'react';
import { selectCurrentBranchId, selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode' 


const InvoiceComp = () => {

   const track_rep = JSON.parse(localStorage.getItem("track_rep"))
   const receiver_branch_info  = useSelector((state) => selectBranchById(state, track_rep.receive_branch_id));

   const token = useSelector(selectCurrentToken)
   const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

   const sender_branch_info  = useSelector((state) => selectBranchById(state, token_info.branch_id));

 
  


    return (
        <div className="max-w-4xl mb-10">
            <header className='w-full'>
                <div className="w-full flex justify-center">
                    <img src={Logo} className="w-28 mb-4"/>
                </div>
                <div className="invoiceTop">
                    <h1 className='text-center'>INVOICE <span>{track_rep.tracking_number}</span></h1>{/*Invoice number goes into the span*/}
                </div>
            </header>
            <header className='text-xs flex justify-between flex-row-reverse'>
                <div className="text-right">
                    <div class="capitalize-first">{sender_branch_info.branch}</div>
                    {/* <div>455 Foggy Heights,<br /> AZ 85004, US</div> */}
                    <div>{sender_branch_info.contact}</div>
                    <div><a href="mailto:company@example.com">{sender_branch_info.email}</a></div>
                </div>
                <div>
                    <div><small className='font-bold text-gray-500 mr-2'>SENDER</small>{track_rep.sender.fname} {track_rep.sender.lname}</div>
                    <div><small className='font-bold text-gray-500 mr-2'>EMAIL</small> <a href="mailto:john@example.com">{track_rep.sender.email}</a></div>
                    <div><small className='font-bold text-gray-500 mr-2'>DATE</small>{track_rep.inqueue_date}</div>
                    {/* <div><small className='font-bold text-gray-500 mr-2'>DUE DATE</small> September 17, 2015</div> */}
                </div>
            </header>
            <main className='text-sm mt-10'>                
                <Table hoverable striped>
                    <Table.Head>
                    <Table.HeadCell>Receiving Branch Details</Table.HeadCell>
                        <Table.HeadCell>Receiver Details</Table.HeadCell>
                        <Table.HeadCell>Tracking Number</Table.HeadCell>
                        {/* <Table.HeadCell>Bar Code</Table.HeadCell> */}
                        <Table.HeadCell>Item Details</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          
                        <Table.Cell>
                                {receiver_branch_info.branch}<br/>
                                {receiver_branch_info.email}<br/>
                                {receiver_branch_info.contact}
                            </Table.Cell>

                            <Table.Cell>
                                {track_rep.receiver.fname} {track_rep.receiver.lname}<br/>
                                {track_rep.receiver.email}<br/>
                                {track_rep.receiver.contact}
                            </Table.Cell>
                            <Table.Cell>{track_rep.receiver.contact}</Table.Cell>
                            {/* <Table.Cell>

                            </Table.Cell> */}
                            <Table.Cell>
                                weight: {track_rep.weight}kg
                                trip: {track_rep.trip_setup.trip_name}
                                status: {track_rep.payment_status}
                            </Table.Cell>
                        </Table.Row>
                        {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>
                                Jason Mraz<br/>
                                jmraz@gmail.com<br/>
                                +233 24 785 6987
                            </Table.Cell>
                            <Table.Cell>
                                Kodey Macgin<br/>
                                kodey872@gmail.com<br/>
                                +233 24 785 6987
                            </Table.Cell>
                            <Table.Cell>012554897</Table.Cell>
                            <Table.Cell>

                            </Table.Cell>
                            <Table.Cell>
                                weight: 50kg
                                trip: ACC-KMS
                                status: Paid
                            </Table.Cell>
                        </Table.Row> */}
                    </Table.Body>
                </Table>
            </main>
        </div>
    );
                    
}

export default InvoiceComp