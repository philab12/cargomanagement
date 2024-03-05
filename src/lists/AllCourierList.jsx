import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';

function AllCourierList() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/courier')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <>
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox id='checkAllCourier'/>
                    </Table.HeadCell>
                    <Table.HeadCell>Sender Branch - Staff</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>Receiver Branch - Staff</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>Amount - Order Number</Table.HeadCell>
                    <Table.HeadCell>Creations Date</Table.HeadCell>
                    <Table.HeadCell>Payment Status</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>
                    <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data.map((d, i) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                                <Table.Cell className="p-4">
                                <Checkbox id={i}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.senderBranchStaff}
                                </Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>{d.receiverBranchStaff}</Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>{d.amountOrderNumber}</Table.Cell>
                                <Table.Cell>{d.creationsDate}</Table.Cell>
                                <Table.Cell>{d.paymentStatus}</Table.Cell>
                                <Table.Cell>{d.status}</Table.Cell>
                                <Table.Cell>{d.action}</Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default AllCourierList