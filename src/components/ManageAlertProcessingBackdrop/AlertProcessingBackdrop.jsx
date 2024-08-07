import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AlertProcessingBackdrop(props) {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: props.changeBackground ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)' }} open={props.openAlertProcessingBackdrop}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <CircularProgress color='inherit' />
                <Typography sx={{mt: 1.4,}} variant='subtitle1'>{props.alertTitle}</Typography>
            </Box>
        </Backdrop>
    );
}

export default AlertProcessingBackdrop
