import { Outlet } from "react-router-dom";
import NavbarComp from '../components/NavbarComp'
import SidebarComp from '../components/SidebarComp'
import Copyright from '../components/CopyrightComp'
import AdminFooter from '../components/AdminFooter'

const Layout = () => {
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
                      <Outlet />
                    <AdminFooter/>
                    <Copyright/>
                </div>
            </div>
        </div>
    </>
    )
}

export default Layout