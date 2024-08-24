import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Link, NavLink, useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import UserManual from '../ManageUserManual/UserManual';
//mui theme
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/image/logo.png';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
//context
import { UserContext } from '../../context/UserContext';

function Header(props) {

  const { user, logoutContext, triggerAlert } = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();

  const [openModalUserManual, setOpenModalUserManual] = useState(false);

  //mui state menu
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("jwt");
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const actionNursing = [
    { key: 'medicalRegister', maxWidth: '114px', label: 'Đăng ký khám', icon: <LocalHospitalIcon sx={{fontSize: 30}}/>, LinkComponent: NavLink, to: "/medicalregister" },
    { key: 'remind-examining', maxWidth: '95px', label: 'Nhắc khám', icon: <LocalPhoneIcon sx={{fontSize: 30}}/>, LinkComponent: NavLink, to: "/remind-examining" },
  ]

  const actionDoctor = [
    { key: 'examining', maxWidth: '100px', label: 'Khám bệnh', icon: <MedicationLiquidIcon sx={{fontSize: 30}}/>, LinkComponent: NavLink, to: "/doctor-examining" },
  ]

  const actionAdmin = [
    { key: 'statistical', maxWidth: '83px', label: 'Thống kê', icon: <BarChartIcon sx={{fontSize: 30}}/>, LinkComponent: NavLink, to: "/dashboard" },
  ]

  const [userAction, setUserAction] = useState([]);

  const handleChangeURL = (pathname) => {
    const actionIndex = userAction.findIndex(action => action.to === pathname);
    return actionIndex;
  }

  const value = handleChangeURL(props.location.pathname);

  const handleLogout = () => {
    if(user.positionName === 'Doctor'){
      triggerAlert(() => {
        localStorage.removeItem('jwt');
        logoutContext();
        setAnchorEl(null);
        history.push('/login');
      });
    }
    
    else{
      localStorage.removeItem('jwt'); //xóa localStorage
      logoutContext();
      setAnchorEl(null);
      history.push('/login');
    }
  }
  
  useEffect(() => {
    if(user.positionName === 'Nursing'){        
      setUserAction(actionNursing);
    }
    else if(user.positionName === 'Doctor'){
      setUserAction(actionDoctor);
    }
    else if(user.positionName === 'Admin'){
      setUserAction(actionAdmin);
    }
  }, [user])
  
  if(location.pathname !== '/login'){
    return (
      <>
        <Box sx={{ width: '100%', position: 'fixed', top: 0}} >
          <AppBar>
            <Toolbar sx={{backgroundColor: '#cfe8fc', height: '78px'}}>
              <Link to="/">
                <Avatar src={Logo} sx={{ width: 62, height: 62, mt: 'auto', mb: 'auto', mr: 4 }} />
              </Link>
                {user.isAuthenticated === true || token ? 
                  <>
                    <BottomNavigation showLabels value={value}
                      sx={{display: 'flex', justifyContent: 'flex-start', backgroundColor: '#cfe8fc', flexGrow: 1}}>
                      {userAction.map(actionItem => (
                        <BottomNavigationAction
                          key={actionItem.key}
                          label={actionItem.label}
                          icon={actionItem.icon}
                          LinkComponent={actionItem.LinkComponent}
                          to={actionItem.to}
                          sx={{color: '#000', maxWidth: actionItem.maxWidth}}
                        />
                      ))}  
                    </BottomNavigation>

                    <Button onClick={handleClick} sx={{color: '#000', textTransform: 'none'}}>{user.userFullName}</Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                      <MenuItem>Đổi mật khẩu</MenuItem>
                      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                    <HelpIcon titleAccess='Hướng dẫn' sx={{color: 'black', fontSize: '30px', cursor: 'pointer'}} onClick={() => setOpenModalUserManual(true)} />
                  </>
                  :
                    <>
                      <Box sx={{position: 'absolute', right: 22}}>
                        <NavLink exact to="/login"><Button sx={{textTransform: 'none', color: '#000'}}>Đăng nhập</Button></NavLink>
                        <HelpIcon titleAccess='Hướng dẫn' sx={{color: 'black', fontSize: '30px', cursor: 'pointer'}} onClick={() => setOpenModalUserManual(true)} />
                      </Box>
                    </>
                  }            
                </Toolbar>
          </AppBar>
        </Box>
  
        <UserManual openModalUserManual={openModalUserManual} setOpenModalUserManual={setOpenModalUserManual}/>
      </>
    )
  }
  else{
    return <></>
  }
}

export default withRouter(Header)