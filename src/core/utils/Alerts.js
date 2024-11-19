import Swal from 'sweetalert2';
import './Custom.css';

const defaultOptions = {
    customClass: {
        confirmButton: 'swal-confirm-button', 
        cancelButton: 'swal-cancel-button', 
    },
};

const showAlert = (title, text, icon = 'info', options = {}) => {
    return Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#ffffff', 
        cancelButtonColor: '#000000', 
        ...defaultOptions, 
        ...options, 
    });
};

const showConfirm = (title, text, icon = 'warning', options = {}) => {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#ffffff',
        cancelButtonColor: '#000000',
        ...defaultOptions,
        ...options,
    });
};

const showSuccess = (title = '¡Éxito!', text = 'Operación realizada correctamente.', options = {}) => {
    return Swal.fire({
        title,
        text,
        icon: 'success',
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#ffffff',
        cancelButtonColor: '#000000',
        ...defaultOptions,
        ...options,
    });
};

const showError = (title = 'Error', text = 'Algo salió mal. Inténtalo de nuevo.', options = {}) => {
    return Swal.fire({
        title,
        text,
        icon: 'error',
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#ffffff',
        cancelButtonColor: '#000000',
        ...defaultOptions,
        ...options,
    });
};

const showCancel = (title = 'Cancelado', text = 'Cancelando ...', options = {}) => {
    return Swal.fire({
        title,
        text,
        icon: 'info',
        confirmButtonText: 'Guardar',
        confirmButtonColor: '#ffffff',
        cancelButtonColor: '#000000',
        ...defaultOptions,
        ...options,
    });
};

export default {
    showAlert,
    showConfirm,
    showSuccess,
    showError,
    showCancel,
};
