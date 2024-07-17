import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

function AlertProcessing(props) {
    return (
        <>
            <Dialog fullWidth={true} maxWidth={'sm'} open={props.openAlertProcessing} disableEscapeKeyDown={true}>
                <DialogContent>
                    <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                        <CircularProgress/>
                        <Typography variant='subtitle1' sx={{mt: 1}}>Đang xử lý...</Typography>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AlertProcessing