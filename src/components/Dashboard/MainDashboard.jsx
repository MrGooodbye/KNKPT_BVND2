import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//context
import { UserContext } from '../../context/UserContext';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbarExport, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer, viVN } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
//mui datepicker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//icon
import { RiFileExcel2Fill } from "react-icons/ri";
//moment
import moment from 'moment';
import * as XLSX from 'xlsx';
//api
import { getReportPatient } from '../../Service/StatisticsService';

function MainDashboard() {
    const { user, loading } = useContext(UserContext);

    const history = useHistory();

    const [dateSelectedReport, setDateSelectedReport] = useState({dateStart: '', dateEnd: ''})
    const [mainDataDashboard, setMainDataDashboard] = useState([]);
    const [loadingDataDashboard, setLoadingDataDashboard] = useState(false);

    const typingRef = useRef(null);

    const columns = [
        { field: 'id', headerName: 'STT', width: 120, align: 'left', headerAlign: 'left', },
        { field: 'fullName', headerName: 'Họ tên', width: 240, align: 'left', headerAlign: 'left', },
        { field: 'dayExam', headerName: 'Ngày khám', width: 180, align: 'left', headerAlign: 'left', type: 'date' },
        { field: 'gender', headerName: 'Giới tính', width: 140, align: 'left', headerAlign: 'left' },
        { field: 'dayOfBirth', headerName: 'Ngày sinh', width: 165, align: 'left', headerAlign: 'left', type: 'date' },
        { field: 'examName', headerName: 'Kỳ khám', width: 170, align: 'left', headerAlign: 'left' },
        { field: 'phone', headerName: 'Điện thoại', width: 170, type: 'number', align: 'left', headerAlign: 'left'},
        { field: 'district', headerName: 'Quận/Huyện', width: 185, align: 'left', headerAlign: 'left' },
        { field: 'province', headerName: 'Tỉnh/Thành phố', width: 185, align: 'left', headerAlign: 'left' },
        { field: 'address', headerName: 'Địa chỉ', width: 700, align: 'left', headerAlign: 'left' },
    ];

    // Hàm xử lý xuất file Excel
    const handleExportExcel = () => {
        // Tạo lại dữ liệu với các tiêu đề cột tùy chỉnh
        const formattedRows = mainDataDashboard.map((row, index) => ({
            'STT': index + 1,
            'Họ tên': row.fullName, 
            'Ngày khám': row.dayExam,
            'Giới tính': row.gender,
            'Ngày sinh': row.dayOfBirth,
            'Kỳ khám': row.examName,
            'Điện thoại': row.phone,
            'Quận/Huyện': row.district,
            'Tỉnh/Thành phố': row.province,
            'Địa chỉ': row.address
          }));

        // Tạo worksheet từ dữ liệu đã định dạng
        const ws = XLSX.utils.json_to_sheet(formattedRows);

        // Tạo workbook và thêm worksheet vào đó
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');

        // Xuất file Excel
        XLSX.writeFile(wb, `Danh sách bệnh nhân khám bệnh từ ${moment(dateSelectedReport.dateStart).format('DD-MM-YYYY')} đến ${moment(dateSelectedReport.dateEnd).format('DD-MM-YYYY')}.xlsx`);
    };

    // Custom toolbar bao gồm nút xuất Excel
    const CustomToolbar = ({ handleExportExcel }) => {
        return (
            <GridToolbarContainer >
                {/* Các chức năng của GridToolbar mặc định */}
                <GridToolbarColumnsButton sx={{fontSize: '16px'}}/>
                <GridToolbarFilterButton sx={{fontSize: '16px'}}/>
                <GridToolbarDensitySelector sx={{fontSize: '16px'}}/>
                <Button variant="text" startIcon={< RiFileExcel2Fill/>} onClick={handleExportExcel} sx={{fontSize: '16px'}}>Xuất Excel</Button>
            </GridToolbarContainer>
        );
    };

    const onChangeDateStart = (value) => {
        if(value){
            const takenValue = value._d;

            if(typingRef.current){
                clearInterval(typingRef.current);
            }

            typingRef.current = setTimeout(() => {
                const _dateSelectedReport = {...dateSelectedReport};
                _dateSelectedReport.dateStart = moment(takenValue).format('YYYY-MM-DD');
                setDateSelectedReport(_dateSelectedReport);
            }, 200) 
        }
    }

    const onChangeDateEnd = (value) => {
        if(value){
            const takenValue = value._d;

            if(typingRef.current){
                clearInterval(typingRef.current);
            }

            typingRef.current = setTimeout(() => {
                const _dateSelectedReport = {...dateSelectedReport};
                _dateSelectedReport.dateEnd = moment(takenValue).format('YYYY-MM-DD');
                setDateSelectedReport(_dateSelectedReport);
            }, 200) 
        }
    }

    const handleGetReportPatient = async () => {
        setLoadingDataDashboard(true);
        await new Promise(resolve => setTimeout(resolve, 5 * 100));
        const responseGetReportPatient = await getReportPatient(dateSelectedReport);
        const editMainDataDashboard = responseGetReportPatient.map((item) => {
            const dataReportPatient = {
                patientId: item.patientId,
                fullName: item.fullName,
                dayExam: moment(item.dayExam).format('DD/MM/YYYY'),
                gender: item.gender ? 'Nam' : 'Nữ',
                dayOfBirth: moment(item.dayOfBirth).format('DD/MM/YYYY'),
                examName: item.examName,
                phone: item.phone,
                district: item.district,
                province: item.province,
                address: item.address
            }
            return dataReportPatient
        })
        setMainDataDashboard(editMainDataDashboard);
        setLoadingDataDashboard(false);
    }

    useEffect(() => {
        if(loading === false && user.isLogin){
            if(user.positionName !== 'Admin'){
                history.push('/404');
            }
        }
    }, [loading, user])

    useEffect(() => {
        if(dateSelectedReport.dateStart !== '' && dateSelectedReport.dateEnd !== ''){
            handleGetReportPatient();
        }
    }, [dateSelectedReport])

    return (
        <Container maxWidth="xl" sx={{mt: 1}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
                    <DemoContainer components={['DatePicker']}> 
                        <DatePicker label="Từ ngày" format='DD/MM/YYYY' disableFuture onChange={(value) => onChangeDateStart(value)}/> 
                        <DatePicker label="Đến ngày" format='DD/MM/YYYY' disableFuture onChange={(value) => onChangeDateEnd(value)}/>                                   
                    </DemoContainer>
                </LocalizationProvider>
            </Box>

            <Box sx={{ height: 600, width: '100%', mt: 1.2 }}>
                {loadingDataDashboard ? 
                    <>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '80%'}}>
                            <CircularProgress />
                            <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
                        </Box>  
                    </>
                    :
                        mainDataDashboard.length !== 0 ?
                            <>       
                                <DataGrid 
                                    style={{ fontSize: '18px' }}
                                    localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
                                    rows={mainDataDashboard.map((row, index) => ({
                                        ...row,
                                        id: index + 1,
                                    }))}
                                    columns={columns}
                                    pageSizeOptions={[1]}
                                    components={{
                                        Toolbar: CustomToolbar, // Chèn toolbar vào đây
                                      }}
                                      componentsProps={{
                                        toolbar: { handleExportExcel }, // Truyền hàm export vào props của toolbar
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
                        :
                           <h5 style={{textAlign: 'center', color: 'blue'}}>Hãy chọn khoảng ngày khám để lấy dữ liệu thống kê</h5>
                }
            </Box>
        </Container>
    )
}

export default MainDashboard