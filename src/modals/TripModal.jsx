import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import TripForm from '../features/tripSetup/TripForm';
import useAuth from '../hooks/useAuth';
import {MODALNAMES} from "../otherFunc/customDataTypes";

import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function TripModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()


   useEffect(() => {
    if(isEdit === true && selectPagee === MODALNAMES.TRIPMODAL){
    setOpenModal(true) ;
    }

   }, [isEdit])


   const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }


   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.TRIPMODAL){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }

  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Trip</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Trip" : "Edit Trip"}</Modal.Header>
        <Modal.Body>
          <TripForm handleCloseModal={handleCloseModal}/>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleCloseModal} className='w-full'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
