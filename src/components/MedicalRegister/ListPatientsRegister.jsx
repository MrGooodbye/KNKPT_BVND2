import React, { useState, useContext, useEffect } from 'react';
//info pantients modal
import ManageInfoPantients from '../ManageInfoPantients/ManageInfoPantients';
//mui theme
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
//moment
import moment from 'moment';

function ListPatientsRegister(props) {

  const ListDataPatientsRegister = [
    {stt: 1, idPatients: '000001', name: 'Dương Anh Thơ', status: 0},
    {stt: 2, idPatients: '000002', name: 'Tạ Thị Phương Thảo', status: 1},
    {stt: 3, idPatients: '000003', name: 'GHI', status: 2},
    {stt: 4, idPatients: '000004', name: 'JKL', status: 0},
    {stt: 5, idPatients: '000005', name: 'MNO', status: 1},
    {stt: 6, idPatients: '000006', name: 'PQR', status: 2},
  ]

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    marginRight: theme.spacing(2),
    width: '290px',
    margin: 'auto',
    marginBottom: 5,
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: '300px',
    //   margin: 'auto',
    //   marginBottom: 4,
    // },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '28ch',
      // [theme.breakpoints.up('md')]: {
      //   width: '28ch',
      // },
    },
  }));

  const renderPatientsStatus = (status) => {
    if(status === 0){
      return(
        <>
          <Box sx={{display: 'flex', alignItems: 'flex-start'}}>
            <Badge color="error" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 15, minWidth: 15 }, top: '10px' }} badgeContent=" " ></Badge>
            <Typography variant="subtitle2" sx={{ml: 1.5}}>Chưa khám</Typography>
          </Box>
        </>
      )
    }
    else if(status === 1){
      return(
        <>
          <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
            <Badge color="warning" sx={{ "& .MuiBadge-badge": { height: 15, minWidth: 15 }, top: '10px' }} badgeContent=" "></Badge>
            <Typography variant="subtitle2" sx={{ml: 1.5}}>Đang khám</Typography>
          </Box>
        </>
      )
    }
    else{
      return(
        <>
          <Box sx={{display: 'flex', justifyContent: 'flex-start'}}>
            <Badge color="success" sx={{ "& .MuiBadge-badge": { height: 15, minWidth: 15 }, top: '10px' }} badgeContent=" "></Badge>
            <Typography variant="subtitle2" sx={{ml: 1.5}}>Đã khám</Typography>
          </Box>
        </>
      )
    }
  }
  
  return (
    <>
      <Typography variant='h6' sx={{color: 'red', mb: 1, fontWeight: 'bolder', fontSize: '1.16rem'}}>Bác sĩ khám hôm nay: Nguyễn Văn A</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 607, boxShadow: 5 }}>
        <Typography variant="h6" sx={{mt: 0.2, textAlign: 'center', fontSize: '1.18rem'}}>Danh sách đăng ký khám ngày {moment().format("DD/MM/YYYY")}</Typography>
        <Search>
            <SearchIconWrapper>
              <SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Tìm với mã BN hoặc tên BN"/>
        </Search>
        <Table stickyHeader >
          <TableHead>
            <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
              <TableCell align='left' sx={{fontSize: '0.95rem'}}>STT</TableCell>
              <TableCell align='left' sx={{fontSize: '0.95rem'}}>Mã bệnh nhân</TableCell>
              <TableCell align="left" sx={{fontSize: '0.95rem'}}>Họ tên</TableCell>
              <TableCell align="left" sx={{fontSize: '0.95rem', p: '10px'}}>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ListDataPatientsRegister.map((row) => (
                <TableRow hover role="checkbox" key={row.stt} sx={{cursor: 'pointer'}} onClick={() => [console.log(row), props.setOpenModalInfoPantients(true)]}>
                  <TableCell align='left' sx={{width: '20px'}}>{row.stt}</TableCell>
                  <TableCell align='left' sx={{width: '150px'}}>{row.idPatients}</TableCell>
                  <TableCell align='left' sx={{width: '240px'}}>{row.name}</TableCell>
                  <TableCell align='left' sx={{width: '120px'}}>{renderPatientsStatus(row.status)}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>

      <ManageInfoPantients openModalInfoPantients={props.openModalInfoPantients} setOpenModalInfoPantients={props.setOpenModalInfoPantients}/>
    </>
  )
}

export default ListPatientsRegister