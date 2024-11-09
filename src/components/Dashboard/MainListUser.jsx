import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
//context
import { UserContext } from '../../context/UserContext';
//modal add user
import AddUser from '../ManageAddUser/AddUser';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, viVN } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
//icon
import { HiUserAdd } from "react-icons/hi";
//api
import { getListUser } from '../../Service/StatisticsService';


function MainListUser() {
    const { user, loading } = useContext(UserContext);

    const [reloadComponent, setReloadComponent] = useState(false);
    const [loadingListUser, setLoadingListUser] = useState(false);
    const [listUser, setListUser] = useState([]);

    const [openModalAddUser, setOpenModalAddUser] = useState(false);

    const history = useHistory();

    const columns = [
        { field: 'userName', headerName: 'Tên đăng nhập', width: 240, align: 'left', headerAlign: 'left', },
        { field: 'userFullName', headerName: 'Họ tên', width: 240, align: 'left', headerAlign: 'left', },
        { field: 'userEmail', headerName: 'Email', width: 340, align: 'left', headerAlign: 'left', },
        { field: 'positionName', headerName: 'Vị trí', width: 200, align: 'left', headerAlign: 'left' },
        { field: 'userIsActive', headerName: 'Trạng thái', width: 165, align: 'left', headerAlign: 'left', },
    ];

    // Custom toolbar bao gồm nút thêm user
    const CustomToolbar = ({ handleOpenModalAddUser }) => {
        return (
            <GridToolbarContainer >
                {/* Các chức năng của GridToolbar mặc định */}
                <GridToolbarColumnsButton sx={{fontSize: '16px'}}/>
                <GridToolbarFilterButton sx={{fontSize: '16px'}}/>
                <GridToolbarDensitySelector sx={{fontSize: '16px'}}/>
                <Button variant="text" startIcon={<HiUserAdd/>} onClick={handleOpenModalAddUser} sx={{fontSize: '16px'}}>Thêm người dùng</Button>
            </GridToolbarContainer>
        );
    };

    const handleOpenModalAddUser = () => {
        setOpenModalAddUser(true);
    }

    const handleGetListUser = async () => {
        setLoadingListUser(true);
        const responseGetListUser = await getListUser();
        const editMainDataListUser = responseGetListUser.map((item) => {
            const dataReportUser = {
                userId: item.userId,
                userName: item.userName,
                userFullName: item.userFullName,
                userEmail: item.userEmail,
                positionName: item.positionName,
                userIsActive: item.userIsActive
            }

            if(item.positionName === 'Doctor'){
                dataReportUser.positionName = 'Bác sĩ'
            }
            else if(item.positionName === 'Nursing'){
                dataReportUser.positionName = 'Tiếp nhận'
            }

            return dataReportUser
        })
        setListUser(editMainDataListUser);
        setLoadingListUser(false);

        if(reloadComponent){
            setReloadComponent(false);
        }
    }

    useEffect(() => {
        handleGetListUser();
    }, [])

    useEffect(() => {
        if(reloadComponent){
            handleGetListUser();
        }
    }, [reloadComponent])

    useEffect(() => {
        if(loading === false && user.isLogin){
            if(user.positionName !== 'Admin'){
                history.push('/404');
            }
        }
    }, [loading, user])

    return (
        <>
            <Container maxWidth="xl" sx={{mt: 1}}>
                <Box sx={{ height: 600, width: '100%', mt: 1.2 }}>
                    {loadingListUser ? 
                        <>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
                                <CircularProgress />
                                <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
                            </Box>  
                        </>
                    :
                        <>  
                            <Typography variant='h5' sx={{textAlign: 'center', mb: 1, fontWeight: 'bolder', color: 'red'}}>Danh sách người dùng</Typography>     
                            <DataGrid 
                                style={{ fontSize: '18px', marginLeft: '50px', marginRight: '50px' }}
                                localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                rows={listUser.map((row, index) => ({
                                    ...row,
                                    id: index + 1,
                                }))}
                                columns={columns}
                                pageSizeOptions={[1]}
                                components={{
                                    Toolbar: CustomToolbar, // Chèn toolbar vào đây
                                  }}
                                componentsProps={{
                                    toolbar: { handleOpenModalAddUser },
                                }}
                                disableRowSelectionOnClick
                                sx={{ 
                                    '.MuiTablePagination-selectLabel': { marginBottom: '3px', }, 
                                    '.MuiTablePagination-displayedRows': { marginBottom: '3px', },
                                }}
                            />
                        </>
                    }
                </Box>
            </Container>
            
            <AddUser openModalAddUser={openModalAddUser} setOpenModalAddUser={setOpenModalAddUser} setReloadComponent={setReloadComponent}/>
        </>
    )
}

export default MainListUser