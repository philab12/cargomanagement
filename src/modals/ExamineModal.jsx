import { Link } from 'react-router-dom'
import { Button, Modal } from 'flowbite-react';
import { FaBoxesPacking } from 'react-icons/fa6'
import { useState } from 'react';
import ExamineForm from '../forms/ExamineForm';

export default function ExamineModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Link to="#" className='p-2 mr-3 text-passionGold text-2xl' title="Examine Package" onClick={() => setOpenModal(true)}>
        <FaBoxesPacking/>
      </Link>
      
      <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
        <Modal.Header>Examine Parcel</Modal.Header>
        <Modal.Body>
          <ExamineForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setOpenModal(false)} className='w-full'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
