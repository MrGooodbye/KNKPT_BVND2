import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../context/UserContext';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
//api
import { getUserLogin, editUserLogin, updateUserAccount } from '../../Service/UserService';

function ChangeUserInfo(props) {
    const { loginContext } = useContext(UserContext);

    const inputUserInfoDefault = {
        userId: '',
        userName: '',
        userFullName: '',
        userEmail: '',
        userPosition: '',
    }
    
    const [loading, setLoading] = useState(false);
    const [dataUserInfoDefault, setDataUserInfoDefault] = useState(inputUserInfoDefault);
    const [newDataUserInfo, setNewDataUserInfo] = useState({});

    const listPosition = [
        {id: '2', positionName: 'Bác sĩ'},
        {id: '3', positionName: 'Tiếp nhận'},
    ]
    
    const handleCloseModalChangeUserInfo = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
        else{
            props.setOpenModalChangeUserInfo(false);
            if(props.openModalChangeUserInfo && !props.dataUserInfo){
                props.setIsDialogChangeInfoUserOpen(false);
            }else{
                props.setDataUserInfo();
            }
            setNewDataUserInfo({});
            setDataUserInfoDefault(inputUserInfoDefault);
        }
    }

    const onChangeName = (value) => {
        setNewDataUserInfo(prevNewDataUserInfo => {
            prevNewDataUserInfo.userFullName = value
            return {...prevNewDataUserInfo}
        })
    }

    const onChangeUserName = (value) => {
        setNewDataUserInfo(prevNewDataUserInfo => {
            prevNewDataUserInfo.userName = value
            return {...prevNewDataUserInfo}
        })
    }

    const onChangeEmail = (value) => {
        setNewDataUserInfo(prevNewDataUserInfo => {
            prevNewDataUserInfo.userEmail = value
            return {...prevNewDataUserInfo}
        })
    }

    const onSelectPosition = (e, value) => {
        setNewDataUserInfo(prevNewDataUserInfo => {
            prevNewDataUserInfo.userPosition = value.id
            return {...prevNewDataUserInfo}
        })
    }

    const handleChangeUserInfoByAdmin = async () => {
        setLoading(true);
        newDataUserInfo.userId = dataUserInfoDefault.userId;
        const responseUpdateUserAccount = await updateUserAccount(newDataUserInfo);
        if(responseUpdateUserAccount.status === 200){
            toast.success('Cập nhật thành công', {toastId: 'successUpdateUserAccount'});
            props.setReloadComponent(true);
            handleCloseModalChangeUserInfo();
        }
        setLoading(false);
    }

    const handleChangeUserInfo = async () => {
        setLoading(true);
        const responseEditUserLogin = await editUserLogin(newDataUserInfo);
        if(responseEditUserLogin.status === 200){
            if(responseEditUserLogin.data.token){
                localStorage.setItem('jwt', responseEditUserLogin.data.token);
            }

            setTimeout(() => {
                const _dataUserInfoDefault = {...dataUserInfoDefault}
                for (const key in newDataUserInfo) {
                    if (_dataUserInfoDefault.hasOwnProperty(key)) {
                        _dataUserInfoDefault[key] = newDataUserInfo[key];
                    }
                }
                
                setDataUserInfoDefault(_dataUserInfoDefault);
                loginContext(_dataUserInfoDefault);
                localStorage.setItem('userLogin', JSON.stringify({isAuthenticated: true, isLogin: true, ..._dataUserInfoDefault}));

                toast.success('Cập nhật thành công', {toastId: 'successEditUserLogin'})

                setLoading(false);
            }, 500)
        }
        else{
            toast.error(responseEditUserLogin.data, {toastId: 'errorEditUserLogin'})
            setLoading(false);
        }
    }

    const handleGetUser = async () => {
        setLoading(true);
        const responseGetUserLogin = await getUserLogin();
        setDataUserInfoDefault(responseGetUserLogin);
        setLoading(false); 
    }

    const handleGetUserByAdmin = () => {
        setLoading(true);
        setTimeout(() => {
            setDataUserInfoDefault(props.dataUserInfo);
            setLoading(false);
        }, 500)
    }

    useEffect(() => {
        if(props.openModalChangeUserInfo === true){
            if(props.dataUserInfo){
                handleGetUserByAdmin();
            }
            else{
                handleGetUser();
            }
        }
    }, [props.openModalChangeUserInfo, props.dataUserInfo])

    return (
        <Dialog maxWidth={'xs'} fullWidth={true} open={props.openModalChangeUserInfo} onClose={(event, reason) => handleCloseModalChangeUserInfo(event, reason)} disableEscapeKeyDown={true} >
            <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Đổi thông tin</DialogTitle>
                <IconButton onClick={() => handleCloseModalChangeUserInfo()}sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                
            <DialogContent dividers sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {loading ? 
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress />
                    </div>
                :
                    <>
                        <TextField label="Họ tên" variant="outlined" sx={{ width: '40ch', mb: 2.5 }} defaultValue={dataUserInfoDefault.userFullName} onChange={(e) => onChangeName(e.target.value)}/>
                        <TextField label="Tên đăng nhập" variant="outlined" sx={{ width: '40ch', mb: 2.5 }} defaultValue={dataUserInfoDefault.userName} onChange={(e) => onChangeUserName(e.target.value)}/>
                        <TextField label="Email" variant="outlined" sx={{ width: '40ch', mb: 2.5 }} defaultValue={dataUserInfoDefault.userEmail} onChange={(e) => onChangeEmail(e.target.value)}/>

                        {dataUserInfoDefault.userPosition === 'Admin' ? 
                            <>
                                <Autocomplete 
                                    options={listPosition} 
                                    getOptionLabel={(option) => option.positionName}
                                    renderOption={(props, option) => (
                                        <li {...props}>
                                            {option.positionName}
                                        </li>
                                    )}
                                    onChange={(e, value) => onSelectPosition(e, value)}
                                    renderInput={(params) => <TextField {...params} label="Vị trí" />} 
                                    sx={{ width: '45.95ch', mb: 2.5 }}
                                />
                            </>
                            :
                            null
                        }

                        <Stack spacing={2} direction="column">
                            <Button sx={{ height: '6vh', width: '20ch' }} variant="contained" color="success" style={{ margin: 'auto' }} onClick={() => props.dataUserInfo ? handleChangeUserInfoByAdmin() : handleChangeUserInfo()}>Đổi thông tin</Button>
                        </Stack>
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}

export default ChangeUserInfo