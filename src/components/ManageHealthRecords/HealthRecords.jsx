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
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
//mui icon
import PinIcon from '@mui/icons-material/Pin';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import Home from '@mui/icons-material/Home';
//scss
import './SCSS/HealthRecords.scss';

function HealthRecords(props) {

    const listHealthRecords = [
      {periodExams: 'Khám 21 tháng', status: 0, dateExams: '20/04/2024', doctorExams: '', conclude: ''},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'}
    ]

    const handleCloseModalHealthRecords = (event, reason) => {
      if(reason && reason === "backdropClick"){
        return;
      }
      else{
        props.setOpenModalHealthRecords(false);
      }
    }

    const handleRenderExamsStatus = (status) => {
      if(status === 0){
        return (
          <div className='chipUnDoneExamms'><p className='chipLabel'>Chưa thực hiện</p></div>
        )
      }
      else if(status === 1){
        return (
          <div className='chipDoingExamms'><p className='chipLabel'>Đang thực hiện</p></div>
        )
      }
      else{
        return (
          <div className='chipDoneExamms'><p className='chipLabel'>Đã thực hiện</p></div>
        )
      }
    }

    return (
      <>
          <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalHealthRecords} onClose={(event, reason) => handleCloseModalHealthRecords(event, reason)} disableEscapeKeyDown={true}>
              <DialogTitle sx={{ p: 1, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Sổ sức khỏe</DialogTitle>
              <IconButton onClick={() => handleCloseModalHealthRecords()}sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
              </IconButton>
              <DialogContent dividers sx={{pt: '10px', pb: '10px'}}>
                  <Box>
                    <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', fontSize: '1.2rem'}}>Thông tin bệnh nhân</Typography>
                      <Box sx={{pl: 2, pr: 2, mt: 1, mb: 1}}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4}}>
                          <Grid item xs={4} sx={{display: 'inline-flex'}}>
                            <PinIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Mã BN: 000001</Typography>
                          </Grid>
                          <Grid item xs={8} sx={{display: 'inline-flex'}}>
                            <PersonIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Họ tên: Tạ Thị Phương Thảo Thảo Thảo</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{display: 'inline-flex'}}>
                            <CalendarMonthIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Ngày sinh: 01/01/2024</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{display: 'inline-flex'}}>
                            {/* <MaleIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Giới tính: Nam</Typography> */}
                            <FemaleIcon sx={{color: 'coral', fontSize: '27px'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Giới tính: Nữ</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{display: 'inline-flex'}}>
                            <InfoIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Tháng tuổi: 4</Typography>
                          </Grid>
                          <Grid item xs={4} sx={{display: 'inline-flex'}}>
                            <PhoneIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Số điện thoại: 0987654321</Typography>
                          </Grid>
                          <Grid item xs={8} sx={{display: 'inline-flex'}}>
                            <Home sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Địa chỉ: Đây là địa chỉ</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', fontSize: '1.2rem', mt: 1.4, mb: 0.5}}>Khám và theo dõi sức khỏe định kỳ</Typography>
                    <TableContainer component={Paper} sx={{boxShadow: 4, mb: 1.5}}>
                      <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                            <TableCell align='left' sx={{fontSize: '0.9rem', color: 'black'}}>Kỳ khám</TableCell>
                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Trạng thái</TableCell>
                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày khám</TableCell>
                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Bác sĩ khám</TableCell>
                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Kết luận</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{":before": {boxSizing: 'unset'}, ":after": {boxSizing: 'unset'}}}>
                        {listHealthRecords.map((row, index) => (
                          <TableRow hover role="checkbox" key={index} sx={{cursor: 'pointer',}} onClick={(e) => console.log(row)}>
                            <TableCell align='left' sx={{width: '120px'}}><DescriptionIcon sx={{mr: 0.5, mb: 0.4, color: 'dodgerblue'}}/>{row.periodExams}</TableCell>
                            <TableCell align='left' sx={{width: '105px'}}>{handleRenderExamsStatus(row.status)}</TableCell>
                            <TableCell align='left' sx={{width: '62px'}}>{row.dateExams}</TableCell>
                            <TableCell align='left' sx={{width: '120px'}}>{row.doctorExams}</TableCell>
                            <TableCell align='left' sx={{width: '160px'}}>{row.conclude}</TableCell>
                          </TableRow>
                        ))}
                       </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
              </DialogContent>
              <DialogActions sx={{justifyContent: 'center'}}>
                <Button variant='contained'>Hoàn tất (Enter)</Button>
                <Button variant='contained' color='secondary' onClick={(event, reason) => handleCloseModalHealthRecords(event, reason)}>Quay lại (F2)</Button>
              </DialogActions>
          </Dialog>
      </>
    )
}

export default HealthRecords