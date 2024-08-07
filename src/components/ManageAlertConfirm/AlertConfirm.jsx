import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function AlertConfirm(props) {
    const handleCloseAlertConfirmModal = () => {
        props.onCloseAlertConfirmModal({ open: false, title: props.titleConfirm })
    }

    return (
        <>
            <Dialog open={props.openAlertConfirmModal}>
                <DialogTitle>{props.titleConfirm}</DialogTitle>
                <DialogActions sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button sx={{fontWeight: 'bolder', fontSize: '17px', ':hover': {backgroundColor: 'rgba(25, 118, 210, 0.1)'}}} 
                    onClick={props.onConfirmAlertConfirmModal}>Có</Button>
                    <Button sx={{fontWeight: 'bolder', color: 'red', fontSize: '17px', ':hover': {backgroundColor: 'rgb(210, 25, 25, 0.1)'}}} 
                    onClick={(e) => handleCloseAlertConfirmModal()}>Không</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AlertConfirm