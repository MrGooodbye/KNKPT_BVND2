import React, { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/image/logo.png';
import Register from '../ManageRegister/Register';

const Login = () => {
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 3, borderRadius: '25px' }} >
                    <Box sx={{ p: 7.6 }}>
                        <Avatar src={Logo} sx={{ width: 120, height: 120, ml: 'auto', mr: 'auto', mb: 2 }} />
                        <Typography sx={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '1.15rem', mb: 2, color: '#4caf50' }} variant="h5">Chương trình khám nhi khoa phát triển</Typography>
                        <Box component="form" autoComplete="off" style={{ textAlign: 'center' }}>
                            <TextField label="Tài khoản" variant="outlined" sx={{ width: '40ch', mb: 2.5 }} />
                            <TextField label="Mật khẩu" variant="outlined" type={showPassword ? "text" : "password"} sx={{ width: '40ch', mb: 3 }} 
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} sx={{padding: '1px'}}> {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Stack spacing={2} direction="column">
                                <Button sx={{ height: '6.5vh', width: '28ch' }} variant="contained" style={{ margin: 'auto' }}>Đăng nhập</Button>
                                <Typography sx={{textAlign: 'center'}} variant="subtitle1">Chưa có tài khoản? <strong style={{cursor: 'pointer'}} onClick={() => setOpenModalRegister(true)}>Đăng ký</strong></Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Register
                openModalRegister={openModalRegister}
                setOpenModalRegister={setOpenModalRegister}
            />
        </>
  )
}

export default Login