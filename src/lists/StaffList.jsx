import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';

function StaffList() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/staff')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <>
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox  id="checkAllStaff"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Staff Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Telephone</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data.map((d, i) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                                <Table.Cell className="p-4">
                                <Checkbox id={i}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.name}
                                </Table.Cell>
                                <Table.Cell>{d.email}</Table.Cell>
                                <Table.Cell>{d.telephone}</Table.Cell>
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

export default StaffList