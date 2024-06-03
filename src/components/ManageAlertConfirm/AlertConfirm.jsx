import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function AlertConfirm(props) {

    const handleConfirmYes = () => {
        props.setOpenModalCompleteExamining(true);
        props.setOpenModalAlertConfirm(false);
    }

    return (
        <>
            <Dialog open={props.openModalAlertConfirm}>
                <DialogTitle>Kết thúc khám cho bệnh nhân?</DialogTitle>
                <DialogActions sx={{m: 'auto'}}>
                    <Button sx={{fontWeight: 'bolder', fontSize: '17px', ':hover': {backgroundColor: 'rgba(25, 118, 210, 0.1)'}}} 
                    onClick={() => handleConfirmYes()}>Có</Button>
                    <Button sx={{fontWeight: 'bolder', color: 'red', fontSize: '17px', ':hover': {backgroundColor: 'rgb(210, 25, 25, 0.1)'}}} 
                    onClick={() => props.setOpenModalAlertConfirm(false)}>Không</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AlertConfirm