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

import { selectAllWeightUnits, useGetWeightUnitsQuery, useDeleteWeightUnitMutation } from  './weightUnitApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectPage, setActionPage } from '../auth/authSlice';

// const URL = "/unit-type";

function WeightUnitsList() {
    const dispatch = useDispatch()
    const [deleteWeightUnit,{isLoading:delLoading}] = useDeleteWeightUnitMutation();
    const selectPagee = useSelector(selectPage);
    const [selectionModel,setSelectionModel] = useState([]);

    const {isLoading, isSuccess, isError, error } = useGetWeightUnitsQuery('weightUnitList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const data = useSelector(selectAllWeightUnits);


   
    
   
//    const handleEdit = (id) => {
//        if(selectPagee !== MODALNAMES.WEIGHTUNITMODAL){
//         dispatch(setActionPage({isEdit:true, page:MODALNAMES.WEIGHTUNITMODAL, id}))
//         }
//    }
   


//    const handleDelete = (id) => {

//     const buttons = [
//         {
//           label: 'Yes',
//           onClick: async () => {

//             try{
//                 await deleteWeightUnit(id).unwrap()
//                 successNotification("This Weight Unit  Deleted Successfully");
//              } catch(error){
//                 errorNotification("This Weight Unit Could Not Be Deleted");
//              }

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







const columns = [

    {
        field: "unit_type",
        headerName: "Unit",
        flex:1
      },
    {
        field: "alias",
        headerName: "Alias",
        flex:1
    },

    {
      field: "is_active",
      headerName: "Is Active",
      flex:1
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



        if(selectPagee !== MODALNAMES.WEIGHTUNITMODAL){
            dispatch(setActionPage({isEdit:true, page:MODALNAMES.WEIGHTUNITMODAL, id:currentRow.id}))
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
                        await deleteWeightUnit(currentRow.id).unwrap()
                        successNotification("This Weight Unit  Deleted Successfully");
                     } catch(error){
                        errorNotification("This Weight Unit Could Not Be Deleted");
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
                        <Checkbox id='checkAllUnits' />
                    </Table.HeadCell>
                    <Table.HeadCell>Unit</Table.HeadCell>
                    <Table.HeadCell>Alias</Table.HeadCell>
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
                                    {d.unit_type}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.alias}
                                </Table.Cell>
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

export default WeightUnitsList