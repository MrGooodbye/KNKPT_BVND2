import React, { useState, useContext, useEffect, useRef } from 'react';
//context
import { UserContext } from '../../context/UserContext';
//lodash
import _, { constant } from "lodash";
//modal
import CompleteExamining from '../ManageCompleteExamining/CompleteExamining';
import AlertProcessingBackdrop from '../ManageAlertProcessingBackdrop/AlertProcessingBackdrop';
//components
import PreviewLastExamining from './PreviewLastExamining';
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
import { Button, IconButton, TextField } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import TextareaAutosize from 'react-textarea-autosize';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
//mui icon
import SearchIcon from '@mui/icons-material/Search';
import PinIcon from '@mui/icons-material/Pin';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import Home from '@mui/icons-material/Home';
import { GiBodyHeight } from "react-icons/gi";
import { GiWeightScale } from "react-icons/gi";
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { TbRulerMeasure } from "react-icons/tb";
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import VaccinesIcon from '@mui/icons-material/Vaccines';
//moment
import moment from 'moment';
//scss
import './SCSS/DoctorExamining.scss';
//api
import { 
    createAddPredecessor,
    getMedicalDetailPatient,
    getRegistersByDateNow, getMedicalBook, getUpdatePredecessor, getUpdateMedicalBook,
    updateMedicalState
} from '../../Service/MedicalService';
import { toast } from 'react-toastify';

