import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import CustomerModal from '../modals/CustomerModal'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
import CustomersList from "../features/customer/CustomersList"


function CustomersPage() {
    return (
        <>
          
                        <Breadcrumb aria-label="Default breadcrumb example">
                            <Link to="/" className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                                <HiHome/>
                                Home
                                <FaAngleRight/>
                            </Link>
                            <Link className='text-sm font-semibold ml-2'>Customers</Link>
                        </Breadcrumb>
                        <div className='my-5 p-5 bg-white rounded-md'>
                            <section className='flex justify-between'>
                                <h1 className=''>Customers</h1>
                                <CustomerModal/>
                            </section>
                        </div>
                        <div className='contentTable w-full'>
                            <CustomersList/>
                        </div>
             
        </>
    )
}

export default CustomersPage