import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
//api
import { updatePassword } from '../../Service/UserService';

function ChangePassword(props) {
    const inputPasswordDefault = {
        currentPassword: '',
        openCurrentPassword: false,
        newPassword: '',
        openNewPassword: false
    }

    const [inputPassword, setInputPassword] = useState(inputPasswordDefault);

    const [loading, setLoading] = useState(false);

    const handleCloseModalChangePassword = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        else{
            props.setIsDialogChangePasswordOpen(false);
            props.setOpenModalChangePassword(false);
            setTimeout(() => {
                setInputPassword(inputPasswordDefault);
            }, 200)
        }
    }

    const handleClickShowCurrentPassword = () => {
        const _inputPassword = {...inputPassword};
        _inputPassword.openCurrentPassword = !inputPassword.openCurrentPassword
        setInputPassword(_inputPassword);
    }

    const handleClickShowNewPassword = () => {
        const _inputPassword = {...inputPassword};
        _inputPassword.openNewPassword = !inputPassword.openNewPassword
        setInputPassword(_inputPassword);
    }

    const onChangeCurrentPassword = (value) => {
        const _inputPassword = {...inputPassword};
        _inputPassword.currentPassword = value
        setInputPassword(_inputPassword);
    }

    const onChangeNewPassword = (value) => {
        const _inputPassword = {...inputPassword};
        _inputPassword.newPassword = value
        setInputPassword(_inputPassword);
    }

    const handleValidate = () => {
        let isValid = true;
        if(inputPassword.currentPassword === ''){
            toast.warning('Bạn chưa nhập mật khẩu hiện tại!', {toastId: 'validateCurrentPassword'})
            isValid = false;
        }
        
        if(inputPassword.newPassword === ''){
            toast.warning('Bạn chưa nhập mật khẩu mới!', {toastId: 'validateNewPassword'})
            isValid = false
        }
        return isValid;
    }

    const handleChangePassword = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2 * 100));
        if(handleValidate()){
            const inputPayloadPassword = { password: inputPassword.newPassword, passwordOld: inputPassword.currentPassword }
            const responseUpdatePassword = await updatePassword(inputPayloadPassword);

            if(responseUpdatePassword.status === 400 && responseUpdatePassword.data === 'Tài khoản hoặc mật khẩu không chính xác !'){
                toast.error('Mật khẩu hiện tại không chính xác.', {toastId: 'handleChangePasswordError1'})
            }
            else if(responseUpdatePassword.status === 400){
                toast.error(responseUpdatePassword.data, {toastId: 'handleChangePasswordError2'})
            }
            else if(responseUpdatePassword.status === 200){
                toast.success(responseUpdatePassword.data, {toastId: 'handleChangePasswordSuccess'})
                handleCloseModalChangePassword();
            }
        }
        setLoading(false)
    }

    return (
        <>
            <Dialog maxWidth={'xs'} fullWidth={true} open={props.openModalChangePassword} onClose={(event, reason) => handleCloseModalChangePassword(event, reason)} disableEscapeKeyDown={true} >
                <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px' }}>Đổi mật khẩu</DialogTitle>
                <IconButton onClick={() => handleCloseModalChangePassword()}sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                
                <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {loading ? 
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <CircularProgress />
                        </div>
                    :
                        <>

                            <TextField autoFocus={true} label="Mật khẩu hiện tại" variant="outlined" type={inputPassword.openCurrentPassword ? "text" : "password"} sx={{ width: '40ch', mb: 2.5 }} onChange={(e) => onChangeCurrentPassword(e.target.value)} 
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowCurrentPassword} sx={{padding: '1px'}}> {inputPassword.openCurrentPassword  ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField label="Mật khẩu mới" variant="outlined" type={inputPassword.openNewPassword ? "text" : "password"} sx={{ width: '40ch', mb: 2.5 }} onChange={(e) => onChangeNewPassword(e.target.value)}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowNewPassword} sx={{padding: '1px'}}> {inputPassword.openNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Stack spacing={2} direction="column">
                                <Button sx={{ height: '6vh', width: '20ch' }} variant="contained" color="success" style={{ margin: 'auto' }} onClick={() => handleChangePassword()}>Đổi mật khẩu</Button>
                            </Stack>
                        </>
                    }

                </DialogContent>
            </Dialog>
        </>
    )
}

export default ChangePassword