function MainDoctorExamining() {
    const dataPantientsReadyExaminingDefault = {
        stt: '',
        id: '',
        patientsId: '',
        patientsName: '',
        patientsDOB: '',
        patientsMonthsOld: '',
        patientsGender: '',
        patientsHeight: '',
        patientsWeight: '',
        patientsHeadCircumference: '',
        patientsPhone: '',
        patientsAddress: ''
    }

    const { user, loading } = useContext(UserContext);

    //state thông tin bệnh nhân ban đầu 
    const [dataPantientsReadyExamining, setDataPantientsReadyExamining] = useState(dataPantientsReadyExaminingDefault);

    //state các category gồm tiêu đề nội dung khám và câu hỏi khám ban đầu
    const [mainDataExamining, setMainDataExamining] = useState([]);

    //state lưu tạm data các kỳ khám 
    const [prevDataExamining, setPrevDataExamining] = useState();

    //state đóng mở cây thư mục khám của sổ khám bệnh
    const [openCollapseHealthRecords, setOpenCollapseHealthRecords] = useState(false);

    //state đóng mở chi tiết nội dung của sổ khám bệnh
    const [openCollapseHealthRecordsItem, setOpenCollapseHealthRecordsItem] = useState([]);

    //state chọn danh mục khám ban đầu
    const [categorySelectedExamining, setCategorySelectedExamining] = useState({});

    //state chọn danh mục bao gồm nội dung bên trong ban đầu
    const [contentCategorySelectedExamining, setContentCategorySelectedExamining] = useState([]);

    //state lưu tạm nội dung chi tiết của sổ khám bệnh
    const [healthRecordsContents, setHealthRecordsContents] = useState([]);
    const [currentHealthRecordExamining, setCurrentHealthRecordExamining] = useState();

    //state vị trí nội dung hiện tại
    const [currentContentExamining, setCurrentContentExamining] = useState(1);

    //state các câu hỏi được bác sĩ khám tích hoặc gõ vào
    const [dataExaminingForConclusion , setDataExaminingForConclusion ] = useState({});

    //state lưu tạm các data tiền căn của getUpdatePredecessor (bao gồm những data tiền căn đã chọn và chưa chọn)
    const [oldDataPredecessor, setOldDataPredecessor] = useState();

    //dùng khi tái khám hoặc mở khám lại cho bệnh nhân có tiền căn đã đụng
    const [newDataPredecessor, setNewDataPredecessor] = useState();

    //state lưu data tiền căn cũ (những data tiền căn đã chọn)  
    const [prevDataPredecessor, setPrevDataPredecessor] = useState();

    //state lưu các data đã chọn của mục khám trong sổ khám bệnh
    const [prevDataHealthRecords, setPrevDataHealthRecords] = useState();

    //state quản lý modal kết thúc khám
    const [openModalCompleteExamining, setOpenModalCompleteExamining] = useState(false);

    const [loadingPrevDataExamining, setLoadingPrevDataExamining] = useState(false);
    const [loadingPatient, setLoadingPatient] = useState(true);
    const [loadingInfoPatient, setLoadingInfoPatient] = useState(true);
    const [loadingCategoryExamining, setLoadingCategoryExamining] = useState(false);
    const [loadingContentsExamining, setLoadingContentsExamining] = useState(false);

    const [listDataPatientsRegister, setListDataPatientsRegister] = useState([]); 
    const [searchPatientsQuery, setSearchPatientsQuery] = useState("");
  
    const [listDataPatientsRegisterState, setListDataPatientsRegisterState] = useState([]);
    const [listDataPatientsRegisterSort, setListDataPatientsRegisterSort] = useState([]);

    const [activeChip, setActiveChip] = useState({chipOrder: 0, chipLabel: 'BN chờ khám'});
    const [listPantientChipState, setListPantientChipState] = useState(
        [
            { chipLabel: 'BN chờ khám', chipContent: 0 },
            { chipLabel: 'BN đã khám', chipContent: 0 }
        ]
    )

    const [openAlertProcessingBackdrop, setOpenAlertProcessingBackdrop] = useState(false);

    const handleSelectedChip = (chipIndex, chipLabel) => {
        setActiveChip({chipOrder: chipIndex, chipLabel: chipLabel});
        if(chipIndex === 0){
          const listPantientRegisterWaiting = listDataPatientsRegister.filter(patientsRegisterItem => patientsRegisterItem.state === 0 || patientsRegisterItem.state === 1 || patientsRegisterItem.state === 3) //chờ khám và đang khám
          setListDataPatientsRegisterSort(listPantientRegisterWaiting);
          setListDataPatientsRegisterState(listPantientRegisterWaiting);
        }
        else if(chipIndex === 1){
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

    const handleCompleteExaminingForPantient = () => {
        toast.success(`Đã kết thúc khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}`, {toastId: 'success1'});
        setDataPantientsReadyExamining(dataPantientsReadyExaminingDefault);
        setMainDataExamining([]);
        setOpenCollapseHealthRecords(false);
        setOpenCollapseHealthRecordsItem([]);
        setCategorySelectedExamining({});
        setContentCategorySelectedExamining([]);
        setHealthRecordsContents([]);
        setCurrentHealthRecordExamining();
        setCurrentContentExamining(1);
        setDataExaminingForConclusion({});
        setPrevDataPredecessor();
        setCurrentHealthRecordExamining();
        setOldDataPredecessor();
        handleGetRegistersByDateNow();
    }

    const handleCancelExamining = async () => {
        setLoadingPatient(true);
        setLoadingInfoPatient(true);
        setLoadingCategoryExamining(true);
        setLoadingContentsExamining(true);
        const response = await updateMedicalState(dataPantientsReadyExamining.id, [dataPantientsReadyExamining.editExamining === true ? 2 : 0 || dataPantientsReadyExamining.backRegister === true ? 3 : 0]);
        if(response.status === 200){
            toast.success(`Đã hủy khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}`, {toastId: 'success2'});    
            setDataPantientsReadyExamining(dataPantientsReadyExaminingDefault);
            setMainDataExamining([]);
            setOpenCollapseHealthRecords(false);
            setOpenCollapseHealthRecordsItem([]);
            setCategorySelectedExamining({});
            setContentCategorySelectedExamining([]);
            setHealthRecordsContents([]);
            setCurrentHealthRecordExamining();
            setCurrentContentExamining(1);
            setDataExaminingForConclusion({});
            setPrevDataPredecessor();
            setCurrentHealthRecordExamining();
            setOldDataPredecessor()
            handleGetRegistersByDateNow();
        }
        else if(response.status === 400){
            toast.error('Bạn không phải bác sĩ khám hôm nay, không thể dùng chức năng này', {toastId: 'error1'});
        }
        setLoadingCategoryExamining(false);
        setLoadingContentsExamining(false);
    }

    //hàm này dùng khi user đang khám mà bị ngáo lỡ nhấn f5
    const handleReloadUIWhenExamining = async () => {
        setOpenAlertProcessingBackdrop(true);
        const reDataPantientsReadyExamining = JSON.parse(sessionStorage.dataPantientsReadyExamining);
        const reMainDataExamining = JSON.parse(sessionStorage.mainDataExamining);
        const reDataExaminingForConclusion = JSON.parse(sessionStorage.dataExaminingForConclusion);
        
        setDataPantientsReadyExamining(_.cloneDeep(reDataPantientsReadyExamining));
        setMainDataExamining(_.cloneDeep(reMainDataExamining));
        setDataExaminingForConclusion(_.cloneDeep(reDataExaminingForConclusion));

        if(sessionStorage.currentHealthRecordExamining){
            const reCurrentHealthRecordExamining = JSON.parse(sessionStorage.currentHealthRecordExamining);
            setCurrentHealthRecordExamining(_.cloneDeep(reCurrentHealthRecordExamining));
        }

        if(sessionStorage.prevDataPredecessor){
            const rePrevDataPredecessor = JSON.parse(sessionStorage.prevDataPredecessor);
            setPrevDataPredecessor(_.cloneDeep(rePrevDataPredecessor));
        }

        if(sessionStorage.oldDataPredecessor){
            const reOldDataPredecessor = JSON.parse(sessionStorage.oldDataPredecessor);
            setOldDataPredecessor(_.cloneDeep(reOldDataPredecessor));
        }
        
        setNewDataPredecessor({
            patientId: dataPantientsReadyExamining.patientsId,
            categoryPres: []
        })
        
        sessionStorage.clear();
        setOpenAlertProcessingBackdrop(false);
    }

    //lấy danh sách đăng ký khám trong ngày
    const handleGetRegistersByDateNow = async () => {
        const response = await getRegistersByDateNow();
        if(response !== 400){
            if(response.list.length !== 0){
                setListDataPatientsRegister(response.list);
                if(activeChip.chipOrder === 0 || dataPantientsReadyExamining.editExamining === true){
                    const listPantientRegisterWaiting = response.list.filter(patientsRegisterItem => patientsRegisterItem.state === 0 || patientsRegisterItem.state === 1 || patientsRegisterItem.state === 3) //chờ khám và đang khám
                    setListDataPatientsRegisterSort(listPantientRegisterWaiting);
                    setListDataPatientsRegisterState(listPantientRegisterWaiting);
                    const updatedList = listPantientChipState.map((item, index) => ({
                        ...item,
                        chipContent: response.listCountState[index]
                    }));
                    setListPantientChipState(updatedList);
                    if(sessionStorage.dataPantientsReadyExamining){
                        handleReloadUIWhenExamining();
                    }
                }
                else if(activeChip.chipOrder === 1){
                    const listPantientRegisterDone = response.list.filter(patientsRegisterItem => patientsRegisterItem.state === 2) //đã khám
                    setListDataPatientsRegisterSort(listPantientRegisterDone);
                    setListDataPatientsRegisterState(listPantientRegisterDone);
                    const updatedList = listPantientChipState.map((item, index) => ({
                        ...item,
                        chipContent: response.listCountState[index]
                    }));
                    setListPantientChipState(updatedList);
                }
            }
        }
        setLoadingPatient(false);
        setLoadingInfoPatient(false);
    }

    const handleAppyPantientData = async (dataPantientItem) => {
        setOpenAlertProcessingBackdrop(true);
        setLoadingInfoPatient(true);
        setLoadingPrevDataExamining(true);
        await handleGetMedicalDetailPatient(dataPantientItem.id);
        const _dataPantientsReadyExamining = {...dataPantientsReadyExamining};
        _dataPantientsReadyExamining.stt = dataPantientItem.order;
        _dataPantientsReadyExamining.id = dataPantientItem.id;
        _dataPantientsReadyExamining.status = 0;
        _dataPantientsReadyExamining.patientsId = dataPantientItem.patient.patientId;
        _dataPantientsReadyExamining.patientsName = dataPantientItem.patient.fullName;
        _dataPantientsReadyExamining.patientsDOB = dataPantientItem.patient.dayOfBirth;
        _dataPantientsReadyExamining.patientsMonthsOld = dataPantientItem.patient.monthsOfAge;
        _dataPantientsReadyExamining.patientsGender = dataPantientItem.patient.gender;
        _dataPantientsReadyExamining.patientsHeight = dataPantientItem.height;
        _dataPantientsReadyExamining.patientsWeight = dataPantientItem.weight;
        _dataPantientsReadyExamining.patientsHeadCircumference = dataPantientItem.headCircumference;
        _dataPantientsReadyExamining.patientsHeadCircumference = dataPantientItem.headCircumference;
        _dataPantientsReadyExamining.patientsPhone = dataPantientItem.patient.phoneMother ? dataPantientItem.patient.phoneMother : dataPantientItem.patient.phoneFather;
        _dataPantientsReadyExamining.patientsAddress = dataPantientItem.patient.fullAddress;
        _dataPantientsReadyExamining.vaccination = dataPantientItem.vaccination === true ? true : false;
        _dataPantientsReadyExamining.editExamining = dataPantientItem.state === 2 ? true : false;
        _dataPantientsReadyExamining.backRegister = dataPantientItem.state === 3 ? true : false;
        setDataPantientsReadyExamining(_dataPantientsReadyExamining);
        setLoadingInfoPatient(false);
        setLoadingPrevDataExamining(false);
        setOpenAlertProcessingBackdrop(false);
    }

    //nhấn chọn bệnh nhân để load vào ô thông tin bn
    const handleSelectPantientExamining = async (dataPantientItem) => {
        if(dataPantientItem.state === 0 || dataPantientItem.state === 3 && dataPantientsReadyExamining.patientsName !== dataPantientItem.patient.fullName){
            if(dataPantientsReadyExamining.patientsId === '' || dataPantientsReadyExamining.patientsId !== '' && dataPantientsReadyExamining.status === 0){
                await handleAppyPantientData(dataPantientItem);
            }
            else{
                alert(`Bạn đang trong quá trình khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}, vui lòng kết thúc đợt khám để bắt đầu đợt khám mới!`);
            }
        }
        
        else if(dataPantientItem.state === 2 && dataPantientsReadyExamining.patientsName !== dataPantientItem.patient.fullName){
            if(dataPantientsReadyExamining.patientsId !== '' && dataPantientsReadyExamining.status === 1){
                alert(`Bạn đang trong quá trình khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}, vui lòng kết thúc đợt khám để bắt đầu đợt khám mới!`);
            }
            else{
                await handleAppyPantientData(dataPantientItem);
            }
        }
    }

    //bắt đầu khám bệnh cho bệnh nhân
    const handleBeginExaminingForPantient = async () => {
        setLoadingPatient(true);
        const response = await updateMedicalState(dataPantientsReadyExamining.id, 1)
        if(response.status === 200){
            const _dataPantientsReadyExamining = {...dataPantientsReadyExamining};
            _dataPantientsReadyExamining.status = 1;
            setDataPantientsReadyExamining(_dataPantientsReadyExamining);
            if(prevDataExamining.healthRecords.some(healthRecordsItem => healthRecordsItem.medicalBookId === null)){

                if(dataPantientsReadyExamining.backRegister){
                    setPrevDataPredecessor(_.cloneDeep(prevDataExamining.categoryPres));
                    //backup prevDataPredecessor để khi cần dùng
                    setOldDataPredecessor(_.cloneDeep(prevDataExamining.categoryPres))
                }

                await handleGetRegistersByDateNow();
                await handleSetMainDataExamining();
                toast.success(`Đang khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}`, {toastId: 'success1'});
            }
            else{
                await handleGetCategoryReExamining();
                await handleGetRegistersByDateNow();
            }
        }
        else if(response.status === 400){
            toast.error('Bạn không phải bác sĩ khám hôm nay, không thể dùng chức năng này', {toastId: 'error1'});
        }
        setLoadingPatient(false);
    }

    //chỉnh dữ liệu khám cho bệnh nhân khám mới
    const handleSetMainDataExamining = async () => {
        setLoadingCategoryExamining(true);
        prevDataExamining.healthRecords.forEach((healthRecordsItem) => {
            if(healthRecordsItem.medicalBookId === null){
                healthRecordsItem.state = 1
            }
        })
        
        //tái khám và có tiền căn đã đụng
        if(dataPantientsReadyExamining.backRegister === true && prevDataExamining.newPredecessor === false){

            const responseGetUpdatePredecessor = await getUpdatePredecessor(dataPantientsReadyExamining.patientsId);

            const editPrevDataExaminingCategoryPres = responseGetUpdatePredecessor.data.map(responseGetUpdatePredecessorItem => {
                const matchingPrevDataExamining = prevDataExamining.categoryPres.find(prevDataExaminingCategoryPresItem => prevDataExaminingCategoryPresItem.categoryOrder === responseGetUpdatePredecessorItem.categoryOrder);

                return {
                    ...responseGetUpdatePredecessorItem,
                    isLock: true,
                    categoryContents: responseGetUpdatePredecessorItem.categoryContents.filter(content2 => {
                        return matchingPrevDataExamining && matchingPrevDataExamining.categoryContents.some(content1 => content1.categoryContentOrder === content2.categoryContentOrder);
                    }).map(content2 => {
                        const matchingContent1 = matchingPrevDataExamining.categoryContents.find(content1 => content1.categoryContentOrder === content2.categoryContentOrder);
                        return {
                            ...content2,
                            isNullCategoryPres: matchingContent1 ? false : true,
                            isLock: true,
                            categoryContentQuestions: matchingContent1 ? matchingContent1.categoryContentQuestions : []
                        };
                    }),
                };
            })

            prevDataExamining.categoryPres = editPrevDataExaminingCategoryPres

            setNewDataPredecessor({
                patientId: dataPantientsReadyExamining.patientsId,
                categoryPres: []
            })

            const responseGetUpdateMedicalBook = await getMedicalBook(0);

            prevDataExamining.healthRecords[0].categories = responseGetUpdateMedicalBook.medicakBook.categories

            const updateHealthRecordsCategoriesForConclusion = prevDataExamining.healthRecords[0].categories.map(category => ({
                categoryName: category.categoryName,
                isHealthRecord: true,
                categoryContents: category.categoryContents.map(content => ({
                  ...content,
                  categoryContentQuestions: []
                })) 
            }))
    
            //demo truớc data kết luận
            const demoDataExaminingForConclusion = {
                patientId: dataPantientsReadyExamining.patientsId,
                isVaccination: prevDataExamining.vaccination,
                medicalRegisterId: prevDataExamining.healthRecords[0].medicalRegisterId,
                conclusion: prevDataExamining.healthRecords[0].conclusion,
                categories: updateHealthRecordsCategoriesForConclusion
            }
    
            setHealthRecordsContents({
                healthRecordsName: prevDataExamining.healthRecords[0].examinationName,
                categoryPatients: prevDataExamining.healthRecords[0].categories
            })
    
            setCurrentHealthRecordExamining({
                healthRecordsName: prevDataExamining.healthRecords[0].examinationName,
                categoryPatients: prevDataExamining.healthRecords[0].categories
            })

            setMainDataExamining(prevDataExamining);
            setDataExaminingForConclusion(demoDataExaminingForConclusion);
            //console.log(prevDataExamining);
            setPrevDataExamining();

        }

        //khám mới hoàn toàn hoặc tái khám có tiền căn chưa đụng
        else{
            const editDataCategoryPresForConclusion = prevDataExamining.categoryPres.map((predecessorItem) => {
                const mainCategoryContentsExamining = predecessorItem.categoryContents.map((categoryContentsItem) => {
                    const categoryContents = {
                        categoryContentTitle: categoryContentsItem.categoryContentTitle,
                        categoryContentName: categoryContentsItem.categoryContentName,
                        categoryContentCheck: categoryContentsItem.categoryContentCheck,
                        categoryContentText: categoryContentsItem.categoryContentText,
                        categoryContentOrder: categoryContentsItem.categoryContentOrder,
                        categoryContentQuestions: []
                    }
                    return categoryContents
                })
    
                const mainCategoryExamining = {
                    categoryName: predecessorItem.categoryName,
                    isPredecessor: true,
                    categoryOrder: predecessorItem.categoryOrder,
                    categoryContents: mainCategoryContentsExamining
                }
    
                return mainCategoryExamining
            })
    
            const editDataHealthRecordsForConclusion = prevDataExamining.healthRecords.find((healthRecordsItem) => healthRecordsItem.patientId === dataPantientsReadyExamining.patientsId)
    
            setDataExaminingForConclusion({
                patientId: dataPantientsReadyExamining.patientsId,
                isVaccination: prevDataExamining.vaccination,
                medicalRegisterId: editDataHealthRecordsForConclusion.medicalRegisterId,
                conclusion: editDataHealthRecordsForConclusion.conclusion,
                categories: editDataCategoryPresForConclusion,
            });
    
            prevDataExamining.categoryPres.forEach((categoryPresItem, categoryPresIndex) => {
                categoryPresItem.categoryContents = categoryPresItem.categoryContents.map((categoryContentsItem) => {
                    return {
                        ...categoryContentsItem,
                        categoryPresOrder: categoryPresIndex
                    }
                })
                return {
                    ...categoryPresItem,
                }
            })
    
            setMainDataExamining(prevDataExamining);
            setPrevDataExamining();
        }
        setLoadingCategoryExamining(false);
    }

    //bắt đầu sửa dữ liệu khám bệnh
    const handleBeginEditExaminingForPantient = async () => {
        setLoadingPatient(true);
        const response = await updateMedicalState(dataPantientsReadyExamining.id, 1)
        if(response.status === 200){
            const _dataPantientsReadyExamining = {...dataPantientsReadyExamining};
            _dataPantientsReadyExamining.status = 1;
            setDataPantientsReadyExamining(_dataPantientsReadyExamining);
            await handleGetCategoryReExamining();
            await handleGetRegistersByDateNow();
            setActiveChip({chipOrder: 0, chipLabel: 'BN chờ khám'});
        }
    }

    //lấy dữ liệu cây thư mục khám lại
    const handleGetCategoryReExamining = async () => {
        setLoadingCategoryExamining(true);
        const responseGetUpdateMedicalBook = await getUpdateMedicalBook(prevDataExamining.healthRecords[0].medicalBookId);

        if(responseGetUpdateMedicalBook.status === 200){
            const _dataPantientsReadyExamining = {...dataPantientsReadyExamining};
            _dataPantientsReadyExamining.status = 1;
            setDataPantientsReadyExamining(_dataPantientsReadyExamining);

            if(prevDataExamining.newPredecessor === false){
                setPrevDataPredecessor(_.cloneDeep(prevDataExamining.categoryPres));
                //backup prevDataPredecessor để khi cần dùng
                setOldDataPredecessor(_.cloneDeep(prevDataExamining.categoryPres))
            }
            
            await handleSetMainDataReExamining(responseGetUpdateMedicalBook.data);
            toast.success(`Đang khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}`, {toastId: 'success1'});
        }
        else if(responseGetUpdateMedicalBook.status === 400){
            toast.error('Bạn không phải bác sĩ khám hôm nay, không thể dùng chức năng này', {toastId: 'error1'});
        }
        setLoadingCategoryExamining(false);
    }

    //chỉnh dữ liệu cây thư mục khám của chức năng mở khám lại
    const handleSetMainDataReExamining = async (responseGetUpdateMedicalBookData) => {
        prevDataExamining.healthRecords[0].state = 1
        prevDataExamining.healthRecords[0].categories = responseGetUpdateMedicalBookData.categories

        const updateHealthRecordsCategoriesForConclusion = prevDataExamining.healthRecords[0].categories.map(category => ({
            categoryName: category.categoryName,
            isHealthRecord: true,
            categoryContents: category.categoryContents.map(content => ({
              ...content,
              categoryContentQuestions: []
            })) 
        }))

        //demo truớc data kết luận
        const demoDataExaminingForConclusion = {
            patientId: dataPantientsReadyExamining.patientsId,
            isVaccination: prevDataExamining.vaccination,
            medicalRegisterId: dataPantientsReadyExamining.id !== prevDataExamining.healthRecords[0].medicalRegisterId ? dataPantientsReadyExamining.id : prevDataExamining.healthRecords[0].medicalRegisterId,
            conclusion: prevDataExamining.healthRecords[0].conclusion,
            categories: updateHealthRecordsCategoriesForConclusion
        }

        setHealthRecordsContents({
            healthRecordsName: prevDataExamining.healthRecords[0].examinationName,
            categoryPatients: prevDataExamining.healthRecords[0].categories
        })

        setCurrentHealthRecordExamining({
            healthRecordsName: prevDataExamining.healthRecords[0].examinationName,
            categoryPatients: prevDataExamining.healthRecords[0].categories
        })

        //sửa categories của conclusion phần sổ khám bệnh
        let updateCategoriesForConclusion = _.cloneDeep(prevDataExamining.healthRecords[0].categories);

        updateCategoriesForConclusion = updateCategoriesForConclusion.map(category => {
            category.categoryContents = category.categoryContents.map(content => {
                const questions = content.categoryContentQuestions;
    
                // Check if all questions have both categoryContentAnswer and categoryContentNote as null
                const allNull = questions.every(q => q.categoryContentAnswer === null && q.categoryContentNote === null);
                    
                if (allNull) {
                  // Set categoryContentQuestions to an empty array
                  content.categoryContentQuestions = [];                    
                } else {
                  // Filter out questions with both categoryContentAnswer and categoryContentNote as null
                  content.categoryContentQuestions = questions.filter(q => q.categoryContentAnswer !== null || q.categoryContentNote !== null);
                }
                    
                return content;
            });
                  
            category.isHealthRecord = true
            return category;
        })

        demoDataExaminingForConclusion.categories = updateCategoriesForConclusion

        const responseGetUpdatePredecessor = await getUpdatePredecessor(dataPantientsReadyExamining.patientsId);

        //tiền căn đợt trước đã đụng (newPredecessor = false)
        if(responseGetUpdatePredecessor.status === 200)
        {   
            const editPrevDataExaminingCategoryPres = responseGetUpdatePredecessor.data.map(responseGetUpdatePredecessorItem => {
                const matchingPrevDataExamining = prevDataExamining.categoryPres.find(prevDataExaminingCategoryPresItem => prevDataExaminingCategoryPresItem.categoryOrder === responseGetUpdatePredecessorItem.categoryOrder);

                return {
                    ...responseGetUpdatePredecessorItem,
                    isLock: true,
                    categoryContents: responseGetUpdatePredecessorItem.categoryContents.filter(content2 => {
                        return matchingPrevDataExamining && matchingPrevDataExamining.categoryContents.some(content1 => content1.categoryContentOrder === content2.categoryContentOrder);
                    }).map(content2 => {
                        const matchingContent1 = matchingPrevDataExamining.categoryContents.find(content1 => content1.categoryContentOrder === content2.categoryContentOrder);
                        return {
                            ...content2,
                            isNullCategoryPres: matchingContent1 ? false : true,
                            isLock: true,
                            categoryContentQuestions: matchingContent1 ? matchingContent1.categoryContentQuestions : []
                        };
                    }),
                };
            })

            prevDataExamining.categoryPres = editPrevDataExaminingCategoryPres

            setNewDataPredecessor({
                patientId: dataPantientsReadyExamining.patientsId,
                categoryPres: []
            })

            setMainDataExamining(prevDataExamining);
            setPrevDataExamining();
        }
        
        //tiền căn đợt trước chưa đụng (newPredecessor = true) 
        else{
            //thêm tiền căn vào categories của conclusion
            let updateCategoriesForConclusion = _.cloneDeep(prevDataExamining.categoryPres);

            updateCategoriesForConclusion = updateCategoriesForConclusion.map((item) => {
                const editCategoryContents = item.categoryContents.map((itemCategoryContents) => {
                    return {
                        categoryContentCheck: itemCategoryContents.categoryContentCheck,
                        categoryContentName: itemCategoryContents.categoryContentName,
                        categoryContentOrder: itemCategoryContents.categoryContentOrder,
                        categoryContentText: itemCategoryContents.categoryContentText,
                        categoryContentTitle: itemCategoryContents.categoryContentTitle,
                        categoryContentQuestions: []
                    }
                })

                return {
                    categoryName: item.categoryName,
                    categoryOrder: item.categoryOrder,
                    categoryContents: editCategoryContents,
                    isPredecessor: true
                }
            })
        
            const newCategoriesDemoDataExaminingForConclusion = updateCategoriesForConclusion.concat(demoDataExaminingForConclusion.categories);
            demoDataExaminingForConclusion.categories = newCategoriesDemoDataExaminingForConclusion

            setMainDataExamining(prevDataExamining);
            setPrevDataExamining();
        }

        setDataExaminingForConclusion(_.cloneDeep(demoDataExaminingForConclusion));
    }

    //sửa dữ liệu tiền căn cho mở khám lại hoặc tái khám
    const handleEditDataPredecessor = async (categoryName, categoryOrder) => {
        setOpenAlertProcessingBackdrop(true);
        
        const responseGetUpdatePredecessor = await getUpdatePredecessor(dataPantientsReadyExamining.patientsId);

        const findUpdatePredecessor = responseGetUpdatePredecessor.data.find(responseGetUpdatePredecessorItem => responseGetUpdatePredecessorItem.categoryOrder === categoryOrder);

        mainDataExamining.categoryPres.forEach((categoryPresItem) => {
            if(categoryPresItem.categoryOrder === findUpdatePredecessor.categoryOrder){
                categoryPresItem.categoryContents = findUpdatePredecessor.categoryContents
                categoryPresItem.categoryContents.forEach((categoryContentsItem) => {
                    categoryContentsItem.isLock = false
                })
                categoryPresItem.isLock = false
            }
        })

        const selectCategoryReExamining = mainDataExamining.categoryPres.find(categoryPresItem => categoryPresItem.categoryOrder === categoryOrder);
        
        if(!newDataPredecessor.categoryPres.some(categoryPresItem => categoryPresItem.categoryName === categoryName)){
            newDataPredecessor.categoryPres = prevDataPredecessor
        }

        handleSelectCategoryClick(selectCategoryReExamining);

        setOpenAlertProcessingBackdrop(false);
    }

    //huỷ không sửa dữ liệu tiền căn nữa
    const handleCancelEditDataPredecessor = (categoryName, categoryOrder) => {
        setOpenAlertProcessingBackdrop(true);

        setTimeout(() => {
            const findPrevDataPredecessorByCategoryName = oldDataPredecessor.find(prevDataPredecessorItem => prevDataPredecessorItem.categoryOrder === categoryOrder);

            if(findPrevDataPredecessorByCategoryName){
                mainDataExamining.categoryPres.forEach((categoryPresItem) => {
                    if(categoryPresItem.categoryOrder === findPrevDataPredecessorByCategoryName.categoryOrder){
                        categoryPresItem.categoryContents = findPrevDataPredecessorByCategoryName.categoryContents
                        categoryPresItem.categoryContents.forEach((categoryContentsItem) => {
                            categoryContentsItem.isLock = true
                        })
                        categoryPresItem.isLock = true
                    }
                })

                newDataPredecessor.categoryPres.forEach((newDataPredecessorCategoryPresItem) => {
                    if(newDataPredecessorCategoryPresItem.categoryOrder === findPrevDataPredecessorByCategoryName.categoryOrder){
                        newDataPredecessorCategoryPresItem.categoryContents = findPrevDataPredecessorByCategoryName.categoryContents
                    }
                })
            }
            else{
                mainDataExamining.categoryPres.forEach((categoryPresItem) => {
                    if(categoryPresItem.categoryOrder === categoryOrder){
                        categoryPresItem.categoryContents = [];
                        categoryPresItem.isLock = true
                    }
                })

                const _newDataPredecessor = {...newDataPredecessor};
                const removeCategoryPredecessor = _newDataPredecessor.categoryPres.filter(categoryPresItem => categoryPresItem.categoryOrder !== categoryOrder);
                newDataPredecessor.categoryPres = removeCategoryPredecessor
            }

            setPrevDataPredecessor(_.cloneDeep(oldDataPredecessor));

            const selectCategoryReExamining = mainDataExamining.categoryPres.find(categoryPresItem => categoryPresItem.categoryOrder === categoryOrder);
            handleSelectCategoryClick(selectCategoryReExamining)
   
            setOpenAlertProcessingBackdrop(false);
        }, 300)       
    }

    //tạo data tiền căn để lưu lại khi tái khám hoặc mở khám lại
    //câu trả lời dạng check chọn true false
    const handleAnswerCheckQuestionPredecessorForReExamOrBackExam = (questionIndex, answer) => {
        if(answer === null){
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = true
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsPredecessorForReExamOrBackExam(_categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex])
        }
        else if(answer === true){
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = null
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsPredecessorForReExamOrBackExam(_categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex])
        }
    }

    //câu trả lời dạng check chọn sửa lại note
    const handleNoteCheckQuestionPredecessorForReExamOrBackExam = (questionIndex, value) => {
        const takenValue = value;

        if(typingRef.current){
            clearInterval(typingRef.current);
        }

        typingRef.current = setTimeout(() => {
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentNote = takenValue
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsPredecessorForReExamOrBackExam(_categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex], takenValue)
        }, 300)
    }

    //câu trả lời dạng giá trị, sửa lại note
    const handleNoteValueQuestionPredecessorForReExamOrBackExam = (questionIndex, value) => {
        const takenValue = value;

        if(typingRef.current){
            clearInterval(typingRef.current);
        }

        typingRef.current = setTimeout(() => {
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentNote = takenValue
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsValuePredecessorForReExamOrBackExam(_categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex], takenValue)
        }, 300)
    }

    const createSelectedQuestionsValuePredecessorForReExamOrBackExam = (categoryContentQuestion, takenValue) => {
        const findNewDataPredecessorCategoryOrder = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPresItem => newDataPredecessorCategoryPresItem.categoryOrder === categorySelectedExamining.categoryOrder);

        if(findNewDataPredecessorCategoryOrder){
            // Nếu tìm thấy categoryOrder, tìm kiếm tiếp categoryContentOrder
            const findNewDataPredecessorCategoryContents = findNewDataPredecessorCategoryOrder.categoryContents.find(newDataPredecessorCategoryContentsItem => newDataPredecessorCategoryContentsItem.categoryContentOrder === contentCategorySelectedExamining.categoryContentOrder)

            if(findNewDataPredecessorCategoryContents){
                // Nếu tìm thấy categoryContentOrder, kiểm tra xem có categoryContentQuestionOrder trùng không
                const questionIndex = findNewDataPredecessorCategoryContents.categoryContentQuestions.findIndex(newDataPredecessorcategoryContentQuestionsItem => newDataPredecessorcategoryContentQuestionsItem.categoryContentQuestionOrder === categoryContentQuestion.categoryContentQuestionOrder && takenValue !== '');
                const questionIndexRemove = findNewDataPredecessorCategoryContents.categoryContentQuestions.findIndex(newDataPredecessorcategoryContentQuestionsItem => newDataPredecessorcategoryContentQuestionsItem.categoryContentQuestionOrder === categoryContentQuestion.categoryContentQuestionOrder && takenValue === '');

                if(questionIndex !== -1){
                    // nếu tìm thấy câu hỏi cũ, và taken value khác rỗng => gán note cũ bằng note mới
                    findNewDataPredecessorCategoryContents.categoryContentQuestions[questionIndex].categoryContentNote = takenValue;
                }

                else if(questionIndexRemove !== -1){
                    // nếu tìm thấy câu hỏi cũ, và taken value bằng rỗng => bỏ note đó
                    findNewDataPredecessorCategoryContents.categoryContentQuestions.splice(questionIndexRemove, 1);
                }

                else{
                    //nếu không tìm thấy, đẩy note mới vào
                    findNewDataPredecessorCategoryContents.categoryContentQuestions.push(categoryContentQuestion);
                }
            }

            else{
                // Nếu không tìm thấy categoryContentOrder, thêm content mới
                const newDataPredecessorCategoryContents = {
                    categoryContentCheck: contentCategorySelectedExamining.categoryContentCheck,
                    categoryContentName: contentCategorySelectedExamining.categoryContentName,
                    categoryContentOrder: contentCategorySelectedExamining.categoryContentOrder,
                    categoryContentQuestions: [categoryContentQuestion],
                    categoryContentText: contentCategorySelectedExamining.categoryContentText,
                    categoryContentTitle: contentCategorySelectedExamining.categoryContentTitle
                }

                findNewDataPredecessorCategoryOrder.categoryContents.push(newDataPredecessorCategoryContents)
            }
        }

        else{
            // Nếu không tìm thấy categoryOrder, thêm mới categoryOrder
            const newDataPredecessorCategoryContents = {
                categoryContentCheck: contentCategorySelectedExamining.categoryContentCheck,
                categoryContentName: contentCategorySelectedExamining.categoryContentName,
                categoryContentOrder: contentCategorySelectedExamining.categoryContentOrder,
                categoryContentQuestions: [categoryContentQuestion],
                categoryContentText: contentCategorySelectedExamining.categoryContentText,
                categoryContentTitle: contentCategorySelectedExamining.categoryContentTitle
            }

            const newDataPredecessorCategoryPres = {
                categoryOrder: categorySelectedExamining.categoryOrder,
                categoryName: categorySelectedExamining.categoryName,
                newCategoryPre: categorySelectedExamining.newCategoryPre,
                categoryContents: [newDataPredecessorCategoryContents]
            }

            newDataPredecessor.categoryPres.push(newDataPredecessorCategoryPres)
        }         
    }

    const createSelectedQuestionsPredecessorForReExamOrBackExam = (categoryContentQuestion, takenValue) => {
        if(takenValue){
            //câu hỏi là dạng check đang là true, chỉ sửa note khác rỗng
            if(categoryContentQuestion.categoryContentAnswer === true && categoryContentQuestion.categoryContentQuestionType === 'check' && takenValue.length !== 0){
                const findNewDataPredecessorCategoryOrder = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPresItem => newDataPredecessorCategoryPresItem.categoryOrder === categorySelectedExamining.categoryOrder);

                if(findNewDataPredecessorCategoryOrder){
                    // Nếu tìm thấy categoryOrder, tìm kiếm tiếp categoryContentOrder
                    const findNewDataPredecessorCategoryContents = findNewDataPredecessorCategoryOrder.categoryContents.find(newDataPredecessorCategoryContentsItem => newDataPredecessorCategoryContentsItem.categoryContentOrder === contentCategorySelectedExamining.categoryContentOrder)

                    if(findNewDataPredecessorCategoryContents){
                        // Nếu tìm thấy categoryContentOrder, kiểm tra xem có categoryContentQuestionOrder trùng không
                        const questionIndex = findNewDataPredecessorCategoryContents.categoryContentQuestions.findIndex(newDataPredecessorcategoryContentQuestionsItem => newDataPredecessorcategoryContentQuestionsItem.categoryContentQuestionOrder === categoryContentQuestion.categoryContentQuestionOrder);
                        if(questionIndex !== -1){
                            // thay thế ghi chú bằng ghi chú mới
                            findNewDataPredecessorCategoryContents.categoryContentQuestions[questionIndex].categoryContentNote = takenValue
                        }
                    }
                }
            }

            //câu hỏi là dạng check đang là true, chỉ sửa note bằng rỗng
            if(categoryContentQuestion.categoryContentAnswer === true && categoryContentQuestion.categoryContentQuestionType === 'check' && takenValue.length === 0){
                const findNewDataPredecessorCategoryOrder = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPresItem => newDataPredecessorCategoryPresItem.categoryOrder === categorySelectedExamining.categoryOrder);

                if(findNewDataPredecessorCategoryOrder){
                    // Nếu tìm thấy categoryOrder, tìm kiếm tiếp categoryContentOrder
                    const findNewDataPredecessorCategoryContents = findNewDataPredecessorCategoryOrder.categoryContents.find(newDataPredecessorCategoryContentsItem => newDataPredecessorCategoryContentsItem.categoryContentOrder === contentCategorySelectedExamining.categoryContentOrder)

                    if(findNewDataPredecessorCategoryContents){
                        // Nếu tìm thấy categoryContentOrder, kiểm tra xem có categoryContentQuestionOrder trùng không
                        const questionIndex = findNewDataPredecessorCategoryContents.categoryContentQuestions.findIndex(newDataPredecessorcategoryContentQuestionsItem => newDataPredecessorcategoryContentQuestionsItem.categoryContentQuestionOrder === categoryContentQuestion.categoryContentQuestionOrder);
                        if(questionIndex !== -1){
                            // thay thế ghi chú bằng rỗng
                            findNewDataPredecessorCategoryContents.categoryContentQuestions[questionIndex].categoryContentNote = ''
                        }
                    }
                }
            }
                
        }

        else{
            //câu hỏi là dạng check câu trả lời là true
            if(categoryContentQuestion.categoryContentAnswer === true && categoryContentQuestion.categoryContentQuestionType === 'check'){
                const findNewDataPredecessorCategoryOrder = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPresItem => newDataPredecessorCategoryPresItem.categoryOrder === categorySelectedExamining.categoryOrder);

                if(findNewDataPredecessorCategoryOrder){
                    // Nếu tìm thấy categoryOrder, tìm kiếm tiếp categoryContentOrder
                    const findNewDataPredecessorCategoryContents = findNewDataPredecessorCategoryOrder.categoryContents.find(newDataPredecessorCategoryContentsItem => newDataPredecessorCategoryContentsItem.categoryContentOrder === contentCategorySelectedExamining.categoryContentOrder)

                    if(findNewDataPredecessorCategoryContents){
                        // Nếu tìm thấy categoryContentOrder, thêm câu hỏi mới
                        findNewDataPredecessorCategoryContents.categoryContentQuestions.push(categoryContentQuestion);
                    }
                    else{
                        // Nếu không tìm thấy categoryContentOrder, thêm content mới
                        const newDataPredecessorCategoryContents = {
                            categoryContentCheck: contentCategorySelectedExamining.categoryContentCheck,
                            categoryContentName: contentCategorySelectedExamining.categoryContentName,
                            categoryContentOrder: contentCategorySelectedExamining.categoryContentOrder,
                            categoryContentQuestions: [categoryContentQuestion],
                            categoryContentText: contentCategorySelectedExamining.categoryContentText,
                            categoryContentTitle: contentCategorySelectedExamining.categoryContentTitle
                        }
                        findNewDataPredecessorCategoryOrder.categoryContents.push(newDataPredecessorCategoryContents)
                    }
                }
                else{
                    // Nếu không tìm thấy categoryOrder, thêm mới categoryOrder
                    const newDataPredecessorCategoryContents = {
                        categoryContentCheck: contentCategorySelectedExamining.categoryContentCheck,
                        categoryContentName: contentCategorySelectedExamining.categoryContentName,
                        categoryContentOrder: contentCategorySelectedExamining.categoryContentOrder,
                        categoryContentQuestions: [categoryContentQuestion],
                        categoryContentText: contentCategorySelectedExamining.categoryContentText,
                        categoryContentTitle: contentCategorySelectedExamining.categoryContentTitle
                    }

                    const newDataPredecessorCategoryPres = {
                        categoryOrder: categorySelectedExamining.categoryOrder,
                        categoryName: categorySelectedExamining.categoryName,
                        newCategoryPre: categorySelectedExamining.newCategoryPre,
                        categoryContents: [newDataPredecessorCategoryContents]
                    }

                    newDataPredecessor.categoryPres.push(newDataPredecessorCategoryPres)
                }
            }

            //câu hỏi là dạng check câu trả lời là false
            if(categoryContentQuestion.categoryContentAnswer === null && categoryContentQuestion.categoryContentQuestionType === 'check'){
                const findNewDataPredecessorCategoryOrder = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPresItem => newDataPredecessorCategoryPresItem.categoryOrder === categorySelectedExamining.categoryOrder);

                if(findNewDataPredecessorCategoryOrder){
                    // Nếu tìm thấy categoryOrder, tìm kiếm tiếp categoryContentOrder
                    const findNewDataPredecessorCategoryContents = findNewDataPredecessorCategoryOrder.categoryContents.find(newDataPredecessorCategoryContentsItem => newDataPredecessorCategoryContentsItem.categoryContentOrder === contentCategorySelectedExamining.categoryContentOrder)

                    if(findNewDataPredecessorCategoryContents){
                        // Nếu tìm thấy categoryContentOrder, kiểm tra xem có categoryContentQuestionOrder trùng không
                        const questionIndex = findNewDataPredecessorCategoryContents.categoryContentQuestions.findIndex(newDataPredecessorcategoryContentQuestionsItem => newDataPredecessorcategoryContentQuestionsItem.categoryContentQuestionOrder === categoryContentQuestion.categoryContentQuestionOrder);
                        if(questionIndex !== -1){
                            // Loại bỏ câu hỏi cũ nếu tìm thấy
                            findNewDataPredecessorCategoryContents.categoryContentQuestions.splice(questionIndex, 1);
                        }
                    }
                }
            }
        }
    }

    //lưu dữ liệu tiền căn khi sửa xong
    const handleEditDataPredecessorForSaving = (categoryOrder) => {
        setOpenAlertProcessingBackdrop(true);

        setTimeout(() => {
            const findNewDataPredecessor = newDataPredecessor.categoryPres.find(newDataPredecessorCategoryPres => newDataPredecessorCategoryPres.categoryOrder === categoryOrder)

            const findOldDataPredecessorCategoryOrder = oldDataPredecessor.find(oldDataPredecessorItem => oldDataPredecessorItem.categoryOrder === findNewDataPredecessor.categoryOrder);

            if(findOldDataPredecessorCategoryOrder){
                // Nếu tìm thấy categoryOrder, duyệt qua categoryContents của findNewDataPredecessor
                findNewDataPredecessor.categoryContents.forEach(findNewDataPredecessorCategoryContentsItem => {

                    let content = findOldDataPredecessorCategoryOrder.categoryContents.find(findOldDataPredecessorCategoryContentsItem => findOldDataPredecessorCategoryContentsItem.categoryContentOrder === findNewDataPredecessorCategoryContentsItem.categoryContentOrder);

                    if(content){
                        // Loại bỏ các categoryContentQuestions trong content nếu không tồn tại trong findNewDataPredecessorCategoryContentsItem
                        content.categoryContentQuestions = content.categoryContentQuestions.filter(q =>
                            findNewDataPredecessorCategoryContentsItem.categoryContentQuestions.some(newQ => newQ.categoryContentQuestionOrder === q.categoryContentQuestionOrder)
                        );

                        // Nếu tìm thấy categoryContentOrder, duyệt qua categoryContentQuestions
                        if(findNewDataPredecessorCategoryContentsItem.categoryContentQuestions.length !== 0){
                            findNewDataPredecessorCategoryContentsItem.categoryContentQuestions.forEach(findNewDataPredecessorQuestionItem => {
                                if(findNewDataPredecessorQuestionItem.categoryContentAnswer === null && findNewDataPredecessorQuestionItem.categoryContentQuestionType === 'check'){
                                    // Nếu categoryContentAnswer là false, loại bỏ question đó
                                    content.categoryContentQuestions = content.categoryContentQuestions.filter(q => q.categoryContentQuestionOrder !== findNewDataPredecessorQuestionItem.categoryContentQuestionOrder);
                                }

                                else if(findNewDataPredecessorQuestionItem.categoryContentAnswer === '' && findNewDataPredecessorQuestionItem.categoryContentQuestionType === 'string'){
                                    content.categoryContentQuestions = content.categoryContentQuestions.filter(q => q.categoryContentQuestionOrder !== findNewDataPredecessorQuestionItem.categoryContentQuestionOrder);
                                }

                                else{
                                    const questionIndex = content.categoryContentQuestions.findIndex(q => q.categoryContentQuestionOrder === findNewDataPredecessorQuestionItem.categoryContentQuestionOrder);

                                    if (questionIndex !== -1) {
                                        // Thay thế question nếu trùng khớp
                                        content.categoryContentQuestions[questionIndex] = findNewDataPredecessorQuestionItem;
                                    }

                                    else {
                                        // Thêm question mới nếu không trùng khớp
                                        content.categoryContentQuestions.push(findNewDataPredecessorQuestionItem);
                                    }
                                }
                            });

                        }else{
                            findOldDataPredecessorCategoryOrder.categoryContents = findOldDataPredecessorCategoryOrder.categoryContents.filter(contentCategoryContentsItem => contentCategoryContentsItem.categoryContentOrder !== findNewDataPredecessorCategoryContentsItem.categoryContentOrder)
                        }
                        
                    }else{
                        findOldDataPredecessorCategoryOrder.categoryContents.push(findNewDataPredecessorCategoryContentsItem);
                    }

                })
            }else{
                // Thêm toàn bộ object2 nếu không tìm thấy findNewDataPredecessor
                oldDataPredecessor.push(findNewDataPredecessor)
            }

            oldDataPredecessor.forEach((oldDataPredecessorItem) => {
                oldDataPredecessorItem.categoryContents = oldDataPredecessorItem.categoryContents.filter(categoryContentsItem => categoryContentsItem.categoryContentQuestions.length !== 0)
            }) 

            const removeOldDataPredecessorCategoryPres = oldDataPredecessor.findIndex(item => item.categoryContents.length === 0);
            if(removeOldDataPredecessorCategoryPres !== -1){
                oldDataPredecessor.splice(removeOldDataPredecessorCategoryPres, 1);
            }

            const saveNewDataPredecessor = {
                patientId: newDataPredecessor.patientId,
                categoryPres: oldDataPredecessor
            }

            handleSaveNewDataPredecessor(saveNewDataPredecessor, findNewDataPredecessor)            
        }, 500)
    }

    const handleSaveNewDataPredecessor = async (saveNewDataPredecessor, findNewDataPredecessor) => {
        const responseCreateAddPredecessor = await createAddPredecessor(saveNewDataPredecessor);
        if(responseCreateAddPredecessor.status === 200){

            const _mainDataExamining = {...mainDataExamining};

            _mainDataExamining.categoryPres.forEach((categoryPresItem) => {
                if(categoryPresItem.categoryOrder === findNewDataPredecessor.categoryOrder){
                    categoryPresItem.categoryContents = findNewDataPredecessor.categoryContents
                    categoryPresItem.categoryContents.forEach((categoryContentsItem) => {
                        categoryContentsItem.isLock = true
                    })
                    if(findNewDataPredecessor.categoryContents.length === 0){
                        categoryPresItem.newCategoryPre = true
                    }else{
                        categoryPresItem.newCategoryPre = false
                    }
                    categoryPresItem.isLock = true
                }

                categoryPresItem.categoryContents = categoryPresItem.categoryContents.filter(item => item.categoryContentQuestions.length !== 0);
            })

            setMainDataExamining(_mainDataExamining);

            const selectCategoryReExamining = _mainDataExamining.categoryPres.find(categoryPresItem => categoryPresItem.categoryOrder === findNewDataPredecessor.categoryOrder);
            
            toast.success('Đã cập nhật lại tiền căn', {toastId: 'handleSaveNewDataPredecessorSuccess'});
            
            handleSelectCategoryClick(selectCategoryReExamining);
        }
        else{
            toast.error(responseCreateAddPredecessor.data, {toastId: 'handleSaveNewDataPredecessorError'});
        }
        setOpenAlertProcessingBackdrop(false);
    }

    //tìm danh mục khám gồm tiền căn, sổ sức khỏe, dinh dưỡng...
    const handleGetMedicalDetailPatient = async (id) => {
        const responseDataExamining = await getMedicalDetailPatient(id);
        setPrevDataExamining(responseDataExamining);
    }

    //chọn mục lục để khám
    const handleSelectCategoryClick = async (categoryIncludeCotent) => {
        if(openCollapseHealthRecords === true){
            setOpenCollapseHealthRecords(!openCollapseHealthRecords);
        }

        if(healthRecordsContents.length !== 0){
            setHealthRecordsContents([]);
        }

        setCategorySelectedExamining(
            {
                ...categoryIncludeCotent,
                contentQuantity: categoryIncludeCotent.categoryContents.length
            }
        )

        if(dataPantientsReadyExamining.editExamining !== true && mainDataExamining.newPredecessor === true){
            const editNewCategoryPreForContentCategorySelectedExamining = {...categoryIncludeCotent.categoryContents[0], newCategoryPre: categoryIncludeCotent.newCategoryPre}
            setContentCategorySelectedExamining(editNewCategoryPreForContentCategorySelectedExamining);
            setCurrentContentExamining(1);
        }
        else{
            if(categoryIncludeCotent.categoryContents.length === 0){
                setContentCategorySelectedExamining({isLock: categoryIncludeCotent.isLock, isNullCategoryPres: true})
            }
            else{
                if(categoryIncludeCotent.categoryName !== categorySelectedExamining.categoryName){
                    const editNewCategoryPreForContentCategorySelectedExamining = {...categoryIncludeCotent.categoryContents[0], newCategoryPre: categoryIncludeCotent.newCategoryPre}
                    setContentCategorySelectedExamining(editNewCategoryPreForContentCategorySelectedExamining);
                    setCurrentContentExamining(1);
                }
                else if(categoryIncludeCotent.categoryName === categorySelectedExamining.categoryName){
                    setCategorySelectedExamining(
                        {
                            ...categoryIncludeCotent,
                            contentQuantity: categoryIncludeCotent.categoryContents.length
                        }
                    )

                    const editNewCategoryPreForContentCategorySelectedExamining = {...categoryIncludeCotent.categoryContents[0], newCategoryPre: categoryIncludeCotent.newCategoryPre}
                    setContentCategorySelectedExamining(editNewCategoryPreForContentCategorySelectedExamining);
                    setCurrentContentExamining(1);
                }
                else{
                    const editNewCategoryPreForContentCategorySelectedExamining = {...categoryIncludeCotent.categoryContents[currentContentExamining - 1], newCategoryPre: categoryIncludeCotent.newCategoryPre}
                    setContentCategorySelectedExamining(editNewCategoryPreForContentCategorySelectedExamining);
                }
            }
        }
    }

    //chọn cây thư mục khám sổ sức khỏe
    const handleSelectHealthRecords = (healthRecords) => {
        if(openCollapseHealthRecords === false){
            setOpenCollapseHealthRecords(!openCollapseHealthRecords);
        }        

        if(healthRecordsContents.length !== 0){
            setHealthRecordsContents([]);
        }

        setCategorySelectedExamining(
            {
                categoryName: 'Sổ sức khỏe',
                categoryContents: healthRecords
            }
        )

        setContentCategorySelectedExamining(
            {
                healthRecordsContentsType: 'tree',
                categoryContents: healthRecords
            }
        )
    }

    //chọn chỉ định một sổ khám bệnh (tìm chi tiết một sổ khám bệnh)
    const handleSelectHealthRecordsItem = async (medicalBookId, examinationName, healthRecordsState) => {
        if(examinationName !== contentCategorySelectedExamining.healthRecordsName){
            setOpenAlertProcessingBackdrop(true);
            setLoadingContentsExamining(true);

            if(currentHealthRecordExamining){
                if(healthRecordsState === 2){
                    await findHealthRecord(medicalBookId, examinationName, healthRecordsState);
                }
                else{
                    if(currentHealthRecordExamining.newMedicalBook === false && examinationName === mainDataExamining.healthRecords[0].examinationName){
                        const editCurrentHealthRecordExamining = {
                            healthRecordsName: mainDataExamining.healthRecords[0].examinationName,
                            categoryPatients: mainDataExamining.healthRecords[0].categories,
                            newMedicalBook: true
                        }
    
                        setCurrentHealthRecordExamining(editCurrentHealthRecordExamining)
    
                        setHealthRecordsContents({
                            healthRecordsName: examinationName,
                            newMedicalBook: editCurrentHealthRecordExamining.newMedicalBook,
                            categoryPatients: editCurrentHealthRecordExamining.categoryPatients
                        })
    
                        const editHealthRecordsContent = editCurrentHealthRecordExamining.categoryPatients.map((categoryPatientsItem, categoryPatientsIndex) => {
                            const categoryName = categoryPatientsItem.categoryName;
                            const firstContent = categoryPatientsItem.categoryContents[0];
                    
                            return{
                                categoryName: categoryName,
                                categoryContents: firstContent,
                                currentHealthRecordsContent: 1,
                                contentQuantity: categoryPatientsItem.categoryContents.length
                            }
                        })
    
                        const updateHealthRecordsContent = {
                            healthRecordsName: examinationName,
                            newMedicalBook: editCurrentHealthRecordExamining.newMedicalBook,
                            conclusion: dataExaminingForConclusion.conclusion,
                            categoryPatients: editHealthRecordsContent
                        }
    
                        setContentCategorySelectedExamining(updateHealthRecordsContent);
                    }
                    
                    else{
                        setHealthRecordsContents({
                            healthRecordsName: examinationName,
                            newMedicalBook: currentHealthRecordExamining.newMedicalBook,
                            categoryPatients: currentHealthRecordExamining.categoryPatients
                        })
    
                        const editHealthRecordsContent = currentHealthRecordExamining.categoryPatients.map((categoryPatientsItem, categoryPatientsIndex) => {
                            const categoryName = categoryPatientsItem.categoryName;
                            const firstContent = categoryPatientsItem.categoryContents[0];
                    
                            return{
                                categoryName: categoryName,
                                categoryContents: firstContent,
                                currentHealthRecordsContent: 1,
                                contentQuantity: categoryPatientsItem.categoryContents.length
                            }
                        })
    
                        const updateHealthRecordsContent = {
                            healthRecordsName: examinationName,
                            newMedicalBook: currentHealthRecordExamining.newMedicalBook,
                            conclusion: dataExaminingForConclusion.conclusion,
                            categoryPatients: editHealthRecordsContent
                        }
                        setContentCategorySelectedExamining(updateHealthRecordsContent);
                    }
                }
            }
    
            else{
                await findHealthRecord(medicalBookId, examinationName, healthRecordsState);
            }
            setLoadingContentsExamining(false);
            setOpenAlertProcessingBackdrop(false);
        }
    }

    const findHealthRecord = async (medicalBookId, examinationName, healthRecordsState) => {
        const responseMedicalBook = await getMedicalBook(medicalBookId ? medicalBookId : 0);

        // //tái khám
        // if(dataPantientsReadyExamining.backRegister){
        //     const editHealthRecordsContent = responseMedicalBook.medicakBook.categories.map((categoryPatientsItem, categoryPatientsIndex) => {
        //         const categoryName = categoryPatientsItem.categoryName;
        //         const firstContent = categoryPatientsItem.categoryContents[0];
                
        //         return{
        //             categoryName: categoryName,
        //             categoryContents: firstContent,
        //             currentHealthRecordsContent: 1,
        //             contentQuantity: categoryPatientsItem.categoryContents.length
        //         }
        //     })
        
        //     const updateHealthRecordsContent = {
        //         healthRecordsName: examinationName,
        //         newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
        //         conclusion: responseMedicalBook.medicakBook.conclusion,
        //         categoryPatients: editHealthRecordsContent
        //     }

        //     setContentCategorySelectedExamining(updateHealthRecordsContent);
        //     setPrevDataHealthRecords(responseMedicalBook.medicakBook);

        //     //medicalBookId truyền vào bằng với medicalBookId của đợt khám hiện tại
        //     if(medicalBookId === mainDataExamining.healthRecords[0].medicalBookId){
        //         setHealthRecordsContents({
        //             healthRecordsName: examinationName,
        //             newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
        //             categoryPatients: responseMedicalBook.medicakBook.categories
        //         })

        //         setCurrentHealthRecordExamining({
        //             healthRecordsName: examinationName,
        //             newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
        //             categoryPatients: responseMedicalBook.medicakBook.categories
        //         });
            
        //         const editDataHealthRecordsItemForConclusion = responseMedicalBook.medicakBook.categories.map((categoriesItem, categoriesIndex) => {
        //             const mainCategoryContentsExamining = categoriesItem.categoryContents.map((categoryContentsItem) => {
        //                 const categoryContents = {
        //                     categoryContentTitle: categoryContentsItem.categoryContentTitle,
        //                     categoryContentName: categoryContentsItem.categoryContentName,
        //                     categoryContentCheck: categoryContentsItem.categoryContentCheck,
        //                     categoryContentText: categoryContentsItem.categoryContentText,
        //                     categoryContentQuestions: []
        //                 }
        //                 return categoryContents
        //             })
                    
        //             const mainCategoryExamining = {
        //                 categoryName: categoriesItem.categoryName,
        //                 isHealthRecord: true,
        //                 categoryContents: mainCategoryContentsExamining
        //             }
    
        //             return mainCategoryExamining
        //         })
    
        //         const _dataExaminingForConclusion = {...dataExaminingForConclusion};
        //         editDataHealthRecordsItemForConclusion.map((dataHealthRecordsItemForConclusionItem) => _dataExaminingForConclusion.categories.push(dataHealthRecordsItemForConclusionItem))
        //         setDataExaminingForConclusion(_dataExaminingForConclusion);
        //     }
        // }

        //else{
            setHealthRecordsContents({
                healthRecordsName: examinationName,
                newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
                categoryPatients: responseMedicalBook.medicakBook.categories
            })
    
            setCurrentHealthRecordExamining({
                healthRecordsName: examinationName,
                newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
                categoryPatients: responseMedicalBook.medicakBook.categories
            });
        
            const editHealthRecordsContent = responseMedicalBook.medicakBook.categories.map((categoryPatientsItem, categoryPatientsIndex) => {
                const categoryName = categoryPatientsItem.categoryName;
                const firstContent = categoryPatientsItem.categoryContents[0];
        
                return{
                    categoryName: categoryName,
                    categoryContents: firstContent,
                    currentHealthRecordsContent: 1,
                    contentQuantity: categoryPatientsItem.categoryContents.length
                }
            })
        
            const updateHealthRecordsContent = {
                healthRecordsName: examinationName,
                newMedicalBook: responseMedicalBook.medicakBook.newMedicalBook,
                conclusion: responseMedicalBook.medicakBook.conclusion,
                categoryPatients: editHealthRecordsContent
            }
        
            setContentCategorySelectedExamining(updateHealthRecordsContent);

            if(healthRecordsState === 1){
                const editDataHealthRecordsItemForConclusion = responseMedicalBook.medicakBook.categories.map((categoriesItem, categoriesIndex) => {
                    const mainCategoryContentsExamining = categoriesItem.categoryContents.map((categoryContentsItem) => {
                        const categoryContents = {
                            categoryContentTitle: categoryContentsItem.categoryContentTitle,
                            categoryContentName: categoryContentsItem.categoryContentName,
                            categoryContentCheck: categoryContentsItem.categoryContentCheck,
                            categoryContentText: categoryContentsItem.categoryContentText,
                            categoryContentQuestions: []
                        }
                        return categoryContents
                    })
                    
                    const mainCategoryExamining = {
                        categoryName: categoriesItem.categoryName,
                        isHealthRecord: true,
                        categoryContents: mainCategoryContentsExamining
                    }
    
                    return mainCategoryExamining
                })
    
                const _dataExaminingForConclusion = {...dataExaminingForConclusion};
                editDataHealthRecordsItemForConclusion.map((dataHealthRecordsItemForConclusionItem) => _dataExaminingForConclusion.categories.push(dataHealthRecordsItemForConclusionItem))
                setDataExaminingForConclusion(_dataExaminingForConclusion);
            }
        //}
    }

    //chọn loại mục khám của một sổ khám bệnh
    const handleOpenHealthRecordsItem = (categoryPatientsIndex) => {
        setOpenCollapseHealthRecordsItem((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[categoryPatientsIndex] = !newOpen[categoryPatientsIndex];
            return newOpen;
        });
    }

    const handleRenderExamsStatus = (status) => {
      if(status === 0){
        return (
          <div className='chipUnDoneExamms'><p className='chipLabel'>Chưa thực hiện</p></div>
        )
      }
      else if(status === 1){
        return (
          <div className='chipDoingExamms'><p className='chipLabel'>Đang thực hiện</p></div>
        )
      }
      else{
        return (
          <div className='chipDoneExamms'><p className='chipLabel'>Đã thực hiện</p></div>
        )
      }
    }

    const handleOnChangePage = (event, value) => {
         setContentCategorySelectedExamining(categorySelectedExamining.categoryContents[value - 1]);
         setCurrentContentExamining(value);
    }

    const handeOnChangePageHealthRecords = (event, page, categoryIndex) => {
        const _contentCategorySelectedExamining = {...contentCategorySelectedExamining};
        _contentCategorySelectedExamining.categoryPatients[categoryIndex].categoryContents = healthRecordsContents.categoryPatients[categoryIndex].categoryContents[page - 1];
        _contentCategorySelectedExamining.categoryPatients[categoryIndex].currentHealthRecordsContent = page;
        setContentCategorySelectedExamining(_contentCategorySelectedExamining);
    }

    // const handeOnChangePageOldHealthRecords = (event, page, categoryIndex) => {
    //     const _contentCategorySelectedExamining = {...contentCategorySelectedExamining};
    //     _contentCategorySelectedExamining.categoryPatients[categoryIndex].categoryContents = prevDataHealthRecords.categories[categoryIndex].categoryContents[page - 1];
    //     _contentCategorySelectedExamining.categoryPatients[categoryIndex].currentHealthRecordsContent = page;
    //     setContentCategorySelectedExamining(_contentCategorySelectedExamining);
    // }

    const handleAnswerCheckQuestion = (questionIndex, answer) => {
        //set lại danh mục đang chọn để khám khi trả lời câu hỏi dạng check
        if(answer === null){
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = true
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsExaminingForConclusion(
                _categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            )
        }
        else if(answer === true){
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = false
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsExaminingForConclusion(
                _categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            )
        }
        else{
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = true
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsExaminingForConclusion(_categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            )
        }   
    }

    const typingRef = useRef(null);

    const handleNoteCheckQuestion = (questionIndex, value) => {
        const takenValue = value;

        if(typingRef.current){
            clearInterval(typingRef.current);
        }

        typingRef.current = setTimeout(() => {
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentNote = takenValue
            setCategorySelectedExamining(_categorySelectedExamining);
            const isEditNote = true;
            createSelectedQuestionsExaminingForConclusion(
                _categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder,
                takenValue,
                isEditNote
            )
        }, 300)
    }

    const handleAnswerValueQuestion = (questionIndex, value) => {
        const takenValue = value;

        if(typingRef.current){
            clearInterval(typingRef.current);
        }

        typingRef.current = setTimeout(() => {
            //set lại danh mục đang chọn để khám khi trả lời câu hỏi dạng giá trị
            const _categorySelectedExamining = {...categorySelectedExamining};
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentNote = takenValue;
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsExaminingForConclusion(
                _categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentTitle,
            )
        }, 0)
    }

    const handleAnswerCheckQuestionHealthRecords = (categoryPatientsIndex, currentHealthRecordsContent, questionIndex, answer) => {
        if(answer === null){
            const _healthRecordsContents = {...healthRecordsContents};
            _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = true;
            setHealthRecordsContents(_healthRecordsContents);

            createSelectedQuestionsExaminingForConclusion(
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryName, 
                currentHealthRecordsContent - 1,
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex],
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            );
        }

        else if(answer === true){
            const _healthRecordsContents = {...healthRecordsContents};
            _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = false;
            setHealthRecordsContents(_healthRecordsContents);

            createSelectedQuestionsExaminingForConclusion(
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryName, 
                currentHealthRecordsContent - 1,
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex],
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            );
        }

        else{
            const _healthRecordsContents = {...healthRecordsContents};
            _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = true;
            setHealthRecordsContents(_healthRecordsContents);

            createSelectedQuestionsExaminingForConclusion(
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryName, 
                currentHealthRecordsContent - 1,
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex],
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder
            );
        }
    }
    
    //trả lời câu hỏi của mục sổ khám bệnh
    const handleNoteCheckQuestionHealthRecords = (categoryPatientsIndex, currentHealthRecordsContent, questionIndex, value) => {
        const takenValue = value;

        if(typingRef.current){
            clearInterval(typingRef.current);
        }

        typingRef.current = setTimeout(() => {
            //set lại danh mục đang chọn để khám khi trả lời câu hỏi dạng giá trị
            const _healthRecordsContents = {...healthRecordsContents};
            _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentNote = takenValue;
            setHealthRecordsContents(_healthRecordsContents);
            const isEditNote = true;
            createSelectedQuestionsExaminingForConclusion(
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryName, 
                currentHealthRecordsContent - 1,
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex],
                _healthRecordsContents.categoryPatients[categoryPatientsIndex].categoryContents[currentHealthRecordsContent - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder,
                takenValue,
                isEditNote
            );
        }, 300)
    }

    const createSelectedQuestionsExaminingForConclusion = (categoryName, currentCategory, categoryContentQuestion, questionOrder, categoryContentTitle, isEditNote) => {
        //question dạng check nhưng answer là true
        if(isEditNote && categoryContentQuestion.categoryContentAnswer === true && categoryContentQuestion.categoryContentQuestionType === 'check'){
            dataExaminingForConclusion.categories.forEach((categoriesItem) => {
                if(categoriesItem.categoryName === categoryName){
                    if(categoriesItem.categoryContents[currentCategory].categoryContentQuestions.length !== 0){
                        categoriesItem.categoryContents[currentCategory].categoryContentQuestions.forEach((questionItem) => {
                            if(questionItem.categoryContentQuestionOrder === questionOrder){
                                //dùng tạm categoryContentTitle thay cho taken value của note
                                questionItem.categoryContentNote = categoryContentTitle
                            }
                        })
                    }
                    else{
                        categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion)
                    }
                }
            })
        }
        else{
            if(categoryContentQuestion.categoryContentAnswer === true && categoryContentQuestion.categoryContentQuestionType === 'check'){
                const _dataExaminingForConclusion = {...dataExaminingForConclusion};
                _dataExaminingForConclusion.categories.forEach((categoriesItem, categoriesIndex) => {
                    if(categoriesItem.categoryName === categoryName){
                        categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion)
                    }
                })
                setDataExaminingForConclusion(_dataExaminingForConclusion);
            }

            //question dạng check nhưng answer là false
            else if(categoryContentQuestion.categoryContentAnswer === false && categoryContentQuestion.categoryContentQuestionType === 'check'){
                const _dataExaminingForConclusion = {...dataExaminingForConclusion};
                _dataExaminingForConclusion.categories.forEach((categoriesItem, categoriesIndex) => {
                    if(categoriesItem.categoryName === categoryName){
                        const removeSelectedQuestion = categoriesItem.categoryContents[currentCategory].categoryContentQuestions.filter((questionItem) => questionItem.categoryContentQuestionOrder !== questionOrder)
                        categoriesItem.categoryContents[currentCategory].categoryContentQuestions = removeSelectedQuestion
                    }
                })
                setDataExaminingForConclusion(_dataExaminingForConclusion)
            }
        }

        //question dạng giá trị nhưng khác rỗng
        if(categoryContentQuestion.categoryContentNote !== '' && categoryContentQuestion.categoryContentQuestionType === 'string'){
            const _dataExaminingForConclusion = {...dataExaminingForConclusion};
            // Duyệt qua từng categoriesItem trong categories
            _dataExaminingForConclusion.categories.forEach(categoriesItem => {
                if(categoriesItem.categoryName === categoryName){
                    // Duyệt qua từng categoryContentsItem trong categoryContents
                    categoriesItem.categoryContents.forEach(categoryContentsItem => {
                        if(categoryContentsItem.categoryContentTitle === categoryContentTitle){
                            // Kiểm tra nếu categoryContentQuestions rỗng hoặc không rỗng
                            if (categoryContentsItem.categoryContentQuestions.length > 0) {
                                // Kiểm tra xem đã có categoryContentQuestionName chưa
                                const existingQuestion = categoryContentsItem.categoryContentQuestions.find(question => 
                                    question.categoryContentQuestionName === categoryContentQuestion.categoryContentQuestionName
                                );
                
                                if (existingQuestion) {
                                    // Nếu đã tồn tại, cập nhật categoryContentAnswer
                                    existingQuestion.categoryContentNote = categoryContentQuestion.categoryContentNote;
                                } else {
                                    // Nếu không tồn tại, thêm mới đối tượng vào categoryContentQuestions
                                    categoryContentsItem.categoryContentQuestions.push(categoryContentQuestion);
                                }

                            } else {
                            // Nếu categoryContentQuestions rỗng, thêm trực tiếp đối tượng mới và ngưng vòng lặp để tránh thêm nhiều lần
                                categoryContentsItem.categoryContentQuestions.push(categoryContentQuestion);
                            }
                        }
                    });        
                }
            });

            setDataExaminingForConclusion(_dataExaminingForConclusion);
        }
        //question dạng giá trị nhưng là rỗng
        if(categoryContentQuestion.categoryContentNote === '' && categoryContentQuestion.categoryContentQuestionType === 'string'){
            const _dataExaminingForConclusion = {...dataExaminingForConclusion};
            _dataExaminingForConclusion.categories.forEach(categoriesItem => {
                if(categoriesItem.categoryName === categoryName){
                    categoriesItem.categoryContents.forEach(categoryContentsItem => {
                        if(categoryContentsItem.categoryContentTitle === categoryContentTitle){
                            categoryContentsItem.categoryContentQuestions = categoryContentsItem.categoryContentQuestions.filter(categoryContentQuestionsItem => categoryContentQuestionsItem.categoryContentQuestionName !== categoryContentQuestion.categoryContentQuestionName)
                        }
                    });
                }
            });

            setDataExaminingForConclusion(_dataExaminingForConclusion);
        }
    }

    const useStyles = makeStyles({
        root: {
          '&.Mui-disabled': {
            color: '#d32f2f', // Màu sắc khi checkbox bị vô hiệu hóa
          },
          '&.Mui-checked.Mui-disabled': {
            color: '#d32f2f', // Màu sắc khi checkbox bị vô hiệu hóa và đã được chọn
          },
        },
      });

    const classes = useStyles();

    useEffect(() => {
        if(dataPantientsReadyExamining.status === 1){
            const handleBeforeUnload = (e) => {
                const confirmationMessage = 'Bạn có chắc chắn muốn rời khỏi trang này?';
                e.returnValue = confirmationMessage; // Hiển thị thông báo cảnh báo
                return confirmationMessage;
            };

            const handleUnload = () => {
                sessionStorage.setItem('dataPantientsReadyExamining', JSON.stringify(dataPantientsReadyExamining));
                sessionStorage.setItem('dataExaminingForConclusion', JSON.stringify(dataExaminingForConclusion));
                sessionStorage.setItem('mainDataExamining', JSON.stringify(mainDataExamining))

                if(currentHealthRecordExamining){
                    sessionStorage.setItem('currentHealthRecordExamining', JSON.stringify(currentHealthRecordExamining))
                }

                if(prevDataPredecessor){
                    sessionStorage.setItem('prevDataPredecessor', JSON.stringify(prevDataPredecessor))
                }

                if(oldDataPredecessor){
                    sessionStorage.setItem('oldDataPredecessor', JSON.stringify(oldDataPredecessor))
                }
            };
        
            window.addEventListener('beforeunload', handleBeforeUnload);
            window.addEventListener('unload', handleUnload);
        
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
                window.removeEventListener('unload', handleUnload);
            };
        }
    }, [dataPantientsReadyExamining, mainDataExamining, currentHealthRecordExamining, dataExaminingForConclusion])

    useEffect(() => {
        if(loading === false && user){
            if(user.isCurrentDoctorExamining === true){
                handleGetRegistersByDateNow();
            }
            else if(user.isCurrentDoctorExamining === false){
                toast.error('Bạn không phải bác sĩ khám hôm nay, không thể dùng chức năng này', {toastId: 'error10'});
            }
        }
    }, [loading, user])

    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.keyCode === 112){
                event.preventDefault();
            }

            if(dataPantientsReadyExamining.patientsId !== '' && openAlertProcessingBackdrop === false && openModalCompleteExamining === false && event.keyCode !== 116){
                if(event.keyCode === 112 && dataPantientsReadyExamining.status === 1){
                    event.preventDefault();
                    handleCancelExamining();
                }

                else if(event.keyCode === 113 && prevDataExamining){
                    if(dataPantientsReadyExamining.status === 0 && dataPantientsReadyExamining.editExamining === false){
                        handleBeginExaminingForPantient();
                    }
                    else if(dataPantientsReadyExamining.status === 1){
                        alert(`Bạn đang trong quá trình khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}, vui lòng kết thúc đợt khám hiện tại để bắt đầu đợt khám mới!`);
                    }
                    else if(dataPantientsReadyExamining.status === 0  && dataPantientsReadyExamining.editExamining === true){
                        handleBeginEditExaminingForPantient();
                    }
                }

                else if(event.keyCode === 115){
                    if(dataPantientsReadyExamining.status === 1){
                        setTimeout(() => {
                            setOpenModalCompleteExamining(true);
                        }, 500)
                    }
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [dataPantientsReadyExamining, openModalCompleteExamining, openAlertProcessingBackdrop, openModalCompleteExamining])

    return (
        <>
            <Container maxWidth="xl" sx={{mt: 10.6}}>
                <Box sx={{ bgcolor: '#fff', height: 'auto'}} >
                    <Grid container spacing={2} sx={{pl: 0.6, pr: 0.6}}>

                        <Grid item xs={5}>
                            {/* <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{`${moment().format('dddd')}, ${moment().format('LL')}`}</Typography> */}
                            <TableContainer component={Paper} sx={{ height: '332px', boxShadow: 5, borderRadius: '10px' }}>
                                {loadingPatient ?
                                    <>
                                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#e0e0e0', height: '100%'}}>
                                            <CircularProgress />
                                            <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu, hãy chờ một chút...</Typography>
                                        </Box>        
                                    </>
                                    :
                                    <>
                                        <Box>
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
                                                <TextField sx={{mb: 0.6, width: 360, '& .MuiInputBase-inputSizeSmall': {textAlign: 'center'}}} size="small" 
                                                    variant="outlined" placeholder='Tìm với Mã BN hoặc Tên BN' value={searchPatientsQuery} onChange={(e) => handleSearchPantient(e.target.value)}
                                                    InputProps={{ // <-- This is where the toggle button is added.
                                                        startAdornment: (
                                                            <InputAdornment position='start'><SearchIcon/></InputAdornment>  
                                                        ),
                                                        endAdornment: (
                                                            <InputAdornment position='end'>
                                                                {searchPatientsQuery !== '' ? 
                                                                    <CloseIcon sx={{cursor: 'pointer'}} titleAccess='Xóa'
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
                                                {listDataPatientsRegisterSort.map((dataPantientItem, dataPantientIndex) => (
                                                    <TableRow hover role="checkbox" key={dataPantientItem.order}
                                                        sx={{ cursor: 'pointer', backgroundColor: dataPantientItem.state === 1 ? '#26c6da' : '#fff', 
                                                        ':hover': {backgroundColor: dataPantientItem.state === 1 ? '#00bcd4 !important' : 'rgba(0, 0, 0, 0.1) !important'} }} 
                                                        onClick={() => handleSelectPantientExamining(dataPantientItem)}
                                                    >
                                                        <TableCell align='left' sx={{width: '20px'}}>{dataPantientItem.order}</TableCell>
                                                        <TableCell align='left' sx={{width: '150px'}}>{dataPantientItem.patient.patientId}</TableCell>
                                                        <TableCell align='left' sx={{width: '240px'}}>{dataPantientItem.patient.fullName}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </>
                                }
                            </TableContainer>

                            {/* cây thư mục khám */}
                            <Box style={{width: '100%', marginTop: '8px', borderRadius: '10px', border: '2px solid red', height: '250px'}} >
                                {
                                    mainDataExamining.length === 0 && loadingCategoryExamining === false || prevDataExamining === false ?
                                        null
                                    :
                                    <>
                                        {loadingCategoryExamining ?
                                            <Box sx={{backgroundColor: '#e0e0e0', borderRadius: '10px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                <CircularProgress />
                                                <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu cây thư mục khám, hãy chờ một chút...</Typography>
                                            </Box>
                                        :
                                            <>
                                                <div className='category-scrollbar'>
                                                    <List sx={{p: 0, display: 'inline-grid'}}>
                                                        {mainDataExamining.categoryPres.map((predecessorItem, predecessorIndex) => (
                                                            <Box sx={{display: 'inline-flex'}} key={`category ${predecessorIndex}`}>
                                                                <ListItemButton
                                                                    sx={{
                                                                    width: 'fitContent', pt: '4px', pb: '4px', borderRadius: '8px', ':hover': {backgroundColor: categorySelectedExamining.categoryName === predecessorItem.categoryName ? '#ffc107' : 'rgba(0, 0, 0, 0.1)'},
                                                                    backgroundColor: categorySelectedExamining.categoryName === predecessorItem.categoryName ? '#ffd54f' : ''}} 
                                                                    onClick={() => handleSelectCategoryClick(predecessorItem)}
                                                                >
                                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                                        <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                                                        <ListItemText primary={predecessorItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                                                    </Box>
                                                                </ListItemButton>

                                                                {predecessorItem.newCategoryPre === true && predecessorItem.newPredecessor === true ? 
                                                                    null
                                                                :
                                                                    <>
                                                                        {predecessorItem.newCategoryPre === false  ?
                                                                            <>  
                                                                                <CheckCircleIcon sx={{color: 'green', fontSize: '1.4rem', margin: 'auto'}} titleAccess='đã theo dõi'/>
                                                                            </>
                                                                        :
                                                                            null
                                                                        }

                                                                        {mainDataExamining.newPredecessor ? 
                                                                            null
                                                                        :
                                                                            predecessorItem.isLock === true ?
                                                                                <>  
                                                                                    <IconButton edge="end" sx={{ml: 0.5, zIndex: 100}} onClick={() => handleEditDataPredecessor(predecessorItem.categoryName, predecessorItem.categoryOrder)}>
                                                                                        <EditIcon sx={{color: 'blue', fontSize: '1.6rem'}} titleAccess='Sửa'/>
                                                                                    </IconButton>
                                                                                </>
                                                                            
                                                                            :
                                                                                <>
                                                                                    <IconButton edge="end" sx={{ml: 0.5, zIndex: 100}} onClick={() => handleEditDataPredecessorForSaving(predecessorItem.categoryOrder)}>
                                                                                        <BeenhereIcon sx={{color: 'red', fontSize: '1.6rem'}} titleAccess='Lưu'/>
                                                                                    </IconButton>

                                                                                    <IconButton edge="end" sx={{ml: 0.5, zIndex: 100}} onClick={() => handleCancelEditDataPredecessor(predecessorItem.categoryName, predecessorItem.categoryOrder)}>
                                                                                        <CancelIcon sx={{color: 'red', fontSize: '1.6rem'}} titleAccess='Hủy'/>
                                                                                    </IconButton>
                                                                                </>   
                                                                        }                                  
                                                                    </>
                                                                }
                                                            </Box>
                                                        ))}

                                                        <ListItemButton 
                                                            sx={{pt: '4px', pb: '4px', borderRadius: '8px', backgroundColor: categorySelectedExamining.categoryName === 'Sổ sức khỏe' ? '#ffd54f' : '',
                                                                ':hover': {backgroundColor: categorySelectedExamining.categoryName === 'Sổ sức khỏe' ? '#ffc107' : 'rgba(0, 0, 0, 0.1)'}}} 
                                                            onClick={() => handleSelectHealthRecords(mainDataExamining.healthRecords)}
                                                        >
                                                            <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem', color: '#2962ff'}}}>
                                                                <SendIcon sx={{transform: categorySelectedExamining.categoryName === 'Sổ sức khỏe' ? 'rotate(90deg)' : 'rotate(0deg)'}} />
                                                            </ListItemIcon>

                                                            <ListItemText primary={'Sổ sức khỏe'} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>                                                    
                                                        </ListItemButton>

                                                        <Collapse in={openCollapseHealthRecords} timeout="auto" unmountOnExit>
                                                            <div style={{ paddingLeft: '24px' }}>
                                                                {mainDataExamining.healthRecords.map((healthRecordsItem, healthRecordsIndex) => (
                                                                    <ListItemButton key={`healthRecords ${healthRecordsIndex}`} sx={{pt: '0px', pb: '0px', width: 'auto', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}} 
                                                                        onClick={() => handleSelectHealthRecordsItem(healthRecordsItem.medicalBookId, healthRecordsItem.examinationName, healthRecordsItem.state)}>
                                                                        <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem', color: healthRecordsItem.state === 1 ? 'red' : '#009688'}}}>
                                                                            <FiberManualRecordIcon sx={{transform: categorySelectedExamining.categoryName === 'Sổ sức khỏe' ? 'rotate(90deg)' : 'rotate(0deg)'}} />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={healthRecordsItem.examinationName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                                                    </ListItemButton>
                                                                ))}
                                                            </div>
                                                        </Collapse>
                                                    </List>
                                                </div>
                                            </>
                                        }
                                    </>
                                }
                            </Box>
                            <div className='instruction' style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant='h6'><span style={{fontWeight: 'bolder', color: 'red'}}>F1</span> huỷ khám</Typography>
                                <Typography variant='h6'><span style={{fontWeight: 'bolder', color: 'deeppink'}}>F2</span> bắt đầu khám</Typography>
                                <Typography variant='h6'><span style={{fontWeight: 'bolder', color: 'blue'}}>F4</span> kết thúc khám</Typography>
                            </div>
                        </Grid>

                        <Grid item xs={7}>
                            {/* thông tin bệnh nhân */}
                            <Box sx={{boxShadow: 4, borderRadius: '20px', border: '2px solid blue', height: '220px', mb: '4px', overflow: 'auto'}}>
                                <Typography variant='h6' sx={{color: 'blue', mt: 0.6, mb: 0.6, fontWeight: 'bolder', fontSize: '1.2rem', textAlign: 'center'}}>Thông tin bệnh nhân</Typography>
                                <Box sx={{pl: 2.8, pr: 2.8, mt: 1}}>
                                    {loadingInfoPatient ?
                                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4}}>
                                            <CircularProgress color="inherit"/>
                                            <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải thông tin bệnh nhân, hãy chờ một chút...</Typography>
                                        </Box>
                                    :
                                        <>
                                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4}}>

                                                <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                                    <PinIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Mã BN: ${dataPantientsReadyExamining.patientsId || ''}`}</Typography>
                                                </Grid>
                                                <Grid item xs={5} sx={{display: 'inline-flex'}}>
                                                    <PersonIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Họ tên: ${dataPantientsReadyExamining.patientsName || ''}`}</Typography>
                                                </Grid>
                                                <Grid item xs={3} sx={{display: 'inline-flex'}}>
                                                    {dataPantientsReadyExamining.patientsGender === true ? <MaleIcon sx={{color: 'coral', fontSize: '27px'}}/> : <FemaleIcon sx={{color: 'coral', fontSize: '27px'}}/>}
                                                    <Typography variant='subtitle1' sx={{ml: 1}}>
                                                        {`Giới tính: ${dataPantientsReadyExamining.patientsGender !== '' ? dataPantientsReadyExamining.patientsGender === true ? 'Nam' : 'Nữ' : ''}`}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={4} sx={{display: 'inline-flex'}}>
                                                    <CalendarMonthIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Ngày sinh: {dataPantientsReadyExamining.patientsDOB ? moment(dataPantientsReadyExamining.patientsDOB).format("DD/MM/YYYY") : ''}</Typography>
                                                </Grid>
                                                <Grid item xs={5} sx={{display: 'inline-flex'}}>
                                                    <InfoIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Tháng tuổi: ${dataPantientsReadyExamining.patientsMonthsOld || ''}`}</Typography>
                                                </Grid>
                                                <Grid item xs={3} sx={{display: 'inline-flex'}}>
                                                    <PhoneIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Sdt: ${dataPantientsReadyExamining.patientsPhone || ''}`}</Typography>
                                                </Grid>
                                                
                                                <Grid item xs={dataPantientsReadyExamining.vaccination ? 3 : 4} sx={{display: 'inline-flex'}}>
                                                    <GiBodyHeight style={{color: 'tomato', fontSize: '1.42rem', marginLeft: '2px'}}/>
                                                    <Typography variant='subtitle1' sx={{ml: 0.8}}>
                                                        {`Chiều cao: ${dataPantientsReadyExamining.patientsHeight ? dataPantientsReadyExamining.patientsHeight + ' cm' : ''}`}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={dataPantientsReadyExamining.vaccination ? 3 : 4} sx={{display: 'inline-flex'}}>
                                                    <GiWeightScale style={{color: 'tomato', fontSize: '1.42rem'}}/>
                                                    <Typography variant='subtitle1' sx={{ml: 1}}>
                                                        {`Cân nặng: ${dataPantientsReadyExamining.patientsWeight ? dataPantientsReadyExamining.patientsWeight + ' kg' : ''}`}
                                                    </Typography>
                                                </Grid>

                                                {dataPantientsReadyExamining.vaccination ? 
                                                    null
                                                    :
                                                    <Grid item xs={1}/>
                                                }
                                                
                                                <Grid item xs={3} sx={{display: 'inline-flex'}}>
                                                    <TbRulerMeasure style={{color: 'tomato', fontSize: '1.42rem'}}/>
                                                    <Typography variant='subtitle1' sx={{ml: 1}}>
                                                        {`Vòng đầu: ${dataPantientsReadyExamining.patientsHeadCircumference ? dataPantientsReadyExamining.patientsHeadCircumference + ' cm' : ''}`}
                                                    </Typography>
                                                </Grid>

                                                {dataPantientsReadyExamining.vaccination ? 
                                                    <Grid item xs={3} sx={{display: 'inline-flex'}}>
                                                        <VaccinesIcon style={{color: 'tomato', fontSize: '1.42rem'}}/>
                                                        <Typography variant='subtitle1' sx={{ml: 1}}>Tham gia tiêm ngừa</Typography>
                                                    </Grid>
                                                    :
                                                    null
                                                }
                                                
                                                <Grid item xs={12} sx={{display: 'inline-flex'}}>
                                                    <Home sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Địa chỉ: ${dataPantientsReadyExamining.patientsAddress || ''}`}</Typography>
                                                </Grid> 

                                            </Grid>
                                        </>
                                    }
                                </Box>
                            </Box>

                            {/* nội dung khám */}
                            <div className='container-content-examining'>
                                {
                                    loadingPrevDataExamining ? 
                                        <>
                                            <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                <CircularProgress />
                                                <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu kỳ khám gần nhất, hãy chờ một chút...</Typography>
                                            </Box>
                                        </>
                                    :
                                    prevDataExamining ? 
                                        prevDataExamining.healthRecords.length === 1 && prevDataExamining.healthRecords[0].medicalBookId === null ? 
                                            <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                <Typography variant='h6'>Bệnh nhân không có kỳ khám trước</Typography>
                                            </Box>
                                        :
                                            <div className='content-examining'><PreviewLastExamining prevDataExamining={prevDataExamining} /></div>
                                    :
                                        null
                                }
                                
                                {contentCategorySelectedExamining.length !== 0 ? 
                                    <>
                                        <div className='content-examining' style={{height: healthRecordsContents.length === 0 ? '47.4vh' : '50vh'}}>
                                            {loadingContentsExamining ? 
                                                <>
                                                    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                        <CircularProgress />
                                                        <Typography variant='subtitle1' sx={{mt: 1}}>Đang tải dữ liệu sổ khám bệnh, hãy chờ một chút...</Typography>
                                                    </Box>
                                                </>
                                                :
                                                <>
                                                    {contentCategorySelectedExamining.isNullCategoryPres && contentCategorySelectedExamining.isLock === true ? 
                                                        <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                                            <Typography variant='h6'>Bệnh nhân không có tiền căn đang được theo dõi ở mục này</Typography>
                                                        </Box>
                                                    :
                                                        <Box sx={contentCategorySelectedExamining.categoryContentTitle === null ? {marginTop: '30px'} : {}}>
                                                            <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', mb: 0.2}}>{contentCategorySelectedExamining.categoryContentTitle || ''}</Typography>
                                                            {contentCategorySelectedExamining.categoryContentQuestions ? 
                                                                contentCategorySelectedExamining.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                                    <Box key={`categoryContentQuestionName ${questionIndex}`}>
                                                                        <Grid container rowSpacing={0}>

                                                                            {questionIndex === 0 ? 
                                                                                <>
                                                                                    <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{contentCategorySelectedExamining.categoryContentName}</Typography>
                                                                                    </Grid>

                                                                                    {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                        <>
                                                                                            <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                                <CheckBoxIcon sx={{fontSize: '1.22rem', color: 'gray'}}/><Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', margin: 'auto', lineHeight: '1.6'}}>{contentCategorySelectedExamining.categoryContentCheck}</Typography>
                                                                                            </Grid>

                                                                                            <Grid item xs={7} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                                <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>{contentCategorySelectedExamining.categoryContentText}</Typography>
                                                                                            </Grid>
                                                                                        </>
                                                                                        : 
                                                                                            <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                                <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{contentCategorySelectedExamining.categoryContentText}</Typography>
                                                                                            </Grid>
                                                                                    }                                                                             
                                                                                </> 
                                                                                : 
                                                                                null
                                                                            }

                                                                            <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', alignItems: 'center'}}>
                                                                                <Typography variant='subtitle1' sx={{fontSize: '1rem'}}>{questionItem.categoryContentQuestionName}</Typography>
                                                                            </Grid>
                                                                    
                                                                            {questionItem.categoryContentQuestionType === 'check' ? 
                                                                                <>
                                                                                    <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                        <Checkbox disabled={contentCategorySelectedExamining.isLock === true ? true : false} 
                                                                                        checked={questionItem.categoryContentAnswer === true ? true : false } 
                                                                                        classes={{ root: classes.root }} color='error' 
                                                                                        sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} 
                                                                                        onClick={() => contentCategorySelectedExamining.isLock === false ? handleAnswerCheckQuestionPredecessorForReExamOrBackExam(questionIndex, questionItem.categoryContentAnswer) : handleAnswerCheckQuestion(questionIndex, questionItem.categoryContentAnswer)} />
                                                                                    </Grid>

                                                                                    <Grid item xs={7} >
                                                                                        <div className='textfield-for-answer'>
                                                                                            <div className='suggest-note' key={`current ${currentContentExamining} - question ${questionIndex} - category ${contentCategorySelectedExamining.categoryContentOrder} - categoryPresOrder ${contentCategorySelectedExamining.categoryPresOrder} - isLock ${contentCategorySelectedExamining.isLock}`} >                                                                          
                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} disabled={contentCategorySelectedExamining.isLock === true ? true : false}
                                                                                                    onChange={(e) => contentCategorySelectedExamining.isLock === false ? handleNoteCheckQuestionPredecessorForReExamOrBackExam(questionIndex, e.target.value) : handleNoteCheckQuestion(questionIndex, e.target.value)}
                                                                                                    defaultValue={questionItem.categoryContentNote}
                                                                                                />
                                                                                            </div>
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>   
                                                                                :
                                                                                <>
                                                                                    <Grid item xs={8}>
                                                                                        <div className='textfield-for-answer' key={`current ${currentContentExamining} - question ${questionIndex} - category ${contentCategorySelectedExamining.categoryContentOrder} - categoryPresOrder ${contentCategorySelectedExamining.categoryPresOrder} - isLock ${contentCategorySelectedExamining.isLock}`} >
                                                                                            <input type='text' disabled={contentCategorySelectedExamining.isLock === true ? true : false}
                                                                                                className='value-for-answer' 
                                                                                                onChange={(e) => contentCategorySelectedExamining.isLock === false ? handleNoteValueQuestionPredecessorForReExamOrBackExam(questionIndex, e.target.value) : handleAnswerValueQuestion(questionIndex, e.target.value)} 
                                                                                                defaultValue={questionItem.categoryContentNote} 
                                                                                            />
                                                                                        </div>
                                                                                    </Grid>
                                                                                </>
                                                                            }
                                                                        </Grid>
                                                                    </Box>
                                                                ))
                                                                :
                                                                contentCategorySelectedExamining.healthRecordsContentsType === 'tree' && healthRecordsContents.length === 0 ? 
                                                                    <>
                                                                        <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', mb: 0.2}}>Khám và theo dõi sức khỏe định kỳ</Typography>
                                                                        <TableContainer component={Paper}>
                                                                            <Table stickyHeader>
                                                                                <TableHead>
                                                                                    <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
                                                                                        <TableCell align='left' sx={{fontSize: '0.9rem', color: 'black'}}>Kỳ khám</TableCell>
                                                                                        <TableCell align="left" sx={{fontSize: '0.9rem'}}>Trạng thái</TableCell>
                                                                                        <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày khám</TableCell>
                                                                                        <TableCell align="left" sx={{fontSize: '0.9rem'}}>Bác sĩ khám</TableCell>
                                                                                        <TableCell align="left" sx={{fontSize: '0.9rem'}}>Kết luận</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody sx={{borderRadius: '0px'}}>
                                                                                    {contentCategorySelectedExamining.categoryContents.map((healthRecordsItem, healthRecordsIndex) => (
                                                                                        <TableRow hover role="checkbox" key={healthRecordsIndex}>
                                                                                            <TableCell align='left' sx={{width: '158px'}}><DescriptionIcon sx={{mr: 0.5, mb: 0.4, color: 'dodgerblue'}}/>{healthRecordsItem.examinationName}</TableCell>
                                                                                            <TableCell align='left' sx={{width: '144px'}}>{handleRenderExamsStatus(healthRecordsItem.state)}</TableCell>
                                                                                            <TableCell align='left' sx={{width: '108px'}}>{moment(healthRecordsItem.timeRegister).format("DD/MM/YYYY")}</TableCell>
                                                                                            <TableCell align='left' sx={{width: '115px'}}>{healthRecordsItem.doctorFullName}</TableCell>
                                                                                            <TableCell align='left' sx={{width: 'auto'}}>{healthRecordsItem.conclusion}</TableCell>
                                                                                        </TableRow>
                                                                                    ))}
                                                                                </TableBody>
                                                                            </Table>
                                                                        </TableContainer>
                                                                    </>
                                                                :
                                                                <>
                                                                    <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', lineHeight: 1, mt: 1}}>{contentCategorySelectedExamining.healthRecordsName}</Typography>
                                                                    <div className='health-record-content'>
                                                                        <List sx={{p: 0}}>
                                                                            {contentCategorySelectedExamining.categoryPatients.map((categoryPatientsItem, categoryPatientsIndex) => (
                                                                                <div key={`categoryPatients ${categoryPatientsIndex}`}>
                                                                                    <ListItemButton     
                                                                                        sx={{pt: '0px', pb: '0px', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}}
                                                                                        onClick={() => handleOpenHealthRecordsItem(categoryPatientsIndex)}
                                                                                    >
                                                                                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                                                            <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff', transform: openCollapseHealthRecordsItem[categoryPatientsIndex] === true ? 'rotate(90deg)' : 'rotate(0deg)'}}}><SendIcon /></ListItemIcon>
                                                                                            <ListItemText primary={categoryPatientsItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                                                                        </Box>
                                                                                    </ListItemButton>

                                                                                    <Collapse in={openCollapseHealthRecordsItem[categoryPatientsIndex]} timeout="auto" unmountOnExit>
                                                                                        <div className='header-health-record' style={{marginTop: '0.4x', marginBottom: '0.4px', border: '2px solid #00bcd4', borderRadius: '20px'}}>
                                                                                            <Typography variant='subtitle1' sx={{fontWeight: 'bolder', textAlign: 'center'}}>{categoryPatientsItem.categoryContents.categoryContentTitle}</Typography>

                                                                                            <div className='content-health-record' style={{padding: '10px'}} >                                                                                                                                                                
                                                                                                <Grid container rowSpacing={0}>
                                                                                                    <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{categoryPatientsItem.categoryContents.categoryContentName}</Typography>
                                                                                                    </Grid>

                                                                                                    <Grid item xs={3} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                                        <CheckBoxIcon sx={{fontSize: '1.2rem', color: 'gray', mr: 0.4}}/>
                                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', lineHeight: '1.6'}}>{categoryPatientsItem.categoryContents.categoryContentCheck}</Typography>
                                                                                                    </Grid>

                                                                                                    <Grid item xs={5} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                                        <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>{categoryPatientsItem.categoryContents.categoryContentText}</Typography>
                                                                                                    </Grid> 
                                                                                                    
                                                                                                    {categoryPatientsItem.categoryContents.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                                                                        <Box key={`questionItem ${questionIndex} healthRecordsName ${contentCategorySelectedExamining.healthRecordsName}`} style={{display: 'flex', width: '100%'}}>
                                                                                                            <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', alignItems: 'center'}}>
                                                                                                                <Typography variant='subtitle1' sx={{fontSize: '1rem'}}>{questionItem.categoryContentQuestionName}</Typography>
                                                                                                            </Grid>

                                                                                                            {questionItem.categoryContentQuestionType === 'check' ?
                                                                                                                <>
                                                                                                                    <Grid item xs={3} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                                                        <Checkbox classes={{ root: classes.root }} checked={questionItem.categoryContentAnswer === true ? true : false }
                                                                                                                            disabled={contentCategorySelectedExamining.newMedicalBook === false ? true : false}
                                                                                                                            sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} color='error'
                                                                                                                            onClick={(e) => handleAnswerCheckQuestionHealthRecords(categoryPatientsIndex, categoryPatientsItem.currentHealthRecordsContent, questionIndex, questionItem.categoryContentAnswer)} 
                                                                                                                        />
                                                                                                                    </Grid>
                                                                                                                
                                                                                                                    <Grid item xs={5} >
                                                                                                                        <div className='note-for-answer'>
                                                                                                                            <div className='suggest-note' key={`current ${categoryPatientsItem.currentHealthRecordsContent}-${questionIndex}`}>                                                                          
                                                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} defaultValue={questionItem.categoryContentNote}
                                                                                                                                    disabled={contentCategorySelectedExamining.newMedicalBook === false ? true : false}
                                                                                                                                    onChange={(e) => handleNoteCheckQuestionHealthRecords(categoryPatientsIndex, categoryPatientsItem.currentHealthRecordsContent, questionIndex, e.target.value)}    
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </Grid>
                                                                                                                </>
                                                                                                            :
                                                                                                                <>
                                                                                                                    <Grid item xs={8} >
                                                                                                                        <div className='note-for-answer'>
                                                                                                                            <div className='suggest-note' key={`current ${categoryPatientsItem.currentHealthRecordsContent}-${questionIndex}`}>                                                                          
                                                                                                                                <TextareaAutosize className='textarea-autosize' rows={1} defaultValue={questionItem.categoryContentNote}
                                                                                                                                    disabled={contentCategorySelectedExamining.newMedicalBook === false ? true : false}
                                                                                                                                    onChange={(e) => handleNoteCheckQuestionHealthRecords(categoryPatientsIndex, categoryPatientsItem.currentHealthRecordsContent, questionIndex, e.target.value)}    
                                                                                                                                />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </Grid>
                                                                                                                </>
                                                                                                            }
                                                                                                        </Box>
                                                                                                    ))}
                                                                                                </Grid>
                                                                                            </div>

                                                                                            <div className='footer-content-examining' style={{backgroundColor: '#00bcd4', position: 'unset'}}>
                                                                                                <Pagination count={categoryPatientsItem.contentQuantity} page={categoryPatientsItem.currentHealthRecordsContent} 
                                                                                                    color="error" sx={{m: 'auto'}} onChange={(e, value) => handeOnChangePageHealthRecords(e, value, categoryPatientsIndex)}>
                                                                                                </Pagination>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Collapse>
                                                                                </div>
                                                                            ))}

                                                                            {contentCategorySelectedExamining.conclusion !== null ?
                                                                                <>
                                                                                    <div className='conclusion' style={{marginLeft: '16px', marginTop: '4px'}}>
                                                                                        <Typography variant='h6' sx={{color: 'blueviolet', fontWeight: 'bolder'}}>{`Kết luận của bác sĩ: ${contentCategorySelectedExamining.conclusion}`}</Typography>
                                                                                    </div>
                                                                                </>
                                                                                :
                                                                                    null
                                                                            }

                                                                        </List>
                                                                    </div>
                                                                </>
                                                            }
                                                        </Box>
                                                    }
                                                </>
                                            }
                                        </div>

                                        {contentCategorySelectedExamining.categoryContentQuestions ? 
                                                contentCategorySelectedExamining.isNullCategoryPres === true && contentCategorySelectedExamining.isLock === true ? 
                                                    null
                                                : 
                                                    <>
                                                        <div className='footer-content-examining'>
                                                            <Pagination count={categorySelectedExamining.contentQuantity} page={currentContentExamining} color="success" sx={{m: 'auto'}} onChange={(event, value) => handleOnChangePage(event, value)} />
                                                        </div>
                                                    </>
                                            :
                                            null
                                        }
                                    </>
                                :
                                    null
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            <CompleteExamining openModalCompleteExamining={openModalCompleteExamining} setOpenModalCompleteExamining={setOpenModalCompleteExamining} 
                handleCompleteExaminingForPantient={handleCompleteExaminingForPantient} dataExaminingForConclusion={dataExaminingForConclusion}
            />
            <AlertProcessingBackdrop 
                openAlertProcessingBackdrop={openAlertProcessingBackdrop} changeBackground={true}
            />
            {/* <AlertConfirm openAlertConfirmModal={openAlertConfirmModal.open} onCloseAlertConfirmModal={setOpenAlertConfirmModal} 
                titleConfirm={openAlertConfirmModal.title} setOpenModalCompleteExamining={setOpenModalCompleteExamining} 
            /> */}
        </>
    )
}

export default MainDoctorExamining