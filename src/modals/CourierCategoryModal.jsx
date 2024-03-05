import { Button, Modal} from 'flowbite-react';
import { useState, useEffect } from 'react';
import CourierCategoryForm from '../features/courierCate/CourierCategoryForm';
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';


export default function CourierCategoryModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()


  useEffect(() => {
    if(isEdit === true && selectPagee=== MODALNAMES.COURIERCATEMODAL){
      setOpenModal(true) ;
      }
  }, [isEdit])

    
  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }

   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.COURIERCATEMODAL){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }

  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Category</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Courier Category" : "Edit Courier Category"}</Modal.Header>
        <Modal.Body>
          <CourierCategoryForm handleCloseModal={handleCloseModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button  color="gray" onClick={handleCloseModal} className='w-full'>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
