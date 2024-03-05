import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import IdTypeForm from "../features/idType/IdTypeForm";
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';

export default function IdTypeModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()



  // const {isEdit, setIsEdit} = useAuth();
  useEffect(() => {
   if(isEdit === true && selectPagee === MODALNAMES.IDTYPEMODAL ){
   setOpenModal(true) ;
   }

  }, [isEdit])


  
  const handleAddOpenModal = () => {
    // setIsEdit({isEdit:false,page:"",id:""})
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);

   }


   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.IDTYPEMODAL ){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }

  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Type</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Id Type" : "Edit Id Type"}</Modal.Header>
        <Modal.Body>
          <IdTypeForm handleCloseModal={handleCloseModal} />
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
