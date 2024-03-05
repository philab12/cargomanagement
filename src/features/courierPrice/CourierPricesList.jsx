import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useQueryData } from '../../hooks/useQueryy';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import {confirmDelete} from  "../../otherFunc/confirmation";
import {successNotification , errorNotification } from  "../../otherFunc/notification";
import { Box,Button,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import {DataGrid} from "@mui/x-data-grid"

import {MODALNAMES} from "../../otherFunc/customDataTypes";

import { selectAllCourierPrices, useGetCourierPricesQuery, useDeleteCourierPriceMutation } from  './courierPriceApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, setActionPage } from '../auth/authSlice';

// const URL = "/courier-price";

function CourierPricesList() {
    const dispatch = useDispatch()
    const [deleteCourierPrice,{isLoading:delLoading}] = useDeleteCourierPriceMutation();
    const selectPagee = useSelector(selectPage);
    const [selectionModel,setSelectionModel] = useState([]);

    const {isLoading, isSuccess, isError, error } = useGetCourierPricesQuery('courierPriceList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const data = useSelector(selectAllCourierPrices);


      const handleEdit = (id) => {

        if(selectPagee !== MODALNAMES.COURIERPRICEMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.COURIERPRICEMODAL, id}))
         }
    }



    const handleDelete = (id) => {

        const buttons = [
            {
              label: 'Yes',
              onClick: async () => {
    
                try{
                    await deleteCourierPrice(id).unwrap()
                    successNotification("This Courier Type  Deleted Successfully");
                 } catch(error){
                    errorNotification("This Courier Type Could Not Be Deleted");
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
          field: 'trip_setup',
          headerName: 'Trip',
          flex:1,
          valueGetter: (params) => {
            // console.log(params.row.transaction_detail.receiver_branch.branch)
              return `${params.row.trip_setup.trip_name}`
       
          },
      },
        {
          field: 'courier_type',
          headerName: 'Type',
          flex:1,
          valueGetter: (params) => {
            // console.log(params.row.transaction_detail.receiver_branch.branch)
              return `${params.row.courier_type.courier_type}`
       
          },
      },

        {
          field: 'courier_cate',
          headerName: 'Categeory',
          flex:1,
          valueGetter: (params) => {
            // console.log(params.row.transaction_detail.receiver_branch.branch)
              return `${params.row.courier_cate.courier_cate}`
       
          },
      },
        // {
        //     field: 'weight',
        //     headerName: 'Weight',
        //     renderCell: (params) => {
        //       return `${params.row.weight} ${params.row.unit_type.alias}`;
        //     },
        //     // valueGetter: (params) => params.row.courier_type,
        // },

        {
          field: 'weight',
          headerName: 'Weight',
          flex:1,
          valueGetter: (params) => {
            // console.log(params.row.transaction_detail.receiver_branch.branch)
              return `${params.row.weight} ${params.row.unit_type.alias}`
       
          },
      },
   
        {
            field: "price",
            headerName: "Price",
          },
          {
            field: "insurance_price",
            headerName: "Insurance Price",
          },
        {
          field: "is_active",
          headerName: "Is Active",
          // renderCell: (params:any) => {
          //   console.log(params.id)
          // }
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
    
        if(selectPagee !== MODALNAMES.COURIERPRICEMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.COURIERPRICEMODAL, id:currentRow.id}))
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
                            await deleteCourierPrice(currentRow.id).unwrap()
                            successNotification("This Courier Price  Deleted Successfully");
                         } catch(error){
                            errorNotification("This Courier Price Could Not Be Deleted");
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
                  <Button variant="contained" endIcon={<EditIcon />} sx={{color: "white" }} color="info" size="small" onClick={handleEdit}>Edit</Button>
                  <Button variant="contained" endIcon={<DeleteIcon />} sx={{color: "white" }} color="error" size="small" onClick={handleDelete}>Delete</Button>
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
                        <Checkbox  id="checkAllPrices"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Trip</Table.HeadCell>
                    <Table.HeadCell>Type</Table.HeadCell>
                    <Table.HeadCell>Category</Table.HeadCell>
                    <Table.HeadCell>Weight</Table.HeadCell>
                    <Table.HeadCell>Price</Table.HeadCell>
                    <Table.HeadCell>Insurance</Table.HeadCell>
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
                                    {d?.trip_setup?.trip_name}
                                </Table.Cell>
                                <Table.Cell className="">
                                    {d?.courier_type?.courier_type}
                                </Table.Cell>
                                <Table.Cell className="">
                                    {d?.courier_cate?.courier_cate}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.weight}{d?.unit_type?.alias}
                                </Table.Cell>
                                <Table.Cell className="">
                                    {d.price}
                                </Table.Cell>
                                <Table.Cell>{d.insurance_price}</Table.Cell>
                                <Table.Cell>{d.is_active}</Table.Cell>
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

          
        loading={(isLoading || !data) || (delLoading )}
        getRowId={(row) => row.id}
        rows={data || []}
        columns={columns}
        checkboxSelection
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

export default CourierPricesList