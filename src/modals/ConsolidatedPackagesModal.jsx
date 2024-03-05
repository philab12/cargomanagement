import { Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CourierTypeForm from '../features/courierType/CourierTypeForm';
// import useAuth from '../hooks/useAuth';
import { MODALNAMES } from '../otherFunc/customDataTypes';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsEdit, selectPage,   setActionPage } from '../features/auth/authSlice';
import ConsolidatedPackageForm from '../features/consolidatedPackage/ConsolidatedPackageForm';

export default function ConsolidatedPackagesModal() {
  const [openModal, setOpenModal] = useState(false);
  const isEdit = useSelector(selectIsEdit);
  const selectPagee = useSelector(selectPage);
  const dispatch = useDispatch()

  useEffect(() => {
   if(isEdit === true && selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES ){
   setOpenModal(true) ;
   }

  }, [isEdit])


  
  const handleAddOpenModal = () => {
    // setIsEdit({isEdit:false,page:"",id:""})
    dispatch(setActionPage({isEdit:false, page:null, id:null}))
    setOpenModal(true);

   }




   const handleCloseModal = () => {
    if(isEdit === true && selectPagee === MODALNAMES.CONSOLIDATEDPACKAGES){
      dispatch(setActionPage({isEdit:false, page:null, id:null}))

    } 
    setOpenModal(false);
   }

  return (
    <>
      <Button onClick={handleAddOpenModal} className='absolute right-10 -mt-2'>Consolidate New Packages</Button>

      
      <Modal show={openModal} onClose={handleCloseModal} size="4xl">
        <Modal.Header>{!isEdit ? "Consolidated Package" : "Edit Consolidated Package"}</Modal.Header>
        <Modal.Body>
          <ConsolidatedPackageForm handleCloseModal={handleCloseModal} />
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
