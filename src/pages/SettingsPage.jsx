import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { FaAngleRight } from 'react-icons/fa6'


function SettingsPage() {
    return (
        <>
            <div className=''>
                <div className='flex'>
                    <aside id="default-sidebar" className="sideBarAside" aria-label="Sidebar">
                        <div className="h-full overflow-y-auto overflow-x-hidden border-r border-r-slate-300">
                            <SidebarComp/>
                        </div>
                    </aside>      
                </div>
                <div className='sm:ml-64'>
                    <div>
                        <NavbarComp/>
                    </div>
                    <div className='p-4 bg-gray-100 border-t-slate-300 border-t'>
                        <Breadcrumb aria-label="Default breadcrumb example">
                            <Link to="/" className='flex items-center gap-2 text-sm font-semibold text-gray-500'>
                                <HiHome/>
                                Home
                                <FaAngleRight/>
                            </Link>
                            <Link className='text-sm font-semibold ml-2'>Settings</Link>
                        </Breadcrumb>
                        <div className='my-5 p-5 bg-white rounded-md'>
                            <h1 className=''>Settings</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsPage