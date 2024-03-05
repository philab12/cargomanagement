import { Button, Modal } from 'flowbite-react';
import { useState,useEffect } from 'react';
import UserForm from '../features/user/UserForm';
import useAuth from '../hooks/useAuth';
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function UserModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
    if(isEdit === true && selectPagee === MODALNAMES.USERMODAL ){
      setOpenModal(true) ;
      }

  }, [isEdit])


  const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.USERMODAL ){
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
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New User</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit.isEdit ? "New User" : "Edit User"}</Modal.Header>
        <Modal.Body>
          <UserForm  handleCloseModal={handleCloseModal} />
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
