import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
// import { useQueryData, useQueryData1 } from '../hooks/useQueryy';
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
// import useAuth from "../hooks/useAuth";
// import {confirmDelete} from  "../otherFunc/confirmation";

import {MODALNAMES} from  "../../otherFunc/customDataTypes";
import { selectCurrentBranchId, selectPage, setActionPage } from '../auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllTransactions, useGetTransactionsQuery } from './transactionApiSlice';

// const URL = "/transaction-detail/inbound";

function InBoundList() {
    const dispatch = useDispatch()
    // const [deletePendingTransaction,{isLoading:delLoading}] = useDeletePendingTransactionMutation();
    const selectPagee = useSelector(selectPage);
    const branch_id = useSelector(selectCurrentBranchId)

    //console.log(branch_id)

    const {isLoading, isSuccess, isError, error } = useGetTransactionsQuery('TransList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const dataa = useSelector(selectAllTransactions);
    // const getAllCust = useSelector(selectAllCustomers)

    // console.log(dataa)

    const data = dataa.filter(trans => trans.courier_stage === "DISPATCH" && trans.receive_branch_id === branch_id)

    //MODALNAMES.INBOUNDMODAL
        const handleEdit = (id) => {
            if(selectPagee !== MODALNAMES.INBOUNDMODAL){
        
                dispatch(setActionPage({isEdit:true, page:MODALNAMES.INBOUNDMODAL, id}))
                //console.log(selectPagee)
        
            }
        }




// const handleDelete = (id) => {

//     const buttons = [
//         {
//           label: 'Yes',
//           onClick: async () => {

//             try{
//             const response = await axiosPrivate.delete(`${URL}/${id}`)
//                  if(response.status === 200){
//                  refetch();
//                  successNotification("This In-Bound Deleted Successfully");
//                  }
//             }catch(error){

//                 errorNotification("This In-Bound Could Not Be Deleted")

//             }

//           }
//         },
//         {
//           label: 'No',
//           onClick: () => {}
//         }
//       ]
//     confirmDelete(buttons)

// }


if(isLoading){
    return <h2>Loading...</h2>
}


    return (
        <>
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox  id="checkAllTypes"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Trancking Number</Table.HeadCell>
                    <Table.HeadCell>Flight Number</Table.HeadCell>
                    <Table.HeadCell>Item Description</Table.HeadCell>
                    <Table.HeadCell>Sender Name</Table.HeadCell>
                    <Table.HeadCell>Receiver Name</Table.HeadCell>
                    <Table.HeadCell>From Branch</Table.HeadCell>
                    <Table.HeadCell>Weight</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>
                    <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data?.map((d) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={d.id}>
                                <Table.Cell className="p-4 w-2">
                                <Checkbox id={d.id}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.tracking_number}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.flight_number}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.item_description}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.sender.fname} {d.sender.lname}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.receiver.fname} {d.receiver.lname}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.branch.branch} 
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.weight} 
                                </Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" onClick={() => handleEdit(d.id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Receive
                                    </Link>

                                    {/* <Link to="#" onClick={() => handleDelete(d.id)} className="font-medium text-red-600 hover:underline dark:text-red-500 ml-2">
                                        Delete
                                    </Link> */}

                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default InBoundList