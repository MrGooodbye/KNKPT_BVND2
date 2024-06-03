import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
//mui icon
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ExaminingSession(props) {


    return (
        <Dialog fullWidth={true} maxWidth={'sm'} open={props.openModalExaminingSession} disableEscapeKeyDown={true}>
            <DialogTitle sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'green', textTransform: 'uppercase' }}>Nguyễn Văn A, Nam, 2 tháng 25 Ngày</DialogTitle>
            <IconButton onClick={() => props.setOpenModalExaminingSession(false)} sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
            </IconButton>
            <DialogContent dividers sx={{pl: '0px', pr: '0px'}}>
                <Grid container rowSpacing={0}>
                    <Grid item xs={0.5}/>

                    <Grid item xs={5.5}>
                        <Box sx={{border: '2px solid black', p: 1, height: '50vh', overflow: 'auto'}}>
                            <Typography variant='h6' sx={{fontWeight: 'bolder'}}>Lịch sử khám</Typography>
                            <Typography variant='subtitle1'>Khám sơ sinh</Typography>
                            <Typography variant='subtitle1'>Khám 1 tháng</Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={5.5}>
                        <Box sx={{border: '2px solid red', p: 1, height: '50vh'}}>
                            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                                <Typography variant='h6' sx={{fontWeight: 'bolder', color: 'red'}}>Chọn kỳ khám</Typography>
                                <RadioGroup>
                                    <FormControlLabel value="female" control={<Radio />} label="Khám 2 tháng" />
                                    <FormControlLabel value="male" control={<Radio />} label="Khám 3 tháng" />
                                </RadioGroup>
                           
                                <Button variant='contained' sx={{mt: 0.5}}>Tiếp tục (F2)</Button> 
                            </div>
                            
                        </Box>
                    </Grid>

                  
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ExaminingSession