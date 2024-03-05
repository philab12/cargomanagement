import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CustomerForm from "../features/customer/CustomerForm";
import { MODALNAMES, USERLEVEL } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentRole, selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function CustomerModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  const user_level = useSelector(selectCurrentRole);

  useEffect(() => {
    if(isEdit === true && selectPagee=== MODALNAMES.CUSTOMERMODAL){
      setOpenModal(true) ;
      }
  }, [isEdit])


  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }

   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.CUSTOMERMODAL){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }


  return (
    <>
      {user_level !== USERLEVEL.SUPER_ADMIN || user_level === USERLEVEL.STAFF || user_level === USERLEVEL.SUPERVISOR  ? <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Customer</Button> : null}
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Customer" : "Edit Customer"}</Modal.Header>
        <Modal.Body>
          <CustomerForm handleCloseModal={handleCloseModal}  />
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
