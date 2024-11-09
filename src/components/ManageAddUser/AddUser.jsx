import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
//api
import { addUser } from '../../Service/UserService';

function AddUser(props) {
  const [loading, setLoading] = useState(false);

    const [dataAddUser, setDataAddUser] = useState( 
      {
        userName: "",
        userFullName: "",
        userPassword: "123456",
        userEmail: "",
        userPosition: ""
      }
    )

    const handleCloseModalAddUser = (event, reason) => {
      if(reason && reason === "backdropClick"){
        return;
      }
      else{
        props.setOpenModalAddUser(false);
      }
    }

    const listPosition = [
      {id: '2', positionName: 'Bác sĩ'},
      {id: '3', positionName: 'Tiếp nhận'},
    ]

    const onChangeUserFullName = (value) => {
      setDataAddUser(prevDataAddUser => {
        return {
          ...prevDataAddUser,
          userFullName: value
        }
      })
    }

    const onSelectPosition = (e, value) => {
      setDataAddUser(prevDataAddUser => {
        return {
          ...prevDataAddUser,
          userPosition: value.id
        }
      })
    }

    const onChangeUserName = (value) => {
      setDataAddUser(prevDataAddUser => {
        return {
          ...prevDataAddUser,
          userName: value
        }
      })
    }

    const handleAddUser = async () => {
      setLoading(true);
      const responseAddUser = await addUser(dataAddUser);
      if(responseAddUser.status === 200){
        toast.success(responseAddUser.data, {toastId: 'AddUserSuccess'})
        props.setReloadComponent(true);
      }
      else{
        toast.error(responseAddUser.data, {toastId: 'AddUserError'})
      }
      setLoading(false);
    }

    return (
      <>
        <Dialog maxWidth={'xs'} fullWidth={true} open={props.openModalAddUser} onClose={(event, reason) => handleCloseModalAddUser(event, reason)} disableEscapeKeyDown={true} >
          {loading ? 
            <>
              <div style={{display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center'}}>
                <CircularProgress />
              </div>
            </>
          :
            <>     
              <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px' }}>Tạo tài khoản</DialogTitle>
              <IconButton onClick={() => handleCloseModalAddUser()} sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
              </IconButton>

              <DialogContent dividers>
                <TextField label="Họ tên" variant="outlined" autoFocus sx={{ width: '46ch', mb: 2.5 }} onChange={(e) => onChangeUserFullName(e.target.value)}/>
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
                <TextField label="Tên tài khoản" variant="outlined" sx={{ width: '46ch', mb: 2.5 }} onChange={(e) => onChangeUserName(e.target.value)}/>
                <Stack spacing={2} direction="column">
                  <Button sx={{ height: '6vh', width: '20ch' }} variant="contained" color="success" style={{ margin: 'auto' }} onClick={() => handleAddUser()}>Tạo tài khoản</Button>
                </Stack>
              
              </DialogContent>
            </>
          }
        </Dialog>
      </>
    )
}

export default AddUser