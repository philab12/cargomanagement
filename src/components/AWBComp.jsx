import Logo from '../assets/img/passionAirLogo2.png';
import { Table } from 'flowbite-react';

const AWBComp = () => {
    return (
        <div className='max-w-4xl'>
            <div className='flex justify-normal'>
                <div className='text-center w-1/3 border border-black border-b-0'>
                    <div>AIRWAY BILL</div>
                    <small>(For consolidating Shipment)</small>
                </div>
                <div className='w-2/3 flex justify-center'>
                    <img src={Logo} alt="" className='w-28'/>
                </div>
            </div>
            <div className='flex justify-normal'>
                <div className='text-center w-1/3 border border-black'>
                    <div>NAME OF CARRIER</div>
                    <small>&nbsp;</small>
                </div>
                <div className='text-center w-1/3 border border-black border-l-0'>
                    <div>TRACKING NO.</div>
                    <small>&nbsp;</small>
                </div>
                <div className='text-center w-1/3 border border-black border-l-0'>
                    <div>DATE:</div>
                    <small>&nbsp;</small>
                </div>
            </div>
            <div className='flex justify-normal'>
                <div className='text-center w-1/3 border border-black border-t-0'>
                    <div>SENDER</div>
                    <div>(Complete Name and Address)</div>
                    <div className='h-10'>&nbsp;</div>
                </div>
                <div className='text-center w-2/3 border border-black border-t-0 border-l-0'>
                    <div>RECEIVER</div>
                    <div>(Complete Name and Address)</div>
                    <div className='h-10'>&nbsp;</div>
                </div>
            </div>
            <Table hoverable striped className='border border-black border-t-0'>
                <Table.Head>
                    <Table.HeadCell className='w-10'>No. Of Packages</Table.HeadCell>
                    <Table.HeadCell className='w-2'>HM<br/>*</Table.HeadCell>
                    <Table.HeadCell>DESCRIPTION OF SHIPMENT</Table.HeadCell>
                    <Table.HeadCell className='w-10'>GROSS WEIGHT</Table.HeadCell>
                    <Table.HeadCell>PURCHASE ORDER NUMBER</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row>
                        <Table.Cell>Sample</Table.Cell>
                        <Table.Cell>Sample</Table.Cell>
                        <Table.Cell>Sample</Table.Cell>
                        <Table.Cell>Sample</Table.Cell>
                        <Table.Cell>Sample</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default AWBComp