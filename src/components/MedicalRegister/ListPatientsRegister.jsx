import React, { useState, useContext, useEffect, useRef } from 'react';
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
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
//mui icon
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
//scss
import './SCSS/Shared.scss';
//moment
import moment from 'moment';
//api
import { getRegistersByDateNow } from '../../Service/MedicalRegisterService';

function ListPatientsRegister(props) {

  const [loading, setLoading] = useState(false);

  const [activeChip, setActiveChip] = useState({chipOrder: 0, chipLabel: 'BN chờ khám'});
  const [listPantientChipState, setListPantientChipState] = useState(
    [
      { chipLabel: 'BN chờ khám', chipContent: 0 },
      { chipLabel: 'BN hẹn khám', chipContent: 0 },
      { chipLabel: 'BN đã khám', chipContent: 0 }
    ]
  )
  
  const [listDataPatientsRegister, setListDataPatientsRegister] = useState([]); 
  const [searchPatientsQuery, setSearchPatientsQuery] = useState("");

  const [listDataPatientsRegisterState, setListDataPatientsRegisterState] = useState([]);
  const [listDataPatientsRegisterSort, setListDataPatientsRegisterSort] = useState([]);

  const [selectedPantientInfo, setSelectedPantientInfo] = useState();
  const [openModalInfoPantients, setOpenModalInfoPantients] = useState(false);
  const [isContinueUpdateMedicalRegister, setIsContinueUpdateMedicalRegister] = useState();

  const renderPatientsStatus = (state) => {
    if(state === 0 || state === 3){
      return(
        <>
          <span className='dotPantientRegisterWaiting' />
        </>
      )
    }
    else if(state === 1){
      return(
        <>
          <span className='dotPantientRegisterExamining' />
        </>
      )
    }
    else{
      return(
        <>
          <span className='dotPantientRegisterDone' />
        </>
      )
    }
  }

  const handleSelectedChip = (chipIndex, chipLabel) => {
    setActiveChip({chipOrder: chipIndex, chipLabel: chipLabel});
    if(chipIndex === 0){
      const listPantientRegisterWaiting = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 0 || patientsRegisterItem.state === 1) //chờ khám và đang khám
      setListDataPatientsRegisterSort(listPantientRegisterWaiting);
      setListDataPatientsRegisterState(listPantientRegisterWaiting);
    }
    else if(chipIndex === 1){
      const listPantientRegisterExamining = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 3) //hẹn khám
      setListDataPatientsRegisterSort(listPantientRegisterExamining);
      setListDataPatientsRegisterState(listPantientRegisterExamining);
    }
    else{
      const listPantientRegisterDone = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 2) //đã khám
      setListDataPatientsRegisterSort(listPantientRegisterDone);
      setListDataPatientsRegisterState(listPantientRegisterDone);
    }
  };

  const handleSearchPantient = (value) => {
    const takenValue = value;
    setSearchPatientsQuery(takenValue);

    if(value === ''){
      setListDataPatientsRegisterSort(listDataPatientsRegisterState);
    }else{
      setListDataPatientsRegisterSort(searchPatients(listDataPatientsRegisterState, takenValue));
    }
  }

  const searchPatients = (patients, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return patients.filter(patientObj => {
      const { patientId, fullName, phoneMother, phoneFather } = patientObj.patient;
      return patientId.toLowerCase().includes(lowerCaseSearchTerm) || fullName.toLowerCase().includes(lowerCaseSearchTerm) || phoneMother.toLowerCase().includes(lowerCaseSearchTerm) || phoneFather.toLowerCase().includes(lowerCaseSearchTerm);
    });
  }

  const handleSelectedPantientInfo = (patientsRegisterSortItem) => {
    setSelectedPantientInfo(patientsRegisterSortItem);
    setIsContinueUpdateMedicalRegister(true);
    setOpenModalInfoPantients(true);
  }

  const handleGetRegistersByDateNow = async () => {
    setLoading(true);
    const response = await getRegistersByDateNow();
    if(response !== 400){
      if(response.list.length !== 0){
        setListDataPatientsRegister(response.list);
        if(activeChip.chipOrder === 0){
          const listPantientRegisterWaiting = response.list.filter(patientsRegisterItem => patientsRegisterItem.state === 0 || patientsRegisterItem.state === 1) //chờ khám và đang khám
          setListDataPatientsRegisterSort(listPantientRegisterWaiting);
          setListDataPatientsRegisterState(listPantientRegisterWaiting);
          const updatedList = listPantientChipState.map((item, index) => ({
            ...item,
            chipContent: response.listCountState[index]
          }));
          setListPantientChipState(updatedList);
        }
        else if(activeChip.chipOrder === 1){
          const listPantientRegisterExamining = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 3) //hẹn khám
          setListDataPatientsRegisterSort(listPantientRegisterExamining);
          setListDataPatientsRegisterState(listPantientRegisterExamining);
          const updatedList = listPantientChipState.map((item, index) => ({
            ...item,
            chipContent: response.listCountState[index]
          }));
          setListPantientChipState(updatedList);
        }
        else{
          const listPantientRegisterDone = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 2) //đã khám
          setListDataPatientsRegisterSort(listPantientRegisterDone);
          setListDataPatientsRegisterState(listPantientRegisterDone);
          const updatedList = listPantientChipState.map((item, index) => ({
            ...item,
            chipContent: response.listCountState[index]
          }));
          setListPantientChipState(updatedList);
        }
        props.setComponent1Loading(false);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    handleGetRegistersByDateNow();
  }, [])

  useEffect(() => {
    if(openModalInfoPantients){
      const handleKeyDown = (event) => {
        if(event.keyCode === 112){
          event.preventDefault()
          setIsContinueUpdateMedicalRegister(true);
          //nhấn F1 để sửa thông tin đăng ký khám
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [openModalInfoPantients, isContinueUpdateMedicalRegister]);

  useEffect(() => {
    if(props.completeMedicalRegister === true){
      handleGetRegistersByDateNow();
      props.setCompleteMedicalRegister(false);
    }
  }, [props.completeMedicalRegister])

  return (
    <>
      <Box sx={{p: 0}}>
        <Typography variant='h6' sx={{color: 'red', mb: 0, fontWeight: 'bolder', fontSize: '1.16rem'}}>
          {loading ? 
            <Skeleton /> 
          : 
            props.currentDoctorExamining.userIdDoctor !== '' ?
              <>
                {`Bác sĩ khám hôm nay: ${props.currentDoctorExamining.userFullName}`} <IconButton onClick={() => props.setOpenSelectedDoctorExaminingModal(true)}> <EditIcon sx={{color: '#2e7d32', fontSize: '30px'}}/></IconButton>
              </>
            :
              <>
                {`Chưa chọn bác sĩ khám hôm nay `} <IconButton onClick={() => props.setOpenSelectedDoctorExaminingModal(true)}> <EditIcon sx={{color: '#2e7d32', fontSize: '30px'}}/></IconButton>
              </>
          }
        </Typography>
          <TableContainer component={Paper} sx={{ height: '548px', borderRadius: '10px', boxShadow: 5, overflowX: 'scroll' }}>
          {loading ? 
            <>
              <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#e0e0e0', height: '100%'}}>
                <CircularProgress/>
                <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
              </Box>        
            </>
          :
            <>
              <Stack direction='row' spacing={1} sx={{justifyContent: 'center', mt: 1.4}}>
                {listPantientChipState.map((pantientChipStateItem, pantientChipStateIndex) => (
                  <Badge badgeContent={pantientChipStateItem.chipContent} color="error" key={`chipPantientState ${pantientChipStateIndex}`}> 
                    <Chip label={pantientChipStateItem.chipLabel} color={pantientChipStateIndex === activeChip.chipOrder ? 'primary' : 'default'}
                      onClick={() => handleSelectedChip(pantientChipStateIndex, pantientChipStateItem.chipLabel)} />  
                  </Badge>
                ))}
              </Stack>

              <Typography variant="h6" sx={{mt: 0.2, textAlign: 'center', fontSize: '1.12rem'}}>Danh sách {activeChip.chipLabel} ngày {moment().format("DD/MM/YYYY")}</Typography>
        
              <Box sx={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
                <TextField sx={{mt: 0.2, mb: 1, width: 360, '& .MuiInputBase-inputSizeSmall': {textAlign: 'center'}}} size="small" 
                  variant="outlined" placeholder='Tìm với Mã BN hoặc Tên BN hoặc SĐT' value={searchPatientsQuery} onChange={(e) => handleSearchPantient(e.target.value)}
                  InputProps={{ // <-- This is where the toggle button is added.
                      startAdornment: (
                        <InputAdornment position='start'><SearchIcon/></InputAdornment>  
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          {searchPatientsQuery !== '' ? 
                            <CloseIcon sx={{cursor: 'pointer'}} 
                              titleAccess='Xóa'
                              onClick={() => [setSearchPatientsQuery(''), setListDataPatientsRegisterSort(listDataPatientsRegisterState)]}
                            /> 
                          : 
                            null
                          }
                        </InputAdornment>  
                      )
                  }}>
                </TextField>
              </Box>

              <Table stickyHeader sx={{ minWidth: 1200 }}>
                <TableHead>
                  <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                    <TableCell align="left" sx={{fontSize: '0.95rem', p: '10px'}}>Trạng thái</TableCell>
                    <TableCell align='left' sx={{fontSize: '0.95rem'}}>STT</TableCell>
                    <TableCell align='left' sx={{fontSize: '0.95rem'}}>Mã bệnh nhân</TableCell>
                    <TableCell align="left" sx={{fontSize: '0.95rem'}}>Họ tên</TableCell>
                    <TableCell align="left" sx={{fontSize: '0.95rem'}}>Giới tính</TableCell>
                    <TableCell align="left" sx={{fontSize: '0.95rem'}}>Ngày sinh</TableCell>
                    <TableCell align="left" sx={{fontSize: '0.95rem'}}>Số điện thoại</TableCell>
                    <TableCell align="left" sx={{fontSize: '0.95rem'}}>Địa chỉ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listDataPatientsRegisterSort.length !== 0 ?
                    <>
                      {listDataPatientsRegisterSort.map((patientsRegisterSortItem, patientsRegisterSortIndex) => (
                        <TableRow hover role="checkbox" key={patientsRegisterSortIndex} sx={{cursor: 'pointer'}} onDoubleClick={() => handleSelectedPantientInfo(patientsRegisterSortItem)}>
                          <TableCell align='center' sx={{width: '90px'}}>{renderPatientsStatus(patientsRegisterSortItem.state)}</TableCell>
                          <TableCell align='left' sx={{width: '20px'}}>{patientsRegisterSortItem.order}</TableCell>
                          <TableCell align='left' sx={{width: '150px'}}>{patientsRegisterSortItem.patient.patientId}</TableCell>
                          <TableCell align='left' sx={{width: '200px'}}>{patientsRegisterSortItem.patient.fullName}</TableCell>
                          <TableCell align='left' sx={{width: '110px'}}>{patientsRegisterSortItem.patient.gender === true ? 'Nam' : 'Nữ'}</TableCell>
                          <TableCell align='left' sx={{width: '110px'}}>{moment(patientsRegisterSortItem.patient.dayOfBirth).format("DD/MM/YYYY")}</TableCell>
                          <TableCell align='left' sx={{width: '140px'}}>{patientsRegisterSortItem.patient.phoneMother !== '' ? patientsRegisterSortItem.patient.phoneMother : patientsRegisterSortItem.patient.phoneFather}</TableCell>
                          <TableCell align='left' sx={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120}}>
                            <Tooltip title={<Typography variant='subtitle2'>{patientsRegisterSortItem.patient.fullAddress}</Typography>} >
                              <span>{patientsRegisterSortItem.patient.fullAddress}</span>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))} 
                    </>
                    :
                      null
                  }
                </TableBody>
              </Table>
            </>
          }
          </TableContainer>
      </Box>
      

      <ManageInfoPantients 
        openModalInfoPantients={openModalInfoPantients} setOpenModalInfoPantients={setOpenModalInfoPantients}
        selectedPantientInfo={selectedPantientInfo} setSelectedPantientInfo={setSelectedPantientInfo}
        isContinueUpdateMedicalRegister={isContinueUpdateMedicalRegister} setIsContinueUpdateMedicalRegister={setIsContinueUpdateMedicalRegister}
        setCompleteMedicalRegister={props.setCompleteMedicalRegister}
      />
    </>
  )
}

export default ListPatientsRegister