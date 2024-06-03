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
import InputAdornment from '@mui/material/InputAdornment';
import { Button, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
//moment
import moment from 'moment';

function ListPatientsRegister(props) {

  const ListDataPatientsRegisterFake = [
    {stt: 1, idPatients: '000001', name: 'Dương Anh Thơ', status: 0},
    {stt: 2, idPatients: '000002', name: 'Tạ Thị Phương Thảo', status: 1},
    {stt: 3, idPatients: '000003', name: 'GHI', status: 2},
    {stt: 4, idPatients: '000004', name: 'JKL', status: 0},
    {stt: 5, idPatients: '000005', name: 'MNO', status: 1},
    {stt: 6, idPatients: '000006', name: 'PQR', status: 2},
  ]
  
  const [listDataPatientsRegister, setListDataPatientsRegister] = useState(ListDataPatientsRegisterFake);

  //mui state menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //mui state switch
  const [switchState, setSwitchState] = useState({
    status1: false,
    status2: false,
    status3: false,
  });


  const handleChange = (event) => {
    const newSwitchState = {
      ...switchState,
      [event.target.name]: event.target.checked,
    };

    setSwitchState(newSwitchState);

    // Sử dụng destructuring để trích xuất các giá trị của switch1, switch2, switch3 từ newSwitchState
    const { status1, status2, status3 } = newSwitchState;

    const enabledStatuses = [];
    if (status1) enabledStatuses.push(0);
    if (status2) enabledStatuses.push(1);
    if (status3) enabledStatuses.push(2);

    const sortListDataPatientsRegister = [...listDataPatientsRegister].sort((a, b) => {
      if (enabledStatuses.includes(a.status) && !enabledStatuses.includes(b.status)) {
        return -1;
      }
      if (!enabledStatuses.includes(a.status) && enabledStatuses.includes(b.status)) {
        return 1;
      }
      return 0;
    });

    setListDataPatientsRegister(sortListDataPatientsRegister);
  };

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
        
        <Box sx={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <TextField sx={{mt: 0.2, mb: 1, width: 350, '& .MuiInputBase-inputSizeSmall': {textAlign: 'center'}}} size="small" variant="outlined" placeholder='Tìm với Mã BN hoặc Tên BN'
            InputProps={{startAdornment: (
              <InputAdornment position='start'><SearchIcon/></InputAdornment>
            )}}>
          </TextField>

          <Box sx={{position: 'absolute', top: 3, right: 30, borderRadius: '8px', ':hover': {backgroundColor: 'rgba(25, 118, 210, 0.2)'}}}>
            <Button onClick={handleClick}>Sắp xếp</Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem><FormControlLabel control={<Switch checked={switchState.status1} onChange={handleChange} name="status1" color='error'/>} sx={{color: '#f44336'}} label="Chưa khám" /></MenuItem>
              <MenuItem><FormControlLabel control={<Switch checked={switchState.status2} onChange={handleChange} name="status2" color='warning'/>} sx={{color: '#ff9800'}} label="Đang khám" /></MenuItem>
              <MenuItem><FormControlLabel control={<Switch checked={switchState.status3} onChange={handleChange} name="status3" color='success'/>} sx={{color: '#4caf50'}} label="Đã khám" /></MenuItem>
            </Menu>
          </Box>
        </Box>

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
            {listDataPatientsRegister.map((row) => (
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