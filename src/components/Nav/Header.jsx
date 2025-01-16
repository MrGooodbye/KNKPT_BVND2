import React, { useState, useContext, useEffect } from 'react';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Link, NavLink, useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
//modal
//import UserManual from '../ManageUserManual/UserManual';
import ChangePassword from '../ManageChangePassword/ChangePassword';
import ChangeUserInfo from '../ManageUserInfo/ChangeUserInfo';
//mui theme
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Avatar from '@mui/material/Avatar';
import Logo from '../../assets/image/logo.png';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
//icon
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BarChartIcon from '@mui/icons-material/BarChart';
import HelpIcon from '@mui/icons-material/Help';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
//context
import { UserContext } from '../../context/UserContext';
//real-time
import {removeFromGroup} from '../../Service/SignalService';

function Header(props) {

  const { user, logoutContext, triggerAlert, setIsDialogChangePasswordOpen, setIsDialogChangeInfoUserOpen, isOldDiseaseWithNullCodeWard } = useContext(UserContext);

  const location = useLocation();
  const history = useHistory();

  // const [openModalUserManual, setOpenModalUserManual] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);
  const [openModalChangeUserInfo, setOpenModalChangeUserInfo] = useState(false);

  //mui state menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElManageMenuIcon, setAnchorElManageMenuIcon] = useState(null);

  const token = localStorage.getItem("jwt");
  
  const open = Boolean(anchorEl);
  const openManageMenuIcon = Boolean(anchorElManageMenuIcon)
  
  const handleClick = (event) => {
    if(isOldDiseaseWithNullCodeWard === true){
      event.preventDefault();
    }else{
      setAnchorEl(event.currentTarget)
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenManageMenuIcon = (event, key) => {
    if(key === 'manage'){
      setAnchorElManageMenuIcon(event.currentTarget);
    }
  }

  const handleCloseManageMenuIcon = () => {
    setAnchorElManageMenuIcon(null)
  }

  const handleMenuItemClick = (path) => {
    history.push(path); // Điều hướng tới đường dẫn mới
    handleCloseManageMenuIcon(); // Đóng Menu
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
    { key: 'manage', maxWidth: '83px', label: 'Quản lý', icon: <SettingsSuggestIcon sx={{fontSize: 30}}/> },
  ]

  const [userAction, setUserAction] = useState([]);

  const handleChangeURL = (pathname) => {
    const actionIndex = userAction.findIndex(action => action.to === pathname);
    return actionIndex;
  }

  const value = handleChangeURL(props.location.pathname);

  const handleLogout = () => {
    const pathname = props.location.pathname;
    if(user.positionName === 'Doctor' && pathname === 'doctor-examining'){
      triggerAlert(async () => {
        await removeFromGroup();
        localStorage.removeItem('jwt');
        localStorage.removeItem('userLogin');
        logoutContext();
        setAnchorEl(null);
        history.push('/login');
      });
    }
    
    else{
      localStorage.removeItem('jwt'); //xóa localStorage
      localStorage.removeItem('userLogin');
      logoutContext();
      setAnchorEl(null);
      history.push('/login');
    }
  }

  useEffect(() => {

  }, [isOldDiseaseWithNullCodeWard])
  
  useEffect(() => {
    if(user){
      if(user.positionName === 'Nursing'){        
        setUserAction(actionNursing);
      }
      else if(user.positionName === 'Doctor'){
        setUserAction(actionDoctor);
      }
      else if(user.positionName === 'Admin'){
        setUserAction(actionAdmin);
      }
    }  
  }, [user])
  
  if(location.pathname !== '/login'){
    return (
      <>
        <Box sx={{ width: '100%'}} >
          <AppBar sx={{position: 'unset'}}>
            <Toolbar sx={{backgroundColor: '#cfe8fc', height: '78px'}}>
              <Link to="/">
                <Avatar src={Logo} sx={{ width: 62, height: 62, mt: 'auto', mb: 'auto', mr: 4 }} />
              </Link>
              {user && token ? 
                <>
                  <BottomNavigation showLabels value={value}
                    sx={{display: 'flex', justifyContent: 'flex-start', backgroundColor: '#cfe8fc', flexGrow: 1}}>
                    {userAction.map(actionItem => (
                      <BottomNavigationAction
                        key={actionItem.key}
                        label={actionItem.label}
                        icon={actionItem.icon}
                        LinkComponent={actionItem.LinkComponent || 'div'}
                        to={actionItem.to || undefined}
                        onClick={(event) => handleOpenManageMenuIcon(event, actionItem.key)}
                        sx={{color: '#000', maxWidth: actionItem.maxWidth}}
                      />
                    ))}  
                  </BottomNavigation>

                  <Menu anchorEl={anchorElManageMenuIcon} open={Boolean(openManageMenuIcon)} onClose={() => handleCloseManageMenuIcon()} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <MenuItem onClick={() => handleMenuItemClick('/manage-user')}>Người dùng</MenuItem>
                  </Menu>

                  <Button onClick={(e) => handleClick(e)} sx={{color: '#000', textTransform: 'none'}}>{user.userFullName}</Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                    <MenuItem onClick={() => [setOpenModalChangePassword(true), setIsDialogChangePasswordOpen(true), setAnchorEl(null)]}>Đổi mật khẩu</MenuItem>
                    <MenuItem onClick={() => [setOpenModalChangeUserInfo(true), setIsDialogChangeInfoUserOpen(true), setAnchorEl(null)]}>Đổi thông tin</MenuItem>
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  </Menu>

                  {/* <HelpIcon titleAccess='Hướng dẫn' sx={{color: 'black', fontSize: '30px', cursor: 'pointer'}} onClick={() => setOpenModalUserManual(true)} /> */}
                </>
              :
                <>
                  <Box sx={{position: 'absolute', right: 22}}>
                    <NavLink exact to="/login"><Button sx={{textTransform: 'none', color: '#000'}}>Đăng nhập</Button></NavLink>
                    {/* <HelpIcon titleAccess='Hướng dẫn' sx={{color: 'black', fontSize: '30px', cursor: 'pointer'}} onClick={() => setOpenModalUserManual(true)} /> */}
                  </Box>
                </>
              }            
            </Toolbar>
          </AppBar>
        </Box>
  
        {/* <UserManual openModalUserManual={openModalUserManual} setOpenModalUserManual={setOpenModalUserManual}/> */}
        <ChangePassword openModalChangePassword={openModalChangePassword} setOpenModalChangePassword={setOpenModalChangePassword} setIsDialogChangePasswordOpen={setIsDialogChangePasswordOpen}/>
        <ChangeUserInfo openModalChangeUserInfo={openModalChangeUserInfo} setOpenModalChangeUserInfo={setOpenModalChangeUserInfo} setIsDialogChangeInfoUserOpen={setIsDialogChangeInfoUserOpen}/>
      </>
    )
  }
  else{
    return <></>
  }
}

export default withRouter(Header)