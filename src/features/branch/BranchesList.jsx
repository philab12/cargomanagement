// import axios from 'axios';
// import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
// import { useQueryDataSelect } from '../../hooks/useQueryy';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useAuth from "../../hooks/useAuth";
import {confirmDelete} from  "../../otherFunc/confirmation";
import {successNotification , errorNotification } from  "../../otherFunc/notification";
import { Box,Button,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import {DataGrid} from "@mui/x-data-grid"


import {MODALNAMES, USERLEVEL} from "../../otherFunc/customDataTypes";

import { selectAllBranchs, useGetBranchsQuery, useDeleteBranchMutation } from  './branchApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentRole, selectPage, setActionPage } from '../auth/authSlice';
import { useState } from 'react';


function BranchesList() {
  
    const dispatch = useDispatch()
    const [deleteBranch,{isLoading:delLoading}] = useDeleteBranchMutation();
    const selectPagee = useSelector(selectPage);
    const [selectionModel,setSelectionModel] = useState([]);

    const user_level = useSelector(selectCurrentRole);

    const {isLoading, isSuccess, isError, error } = useGetBranchsQuery('branchList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const data = useSelector(selectAllBranchs);

    

      const handleEdit = (id) => {
        if(selectPagee !== MODALNAMES.BRANCHMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.BRANCHMODAL, id}))
            }
    }




    const handleDelete = (id) => {

        const buttons = [
            {
              label: 'Yes',
              onClick: async () => {
    
                try{
                    await deleteBranch(id).unwrap()
                    successNotification("This Branch  Deleted Successfully");
                 } catch(error){
                    errorNotification("This Branch Could Not Be Deleted");
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






    const columns = [

        {
            field: "branch",
            headerName: "Branch",
            flex:1
        },
        {
            field: "branch_code",
            headerName: "Branch Code",
        },
        {
            field: "location",
            headerName: "Location",
        },
        {
            field: "contact",
            headerName: "Contact",
        },
        {
            field: 'users',
            headerName: 'Manager',
            valueGetter: (params) => {


               // console.log(params.value[0].user_level)
                //  console.log(params)
            const manager = params.row.users.find((man) =>  man.user_level === USERLEVEL.MANAGER)
              if(manager) return `${manager.fname} ${manager.lname}`
              return ""
            },
            // valueGetter: (params) => params.row.courier_type,
           
        },

        {
            field: "is_active",
            headerName: "Is Active",
          },
          {
            field: "is_main_branch",
            headerName: "Main",
          },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          sortable: false,
          disableClickEventBubbling: true,
    
        
          
          renderCell: (params) => {
              const handleEdit = (e) => {
            
                const currentRow = params.row;
      
               // setOpenModal(true)
              //  dispatch(setActionPage({isEdit:true, page: MPages.HEALTHCARE, id:currentRow.id}))
               // dispatch(setActionPage({isEdit:true, page:MODALNAMES.COURIERTYPEMODAL, id:currentRow.id}))


                        if(selectPagee !== MODALNAMES.BRANCHMODAL){
                            dispatch(setActionPage({isEdit:true, page:MODALNAMES.BRANCHMODAL, id:currentRow.id}))
                            }
    
         
           
               // return alert(JSON.stringify(currentRow));
              };
      
              const handleDelete = (e) => {
                const currentRow = params.row;
      
                const buttons = [
                    {
                      label: 'Yes',
                      onClick: async () => {
            
                        try{
                            await deleteBranch(currentRow.id).unwrap()
                            successNotification("This Branch Deleted Successfully");
                         } catch(error){
                            errorNotification("This Branch Could Not Be Deleted");
                         }
            
                      }
                    },
                    {
                      label: 'No',
                      onClick: () => {}
                    }
                  ]
                confirmDelete(buttons)
          
                
              };
              
              return (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained"  endIcon={<EditIcon />} sx={{color: "white" }} color="info" size="small" onClick={handleEdit}>Edit</Button>
                  <Button variant="contained"  endIcon={<DeleteIcon />} sx={{color: "white" }} color="error" size="small" onClick={handleDelete}>Delete</Button>
                </Stack>
              );
          },
        }
      ]
    

    


    return (
        <>
        {/* {delLoading ? <p>Loading...</p> : null}
            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox  id="checkAllBranches"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Branch Code</Table.HeadCell>
                    <Table.HeadCell>Location</Table.HeadCell>
                    <Table.HeadCell>Contact</Table.HeadCell>
                    <Table.HeadCell>Manager</Table.HeadCell>
                    <Table.HeadCell>Active</Table.HeadCell>
                    <Table.HeadCell>Main</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>
                    <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data?.map((d) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={d.id}>
                                <Table.Cell className="p-4">
                                <Checkbox id={d.id}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.branch}
                                </Table.Cell>
                                <Table.Cell>{d.branch_code}</Table.Cell>
                                <Table.Cell>{d.location}</Table.Cell>
                                <Table.Cell>{d.contact} <br/> {d.email} </Table.Cell>
                                <Table.Cell>{d?.managers?.user_level}</Table.Cell>
                                <Table.Cell>{d.is_active}</Table.Cell>
                                <Table.Cell>{d.is_main_branch}</Table.Cell>
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
            </Table> */}




<Box className="bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 outline-none" mt="5px"  height="75vh"
      sx={{"& .MuiDataGrid-root":{
        border: "none"
      },
      "& .MuiDataGrid-cell":{
        borderBottom: "none"
      },
      "& .MuiDataGrid-columnHeaders":{
         padding: "4px",
         fontWeight:"900",
         color:"black",
         fontSize:"16px",
         borderBottom:"none"
      },
    
    }}
      >
        <DataGrid
           initialState={{
            filter: {
              filterModel: {
                items: [],
                quickFilterExcludeHiddenColumns: true,
              },
            },
          }}

          
          columnVisibilityModel={{
            // branch: user_level !== USERLEVEL.SUPER_ADMIN ? false : true,
            action: user_level === USERLEVEL.SUPER_ADMIN ? true : false
          }}

          
        loading={(isLoading || !data) || (delLoading )}
        getRowId={(row) => row.id}
        rows={data || []}
        columns={columns}
        // checkboxSelection
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
          console.log(newSelectionModel)
        }}
        selectionModel={selectionModel}
        slots={{
          toolbar: DataGridCustomToolbar,
        }}
        slotProps={{
          toolbar: { selectionModel,  },
        }}



        />
        </Box>    


        </>
    )
}

export default BranchesList