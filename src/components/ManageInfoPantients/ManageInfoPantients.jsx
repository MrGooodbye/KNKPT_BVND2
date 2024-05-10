import React, { useState, useContext, useEffect } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

function ManageInfoPantients(props) {

    const handleCloseModalInfoPantients = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        else{
            props.setOpenModalInfoPantients(false);
        }
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth='md' open={props.openModalInfoPantients} onClose={(event, reason) => handleCloseModalInfoPantients(event, reason)} disableEscapeKeyDown={true}>
                <DialogTitle sx={{ p: 1, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Thông tin bệnh nhân</DialogTitle>
                <IconButton onClick={() => handleCloseModalInfoPantients()} sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                <DialogContent dividers sx={{pt: '10px', pb: '10px'}}>
                    <Box>
                        <Grid container rowSpacing={2.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={2.5}>
                                <TextField disabled label='Mã BN' defaultValue='000000001'></TextField>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField label='Họ tên' sx={{width: '100%'}} defaultValue='Tạ Thị Phương Thảo Thảo Thảo Thảo'></TextField>
                            </Grid>
                            <Grid item xs={2.5}>
                                <TextField label='Ngày sinh' defaultValue='01/01/2024'></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{mt: 1}}>
                                    <FormControlLabel control={<Checkbox />} label="Nam" /> 
                                    <FormControlLabel control={<Checkbox />} label="Nữ " />   
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label='Dân tộc' defaultValue='Kinh'></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label='Thành phố' defaultValue='Hồ Chí Minh'></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label='Quận/Huyện' defaultValue='Quận 1'></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label='Xã/Phường' defaultValue='Bến Nghé'></TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField label='Địa chỉ' defaultValue='Đây là địa chỉ' sx={{width: '100%'}}></TextField>
                            </Grid>
                            <Grid item xs={3.7}>
                                <TextField label='Họ tên mẹ' sx={{width: '100%'}} defaultValue=''></TextField>
                            </Grid>
                            <Grid item xs={2.3}>
                                <TextField label='Điện thoại' defaultValue='0987654321'></TextField>
                            </Grid>
                            <Grid item xs={3.7}>
                                <TextField label='Họ tên cha' sx={{width: '100%'}} defaultValue=''></TextField>
                            </Grid>
                            <Grid item xs={2.3}>
                                <TextField label='Điện thoại' defaultValue='0987654321'></TextField>
                            </Grid>
                            <Grid item xs={1.5}>
                                <TextField label='Chiều cao' defaultValue='120' InputProps={{endAdornment: <InputAdornment position="end">cm</InputAdornment>}}></TextField>
                            </Grid>
                            <Grid item xs={1.5}>
                                <TextField label='Cân nặng' defaultValue='5' InputProps={{endAdornment: <InputAdornment position="end">kg</InputAdornment>}}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControlLabel control={<Checkbox />} label="Tham gia tiêm ngừa"/>  
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent: 'center'}}>
                    <Button variant="contained">Sửa (Enter)</Button>
                    <Button variant="contained" color='secondary' onClick={(event, reason) => handleCloseModalInfoPantients(event, reason)}>Đóng (ESC)</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ManageInfoPantients