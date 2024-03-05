import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { selectCurrentBranchId, selectCurrentRole, selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { COURIER_STAGES, USERLEVEL, USERSTATUS } from '../otherFunc/customDataTypes';
import { selectAllTransactions, useGenerateCashierMoneyMutation, useGenerateRevenueMutation } from '../features/transaction/transactionApiSlice';
import { branchApiSlice, selectAllBranchs } from '../features/branch/branchApiSlice';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Checkbox, Label, TextInput, Select } from 'flowbite-react';
import { jwtDecode } from 'jwt-decode'

import { Box,Stack,useTheme } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DataGridCustomToolbar from '../components/DataGridCustomToolbar';
import {CustomFooterTotalComponent} from '../components/CustomFooterTotalComponent';
import {DataGrid} from "@mui/x-data-grid"
import { selectAllUsers } from '../features/user/userApiSlice';

function CashierList() {
    const [data, setData] = useState([])
    const [grandTotal, setGrandTotal] = useState("")
    const [users, setUsers] = useState({})
    const [genBy, setGenBy] = useState("")
    // const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)

    const [selectionModel,setSelectionModel] = useState([]);


    const token = useSelector(selectCurrentToken)
 
    const token_info = JSON.parse(JSON.stringify(jwtDecode(token)))

    const [generateCashierMoney, {isLoading:loading}] = useGenerateCashierMoneyMutation();
    

    const user_level = useSelector(selectCurrentRole);
    const branch_id = useSelector(selectCurrentBranchId);
    const user_id = token_info.sub;
    // const trans_all = useSelector(selectAllTransactions);
    const all_branch = useSelector(selectAllBranchs)
    const trans_branch = all_branch.filter((info) => info.is_main_branch === "NO");

    const all_users = useSelector(selectAllUsers);

    //Get Users
 //   if(user_level )

   let trans_users
   
   const getBranchUsers = (branch_id) => {

     trans_users = all_users.filter((info) => info.branch_id === branch_id && info.status === USERSTATUS.ACTIVE)

     setUsers(trans_users)
   }

   


   useEffect(() => {

    if(user_level !== USERLEVEL.SUPER_ADMIN && user_level !== USERLEVEL.CASHIER && user_level !== USERLEVEL.STAFF) {
        getBranchUsers(branch_id)
       }

   },[])

    const setActualGeneratedBy = (val) => {
        setGenBy(val);
    }


    const formik = useFormik({
        initialValues: {
          from_date: "",
          to_date: "",
          mode_payment: "",
          user: user_level === USERLEVEL.CASHIER || user_level === USERLEVEL.STAFF ? user_id : "ALL",
          branch: user_level === USERLEVEL.SUPER_ADMIN  ? "" : branch_id
        },
        onSubmit: async (values, onSubmitProps) => {
           // console.log('onSubmit', values)
  
              //values.consolidated_date = format(values.consolidated_date, 'yyyy-MM-dd');
             // values.consolidated_date = new Date(values.consolidated_date);

             try{
             
             const dataa =  await generateCashierMoney(values).unwrap()
             setShow(true)
             setData(dataa.revenue)
             setGrandTotal(dataa.grandTotal)

              } catch(error){
              console.log(error)
              if(Array.isArray(error?.data.message))
              {
               errorNotification(error?.data.message[0])
              }else{
                errorNotification(error?.data.message)
              }
             }
       
          
  
        },
        validationSchema: Yup.object({
          from_date: Yup.string().required("From Date is required"),
          to_date: Yup.string().required("To is required"),
          mode_payment: Yup.string().required("Mode Of Payment Is Required"),
          user: user_level !== USERLEVEL.CASHIER || user_level !== USERLEVEL.STAFF  ? Yup.string().required("User is required") : Yup.string().notRequired(),
          branch: user_level === USERLEVEL.SUPER_ADMIN  ? Yup.string().required("Please Select A Branch") : Yup.string().notRequired(),
       
        })
    });


    let columns;



    columns = [

        {
            field: "total_cost",
            headerName: "Total Coast",
            flex:1
        },

        {
          field: 'branch',
          headerName: 'Branch Name',
          flex:1,
          valueGetter: (params) => {
            // console.log(params.row.transaction_detail.receiver_branch.branch)
           // console.log(params)
              return `${params.row.branchh_branch}`
       
          },
      },


      {
        field: 'user',
        headerName: 'User',
        flex:1,
        valueGetter: (params) => {
          // console.log(params.row.transaction_detail.receiver_branch.branch)
            return `${params.row.upayment_fname} ${params.row.upayment_lname}`
     
        },
    },




    {
        field: 'contact',
        headerName: 'Contact',
        flex:1,
        valueGetter: (params) => {
          // console.log(params.row.transaction_detail.receiver_branch.branch)
            return `${params.row.upayment_contact}`
     
        },
    },


    
 

            
      ]
    


  


    return (
        <>

<form className="flex max-w-full flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* <h2>{isLoading || updateLoading ? "Loading..." : ""}</h2> */}

      <div className='flex w-full gap-5 items-center justify-normal'>

          <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="from_date" value="From Date" />
                </div>
                <TextInput 
                  id="from_date" 
                  name="from_date" 
                  type="date" 
                  placeholder="From Date" 
                  required 
                  value={formik.values.from_date} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.from_date && formik.touched.from_date && formik.errors.from_date}</div>
            </div>


            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="to_date" value="To Date" />
                </div>
                <TextInput 
                  id="to_date" 
                  name="to_date" 
                  type="date" 
                  placeholder="To Date" 
                  required 
                  value={formik.values.to_date} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="error">{formik.errors.to_date && formik.touched.to_date && formik.errors.to_date}</div>
            </div>


          </div>


          <div className='flex w-full gap-5 items-start justify-between mb-3'>
         {
            user_level === USERLEVEL.SUPER_ADMIN ?
          
            <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="branch" value="Branch" />
                </div>
                <Select 
                  id="branch" 
                  name="branch" 
                  required
                  value={formik.branch} 
                  onChange={e => {
                    formik.setFieldValue("branch",e.target.value);
                    getBranchUsers(e.target.value)
                 }}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Choose a Type --</option>
                  <option value="ALL">ALL</option>
                  {
                      trans_branch?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.branch}</option>
                      })
                  }
                </Select> 
                <div className="error">{formik.errors.branch && formik.touched.branch && formik.errors.branch}</div>
            </div>
         
          : null
}

  

