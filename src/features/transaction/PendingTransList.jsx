import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table, Checkbox } from 'flowbite-react';
import { Link } from 'react-router-dom';
// import { useQueryData, useQueryData1 } from '../../hooks/useQueryy';
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import useAuth from "../../hooks/useAuth";
import {confirmDelete} from  "../../otherFunc/confirmation";
import {successNotification , errorNotification } from  "../../otherFunc/notification";
import { Box,Button,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../../components/DataGridCustomToolbar';
import {DataGrid} from "@mui/x-data-grid"

import {MODALNAMES} from "../../otherFunc/customDataTypes";
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBranchId, selectPage, setActionPage } from '../auth/authSlice';
import { selectAllTransactions, useDeletePendingTransactionMutation, useGetTransactionsQuery } from './transactionApiSlice';
// import { selectAllCustomers } from '../customer/customerApiSlice';


// const URL = "/transaction-detail/pending";

function PendingTransList() {
    const [selectionModel,setSelectionModel] = useState([]);
    const dispatch = useDispatch()
    const [deletePendingTransaction,{isLoading:delLoading}] = useDeletePendingTransactionMutation();
    const selectPagee = useSelector(selectPage);
    const branch_id = useSelector(selectCurrentBranchId)

    const {isLoading, isSuccess, isError, error } = useGetTransactionsQuery('TransList' /*or null*/, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const dataa = useSelector(selectAllTransactions);
    // const getAllCust = useSelector(selectAllCustomers)

    // console.log(dataa)

    const data = dataa.filter(trans => trans.payment_status === "PENDING" && trans.branch_id === branch_id)
   
    // const send_cust = getAllCust.find(custt => custt.id === data.sender_id)
    // const receiver_cust = getAllCust.find(custt => custt.id === data.receiver_id)


//     const {setIsEdit,auth} = useAuth();

//     const axiosPrivate = useAxiosPrivate();
 
     
//     const performQuery = (branch_id) => {
 
//      return axiosPrivate.get(`${URL}/${branch_id}`);
 
//    }

   
//    const onSuccess = (data) => {};
//    const onError = (error) => {
//       console.log("error",error);
//    };

//    const {isLoading, data, isError, error, isFetching, refetch} = useQueryData1('get-pending-trans',auth.branch_id,()=>performQuery(auth.branch_id),onSuccess, onError);

 

const handleEdit = (id) => {
    if(selectPagee !== MODALNAMES.PENDINGTRANSMODAL){

        dispatch(setActionPage({isEdit:true, page:MODALNAMES.PENDINGTRANSMODAL, id}))
        console.log(selectPagee)

    }
}





const handleDelete = (id) => {

    const buttons = [
        {
          label: 'Yes',
          onClick: async () => {


            
            try{
                await deletePendingTransaction(id).unwrap()
                successNotification("This Pending Transaction  Deleted Successfully");
             } catch(error){
                errorNotification("This Pending Transaction Could Not Be Deleted");
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
        field: "tracking_number",
        headerName: "Tracking Number",
       
    },
    {
        field: "item_description",
        headerName: "Item Description",
        flex:1
    },

    {
      field: 'sender',
      headerName: 'Sender Name',
      flex:1,
      valueGetter: (params) => {
        // console.log(params.row.transaction_detail.receiver_branch.branch)
          return `${params.row.sender.fname} ${params.row.sender.lname}`
   
      },
  },
    // {
    //     field: 'receiver',
    //     headerName: 'Receiver Name',
    //     flex:1,
    //     valueFormatter: (params) => {

    //        // console.log(params.value[0].user_level)

    //        return `${params.value.fname} ${params.value.lname}`
       
    //     // const manager = params.value.find((man) =>  man.user_level === USERLEVEL.MANAGER)
    //     //   if(manager) return `${manager.fname} ${manage.lname}`
    //     //   return ""
    //     },
    //     // valueGetter: (params) => params.row.courier_type, 
    // },
    {
      field: 'receiver',
      headerName: 'Receiver Name',
      flex:1,
      valueGetter: (params) => {
        // console.log(params.row.transaction_detail.receiver_branch.branch)
          return `${params.row.receiver.fname} ${params.row.receiver.lname}`
   
      },
  },
    {
        field: "weight",
        headerName: "Weight",
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


                    // if(selectPagee !== MODALNAMES.BRANCHMODAL){
                    //     dispatch(setActionPage({isEdit:true, page:MODALNAMES.BRANCHMODAL, id:currentRow.id}))
                    //     }

                        if(selectPagee !== MODALNAMES.PENDINGTRANSMODAL){

                            dispatch(setActionPage({isEdit:true, page:MODALNAMES.PENDINGTRANSMODAL, id:currentRow.id}))
                            // console.log(selectPagee)
                    
                        }

     
       
           // return alert(JSON.stringify(currentRow));
          };
  
          const handleDelete = (e) => {
            const currentRow = params.row;
  
            const buttons = [
                {
                  label: 'Yes',
                  onClick: async () => {
        
                    // try{
                    //     await deleteBranch(currentRow.id).unwrap()
                    //     successNotification("This Branch Deleted Successfully");
                    //  } catch(error){
                    //     errorNotification("This Branch Could Not Be Deleted");
                    //  }

                     try{
                        await deletePendingTransaction(currentRow.id).unwrap()
                        successNotification("This Pending Transaction  Deleted Successfully");
                     } catch(error){
                        errorNotification("This Pending Transaction Could Not Be Deleted");
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
              <Button variant="contained"  endIcon={<EditIcon />} sx={{color: "white" }} color="info" size="small" onClick={handleEdit}>Transact</Button>
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
                        <Checkbox  id="checkAllTypes"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Trancking Number</Table.HeadCell>
                    <Table.HeadCell>Item Description</Table.HeadCell>
                    <Table.HeadCell>Sender Name</Table.HeadCell>
                    <Table.HeadCell>Receiver Name</Table.HeadCell>
                    <Table.HeadCell>To Branch</Table.HeadCell>
                    <Table.HeadCell>Weight</Table.HeadCell>
                    <Table.HeadCell className='hidden lg:table-cell'>
                    <span className="sr-only">Action</span>
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
                                    {d.item_description}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.sender.fname} {d.sender.lname}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.receiver.fname} {d.receiver.lname}
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.receiver_branch.branch} 
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {d.weight} 
                                </Table.Cell>
                                <Table.Cell className='hidden lg:table-cell'>                                    
                                    <Link to="#" onClick={() => handleEdit(d.id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                        Transact
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

export default PendingTransList