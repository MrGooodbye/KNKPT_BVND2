import React, { useState, useContext, useEffect } from 'react';
//old disease modal
import OldDisease from '../ManageOldDisease/OldDisease';
//ExaminingSessios modal
import ExaminingSession from '../ManageExaminingSession/ExaminingSession';
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
import { FormGroup } from '@mui/material';

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
        <Box sx={{ bgcolor: '#fff', height: '78vh', borderRadius: '20px', boxShadow: 5, pt: 1.5, pb: 1.5, pl: 2, pr: 2, mt: 1.5 }}>
          <Typography variant='h6' sx={{textAlign: 'center', mb: 0.2, mt: 0.2, fontWeight: 'bolder', color: 'blue'}}>Thông tin đăng ký khám</Typography> 
          <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}} component="form">
            <TextField disabled label="Mã BN" variant="outlined" sx={{width: '20%', '&.MuiTextField-root' : {marginTop: '7.5px'}}} value={'20211125-001'}/> 
            <TextField label="Họ tên" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '7.5px'}}}/> 
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
              <DemoContainer components={['DatePicker']} ><DatePicker label="Ngày sinh" format='DD/MM/YYYY' sx={{width: '200px'}}/></DemoContainer>
            </LocalizationProvider>
            {/* <TextField id="outlined-basic" label="Giới tính" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} /> */}
            <Box sx={{width: '17%', display: 'flex', mt: 0.6}}>
                <FormControlLabel control={<Checkbox />} label="Nam" /> 
                <FormControlLabel control={<Checkbox />} label="Nữ " />   
            </Box>
            <TextField label="Dân tộc" variant="outlined" sx={{width: '20%', '&.MuiTextField-root' : {marginTop: '15px'}}}/>
            <TextField label="Thành phố" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Quận/Huyện" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Xã/Phường" variant="outlined" sx={{width: '25%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Địa chỉ" variant="outlined" sx={{width: '44%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Họ tên mẹ" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Điện thoại" variant="outlined" sx={{width: '20%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Họ tên cha" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Điện thoại" variant="outlined" sx={{width: '20%', '&.MuiTextField-root' : {marginTop: '15px'}}} />
            <TextField label="Chiều cao bé" variant="outlined" sx={{width: '22%', '&.MuiTextField-root' : {marginTop: '15px'}}} InputProps={{endAdornment: <InputAdornment position="end">(cm)</InputAdornment>}}/>
            <TextField label="Căn nặng bé" variant="outlined" sx={{width: '22%', '&.MuiTextField-root' : {marginTop: '15px'}}} InputProps={{endAdornment: <InputAdornment position="end">(kg)</InputAdornment>}}/>
            <TextField fullWidth label="Lý do khám" multiline rows={4} variant="outlined" sx={{'&.MuiTextField-root' : {marginTop: '15px'}}}/>
            <Box sx={{width: '40%', display: 'flex', justifyContent: 'flex-start', mb: 0}}>
              <FormControlLabel control={<Checkbox />} label="Bệnh nhân có tham gia tiêm ngừa"/>  
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', mt: 0.4, width: '100%'}}>
              <Button variant="contained" color="primary" sx={{mr: 1}} onClick={() => props.setOpenModalExaminingSession(true)}>Đăng ký (f2)</Button>
              <Button variant="contained" color="warning" >Làm mới (f4)</Button>
              <Button variant="contained" color="error" sx={{ml: 1}} onClick={() => props.setOpenModalOldDisease(true)}>Bệnh cũ (f8)</Button>
            </Box>
          </Box>         
        </Box>
      </Container>

      <ExaminingSession openModalExaminingSession={props.openModalExaminingSession} setOpenModalExaminingSession={props.setOpenModalExaminingSession} />
      <OldDisease openModalOldDisease={props.openModalOldDisease} setOpenModalOldDisease={props.setOpenModalOldDisease} clickedFindBtn={clickedFindBtn} setClickedFindBtn={setClickedFindBtn}/>
    </>
  )
}

export default BookMedical