import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/image/logo.png';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BarChartIcon from '@mui/icons-material/BarChart';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink, useHistory } from "react-router-dom";
import { withRouter } from 'react-router';

import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';

function Header(props) {

  const handleChangeURL = (route) => {
    switch (route) {
      case '/medicalregister': return 0;
      case '/re-examination': return 1;
      case '/doctor-examining': return 2;
      case '/dashboard': return 3;
      default: return null;
    }
  }

  const value = handleChangeURL(props.location.pathname);

  return (
    <>
      <Box sx={{ width: '100%', position: 'fixed', top: 0}} >
        <AppBar>
          <Toolbar sx={{backgroundColor: '#cfe8fc'}}>
          <Avatar src={Logo} sx={{ width: 62, height: 62, mt: 'auto', mb: 'auto', mr: 4 }}/>
          <BottomNavigation showLabels value={value} 
            sx={{display: 'flex', justifyContent: 'flex-start', backgroundColor: '#cfe8fc', height: '80px', flexGrow: 1}}>
              <BottomNavigationAction label="Đăng ký khám" sx={{color: '#000', maxWidth: '114px'}} LinkComponent={NavLink} to="/medicalregister" icon={<LocalHospitalIcon sx={{ fontSize: 30 }}/>} />
              <BottomNavigationAction label="Nhắc khám" sx={{color: '#000', maxWidth: '95px'}} LinkComponent={NavLink} to="/re-examination" icon={<LocalPhoneIcon sx={{ fontSize: 30 }}/>} />
              <BottomNavigationAction label="Khám bệnh" sx={{color: '#000', maxWidth: '100px'}} LinkComponent={NavLink} to="/doctor-examining" icon={<MedicationLiquidIcon sx={{ fontSize: 30 }}/>} />
              <BottomNavigationAction label="Thống kê" sx={{color: '#000', maxWidth: '83px'}} LinkComponent={NavLink} to="/dashboard" icon={<BarChartIcon sx={{ fontSize: 30 }}/>} />
          </BottomNavigation>
          <NavLink exact to="/login"><Button sx={{textTransform: 'none', color: '#000'}}>Đăng nhập</Button></NavLink>       
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default withRouter(Header)