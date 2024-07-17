import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function AlertConfirm(props) {
    return (
        <>
            <Dialog open={props.openAlertConfirmModal}>
                <DialogTitle>{props.titleConfirm}</DialogTitle>
                <DialogActions sx={{m: 'auto'}}>
                    <Button sx={{fontWeight: 'bolder', fontSize: '17px', ':hover': {backgroundColor: 'rgba(25, 118, 210, 0.1)'}}} 
                    onClick={props.onConfirmAlertConfirmModal}>Có</Button>
                    <Button sx={{fontWeight: 'bolder', color: 'red', fontSize: '17px', ':hover': {backgroundColor: 'rgb(210, 25, 25, 0.1)'}}} 
                    onClick={props.onCloseAlertConfirmModal}>Không</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AlertConfirm