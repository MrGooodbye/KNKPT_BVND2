import React, { useState, useContext, useEffect } from 'react';
//old disease modal
import OldDisease from '../ManageOldDisease/OldDisease';
//health records modal
import HealthRecords from '../ManageHealthRecords/HealthRecords';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
//mui x date picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'moment/locale/vi';

function BookMedical(props) {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  const [clickedFindBtn, setClickedFindBtn] = useState(false);

  const sex = [
    { sexId: 0, sexName: 'Nam' },
    { sexId: 1, sexName: 'Nữ' },
  ]

  const handleSelectedDOB = () => {

  }

  return (
    <>
      <Container>
        <Box sx={{ bgcolor: '#fff', height: '85vh', borderRadius: '20px', boxShadow: 5, pt: 0.4, pb: 0.4, pl: 2, pr: 2 }}>
          <Typography variant='h6' sx={{textAlign: 'center', mb: 0.2, mt: 0.2}}>Thông tin đăng ký khám</Typography> 
          <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}} component="form">
            <TextField label="Mã BN" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '7.5px'}}}/> 
            <TextField label="Họ tên" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '7.5px'}}}/> 
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
              <DemoContainer components={['DatePicker']} ><DatePicker label="Ngày sinh" format='DD/MM/YYYY' sx={{width: '250px'}}/></DemoContainer>
            </LocalizationProvider>
            {/* <TextField id="outlined-basic" label="Giới tính" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} /> */}
            <Box sx={{width: '4.1%', display: 'flex',  mr: 13}}>
              <FormControlLabel control={<Checkbox />} label="Nam" /> 
              <FormControlLabel control={<Checkbox />} label="Nữ " />   
            </Box>
            <TextField id="outlined-basic" label="Thành phố" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Quận/Huyện" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Xã/Phường" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" sx={{width: '66%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Họ tên mẹ" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Điện thoại" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Họ tên cha" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Điện thoại" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField id="outlined-basic" label="Dân tộc" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}}/>
            <TextField id="outlined-basic" label="Chiều cao bé" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} InputProps={{endAdornment: <InputAdornment position="end">(cm)</InputAdornment>}}/>
            <TextField id="outlined-basic" label="Căn nặng bé" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} InputProps={{endAdornment: <InputAdornment position="end">(kg)</InputAdornment>}}/>
            <TextField fullWidth id="outlined-basic" label="Lý do khám" multiline rows={3} variant="outlined" sx={{'&.MuiTextField-root' : {marginTop: '15px'}}}/>
            <Box sx={{width: '40%', display: 'flex', justifyContent: 'flex-start', mb: 0}}>
              <FormControlLabel control={<Checkbox />} label="Bệnh nhân có tham gia tiêm ngừa"/>  
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 0.2, width: '100%'}}>
              <Button variant="contained" color="primary" sx={{mr: 1}} onClick={() => props.setOpenModalHealthRecords(true)}>Đăng ký (f2)</Button>
              <Button variant="contained" color="warning" >Làm mới (f4)</Button>
              <Button variant="contained" color="error" sx={{ml: 1}} onClick={() => props.setOpenModalOldDisease(true)}>Bệnh cũ (f8)</Button>
            </Box>
          </Box>         
        </Box>
      </Container>

      <HealthRecords openModalHealthRecords={props.openModalHealthRecords} setOpenModalHealthRecords={props.setOpenModalHealthRecords} />
      <OldDisease openModalOldDisease={props.openModalOldDisease} setOpenModalOldDisease={props.setOpenModalOldDisease} clickedFindBtn={clickedFindBtn} setClickedFindBtn={setClickedFindBtn}/>
    </>
  )
}

export default BookMedical