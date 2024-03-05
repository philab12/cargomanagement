import { Sidebar } from 'flowbite-react';
import Logo from '../assets/img/passionAirLogo.png';
import Logo2 from '../assets/img/passionAirLogo2.png';
import { SidebarList } from '../lists/allLinksList';

function SidebarComp() {
  
  return (
    <>
    <Sidebar className="" aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Logo href="/" img={ Logo } imgAlt="Passion Air Logo">
        Passion Air Cargo
      </Sidebar.Logo>
      <Sidebar.Items className='pb-24'>
        <Sidebar.ItemGroup>
          {
            <SidebarList/>
          }
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <div className='bottom-0 fixed justify-center w-52 bg-gray-50'>
          <img src={Logo2} alt="" className='w-20 m-auto ml-12'/>
      </div>
    </Sidebar>
</>
  );
}

export default SidebarComp