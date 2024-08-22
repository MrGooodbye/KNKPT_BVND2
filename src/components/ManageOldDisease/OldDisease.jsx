import React, { useState, useContext, useEffect, useRef } from 'react';
//modal
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//mui x date picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//moment
import moment from 'moment';
//api
import { getListOldDisease, getVaccinationByPatientId } from '../../Service/MedicalService';

function OldDisease(props) {

    const dataPatientsForSearchOldDiseaseDefault = {patientId: '', phone: '', fullName: '', dayOfBirth: ''}
    const dataPatientsForSearchOldDiseaseErrorDefault = {
        patientId: { title: '', isError: false, openTooltip: false, focus: false},
        phone: { title: '', isError: false, openTooltip: false, focus: false },
        fullName: { title: '', isError: false, openTooltip: false, focus: false },
        dayOfBirth: { title: '', isError: false, openTooltip: false, focus: false },
    }
    
    const [listFoundOldDisease, setListFoundOldDisease] = useState(null);
    const [dataPatientsForSearchOldDisease, setDataPatientsForSearchOldDisease] = useState(dataPatientsForSearchOldDiseaseDefault);
    const [dataPatientsForSearchOldDiseaseError, setDataPatientsForSearchOldDiseaseError] = useState(dataPatientsForSearchOldDiseaseErrorDefault);
    const [focusField, setFocusField] = useState(null);
    const [openAlertProcessing, setOpenAlertProcessing] = useState(false);
    const [selectedRowIndex, setSelectedRowIndex] = useState(0);

    const dateFieldRef = useRef(null);
    const formRef = useRef(null);
    const tableRef = useRef(null);

    const tooltipTheme = createTheme({
        components: {
          MuiTooltip: {
            defaultProps: {
              placement: 'bottom',
              arrow: true,
              componentsProps: {
                tooltip: {
                  sx: {
                    bgcolor: '#d32f2f',
                  },
                },
                arrow: {
                  sx: {
                    color: '#d32f2f',
                  },
                },
              },
            },
          },
        },
    });

    const handleKeyDown = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab' && event.key !== 'Enter') 
        {
            event.preventDefault();
        }
        else if(event.key === 'Enter'){
            handleEnterPress(event);
        }
    }

    const handleBlur = (value, fieldName) => {
        if(value === '' || value === 'DD/MM/YYYY'){
            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
            if(fieldName === 'patientId'){
                _dataPatientsForSearchOldDiseaseError.patientId.title = '';
                _dataPatientsForSearchOldDiseaseError.patientId.openTooltip = false;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
                if(focusField === 'patientId'){
                    setFocusField(null);
                }
            }
            else if(fieldName === 'dayOfBirth'){
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.title = '';
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.openTooltip = false;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
                if(focusField === 'dayOfBirth'){
                    setFocusField(null);
                }
            }
            else if(fieldName === 'phone'){
                _dataPatientsForSearchOldDiseaseError.phone.title = '';
                _dataPatientsForSearchOldDiseaseError.phone.openTooltip = false;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
                if(focusField === 'phone'){
                    setFocusField(null);
                }
            }
        }   
    };

    const onChangePatientId = (value) => {
        if(value !== ''){
            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
            if(value.length < 8){
                _dataPatientsForSearchOldDiseaseError.patientId.title = 'Mã bệnh nhân phải từ 8 đến 12 số';
                _dataPatientsForSearchOldDiseaseError.patientId.isError = true;
                _dataPatientsForSearchOldDiseaseError.patientId.openTooltip = true;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
                setDataPatientsForSearchOldDisease((prevDataPatientsForSearchOldDisease) => {
                    prevDataPatientsForSearchOldDisease.patientId = value;
                    return {...prevDataPatientsForSearchOldDisease}
                })
            }
            else{
                if(focusField === 'patientId'){
                    setFocusField(null);
                }
                _dataPatientsForSearchOldDiseaseError.patientId.title = '';
                _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
                _dataPatientsForSearchOldDiseaseError.patientId.openTooltip = false;
                _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
                _dataPatientsForSearchOldDiseaseError.fullName.isError = false;
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = false;
                _dataPatientsForSearchOldDiseaseError.phone.isError = false;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
            }
        }
        else{
            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
            _dataPatientsForSearchOldDiseaseError.patientId.title = '';
            _dataPatientsForSearchOldDiseaseError.patientId.openTooltip = false;
            _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
            setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
        } 
    }

    const onChangeFullName = (value) => {
        if(focusField === 'fullName'){
            setFocusField(null);
        }

        setDataPatientsForSearchOldDisease((prevDataPatientsForSearchOldDisease) => {
            prevDataPatientsForSearchOldDisease.fullName = value;
            return {...prevDataPatientsForSearchOldDisease}
        })

        const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
        _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
        _dataPatientsForSearchOldDiseaseError.fullName.isError = false;
        _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = false;
        _dataPatientsForSearchOldDiseaseError.phone.isError = false;
        setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);      
    }

    const onChangeDayOfBirth = (value) => {
        if(value){            
            const date = value._d;
            const today = new Date();
            const yearsDifference = today.getFullYear() - date.getFullYear();
            const monthsDifference = today.getMonth() - date.getMonth();
            const daysDifference = today.getDate() - date.getDate();
            const age = today.getFullYear() - date.getFullYear();

            let totalMonths = yearsDifference * 12 + monthsDifference;
            let totalDays = daysDifference;

            if (daysDifference < 0) {
                totalMonths -= 1;
                totalDays += 30; // Giả sử mỗi tháng có 30 ngày
            }

            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};

            if(today < date || isNaN(age) || totalMonths > 24 || (totalMonths === 24 && totalDays > 29)){
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.title = 'Bệnh nhân lớn hơn 24 tháng tuổi không thể khám';
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.openTooltip = true;
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = true;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
              }
              else{
                const formattedDate = moment(date).format('YYYY-MM-DD');
                setDataPatientsForSearchOldDisease((prevDataPatientsForSearchOldDisease) => {
                    prevDataPatientsForSearchOldDisease.dayOfBirth = formattedDate;
                    return {...prevDataPatientsForSearchOldDisease}
                })

                _dataPatientsForSearchOldDiseaseError.dayOfBirth.title = '';
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.openTooltip = false;
                _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
                _dataPatientsForSearchOldDiseaseError.fullName.isError = false;
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = false;
                _dataPatientsForSearchOldDiseaseError.phone.isError = false;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
            }
        }
    }

    const onChangePhone = (value) => {
        if(value !== ''){
            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
            if(value.length < 10){
                _dataPatientsForSearchOldDiseaseError.phone.title = 'Số điện thoại chưa đủ 10 số';
                _dataPatientsForSearchOldDiseaseError.phone.openTooltip = true;
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);

                setDataPatientsForSearchOldDisease((prevDataPatientsForSearchOldDisease) => {
                    prevDataPatientsForSearchOldDisease.phone = value;
                    return {...prevDataPatientsForSearchOldDisease}
                })
            }
            else{
                if(focusField === 'phone'){
                    setFocusField(null);
                }
                _dataPatientsForSearchOldDiseaseError.phone.title = '';
                _dataPatientsForSearchOldDiseaseError.phone.openTooltip = false;
                _dataPatientsForSearchOldDiseaseError.phone.isError = false;
                _dataPatientsForSearchOldDiseaseError.patientId.isError = false;
                _dataPatientsForSearchOldDiseaseError.fullName.isError = false;
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = false;                
                setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
            }
        }
        else{
            const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
            _dataPatientsForSearchOldDiseaseError.phone.title = '';
            _dataPatientsForSearchOldDiseaseError.phone.openTooltip = false;
            _dataPatientsForSearchOldDiseaseError.phone.isError = false;
            setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
        }
    }

    const handleCloseModalOldDisease = (event, reason) => {
        if(reason && reason === "backdropClick"){
            return;
        }
          else{
            setDataPatientsForSearchOldDisease(dataPatientsForSearchOldDiseaseDefault);
            setDataPatientsForSearchOldDiseaseError(dataPatientsForSearchOldDiseaseErrorDefault);
            setListFoundOldDisease(null);
            setSelectedRowIndex(0);
            props.setOpenModalOldDisease(false);
        }
    }

    const handleResetField = () => {
        formRef.current.reset();
        const inputs = formRef.current.querySelectorAll('input, textarea');
        inputs.forEach(input => input.dispatchEvent(new Event('input', { bubbles: true })));
        setFocusField(null);
    }

    const validate = () => {
        const _dataPatientsForSearchOldDiseaseError = {...dataPatientsForSearchOldDiseaseError};
        let isValid = true;

        if(dataPatientsForSearchOldDisease.patientId === '' && dataPatientsForSearchOldDisease.fullName === '' && 
            dataPatientsForSearchOldDisease.dayOfBirth === '' && dataPatientsForSearchOldDisease.phone === '')
        {
            _dataPatientsForSearchOldDiseaseError.patientId.isError = true;
            _dataPatientsForSearchOldDiseaseError.fullName.isError = true;
            _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = true;
            _dataPatientsForSearchOldDiseaseError.phone.isError = true;
            isValid = false;
        }

        if(dataPatientsForSearchOldDiseaseError.patientId.title !== ''){
            if(Object.values(dataPatientsForSearchOldDiseaseError).every(item => item.focus === false)){
                _dataPatientsForSearchOldDiseaseError.patientId.isError = true;
                _dataPatientsForSearchOldDiseaseError.patientId.focus = true;
                setFocusField('patientId');
            }
            isValid = false;
        }

        if(dataPatientsForSearchOldDiseaseError.dayOfBirth.title !== ''){
            if(Object.values(dataPatientsForSearchOldDiseaseError).every(item => item.focus === false)){
                _dataPatientsForSearchOldDiseaseError.dayOfBirth.isError = true;
                if (dateFieldRef.current) {
                    dateFieldRef.current.focus(); // Đặt focus vào dateField khi có lỗi
                }
            }
            isValid = false;
        }

        if(dataPatientsForSearchOldDiseaseError.phone.title !== ''){
            if(Object.values(dataPatientsForSearchOldDiseaseError).every(item => item.focus === false)){
                _dataPatientsForSearchOldDiseaseError.phone.isError = true;
                _dataPatientsForSearchOldDiseaseError.phone.focus = true;
                setFocusField('phone');
            }
            isValid = false;
        }
        setDataPatientsForSearchOldDiseaseError(_dataPatientsForSearchOldDiseaseError);
        return isValid;
    }

    const handleFindOldDisease = async () => {
        if(validate()){
            setOpenAlertProcessing(true);
            const response = await getListOldDisease(dataPatientsForSearchOldDisease.patientId, dataPatientsForSearchOldDisease.phone, dataPatientsForSearchOldDisease.fullName, dataPatientsForSearchOldDisease.dayOfBirth, '');
            setOpenAlertProcessing(false);
            setListFoundOldDisease(response);
            setDataPatientsForSearchOldDisease(dataPatientsForSearchOldDiseaseDefault);
            setDataPatientsForSearchOldDiseaseError(dataPatientsForSearchOldDiseaseErrorDefault);
            handleResetField();
            if(response.length > 0){
                tableRef.current.focus();
            }
        }
    }

    const handleEnterPress = (e) => {
        if (e.which === 13 && e.code === "Enter") {
            handleFindOldDisease();
        }
    }

    const handleTableKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            setSelectedRowIndex((prevIndex) => (Math.min(prevIndex + 1, listFoundOldDisease.length - 1)));
        } else if (event.key === 'ArrowUp') {
            setSelectedRowIndex((prevIndex) => (Math.max(prevIndex - 1, 0)));
        } else if (event.key === 'Enter' && selectedRowIndex !== null){
            handleApplyDataPatientOldDisease(listFoundOldDisease[selectedRowIndex])
        }
    };

    const handleApplyDataPatientOldDisease = async (foundOldDiseaseItem) => {
        setOpenAlertProcessing(true);
        const responseVaccinationByPatientId = await getVaccinationByPatientId(foundOldDiseaseItem.patientId);
        const dataPantientOldOldDiseaseRegister = {
            examinationId: '',
            oldDisease: true,
            height: '',
            weight: '',
            headCircumference: '',
            reason: '',
            vaccination: responseVaccinationByPatientId.vaccination,
            medicalTypeId: responseVaccinationByPatientId.medicalTypeId,
            userIdDoctor: '',
            patient: {
                patientId: foundOldDiseaseItem.patientId,
                identifier: foundOldDiseaseItem.identifier,
                address: foundOldDiseaseItem.address,
                fullName: foundOldDiseaseItem.fullName,
                dayOfBirth: foundOldDiseaseItem.dayOfBirth,
                codeWard: foundOldDiseaseItem.codeWard,
                gender: foundOldDiseaseItem.gender,
                fullNameMother: foundOldDiseaseItem.fullNameMother,
                phoneMother: foundOldDiseaseItem.phoneMother,
                fullNameFather: foundOldDiseaseItem.fullNameFather,
                phoneFather: foundOldDiseaseItem.phoneFather
            }
        }
        props.setDataPatientsRegister(dataPantientOldOldDiseaseRegister);
        setOpenAlertProcessing(false);
        handleCloseModalOldDisease();
    }

    return (
        <>
            <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalOldDisease} onClose={(event, reason) => handleCloseModalOldDisease(event, reason)} disableEscapeKeyDown={true} sx={{'.MuiDialog-paperWidthMd': {maxWidth: '970px'}}}>
                <DialogTitle sx={{ m: 0, p: 1.4, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Tìm bệnh cũ</DialogTitle>
                <IconButton onClick={() => handleCloseModalOldDisease()}sx={{position: 'absolute', right: 5, top: 7}}>
                    <CloseIcon fontSize='medium'/>
                </IconButton>
                <DialogContent dividers sx={{p: '10px 24px'}}>
                    <Box sx={{display: 'flex', justifyContent: 'space-around'}} component="form" ref={formRef}>
                        <ThemeProvider theme={tooltipTheme}>
                            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsForSearchOldDiseaseError.patientId.title}</h6>} open={dataPatientsForSearchOldDiseaseError.patientId.openTooltip}>
                                <TextField 
                                    sx={{'&.MuiTextField-root' : {marginTop: '7.5px'}}} 
                                    error={true ? dataPatientsForSearchOldDiseaseError.patientId.isError === true : false}
                                    label="Mã BN" variant="outlined" size='small'
                                    autoFocus
                                    inputRef={(input) => input && focusField === 'patientId' && input.focus()}
                                    inputProps={{ maxLength: 12 }}
                                    onChange={(e) => onChangePatientId(e.target.value)}
                                    onBlur={(e) => handleBlur(e.target.value, 'patientId')}
                                    onKeyDown={handleKeyDown} 
                                />
                            </Tooltip>
                        </ThemeProvider>

                        <ThemeProvider theme={tooltipTheme}>
                            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsForSearchOldDiseaseError.fullName.title}</h6>} open={dataPatientsForSearchOldDiseaseError.fullName.openTooltip}>
                                <TextField 
                                    sx={{'&.MuiTextField-root' : {marginTop: '7.5px'}}} 
                                    inputRef={(input) => input && focusField === 'fullName' && input.focus()}
                                    error={true ? dataPatientsForSearchOldDiseaseError.fullName.isError === true : false}
                                    label="Họ tên" variant="outlined" size='small'
                                    onChange={(e) => onChangeFullName(e.target.value)}
                                    onKeyDown={(e) => handleEnterPress(e)} 
                                />
                            </Tooltip>
                        </ThemeProvider>

                        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
                            <ThemeProvider theme={tooltipTheme}>
                                <DemoContainer components={['DatePicker']}>
                                    <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsForSearchOldDiseaseError.dayOfBirth.title}</h6>} open={dataPatientsForSearchOldDiseaseError.dayOfBirth.openTooltip}>    
                                        <Box sx={{width: 222}}>
                                            <DatePicker label="Ngày sinh" format='DD/MM/YYYY' 
                                                disableFuture={true} disableOpenPicker 
                                                renderInput={(params) => <TextField {...params} size='small' />}
                                                slotProps={{  
                                                    textField: 
                                                    { 
                                                        inputRef: dateFieldRef,
                                                        error: true ? dataPatientsForSearchOldDiseaseError.dayOfBirth.isError === true : false, 
                                                        size: 'small', 
                                                        onBlur: (e) => handleBlur(e.target.value, 'dayOfBirth'),
                                                        onKeyDown: (e) => handleEnterPress(e)
                                                    }, 
                                                }}
                                                onChange={(value) => onChangeDayOfBirth(value)}
                                            />
                                        </Box>
                                    </Tooltip>
                                </DemoContainer>
                            </ThemeProvider>      
                        </LocalizationProvider>

                        <ThemeProvider theme={tooltipTheme}>
                            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsForSearchOldDiseaseError.phone.title}</h6>} open={dataPatientsForSearchOldDiseaseError.phone.openTooltip}>
                                <TextField 
                                    sx={{'&.MuiTextField-root' : {marginTop: '7.5px'}}}
                                    inputRef={(input) => input && focusField === 'phone' && input.focus()}
                                    error={true ? dataPatientsForSearchOldDiseaseError.phone.isError === true : false}
                                    label="Điện thoại cha/mẹ" variant="outlined" size='small'
                                    inputProps={{ maxLength: 10 }}
                                    onChange={(e) => onChangePhone(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onBlur={(e) => handleBlur(e.target.value, 'phone')}
                                />
                            </Tooltip>
                        </ThemeProvider>

                    </Box>

                    <Box sx={{display: 'flex', justifyContent: 'center', mt: 1.6}}>
                        <Button variant="contained" color="primary" onClick={() => handleFindOldDisease()}>Tìm (Enter)</Button>
                    </Box>

                    <Box>
                        {
                            listFoundOldDisease ? 
                                listFoundOldDisease.length !== 0 ? 
                                <>
                                    <TableContainer component={Paper} sx={{boxShadow: 4, mt: 1.4}} tabIndex={0} onKeyDown={(event) => handleTableKeyDown(event)} ref={tableRef}>
                                        <Table stickyHeader>
                                            <TableHead>
                                                <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                                    <TableCell align='left' sx={{fontSize: '1rem'}}>Mã BN</TableCell>
                                                    <TableCell align="left" sx={{fontSize: '1rem'}}>Họ tên</TableCell>
                                                    <TableCell align="left" sx={{fontSize: '1rem'}}>Ngày sinh</TableCell>
                                                    <TableCell align="left" sx={{fontSize: '1rem'}}>Giới tính</TableCell>
                                                    <TableCell align="left" sx={{fontSize: '1rem'}}>Địa chỉ</TableCell>
                                                    <TableCell align="left" sx={{fontSize: '1rem'}}>Cha/Mẹ</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {listFoundOldDisease ? 
                                                    listFoundOldDisease.map((foundOldDiseaseItem, foundOldDiseaseIndex) => (
                                                        <TableRow hover role="checkbox" key={foundOldDiseaseIndex} sx={{cursor: 'pointer'}} 
                                                            selected={selectedRowIndex === foundOldDiseaseIndex} 
                                                            onDoubleClick={() => handleApplyDataPatientOldDisease(foundOldDiseaseItem)}
                                                        >
                                                            <TableCell align='left' >{foundOldDiseaseItem.patientId}</TableCell>
                                                            <TableCell align='left' >{foundOldDiseaseItem.fullName}</TableCell>
                                                            <TableCell align='left' >{moment(foundOldDiseaseItem.dayOfBirth).format('DD/MM/YYYY')}</TableCell>
                                                            <TableCell align='left' >{foundOldDiseaseItem.gender === true ? 'Nam' : 'Nữ'}</TableCell>
                                                            <TableCell align='left' >{foundOldDiseaseItem.fullAddress}</TableCell>
                                                            <TableCell align='left' >{foundOldDiseaseItem.fullNameMother || foundOldDiseaseItem.fullNameFather}</TableCell>
                                                        </TableRow>
                                                    ))
                                                :
                                                    null
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Typography variant='subtitle1' sx={{textAlign: 'center', mt: 1.5, fontWeight: 'bolder', color: 'green'}}>Tìm thấy {listFoundOldDisease.length} bệnh nhân</Typography>
                                </>
                                : 
                                    <Typography variant='subtitle1' sx={{textAlign: 'center', mt: 1.5, fontWeight: 'bolder', color: 'red'}}>Không tìm thấy bệnh nhân</Typography>
                            :
                            null
                        }
                    </Box>  
                </DialogContent>
            </Dialog>

            <AlertProcessing
                openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing}            
            />
        </>
    )
}

export default OldDisease