import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useQueryData } from '../../hooks/useQueryy';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {confirmDelete} from  "../../otherFunc/confirmation";
import {successNotification , errorNotification } from  "../../otherFunc/notification";

import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { selectAllCourierStages, useGetCourierStagesQuery, useDeleteCourierStageMutation } from  './courierStageApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, setActionPage } from '../auth/authSlice';


function CourierStageList() {
 
    const dispatch = useDispatch()
    const [deleteCourierStage,{isLoading:delLoading}] = useDeleteCourierStageMutation();
    const selectPagee = useSelector(selectPage);


    const {isLoading, isSuccess, isError, error } = useGetCourierStagesQuery('courierStageList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const data = useSelector(selectAllCourierStages);

    

      const handleEdit = (id) => {
        if(selectPagee !== MODALNAMES.COURIERSTAGEMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.COURIERSTAGEMODAL, id}));
        }
    }



    const handleDelete = (id) => {

        const buttons = [
            {
              label: 'Yes',
              onClick: async () => {
    
                try{
                    await deleteCourierStage(id).unwrap()
                    successNotification("This Courier Stage  Deleted Successfully");
                 } catch(error){
                    errorNotification("This Courier Stage Could Not Be Deleted");
                 }
    
              }
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        confirmDelete(buttons)
    
    }


    if(isLoading){
        return <h2>Loading...</h2>
    }



    return (
        <>
        {delLoading ? <p>Loading...</p> : null}
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox  id="checkAllStages"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Stage</Table.HeadCell>
                    <Table.HeadCell>Active?</Table.HeadCell>
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
                                    {d.stage}
                                </Table.Cell>
                                <Table.Cell>{d.is_active}</Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" onClick={() => handleEdit(d.id)}  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Edit
                                    </Link>


                                    <Link to="#" onClick={() => handleDelete(d.id)} className="font-medium text-red-600 hover:underline dark:text-red-500 ml-2">
                                        Delete
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

export default CourierStageList