import React, { useState, useContext, useEffect } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function OldDisease(props) {
    const listFoundOldDisease = [
        {patientsId: '000001', patientsName: 'ABC', patientsDOB: '28/02/2023', patientsSex: 0, city: 'Hồ Chí Minh', district: 'Thủ Đức', ward: 'Hiệp Bình Chánh', address: '96A' },
        //{patientsId: '000001', patientsName: 'ABC', patientsDOB: '', patientsSex: 0, city: 'Hồ Chí Minh', district: 'Thủ Đức', ward: 'Hiệp Bình Chánh', address: '96A' },
        //{patientsId: '000001', patientsName: 'ABC', patientsDOB: '', patientsSex: 0, city: 'Hồ Chí Minh', district: 'Thủ Đức', ward: 'Hiệp Bình Chánh', address: '96A' },
        //{patientsId: '000001', patientsName: 'ABC', patientsDOB: '', patientsSex: 0, city: 'Hồ Chí Minh', district: 'Thủ Đức', ward: 'Hiệp Bình Chánh', address: '96A' },
    ]

    const handleFindOldDisease = () => {
        if(props.clickedFindBtn){
            props.setClickedFindBtn(false);
        }
        else{
            props.setClickedFindBtn(true);
        }
    }

    const handleCloseModalOldDisease = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
          else{
            props.setClickedFindBtn(false);
            props.setOpenModalOldDisease(false);
        }
    }

    return (
        <Dialog maxWidth={'md'} open={props.openModalOldDisease} onClose={(event, reason) => handleCloseModalOldDisease(event, reason)} disableEscapeKeyDown={true} sx={{'.MuiDialog-paperWidthMd': {maxWidth: '970px'}}}>
            <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Tìm bệnh cũ</DialogTitle>
            <IconButton onClick={() => handleCloseModalOldDisease()}sx={{position: 'absolute', right: 5, top: 7}}>
              <CloseIcon fontSize='medium'/>
            </IconButton>
            <DialogContent dividers>
                <Box sx={{pl: 6.5, pr: 1}}>
                <TextField label="Mã BN" variant="outlined" size='small' sx={{ width: '30ch', mr: 2.31, mb: 2.5 }} />
                <TextField label="Họ tên" variant="outlined" size='small' sx={{ width: '30ch', mr: 2.31, mb: 2.5 }} />
                <TextField label="Ngày sinh" variant="outlined" size='small' sx={{ width: '30ch', mr: 2.31, mb: 2.5 }} />
                <TextField label="Giới tính" variant="outlined" size='small' sx={{ width: '30ch', mr: 2.31 }} />
                <TextField label="Địa chỉ" variant="outlined" size='small' sx={{ width: '30ch', mr: 2.31 }} />
                <TextField label="Điện thoại cha/mẹ" variant="outlined" size='small' sx={{ width: '30ch' }} />
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 1.2}}>
                    <Button variant="contained" color="primary" onClick={() => handleFindOldDisease()}>Tìm bệnh nhân</Button>
                </Box>
                </Box>

                {props.clickedFindBtn !== false ?
                    listFoundOldDisease.length !== 0 ? 
                        <>
                            <TableContainer component={Paper} sx={{boxShadow: 4, mt: 1.2}}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                            <TableCell align='left' sx={{fontSize: '0.9rem'}}>Mã BN</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Họ tên</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày sinh</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Giới tính</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Thành phố</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Quận/Huyện</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Phường/Xã</TableCell>
                                            <TableCell align="left" sx={{fontSize: '0.9rem'}}>Địa chỉ</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {listFoundOldDisease.map((row, index) => (
                                            <TableRow hover role="checkbox" key={index} sx={{cursor: 'pointer'}}>
                                                <TableCell align='left' sx={{width: '103px'}}>{row.patientsId}</TableCell>
                                                <TableCell align='left' sx={{width: '155px'}}>{row.patientsName}</TableCell>
                                                <TableCell align='left' sx={{width: '62px'}}>{row.patientsDOB}</TableCell>
                                                <TableCell align='left' sx={{width: '120px'}}>{row.patientsSex === 0 ? 'Nam' : 'Nữ'}</TableCell>
                                                <TableCell align='left' sx={{width: '115px'}}>{row.city}</TableCell>
                                                <TableCell align='left' sx={{width: '62px'}}>{row.district}</TableCell>
                                                <TableCell align='left' sx={{width: '62px'}}>{row.ward}</TableCell>
                                                <TableCell align='left' sx={{width: '150px'}}>{row.address}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    
                            <Typography variant='subtitle1' sx={{textAlign: 'center', mt: 1.5, fontWeight: 'bolder', color: 'green'}}>Tìm thấy {listFoundOldDisease.length} bệnh nhân</Typography>
                        </>
                    : 
                        <Typography variant='subtitle1' sx={{textAlign: 'center', mt: 1.5, fontWeight: 'bolder', color: 'red'}}>Không tìm thấy bệnh nhân</Typography>
                :
                    null
                }
                
            </DialogContent>
        </Dialog>
    )
}

export default OldDisease