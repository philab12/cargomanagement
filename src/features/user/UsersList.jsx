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
import {USERLEVEL} from "../../otherFunc/customDataTypes";

import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers, useGetUsersQuery,  useDeleteUserMutation } from './userApiSlice';
import { selectIsEdit, selectPage, selectId, setActionPage} from '../../features/auth/authSlice';
import { selectCurrentRole } from '../../features/auth/authSlice';
import { selectCurrentBranchId } from '../../features/auth/authSlice';

// const URL = "/users";

function UsersList() {


    const dispatch = useDispatch()
    const [deleteUser,{isLoading:delLoading}] = useDeleteUserMutation();
    const selectPagee = useSelector(selectPage);
    const user_roles = useSelector(selectCurrentRole);
    const user_branch = useSelector(selectCurrentBranchId);
    let data;

    const {isLoading, isSuccess, isError, error } = useGetUsersQuery('userList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    if(user_roles === USERLEVEL.SUPER_ADMIN)
    {
        data = useSelector(selectAllUsers);
    }else {
    const get_all_data = useSelector(selectAllUsers);
        data = get_all_data.filter(user => user.branch_id === user_branch)
    }


      const handleEdit = (id) => {
        if(selectPagee !== MODALNAMES.USERMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.USERMODAL, id}))
            }
    }




    const handleDelete = (id) => {

        const buttons = [
            {
              label: 'Yes',
              onClick: async () => {
    
             
            try{
                await deleteUser(id).unwrap()
                successNotification("This User Deleted Successfully");
             } catch(error){
                errorNotification("This User Could Not Be Deleted");
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
                        <Checkbox id='checkAllUsers'/>
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Telephone</Table.HeadCell>
                    <Table.HeadCell>Level</Table.HeadCell>
                    {user_roles === USERLEVEL.SUPER_ADMIN && <Table.HeadCell>Branch</Table.HeadCell>}
                    <Table.HeadCell className='hidden lg:table-cell'></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data?.map((d) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={d.id}>
                                <Table.Cell className="p-4">
                                <Checkbox id={d.id} />
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.fname} {d.lname}
                                </Table.Cell>
                                <Table.Cell>{d.email}</Table.Cell>
                                <Table.Cell>{d.contact}</Table.Cell>
                                <Table.Cell>{d.user_level}</Table.Cell>
                                {user_roles === USERLEVEL.SUPER_ADMIN && <Table.Cell>{d.branch?.branch}</Table.Cell>}
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" onClick={() => handleEdit(d.id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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

export default UsersList