import { Button, Modal } from 'flowbite-react';
import { useState,useEffect } from 'react';
import WeightUnitForm from "../features/weightUnit/WeightUnitForm";
// import useAuth from '../hooks/useAuth';
import { MODALNAMES } from '../otherFunc/customDataTypes';

import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function WeightUnitModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
   if(isEdit === true && selectPagee === MODALNAMES.WEIGHTUNITMODAL){
    setOpenModal(true) ;
    }

  }, [isEdit])


  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }


   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.WEIGHTUNITMODAL){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }


  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Unit</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Weight Unit" : "Edit Weight Unit"}</Modal.Header>
        <Modal.Body>
          <WeightUnitForm handleCloseModal={handleCloseModal}  />
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
