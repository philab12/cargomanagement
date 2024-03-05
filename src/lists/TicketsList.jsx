import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';

function TicketsList() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/tickets')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])
    return (
        <>
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox id="checkAllTickets" />
                    </Table.HeadCell>
                    <Table.HeadCell>Subject</Table.HeadCell>
                    <Table.HeadCell>Submitted By</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Last Reply</Table.HeadCell>
                    <Table.HeadCell>Last Update</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data.map((d, i) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                                <Table.Cell className="p-4">
                                <Checkbox id={i} />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.subject}
                                </Table.Cell>
                                <Table.Cell>{d.by}</Table.Cell>
                                <Table.Cell>{d.status}</Table.Cell>
                                <Table.Cell>{d.priority}</Table.Cell>
                                <Table.Cell>{d.lastReply}</Table.Cell>
                                <Table.Cell>{d.date}</Table.Cell>
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

export default TicketsList