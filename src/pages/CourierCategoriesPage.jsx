import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
import CourierCategoriesList from '../features/courierCate/CourierCategoriesList'
import CourierCategoryModal from '../modals/CourierCategoryModal'


function CourierCategoriesPage(props) {
    const page = props.page
    return (
        <> 
                        <Breadcrumb aria-label="Default breadcrumb example">
                            <Link to="/" className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                                <HiHome/>
                                Home
                                <FaAngleRight/>
                            </Link> 
                            <Link className='flex items-center gap-2 text-sm font-semibold ml-2 text-gray-500'>
                                Setups
                                <FaAngleRight/>
                            </Link>
                            <Link className='text-sm font-semibold ml-2'>
                                Courier Categories
                            </Link>
                        </Breadcrumb>
                        <div className='my-5 p-5 bg-white rounded-md'>
                            <section className='flex justify-between'>
                                <h1 className=''>Courier Categories</h1>
                                <CourierCategoryModal/>
                            </section>
                        </div>
                        <div className='contentTable w-full'>
                            <CourierCategoriesList/>
                        </div>
                       
        </>
    )
}

export default CourierCategoriesPage