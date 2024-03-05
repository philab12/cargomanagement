import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb, Button } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'
import TripModal from '../modals/TripModal'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'
// import TripsList from '../lists/TripsList'


function UnauthorizePage(props) {
    const page = props.page

    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <> 
            {/* <Breadcrumb aria-label="Default breadcrumb example">
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
                    </Breadcrumb> */}
                    <div className='my-5 p-5 bg-white rounded-md'>
                        <section className='flex justify-between'>
                            <h1 className=''>Unauthorize</h1>
                        </section>
                    </div>
                    <div className='contentTable w-full'>
                    <h2>Page Not Found</h2>
                    <Button onClick={goBack}>Back</Button>
                    </div>
        </>
    )
}

export default UnauthorizePage