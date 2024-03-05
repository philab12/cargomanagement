import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CourierPriceForm from '../features/courierPrice/CourierPriceForm';
import useAuth from '../hooks/useAuth';
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';


export default function CourierPriceModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
 
   if(isEdit === true && selectPagee === MODALNAMES.COURIERPRICEMODAL ){
    setOpenModal(true) ;
    }

  }, [isEdit])


  
  const handleAddOpenModal = () => {
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);
   }

   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.COURIERPRICEMODAL ){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    }
    setOpenModal(false);
   }


  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>New Price</Button>
      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "New Courier Price" : "Edit Courier Price"}</Modal.Header>
        <Modal.Body>
          <CourierPriceForm  handleCloseModal={handleCloseModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