{
            (user_level !== USERLEVEL.CASHIER || user_level !== USERLEVEL.STAFF) && users.length  ?
    <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="user" value="User" />
                </div>
                <Select 
                  id="user" 
                  name="user" 
                  required
                  value={formik.user} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">-- Choose a Type --</option>
                  <option value="ALL">ALL</option>
                  {
                      users?.map((d) => {
                          return <option value={d.id} key={d.id}>{d.fname} {d.lname} - {d.user_level}</option>
                      })
                  }
                  {/* <option value="COURIER_CATE">COURIER CATE</option>
                  <option value="USER">USER</option> */}
                 
                </Select> 
                <div className="error">{formik.errors.user && formik.touched.user && formik.errors.user}</div>
            </div> : null
}


         <div className='w-1/2'>
                <div className="mb-2 block">
                <Label htmlFor="mode_payment" value="Mode Of Payment" />
                </div>
                <Select 
                  id="mode_payment" 
                  name="mode_payment" 
                  required
                  value={formik.mode_payment} 
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                    <option value="">--Please Select Option --</option>
                    <option value="ALL">ALL</option>
                   <option value="CASH">CASH</option>
                    <option value="POS">POS</option>
                    <option value="MOBILE MONEY">MOBILE MONEY</option>
                    <option value="CREDIT CARD">CREDIT CARD</option>
               
                 
                </Select> 
                <div className="error">{formik.errors.mode_payment && formik.touched.mode_payment && formik.errors.mode_payment}</div>
            </div>

            </div>
    
          <Button type='submit'>Generate Report</Button>
      </form>
      <div></div>

            {/* <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell className="p-4">
                        <Checkbox id="checkAllRevenues"/>
                    </Table.HeadCell>
                    <Table.HeadCell>Amount</Table.HeadCell>
                    <Table.HeadCell>Branch</Table.HeadCell>
                    <Table.HeadCell>Date</Table.HeadCell>
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
                                    GHS {d.amount}
                                </Table.Cell>
                                <Table.Cell>{d.branch}</Table.Cell>
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
            </Table> */}


{
    show &&
<Box className="bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 outline-none" mt="5px"  height="50vh"
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

          
        //   columnVisibilityModel={{
        //     // branch: user_level !== USERLEVEL.SUPER_ADMIN ? false : true,
        //     action: user_level === USERLEVEL.SUPER_ADMIN ? true : false
        //   }}

          
        loading={(loading || !data)}
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
          footer: CustomFooterTotalComponent

        }}
        slotProps={{
          toolbar: { selectionModel,  },
          footer: {grandTotal}
        }}



        />
        </Box>   
}
        </>
    )
}

export default CashierList