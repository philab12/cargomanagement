import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {confirmDelete} from  "../../otherFunc/confirmation";
import {successNotification , errorNotification } from  "../../otherFunc/notification";
import { Box,Button,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import {DataGrid} from "@mui/x-data-grid"

import {MODALNAMES, USERLEVEL} from "../../otherFunc/customDataTypes";

import { selectAllCustomers, useGetCustomersQuery, useDeleteCustomerMutation} from  './customerApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentBranchId, selectCurrentRole, selectPage, setActionPage } from '../auth/authSlice';

function CustomersList() {
  
    const dispatch = useDispatch()
    const [deleteCustomer,{isLoading:delLoading}] = useDeleteCustomerMutation();
    const selectPagee = useSelector(selectPage);
    const branch_id = useSelector(selectCurrentBranchId);
    const [selectionModel,setSelectionModel] = useState([]);

    const user_level = useSelector(selectCurrentRole);

    const {isLoading, isSuccess, isError, error } = useGetCustomersQuery('customerList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let data;
    const dataa = useSelector(selectAllCustomers);

    if(user_level === USERLEVEL.SUPER_ADMIN){

      data = dataa;

    }else {
       data = dataa.filter((cust) =>  cust.branch_id === branch_id)
    }

  

    const handleEdit = (id) => {
        if(selectPagee !== MODALNAMES.CUSTOMERMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.CUSTOMERMODAL, id}))
        }
    }



    
    const handleDelete = (id) => {

        const buttons = [
            {
              label: 'Yes',
              onClick: async () => {
    
                try{
                    await deleteCustomer(id).unwrap()
                    successNotification("This Customer Deleted Successfully");
                 } catch(error){
                    errorNotification("This Customer Could Not Be Deleted");
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
            field: "fname",
            headerName: "First Name",
            flex:1
        },
        
        {
            field: "lname",
            headerName: "Last Name",
            flex:1
        },
        {
            field: "email",
            headerName: "Email",
            flex:1
        },
        {
            field: "contact",
            headerName: "Contact",
            flex:1
        },
           
    {
      field: 'branch',
      headerName: 'Branch',
      flex:1,
      valueGetter: (params) => {
        // console.log(params)
          return `${params.row.branch.branch}`
   
      },
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
    
    
                        if(selectPagee !== MODALNAMES.CUSTOMERMODAL){
                            dispatch(setActionPage({isEdit:true, page:MODALNAMES.CUSTOMERMODAL, id:currentRow.id}))
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
                            await deleteCustomer(currentRow.id).unwrap()
                            successNotification("This Customer  Deleted Successfully");
                         } catch(error){
                            errorNotification("This Customer Could Not Be Deleted");
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
                        <Checkbox  id="checkAllCustomers"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Telephone</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    
                    {
                        data?.map((d, i) => {
                            return <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={i}>
                                <Table.Cell className="p-4">
                                <Checkbox id={i}/>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.fname} {d.lname}
                                </Table.Cell>
                                <Table.Cell>{d.email}</Table.Cell>
                                <Table.Cell>{d.contact}</Table.Cell>
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
            branch: user_level !== USERLEVEL.SUPER_ADMIN || user_level === USERLEVEL.STAFF || user_level === USERLEVEL.SUPERVISOR ? false : true,
            action: user_level !== USERLEVEL.SUPER_ADMIN ? true : false
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

export default CustomersList