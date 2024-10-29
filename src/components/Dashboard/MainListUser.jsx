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
//icon
import { HiUserAdd } from "react-icons/hi";
//api
import { getListUser } from '../../Service/StatisticsService';


function MainListUser() {
    const [loading, setLoading] = useState(false);
    const [listUser, setListUser] = useState([]);

    const [openModalAddUser, setOpenModalAddlUser] = useState(false);

    const columns = [
        { field: 'userId', headerName: 'userId', width: 120, align: 'left', headerAlign: 'left', },
        { field: 'userFullName', headerName: 'Họ tên', width: 240, align: 'left', headerAlign: 'left', },
        { field: 'email', headerName: 'Email', width: 180, align: 'left', headerAlign: 'left', },
        { field: 'positionName', headerName: 'Vị trí', width: 140, align: 'left', headerAlign: 'left' },
        { field: 'userIsActive', headerName: 'Trạng thái', width: 165, align: 'left', headerAlign: 'left', },
    ];

    // Custom toolbar bao gồm nút thêm user
    const CustomToolbar = ({ handleExportExcel }) => {
        return (
            <GridToolbarContainer >
                {/* Các chức năng của GridToolbar mặc định */}
                <GridToolbarColumnsButton sx={{fontSize: '16px'}}/>
                <GridToolbarFilterButton sx={{fontSize: '16px'}}/>
                <GridToolbarDensitySelector sx={{fontSize: '16px'}}/>
                <Button variant="text" startIcon={<HiUserAdd/>} onClick={handleExportExcel} sx={{fontSize: '16px'}}>Thêm người dùng</Button>
            </GridToolbarContainer>
        );
    };

    const handleOpenModalAddUser = () => {
        setOpenModalAddlUser(true);
    }

    const handleGetListUser = async () => {
        setLoading(true);
        const responseGetListUser = await getListUser();
        setListUser(responseGetListUser);
        setLoading(false);
    }

    useEffect(() => {
        handleGetListUser();
    }, [])

    return (
        <>
            <Box>
                {loading ? 
                    <>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80%'}}>
                            <CircularProgress />
                            <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
                        </Box>  
                    </>
                    :
                    <>
                        <>       
                            <DataGrid 
                                style={{ fontSize: '18px' }}
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
                                    toolbar: { handleOpenModalAddUser }, // Truyền hàm export vào props của toolbar
                                }}
                                disableRowSelectionOnClick
                                sx={{
                                    '.MuiTablePagination-selectLabel': {
                                        marginBottom: '3px',
                                    },
                                    '.MuiTablePagination-displayedRows': {
                                        marginBottom: '3px',
                                    },
                                }}
                            />
                        </>
                    </>
                }
            </Box>
            <AddUser openModalAddUser={openModalAddUser} setOpenModalUser={setOpenModalAddlUser}/>
        </>
    )
}

export default MainListUser