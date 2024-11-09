import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
//user context
import { UserContext } from '../../context/UserContext';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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
import { Button, IconButton, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Tooltip from '@mui/material/Tooltip';
//mui datepicker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//mui icon
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
//lodash
import _ from "lodash";
//moment
import moment from 'moment';
//api
import { getAppointmentsNextWeek, updateStateAppointment } from '../../Service/MedicalService';
import { toast } from 'react-toastify';

function MainAppointmentExamining() {
    const { user, loading } = useContext(UserContext);

    const history = useHistory();

    const [activeChip, setActiveChip] = useState({chipOrder: 0, chipLabel: 'BN chưa nhắc hẹn khám'});
    const [listPantientAppointmentChipState, setListPantientChipState] = useState(
        [
            { chipLabel: 'BN chưa nhắc hẹn khám', chipContent: 0 },
            { chipLabel: 'BN xác nhận hẹn khám', chipContent: 0 },
            { chipLabel: 'BN từ chối hẹn khám', chipContent: 0 }
        ]
    )

    const [listAppointment, setListAppointment] = useState();
    
    const [searchPatientsQuery, setSearchPatientsQuery] = useState("");

    const [listDataPatientsAppointmentPaginate, setListDataPatientsAppointmentPaginate] = useState([]);
    const [listDataPatientsAppointmentState, setListDataPatientsAppointmentState] = useState();
    const [listDataPatientsAppointmentSort, setListDataPatientsAppointmentSort] = useState([]);
    
    const [loadingComponent, setLoadingComponent] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState();

    const [dataAppointment, setDataAppointment] = useState();

    const handlePaginate = (data) => {
        const itemsPerPage = 5;
        if(data){
            const calculatedPageCount = Math.ceil(data.length / itemsPerPage);
            const startIndex = (page - 1) * itemsPerPage;
            const newCurrentItems = data.slice(startIndex, startIndex + itemsPerPage);
          
            setListDataPatientsAppointmentState(newCurrentItems);
            setListDataPatientsAppointmentSort(newCurrentItems);
    
            setPageCount(calculatedPageCount);
        }
        else{
            const calculatedPageCount = Math.ceil(listDataPatientsAppointmentPaginate.length / itemsPerPage);
            const startIndex = (page - 1) * itemsPerPage;
            const newCurrentItems = listDataPatientsAppointmentPaginate.slice(startIndex, startIndex + itemsPerPage);
          
            setListDataPatientsAppointmentState(newCurrentItems);
            setListDataPatientsAppointmentSort(newCurrentItems);
    
            setPageCount(calculatedPageCount);
        }
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const handleGetAppointmentsNextWeek = async () => {
        setLoadingComponent(true);
        const responseGetAppointmentsNextWeek = await getAppointmentsNextWeek();

        setListAppointment(responseGetAppointmentsNextWeek);

        const _listAppointmentNotRemind = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 0);
        const  _listAppointmentAcceptReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 1);
        const _listAppointmentRejectReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 2);

        const updateListPantientAppointmentChipState = [
            { chipLabel: 'BN chưa nhắc hẹn khám', chipContent: _listAppointmentNotRemind.length },
            { chipLabel: 'BN xác nhận hẹn khám', chipContent: _listAppointmentAcceptReExamining.length },
            { chipLabel: 'BN từ chối hẹn khám', chipContent: _listAppointmentRejectReExamining.length }
        ]

        setListPantientChipState(updateListPantientAppointmentChipState);

        if(activeChip.chipOrder === 0){
            const dataAppointmentNotRemind = _listAppointmentNotRemind.map((item) => {
                const createNewDataAppointmentNotRemind = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentNotRemind
            })

            setDataAppointment(dataAppointmentNotRemind);
            setListDataPatientsAppointmentPaginate(_listAppointmentNotRemind);
            handlePaginate(_listAppointmentNotRemind)
        }

        else if(activeChip.chipOrder === 1){
            const dataAppointmentAcceptReExamining = _listAppointmentAcceptReExamining.map((item) => {
                const createNewDataAppointmentAcceptReExamining = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentAcceptReExamining
            })

            setDataAppointment(dataAppointmentAcceptReExamining);
            setListDataPatientsAppointmentPaginate(_listAppointmentAcceptReExamining)
            handlePaginate(_listAppointmentAcceptReExamining)
        }

        else{
            const dataAppointmentRejectReExamining = _listAppointmentRejectReExamining.map((item) => {
                const createNewDataAppointmentRejectReExamining = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentRejectReExamining
            })

            setDataAppointment(dataAppointmentRejectReExamining);
            setListDataPatientsAppointmentPaginate(_listAppointmentRejectReExamining)
            handlePaginate(_listAppointmentRejectReExamining)
        }

        setLoadingComponent(false);
    }

    const handleSelectedChip = (chipIndex, chipLabel) => {
        setActiveChip({chipOrder: chipIndex, chipLabel: chipLabel});
        if(chipIndex === 0){
            const _listAppointmentNotRemind = listAppointment.filter(item => item.stateAppointment === 0);

            const dataAppointmentNotRemind = _listAppointmentNotRemind.map((item) => {
                const createNewDataAppointmentNotRemind = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentNotRemind
            })

            setDataAppointment(dataAppointmentNotRemind);
            setListDataPatientsAppointmentPaginate(_listAppointmentNotRemind);
            handlePaginate(_listAppointmentNotRemind);
        }
        else if(chipIndex === 1){
            const _listAppointmentAcceptReExamining = listAppointment.filter(item => item.stateAppointment === 1);

            const dataAppointmentAcceptReExamining = _listAppointmentAcceptReExamining.map((item) => {
                const createNewDataAppointmentAcceptReExamining = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentAcceptReExamining
            })

            setDataAppointment(dataAppointmentAcceptReExamining);
            setListDataPatientsAppointmentPaginate(_listAppointmentAcceptReExamining);
            handlePaginate(_listAppointmentAcceptReExamining);
        }
        else{
            const _listAppointmentRejectReExamining = listAppointment.filter(item => item.stateAppointment === 2);

            const dataAppointmentRejectReExamining = _listAppointmentRejectReExamining.map((item) => {
                const createNewDataAppointmentRejectReExamining = 
                    {
                        medicalBookId: item.medicalBookId,
                        appointmentDate: item.appointmentDate
                    }
                
                return createNewDataAppointmentRejectReExamining
            })

            setDataAppointment(dataAppointmentRejectReExamining);
            setListDataPatientsAppointmentPaginate(_listAppointmentRejectReExamining);
            handlePaginate(_listAppointmentRejectReExamining);
        }
    }

    const handleSearchPantient = (value) => {
        const takenValue = value;
        setSearchPatientsQuery(takenValue);
    
        if(value === ''){
          setListDataPatientsAppointmentSort(listDataPatientsAppointmentState);
        }else{
          setListDataPatientsAppointmentSort(searchPatients(listDataPatientsAppointmentState, takenValue));
        }
    }

    const searchPatients = (patients, searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return patients.filter(patientObj => {
          const { patientId, patientFullName, phoneMother, phoneFather } = patientObj;
          return patientId.toLowerCase().includes(lowerCaseSearchTerm) || patientFullName.toLowerCase().includes(lowerCaseSearchTerm) || phoneMother.toLowerCase().includes(lowerCaseSearchTerm) || phoneFather.toLowerCase().includes(lowerCaseSearchTerm);
        });
    }

    const typingRef = useRef(null);

    const onChangeAppointmentDate = (medicalBookId, appointmentDate) => {
        if(appointmentDate){
            const takenValue = appointmentDate._d;

            if(typingRef.current){
                clearInterval(typingRef.current);
            }

            typingRef.current = setTimeout(() => {
                const today = new Date();
                const findDataAppointment = dataAppointment.find(item => item.medicalBookId === medicalBookId);
                const convertAppointmentDateFindDataAppointment = new Date(findDataAppointment.appointmentDate)

                if(today <= takenValue || takenValue >= convertAppointmentDateFindDataAppointment){
                    findDataAppointment.appointmentDate = moment(takenValue).format('YYYY-MM-DD');
                }
            }, 100) 
        }
        
    }

    const handleAcceptReExamining = async (medicalBookId) => {
        setLoadingComponent(true);

        const findDataAppointment = dataAppointment.find(item => item.medicalBookId === medicalBookId);
        const responseUpdateStateAppointment = await updateStateAppointment(findDataAppointment, 1);
        if(responseUpdateStateAppointment.status === 200){
            
            const responseGetAppointmentsNextWeek = await getAppointmentsNextWeek();

            if(searchPatientsQuery !== ""){
                setSearchPatientsQuery("");
            }

            setListAppointment(responseGetAppointmentsNextWeek);

            const _listAppointmentNotRemind = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 0);
            const  _listAppointmentAcceptReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 1);
            const _listAppointmentRejectReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 2);

            const updateListPantientAppointmentChipState = [
                { chipLabel: 'BN chưa nhắc hẹn khám', chipContent: _listAppointmentNotRemind.length },
                { chipLabel: 'BN xác nhận hẹn khám', chipContent: _listAppointmentAcceptReExamining.length },
                { chipLabel: 'BN từ chối hẹn khám', chipContent: _listAppointmentRejectReExamining.length }
            ]

            setListPantientChipState(updateListPantientAppointmentChipState);

            if(activeChip.chipOrder === 0){
                const dataAppointmentNotRemind = _listAppointmentNotRemind.map((item) => {
                    const createNewDataAppointmentNotRemind = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentNotRemind
                })
    
                setDataAppointment(dataAppointmentNotRemind);
                setListDataPatientsAppointmentPaginate(_listAppointmentNotRemind)
                handlePaginate(_listAppointmentNotRemind)
            }

            else if(activeChip.chipOrder === 1){
                const dataAppointmentAcceptReExamining = _listAppointmentAcceptReExamining.map((item) => {
                    const createNewDataAppointmentAcceptReExamining = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentAcceptReExamining
                })
    
                setDataAppointment(dataAppointmentAcceptReExamining);
                setListDataPatientsAppointmentPaginate(_listAppointmentAcceptReExamining)
                handlePaginate(_listAppointmentAcceptReExamining)
            }
            else{
                const dataAppointmentRejectReExamining = _listAppointmentRejectReExamining.map((item) => {
                    const createNewDataAppointmentRejectReExamining = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentRejectReExamining
                })
    
                setDataAppointment(dataAppointmentRejectReExamining);
                setListDataPatientsAppointmentPaginate(_listAppointmentRejectReExamining)
                handlePaginate(_listAppointmentRejectReExamining)
            }

            toast.success(responseUpdateStateAppointment.data, {toastId: 'handleAcceptReExaminingSuccess'});
        }
        else{
            toast.error(responseUpdateStateAppointment.data, {toastId: 'handleAcceptReExaminingError'});
        }
        setLoadingComponent(false);
    }

    const handleRejectReExamining = async (medicalBookId) => {
        setLoadingComponent(true);
        
        const findDataAppointment = dataAppointment.find(item => item.medicalBookId === medicalBookId);
        const responseUpdateStateAppointment = await updateStateAppointment(findDataAppointment, 2);
        if(responseUpdateStateAppointment.status === 200){
            const responseGetAppointmentsNextWeek = await getAppointmentsNextWeek();

            if(searchPatientsQuery !== ""){
                setSearchPatientsQuery("");
            }

            setListAppointment(responseGetAppointmentsNextWeek);

            const _listAppointmentNotRemind = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 0);
            const  _listAppointmentAcceptReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 1);
            const _listAppointmentRejectReExamining = responseGetAppointmentsNextWeek.filter(item => item.stateAppointment === 2);

            const updateListPantientAppointmentChipState = [
                { chipLabel: 'BN chưa nhắc hẹn khám', chipContent: _listAppointmentNotRemind.length },
                { chipLabel: 'BN xác nhận hẹn khám', chipContent: _listAppointmentAcceptReExamining.length },
                { chipLabel: 'BN từ chối hẹn khám', chipContent: _listAppointmentRejectReExamining.length }
            ]

            setListPantientChipState(updateListPantientAppointmentChipState);

            if(activeChip.chipOrder === 0){
                const dataAppointmentNotRemind = _listAppointmentNotRemind.map((item) => {
                    const createNewDataAppointmentNotRemind = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentNotRemind
                })
    
                setDataAppointment(dataAppointmentNotRemind);
                setListDataPatientsAppointmentPaginate(_listAppointmentNotRemind)
                handlePaginate(_listAppointmentNotRemind)
            }

            else if(activeChip.chipOrder === 1){
                const dataAppointmentAcceptReExamining = _listAppointmentAcceptReExamining.map((item) => {
                    const createNewDataAppointmentAcceptReExamining = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentAcceptReExamining
                })
    
                setDataAppointment(dataAppointmentAcceptReExamining);
                setListDataPatientsAppointmentPaginate(_listAppointmentAcceptReExamining)
                handlePaginate(_listAppointmentAcceptReExamining)
            }
            else{
                const dataAppointmentRejectReExamining = _listAppointmentRejectReExamining.map((item) => {
                    const createNewDataAppointmentRejectReExamining = 
                        {
                            medicalBookId: item.medicalBookId,
                            appointmentDate: item.appointmentDate
                        }
                    
                    return createNewDataAppointmentRejectReExamining
                })
    
                setDataAppointment(dataAppointmentRejectReExamining);
                setListDataPatientsAppointmentPaginate(_listAppointmentRejectReExamining)
                handlePaginate(_listAppointmentRejectReExamining)
            }

            toast.success(responseUpdateStateAppointment.data, {toastId: 'handleAcceptReExaminingSuccess'});
        }
        else{
            toast.error(responseUpdateStateAppointment.data, {toastId: 'handleAcceptReExaminingError'});
        }
        setLoadingComponent(false);
    }

    useEffect(() => {
        handleGetAppointmentsNextWeek();
    }, [])

    useEffect(() => {
        if(loading === false && user.isLogin){
          if(user.positionName !== 'Nursing'){
            history.push('/404');
          }
        }
      }, [loading, user])

    useEffect(() => {
        handlePaginate();
    }, [page]);

    return (
        <Container maxWidth="xl" sx={{mt: 1, p: 0 }}>
            <TableContainer component={Paper} sx={{height: loadingComponent ? '40rem' : 'auto', position: 'relative'}}>
                {loadingComponent ? 
                    <>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%'}}>
                            <CircularProgress />
                            <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
                        </Box>        
                    </>
                    :
                    <>
                        <Box>
                            <Stack direction='row' spacing={1} sx={{justifyContent: 'center', mt: 1.4}}>
                                {listPantientAppointmentChipState.map((pantientAppointmentChipStateItem, pantientAppointmentChipStateIndex) => (
                                    <Badge badgeContent={pantientAppointmentChipStateItem.chipContent} color="error" key={`chipPantientState ${pantientAppointmentChipStateIndex}`}> 
                                        <Chip label={pantientAppointmentChipStateItem.chipLabel} color={pantientAppointmentChipStateIndex === activeChip.chipOrder ? 'primary' : 'default'}
                                            onClick={() => handleSelectedChip(pantientAppointmentChipStateIndex, pantientAppointmentChipStateItem.chipLabel)} />  
                                    </Badge>
                                ))}
                            </Stack>

                            <Typography variant="h6" sx={{textAlign: 'center', fontSize: '1.15rem', fontWeight: 'bolder'}}>Danh sách {activeChip.chipLabel} trong 6 ngày tới</Typography>

                            <Box sx={{display: 'flex', justifyContent: 'center', mb: 1}}>
                                <TextField sx={{width: 500, '& .MuiInputBase-inputSizeSmall': {textAlign: 'center'}}} size="small" 
                                    variant="outlined" placeholder='Tìm với Mã BN hoặc Tên BN hoặc Số điện thoại' value={searchPatientsQuery} onChange={(e) => handleSearchPantient(e.target.value)}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        startAdornment: (
                                            <InputAdornment position='start'><SearchIcon/></InputAdornment>  
                                        ),
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                {searchPatientsQuery !== '' ? 
                                                    <CloseIcon sx={{cursor: 'pointer'}} titleAccess='Xóa'
                                                        onClick={() => [setSearchPatientsQuery(''), setListDataPatientsAppointmentSort(listDataPatientsAppointmentState)]}
                                                    /> 
                                                : 
                                                    null
                                                }
                                            </InputAdornment>  
                                        )
                                    }}>
                                </TextField>
                            </Box>
                        </Box>

                        <Table stickyHeader >
                            <TableHead>
                                <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                    <TableCell align='left' >Mã bệnh nhân</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Họ tên</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày sinh</TableCell>
                                    {/* <TableCell align="left" sx={{fontSize: '0.9rem'}}>Giới tính</TableCell> */}
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Địa chỉ</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Họ tên Cha/Mẹ</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Số điện thoại</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Kỳ khám cũ</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Kỳ khám tiếp theo</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày hẹn khám</TableCell>
                                    <TableCell align="left" sx={{fontSize: '0.9rem'}}>Nhấn</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {listDataPatientsAppointmentSort.map((dataPantientAppointmentItem, dataPantientAppointmentIndex) => (
                                    <TableRow hover role="checkbox" key={dataPantientAppointmentIndex} sx={{':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1) !important'}}}>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.patientId}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.patientFullName}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{moment(dataPantientAppointmentItem.dateOfBirth).format("DD/MM/YYYY")}</TableCell>
                                        {/* <TableCell align='left' sx={{width: 'auto', fontSize: '0.95rem'}}>{dataPantientAppointmentItem.gender === true ? 'Nam' : 'Nữ'}</TableCell> */}
                                        <TableCell align='left' sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240, fontSize: '0.9rem'}}>
                                            <Tooltip title={<Typography variant='subtitle2'>{dataPantientAppointmentItem.fullAddress}</Typography>} >
                                                <span>{dataPantientAppointmentItem.fullAddress}</span>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.fullNameFather !== '' ? dataPantientAppointmentItem.fullNameFather : dataPantientAppointmentItem.fullNameMother}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.phoneFather !== '' ? dataPantientAppointmentItem.phoneFather : dataPantientAppointmentItem.phoneMother}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.examNameOld}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto', fontSize: '0.9rem'}}>{dataPantientAppointmentItem.nextExamName}</TableCell>
                                        <TableCell align='left' sx={{width: 'auto'}}>
                                            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
                                                <DemoContainer components={['DatePicker']}> 
                                                    <Box sx={{width: 145}}>
                                                        <div style={{width: '100%'}}>
                                                            <DatePicker label="Ngày khám dự kiến" disablePast minDate={moment()}
                                                                format='DD/MM/YYYY' value={moment(dataPantientAppointmentItem.appointmentDate)}
                                                                onChange={(value) => onChangeAppointmentDate(dataPantientAppointmentItem.medicalBookId, value)}
                                                            />
                                                        </div>
                                                    </Box> 
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </TableCell>                                                                                                
                                        <TableCell align={dataPantientAppointmentItem.stateAppointment === 0 ? 'left' : 'center'} sx={{width: 'auto', fontSize: '0.9rem'}}>
                                            {dataPantientAppointmentItem.stateAppointment === 0 ?
                                                <>   
                                                    <CheckIcon titleAccess='Đồng ý hẹn khám' sx={{color: 'green', cursor: 'pointer', mr: 0.5}} onClick={() => handleAcceptReExamining(dataPantientAppointmentItem.medicalBookId)}/>
                                                    <CancelIcon titleAccess='Từ chối hẹn khám' sx={{color: 'red', cursor: 'pointer'}} onClick={() => handleRejectReExamining(dataPantientAppointmentItem.medicalBookId)}/>
                                                </>
                                                :
                                                <>
                                                    {dataPantientAppointmentItem.stateAppointment === 1 ?
                                                        <CancelIcon titleAccess='Từ chối hẹn khám' sx={{color: 'red', cursor: 'pointer'}} onClick={() => handleRejectReExamining(dataPantientAppointmentItem.medicalBookId)}/>
                                                    :
                                                        <CheckIcon titleAccess='Đồng ý hẹn khám' sx={{color: 'green', cursor: 'pointer', mr: 0.5}} onClick={() => handleAcceptReExamining(dataPantientAppointmentItem.medicalBookId)}/>
                                                    }
                                                </>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                }
            </TableContainer>

            {listDataPatientsAppointmentSort.length !== 0 && loadingComponent === false ?
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 1, width: '100%'}}>
                    <Pagination count={pageCount} page={page} onChange={handlePageChange} color="secondary" />
                </Box>
            :
                null
            }
        </Container>
    )
}

export default MainAppointmentExamining