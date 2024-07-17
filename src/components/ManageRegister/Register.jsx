import React, { useState, useContext, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const CreateAccount = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleCloseModalRegister = (event, reason) => {
      if(reason && reason === "backdropClick"){
        return;
      }
      else{
        props.setOpenModalRegister(false);
      }
    }

    const position = [
      {id: '1', positionName: 'Điều dưỡng'},
      {id: '2', positionName: 'Bác sĩ'},
    ]
    
    return (
        <>
          <Dialog maxWidth={'xs'} fullWidth={true} open={props.openModalRegister} onClose={(event, reason) => handleCloseModalRegister(event, reason)} disableEscapeKeyDown={true}  >
            <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px' }}>Tạo tài khoản</DialogTitle>
            <IconButton onClick={() => handleCloseModalRegister()}sx={{position: 'absolute', right: 5, top: 7}}>
              <CloseIcon fontSize='medium'/>
            </IconButton>
            <DialogContent dividers>
              <TextField label="Họ tên" variant="outlined" sx={{ width: '46ch', mb: 2.5 }} />
              <TextField label="Tài khoản" variant="outlined" sx={{ width: '46ch', mb: 2.5 }}/>
              <TextField label="Mật khẩu" variant="outlined" type={showPassword ? "text" : "password"} sx={{ width: '46ch', mb: 2.5 }} 
                InputProps={{ // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} sx={{padding: '1px'}}> {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Autocomplete options={position.map((option) => option.positionName)} renderInput={(params) => <TextField {...params} label="Vị trí" />} sx={{ width: '45.95ch', mb: 2.5 }}/>
              <Stack spacing={2} direction="column">
                <Button sx={{ height: '6vh', width: '20ch' }} variant="contained" color="success" style={{ margin: 'auto' }} onClick={() => handleCloseModalRegister()}>Tạo tài khoản</Button>
              </Stack>
            
            </DialogContent>
          </Dialog>
        </>
    )
}

export default CreateAccount