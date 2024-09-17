import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//modal
import AlertProcessingBackdrop from '../ManageAlertProcessingBackdrop/AlertProcessingBackdrop';
//theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/image/logo.png';
import Register from '../ManageRegister/Register';
import { toast } from 'react-toastify';
//mui icon
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
//context
import { UserContext } from '../../context/UserContext';
//api
import { userLogin } from '../../Service/UserService';
import { getCurrentDoctorExamining } from '../../Service/MedicalService';

const Login = () => {
    const { user, loadingContext, loginContext } = useContext(UserContext);
    const history = useHistory();

    const [openAlertProcessingBackdrop, setOpenAlertProcessingBackdrop] = useState(false);

    const [userAccount, setUserAccount] = useState({userId: '', password: ''})
    const [openModalRegister, setOpenModalRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onChangeUserName = (e, value) => {
        setUserAccount(prevUserAccount => {
            return {
                ...prevUserAccount,
                userId: value
            }
        }) 
    }

    const onChangeUserPassword = (e, value) => {
        setUserAccount(prevUserAccount => {
            return {
                ...prevUserAccount,
                password: value
            }
        })
    }

    const handleLogin = async () => {
        if(userAccount.userName === ''){
            toast.error('Bạn chưa nhập tài khoản!')
        }
        else if(userAccount.password === ''){
            toast.error('Bạn chưa nhập mật khẩu!');
        }
        else{
            setOpenAlertProcessingBackdrop(true);
            const response = await userLogin(userAccount.userId, userAccount.password);
            setOpenAlertProcessingBackdrop(false);
            if(response.status !== 200){
                toast.error(response.data);
            }
            else{
                localStorage.setItem('jwt', response.data.tokenDTO.token)
                if(response.data.positionName === 'Doctor'){
                    const responseCurrentDoctorExamining = await getCurrentDoctorExamining();
                    if(responseCurrentDoctorExamining.status === 200){
                        const userLogin = {
                            isAuthenticated: true, 
                            isLogin: true,
                            userId: response.data.userId,
                            userFullName: response.data.userFullName,
                            positionName: response.data.positionName,
                            isCurrentDoctorExamining: response.data.userId === responseCurrentDoctorExamining.data.userIdDoctor ? true : false
                        }

                        localStorage.setItem('userLogin', JSON.stringify(userLogin))
                        loginContext(userLogin);
                    }
                    else{
                        const userLogin = { 
                            isAuthenticated: true, 
                            isLogin: true, 
                            userId: response.data.userId, 
                            userFullName: response.data.userFullName, 
                            positionName: response.data.positionName, 
                            isCurrentDoctorExamining: false 
                        }
                        
                        localStorage.setItem('userLogin', JSON.stringify(userLogin))
                        loginContext(userLogin)
                    }
                }
                else{
                    const userLogin = {
                        isAuthenticated: true, 
                        isLogin: true, 
                        userId: response.data.userId, 
                        userFullName: response.data.userFullName, 
                        positionName: response.data.positionName
                    }

                    localStorage.setItem('userLogin', JSON.stringify(userLogin))
                    loginContext(userLogin);
                }

                if(response.data.positionName === 'Nursing'){
                    history.push('/medicalregister');
                }
                else if(response.data.positionName === 'Doctor'){
                    history.push('/doctor-examining');
                }
                else{
                    history.push('/');
                }
            }
        }
    }

    const handlePressEnter = (e) => {
        if (e.which === 13 && e.code === "Enter") {
            handleLogin();
        }
    }

    useEffect(() => {
        if (user && user.isAuthenticated === true) {
            history.push('/');
        }

        const token = localStorage.getItem('jwt');
        const userLogin = localStorage.getItem('userLogin');
        if (token && userLogin) {
            history.push('/');
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(openAlertProcessingBackdrop){
                event.preventDefault();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openAlertProcessingBackdrop])

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 3, borderRadius: '25px' }} >
                    <Box sx={{ p: 7.6 }}>
                        <Avatar src={Logo} sx={{ width: 120, height: 120, ml: 'auto', mr: 'auto', mb: 2 }} />
                        <Typography sx={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bolder', fontSize: '1.15rem', mb: 2, color: '#4caf50' }} variant="h5">Chương trình khám nhi khoa phát triển</Typography>
                        <Box component="form" autoComplete="off" style={{ textAlign: 'center' }}>
                            <TextField label="Tài khoản" variant="outlined" sx={{ width: '40ch', mb: 2.5 }} onChange={(e) => onChangeUserName(e, e.target.value)}/>
                            <TextField label="Mật khẩu" variant="outlined" type={showPassword ? "text" : "password"} sx={{ width: '40ch', mb: 3 }} 
                            onChange={(e) => onChangeUserPassword(e, e.target.value)} onKeyDown={(e) => handlePressEnter(e)}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} sx={{padding: '1px'}}> {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <Stack spacing={2} direction="column">
                                <Button sx={{ height: '6.5vh', width: '28ch' }} variant="contained" style={{ margin: 'auto' }} onClick={(e) => handleLogin()}>Đăng nhập</Button>
                                <Typography sx={{textAlign: 'center'}} variant="subtitle1">Chưa có tài khoản? <strong style={{cursor: 'pointer'}} onClick={() => setOpenModalRegister(true)}>Đăng ký</strong></Typography>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Register
                openModalRegister={openModalRegister} setOpenModalRegister={setOpenModalRegister}
            />

            <AlertProcessingBackdrop 
                openAlertProcessingBackdrop={openAlertProcessingBackdrop} setOpenAlertProcessingBackdrop={setOpenAlertProcessingBackdrop}
                alertTitle={'Đang đăng nhập'}
            />
        </>
    )
}

export default Login