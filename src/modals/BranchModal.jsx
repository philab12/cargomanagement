import { Modal, Button } from 'flowbite-react';
import { useState,useEffect } from 'react';
import BranchForm from '../features/branch/BranchForm';
import { MODALNAMES, USERLEVEL } from '../otherFunc/customDataTypes';

import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentRole, selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function BranchModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  const user_level = useSelector(selectCurrentRole);


  useEffect(() => {
    if(isEdit === true && selectPagee=== MODALNAMES.BRANCHMODAL ){
      setOpenModal(true) ;
      }
  }, [isEdit])


  
  const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.BRANCHMODAL ){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }


  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }


  return (
    <>
    {user_level === USERLEVEL.SUPER_ADMIN ? <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Branch</Button> : null }
      
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Branch" : "Edit Branch"}</Modal.Header>
        <Modal.Body>
          <BranchForm  handleCloseModal={handleCloseModal} />
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
