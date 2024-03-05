import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export const confirmDelete = (buttons) => {


    return confirmAlert({
        title: 'Delete',
        message: 'Are You Sure You Want To Delete This Data',
        buttons: buttons
      });
    
}
