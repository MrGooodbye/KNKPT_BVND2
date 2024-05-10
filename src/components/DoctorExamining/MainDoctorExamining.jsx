import React, { useState, useContext, useEffect } from 'react';
//modal
import ManageDoctorExamining from '../ManageDoctorExamining/ManageDoctorExamining';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Badge from '@mui/material/Badge';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//mui icon
import SearchIcon from '@mui/icons-material/Search';
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
import { GiBodyHeight } from "react-icons/gi";
import { GiWeightScale } from "react-icons/gi";
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
//moment
import moment from 'moment';
//scss
import './SCSS/DoctorExamining.scss'

function MainDoctorExamining() {
    const dataPantientsReadyExaminingDefault = {
        stt: '',
        patientsId: '',
        patientsName: '',
        patientsDOB: '',
        patientsGender: '',
        patientsHeight: '',
        patientsWeight: '',
        patientsPhone: '',
        patientsAddress: ''
    }

    const [dataPantientsReadyExamining, setDataPantientsReadyExamining] = useState(dataPantientsReadyExaminingDefault);

    const [openDoctorExamining, setOpenDoctorExamining] = useState(false);

    const listDataPantientsWaitExamining = [
        {stt: 1, patientsId: '000001', patientsName: 'Dương Anh Thơ', patientsDOB: '01/01/2024', patientsGender: '1', patientsHeight: 120, patientsWeight: 10, patientsPhone: '0987654321', patientsAddress: 'Hồ Chí Minh'},
        {stt: 2, patientsId: '000002', patientsName: 'Tạ Thị Phương Thảo', patientsDOB: '12/10/2023', patientsGender: '1', patientsHeight: 125, patientsWeight: 8, patientsPhone: '0987654321', patientsAddress: 'Hà Nội'},
        {stt: 3, patientsId: '000003', patientsName: 'GHI', patientsDOB: '26/05/2023', patientsGender: '0', patientsHeight: 135, patientsWeight: 19, patientsPhone: '0987654321', patientsAddress: 'Đà Nẵng'},
        {stt: 4, patientsId: '000004', patientsName: 'JKL', patientsDOB: '10/01/2023', patientsGender: '0', patientsHeight: 137, patientsWeight: 27, patientsPhone: '0987654321', patientsAddress: 'Thừa Thiên Huế'},
        {stt: 5, patientsId: '000005', patientsName: 'MNO', patientsDOB: '22/11/2023', patientsGender: '1', patientsHeight: 110, patientsWeight: 14, patientsPhone: '0987654321', patientsAddress: 'Cà Mau'},
    ]

    const initialData = {
        category: [
            {
                categoryName: 'Nhóm máu mẹ / con', 
                categoryContent: [
                    {
                        categoryContentTitle: '',
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Nhóm máu mẹ', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Nhóm máu con', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''}
                        ]
                    }
                ]
            },

            {
                categoryName: 'Tiền sử bệnh lý của mẹ', 
                categoryContent: [
                    {
                        categoryContentTitle: 'Bệnh lý trước mang thai', 
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Hen suyễn', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Tiểu đường', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Béo phì', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Bệnh lý tuyến giáp', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Bệnh tim', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Bệnh thận mạn', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Sức khỏe răng miệng kém', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                        ]
                    },

                    {
                        categoryContentTitle: 'Biến chứng thai kỳ',
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Tiểu đường thai kỳ', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Tăng huyết áp thai kỳ', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Tiền sản giật', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Sản giật', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                        ]
                    },

                    {
                        categoryContentTitle: 'Bệnh lý nhiễm trùng',
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Nhiễm Streptococcus nhóm B', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: 'Điều trị: '},
                            {categoryContentQuestion: 'Viêm màng ối', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Nhiễm trùng tiết niệu', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'HIV', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Viêm gan B', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Giang mai', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Nhiễm Toxoplasma', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Nhiễm CMV', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                        ]
                    },

                    {
                        categoryContentTitle: 'Thuốc / độc chất',
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Thuốc lá', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Rượu', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Thuốc đang sử dụng', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Thuốc đã sử dụng', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Khác', categoryContentQuestionType: 'check', categoryContentAnswer: '', categoryContentNote: ''},
                        ]
                    }
                ],
            },

            {
                categoryName: 'Tiền căn sản khoa', 
                categoryContent: [
                    {
                        categoryContentTitle: '',
                        categoryContentQuestion: [
                            {categoryContentQuestion: 'Tuổi thai tuần', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Cân nặng (kg)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Chiều dài (cm)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                            {categoryContentQuestion: 'Vòng đầu (cm)', categoryContentQuestionType: 'string', categoryContentAnswer: '', categoryContentNote: ''},
                        ]
                    }
                ]
            },

            {
                categoryName: 'Sổ sức khỏe',
                categoryContent: [
                    // {
                    //     categoryContentTitle: 'Khám và theo dõi sức khỏe định kỳ',
                    //     listHealthRecords: [
                    //         {periodExams: 'Khám 21 tháng', status: 0, dateExams: '20/04/2024', doctorExams: '', conclude: ''},
                    //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                    //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
                    //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                    //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
                    //         {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
                    //         {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'}
                    //       ]
                    // }
                ]
            },

            {
                categoryName: 'Đánh giá dinh dưỡng',
                categoryContent: []
            },

            {
                categoryName: 'Sổ tiêm ngừa',
                categoryContent: []
            },
        ]
    }

    const [data, setData] = useState(initialData);

    const handleOpenDoctorExamining = () => {
        setOpenDoctorExamining(true);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.keyCode === 113 && dataPantientsReadyExamining.patientsId !== ''){
                handleOpenDoctorExamining();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [dataPantientsReadyExamining])

    return (
        <>
         <Container maxWidth="xl" sx={{mt: 10.5}}>
            <Box sx={{ bgcolor: '#fff', height: 'auto'}} >
                <Grid container spacing={2} sx={{pl: 1, pr: 1}}>
                    <Grid item xs={0.3}></Grid>

                    <Grid item xs={5}>
                        {/* <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{`${moment().format('dddd')}, ${moment().format('LL')}`}</Typography> */}
                        <TableContainer component={Paper} sx={{ height: '332px', boxShadow: 4 }}>
                            <Box sx={{mt: 1.4, mb: 0.3}}>
                                <Stack direction='row' spacing={1} sx={{justifyContent: 'center'}}>
                                    <Badge badgeContent={10} color="error"><Chip label="BN chờ khám" color="info" clickable/></Badge>
                                    <Badge badgeContent={4} color="error"><Chip label="BN tái khám" variant="outlined" clickable/></Badge>
                                    <Badge badgeContent={4} color="error"><Chip label="BN đã khám" variant="outlined" clickable/></Badge>    
                                </Stack>
                                <Typography variant="h6" sx={{textAlign: 'center', fontSize: '1.10rem'}}>{`Danh sách bệnh nhân chờ khám ngày ${moment().format('LL')}`}</Typography>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <TextField sx={{mt: 0.1, mb: 0.4, width: 400, '& .MuiInputBase-inputSizeSmall': {textAlign: 'center'}}} size="small" variant="outlined" placeholder='Tìm với Mã BN hoặc Tên BN'
                                        InputProps={{startAdornment: (
                                            <InputAdornment position='start'><SearchIcon/></InputAdornment>
                                        )}}>
                                    </TextField>
                                </Box>
                            </Box>

                            <Table stickyHeader >
                                <TableHead>
                                    <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                        <TableCell align='left' sx={{fontSize: '0.95rem'}}>STT</TableCell>
                                        <TableCell align='left' sx={{fontSize: '0.95rem'}}>Mã bệnh nhân</TableCell>
                                        <TableCell align="left" sx={{fontSize: '0.95rem'}}>Họ tên</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listDataPantientsWaitExamining.map((row) => (
                                        <TableRow hover role="checkbox" key={row.stt} sx={{cursor: 'pointer'}} onClick={() => setDataPantientsReadyExamining(row)}>
                                            <TableCell align='left' sx={{width: '20px'}}>{row.stt}</TableCell>
                                            <TableCell align='left' sx={{width: '150px'}}>{row.patientsId}</TableCell>
                                            <TableCell align='left' sx={{width: '240px'}}>{row.patientsName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box style={{width: '100%', marginTop: '6.2px', borderRadius: '10px', border: '2px solid red'}} >
                            <div className='category-scrollbar'>
                                <List sx={{p: 0, height: '270px'}}>
                                    {data.category.map((categoryItem, categoryIndex) => (
                                        <ListItemButton key={`category ${categoryIndex}`} sx={{pt: '4px', pb: '4px'}}>
                                            <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                            <ListItemText primary={categoryItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                        </ListItemButton>
                                    ))}
                                </List>
                            </div>
                            
                        </Box>
                    </Grid>

                    <Grid item xs={0.25}></Grid>

                    <Grid item xs={6.3}>
                        <Box sx={{boxShadow: 5, borderRadius: '20px', border: 'solid', height: '221px'}}>
                            <Typography variant='h6' sx={{color: 'blue', mt: 0.6, mb: 0.6, fontWeight: 'bolder', fontSize: '1.2rem', textAlign: 'center'}}>Thông tin bệnh nhân</Typography>
                            <Box sx={{pl: 4, pr: 4, mt: 1}}>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4}}>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <PinIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Mã BN: ${dataPantientsReadyExamining.patientsId || ''}`}</Typography>
                                    </Grid>
                                    <Grid item xs={8} sx={{display: 'inline-flex'}}>
                                        <PersonIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Họ tên: ${dataPantientsReadyExamining.patientsName || ''}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <CalendarMonthIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Ngày sinh: ${dataPantientsReadyExamining.patientsDOB || ''}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <InfoIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Tháng tuổi: ${dataPantientsReadyExamining.patientsDOB || ''}`}</Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        {dataPantientsReadyExamining.patientsGender === '0' ? <MaleIcon sx={{color: 'coral', fontSize: '27px'}}/> : <FemaleIcon sx={{color: 'coral', fontSize: '27px'}}/>}
                                        <Typography variant='subtitle1' sx={{ml: 1}}>
                                            {`Giới tính: ${dataPantientsReadyExamining.patientsGender ? dataPantientsReadyExamining.patientsGender === '0' ? 'Nam' : 'Nữ' : ''}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <GiBodyHeight style={{color: 'tomato', fontSize: '1.42rem'}}/>
                                        <Typography variant='subtitle1' sx={{ml: 1}}>
                                            {`Chiều cao: ${dataPantientsReadyExamining.patientsHeight ? dataPantientsReadyExamining.patientsHeight + ' cm' : ''}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <GiWeightScale style={{color: 'tomato', fontSize: '1.42rem'}}/>
                                        <Typography variant='subtitle1' sx={{ml: 1}}>
                                            {`Cân nặng: ${dataPantientsReadyExamining.patientsWeight ? dataPantientsReadyExamining.patientsWeight + ' kg' : ''}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                        <PhoneIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Điện thoại: ${dataPantientsReadyExamining.patientsPhone || ''}`}</Typography>
                                    </Grid>
                                    <Grid item xs={6} sx={{display: 'inline-flex'}}>
                                        <Home sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Địa chỉ: ${dataPantientsReadyExamining.patientsAddress || ''}`}</Typography>
                                    </Grid> 
                                </Grid>
                            </Box>
                        </Box>

                        <Box sx={{backgroundColor: 'red', width: '100%', height: '120px', mt: '3px'}}>
                            {data.category.map((categoryItem, categoryIndex) => (
                                categoryItem.categoryContent.map((contentItem, contentIndex) => (
                                    <TabContext value={contentIndex}>
                                        <TabList>
                                            <Tab label="<-" value="1" />
                                            <Tab label="->" value="1" />
                                        </TabList>
                                    </TabContext>
                                ))
                            ))}
                        </Box>
        
                    </Grid>

                </Grid>
            </Box>
         </Container>

         <ManageDoctorExamining openDoctorExamining={openDoctorExamining} setOpenDoctorExamining={setOpenDoctorExamining}/>
    </>
    )
}

export default MainDoctorExamining