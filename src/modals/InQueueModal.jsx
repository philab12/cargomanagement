import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import InQueueForm from '../forms/InQueueForm';
import useAuth from '../hooks/useAuth';
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { selectIsEdit, selectPage, setActionPage } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function InQueueModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    if(isEdit === true && selectPagee === MODALNAMES.INQUEUEMODAL ){
   setOpenModal(true) ;
   }

  }, [isEdit])



  
  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
  //  dispatch(setActionPage({isEdit:false, page:null, id:null}))
   }



   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.INQUEUEMODAL ){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))
  }
  setOpenModal(false);
   }

  return (
    <>
      {/* <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Type</Button> */}
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{"In Queue"}</Modal.Header>
        <Modal.Body>
          <InQueueForm handleCloseModal={handleCloseModal} />
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
