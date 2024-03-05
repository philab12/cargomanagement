import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import TripModal from '../modals/TripModal'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
import TripsList from '../features/tripSetup/TripsList' 


function TripsPage(props) {
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
                            Trips
                        </Link>
                    </Breadcrumb>
                    <div className='my-5 p-5 bg-white rounded-md'>
                        <section className='flex justify-between'>
                            <h1 className=''>Trips</h1>
                            <TripModal/>
                        </section>
                    </div>
                    <div className='contentTable w-full'>
                        <TripsList/>
                    </div>
        </>
    )
}

export default TripsPage