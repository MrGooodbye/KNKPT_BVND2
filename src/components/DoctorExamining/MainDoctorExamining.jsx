import React, { useState, useContext, useEffect, useRef } from 'react';
//fake data
import MainDataExaminingFake from '../../assets/data/MainDataExaminingFake.json'
import MainDataHealthRecordsFake from '../../assets/data/MainDataHealthRecordsFake.json'
//modal
import CompleteExamining from '../ManageCompleteExamining/CompleteExamining';
import AlertConfirm from '../ManageAlertConfirm/AlertConfirm';
import HealthRecords from '../ManageHealthRecords/HealthRecords';
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
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import Pagination from '@mui/material/Pagination';
import TextareaAutosize from 'react-textarea-autosize';
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
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import Home from '@mui/icons-material/Home';
import { GiBodyHeight } from "react-icons/gi";
import { GiWeightScale } from "react-icons/gi";
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

//moment
import moment from 'moment';
//scss
import './SCSS/DoctorExamining.scss';

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

    const listDataPantientsWaitExaminingFake = [
      {stt: 1, patientsId: '000001', patientsName: 'ABC', patientsDOB: '2000-01-01', patientsGender: '1', patientsHeight: 120, patientsWeight: 10, patientsPhone: '0987654321', patientsAddress: 'Hồ Chí Minh', status: 0},
      {stt: 2, patientsId: '000002', patientsName: 'Tạ Thị Phương Thảo', patientsDOB: '2023-12-10', patientsGender: '1', patientsHeight: 125, patientsWeight: 8, patientsPhone: '0987654321', patientsAddress: 'Hà Nội', status: 0},
      {stt: 3, patientsId: '000003', patientsName: 'GHI', patientsDOB: '2023-05-26', patientsGender: '0', patientsHeight: 135, patientsWeight: 19, patientsPhone: '0987654321', patientsAddress: 'Đà Nẵng', status: 0},
      {stt: 4, patientsId: '000004', patientsName: 'JKL', patientsDOB: '2023-01-10', patientsGender: '0', patientsHeight: 137, patientsWeight: 27, patientsPhone: '0987654321', patientsAddress: 'Thừa Thiên Huế', status: 0},
      {stt: 5, patientsId: '000005', patientsName: 'MNO', patientsDOB: '2023-11-22', patientsGender: '1', patientsHeight: 110, patientsWeight: 14, patientsPhone: '0987654321', patientsAddress: 'Cà Mau', status: 0},
  ]

    //state danh sách bệnh nhân chờ khám ban đầu
    const [listDataPantientsWaitExamining, setListDataPantientsWaitExamining] = useState(listDataPantientsWaitExaminingFake);

    //state thông tin bệnh nhân ban đầu 
    const [dataPantientsReadyExamining, setDataPantientsReadyExamining] = useState(dataPantientsReadyExaminingDefault);

    //state các category gồm tiêu đề nội dung khám và câu hỏi khám ban đầu
    const [mainDataExamining, setMainDataExamining] = useState([]);

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

    //state vị trí nội dung hiện tại
    const [currentContentExamining, setCurrentContentExamining] = useState(1);

    //state vị trí nội dung hiện tại của sổ khám bệnh
    const [currentContentHealthRecords, setCurrentContentHealthRecords] = useState(1);

    //state các câu hỏi được bác sĩ khám tích hoặc gõ vào
    const [dataExaminingForConclusion , setDataExaminingForConclusion ] = useState({});

    //state quản lý modal sổ sức khỏe
    const [openModalHealthRecords, setOpenModalHealthRecords] = useState(false);

    //state quản lý modal xác nhận
    const [openModalAlertConfirm, setOpenModalAlertConfirm] = useState(false);

    //state quản lý modal kết thúc khám
    const [openModalCompleteExamining, setOpenModalCompleteExamining] = useState(false);

    //nhấn chọn bệnh nhân để load vào ô thông tin bn
    const handleSelectPantientExamining = (dataPantientItem) => {
      if(dataPantientsReadyExamining.patientsId === ''){
        setDataPantientsReadyExamining(dataPantientItem);
      }
      else if(dataPantientsReadyExamining.patientsId !== ''){
        if(dataPantientsReadyExamining.status === 0){
          setDataPantientsReadyExamining(dataPantientItem);
        }
        else if(dataPantientsReadyExamining.status === 1){
          alert(`Bạn đang trong quá trình khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}, vui lòng kết thúc đợt khám để bắt đầu đợt khám mới!`);
        }
      }
    }

    //nhấn bắt đầu để khám bệnh cho bệnh nhân
    const handleBeginExaminingForPantient = () => {
        const _dataPantientsReadyExamining = {...dataPantientsReadyExamining};
        _dataPantientsReadyExamining.status = 1;
        setDataPantientsReadyExamining(_dataPantientsReadyExamining);

        MainDataExaminingFake.categoryPres.forEach((categoryPresItem, categoryPresIndex) => {
            categoryPresItem.categoryContents = categoryPresItem.categoryContents.map((categoryContentsItem, categoryContentsIndex) => {
                return {
                    ...categoryContentsItem,
                    categoryPresOrder: categoryPresIndex
                }
            })
            return {
                ...categoryPresItem,
            }
        })


        setMainDataExamining(MainDataExaminingFake);

        //setListDataPantientsWaitExamining((prevListDataPantientsWaitExamining) => prevListDataPantientsWaitExamining.filter((item) => item.patientsId !== _dataPantientsReadyExamining.patientsId));

        setListDataPantientsWaitExamining(prevListDataPantientsWaitExamining => 
            prevListDataPantientsWaitExamining.map(dataPantientitem => 
                dataPantientitem.patientsId === dataPantientsReadyExamining.patientsId ? { ...dataPantientitem, status: 1 } : dataPantientitem
            )
        )

        const editDataCategoryPresForConclusion = MainDataExaminingFake.categoryPres.map((categoryPresItem, categoryPresIndex) => {
            const mainCategoryContentsExamining = categoryPresItem.categoryContents.map((categoryContentsItem) => {
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
                categoryName: categoryPresItem.categoryName,
                categoryContents: mainCategoryContentsExamining
            }

            return mainCategoryExamining
        })

        const editDataHealthRecordsForConclusion = MainDataExaminingFake.healthRecords.find((healthRecordsItem) => healthRecordsItem.state === 1)

        setDataExaminingForConclusion({
            medicalRegisterId: editDataHealthRecordsForConclusion.medicalRegisterId,
            conclusion: editDataHealthRecordsForConclusion.conclusion,
            categories: editDataCategoryPresForConclusion
        });
    }

    //chọn mục lục để khám
    const handleSelectCategoryClick = (categoryIncludeCotent) => {
        if(openCollapseHealthRecords === true){
            setOpenCollapseHealthRecords(!openCollapseHealthRecords);
        }

        setCategorySelectedExamining(
            {
                ...categoryIncludeCotent,
                contentQuantity: categoryIncludeCotent.categoryContents.length
            }
        )

        setContentCategorySelectedExamining(categoryIncludeCotent.categoryContents[0]);

        setCurrentContentExamining(1);

        if(healthRecordsContents.length !== 0){
            setHealthRecordsContents([]);
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

    //chọn chỉ định một sổ khám bệnh 
    const handleSelectHealthRecordsItem = (medicalBookId, examinationName, healthRecordsState) => {
        setHealthRecordsContents({
            healthRecordsName: examinationName,
            newMedicalBook: MainDataHealthRecordsFake.medicakBook.newMedicalBook,
            categoryPatients: MainDataHealthRecordsFake.medicakBook.categories
        })

        const editHealthRecordsContent = MainDataHealthRecordsFake.medicakBook.categories.map((categoryPatientsItem, categoryPatientsIndex) => {
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
            newMedicalBook: MainDataHealthRecordsFake.medicakBook.newMedicalBook,
            conclusion: MainDataHealthRecordsFake.medicakBook.conclusion,
            categoryPatients: editHealthRecordsContent
        }

        setContentCategorySelectedExamining(updateHealthRecordsContent);

        if(healthRecordsState === 1){

            const editDataHealthRecordsItemForConclusion = MainDataHealthRecordsFake.medicakBook.categories.map((categoriesItem, categoriesIndex) => {
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
                    categoryContents: mainCategoryContentsExamining
                }

                return mainCategoryExamining
            })

            const _dataExaminingForConclusion = {...dataExaminingForConclusion};
            editDataHealthRecordsItemForConclusion.map((dataHealthRecordsItemForConclusionItem) => _dataExaminingForConclusion.categories.push(dataHealthRecordsItemForConclusionItem))
            setDataExaminingForConclusion(_dataExaminingForConclusion);
        }
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

            createSelectedQuestionsExaminingForConclusion();
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

            //createSelectedQuestionsExaminingForConclusion();
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
            _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentAnswer = takenValue;
            setCategorySelectedExamining(_categorySelectedExamining);

            createSelectedQuestionsExaminingForConclusion(
                _categorySelectedExamining.categoryName,
                currentContentExamining - 1,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex],
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentQuestions[questionIndex].categoryContentQuestionOrder,
                _categorySelectedExamining.categoryContents[currentContentExamining - 1].categoryContentTitle,
            )
        }, 100)
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
        }, 300)
    }

    const createSelectedQuestionsExaminingForConclusion = (categoryName, currentCategory, categoryContentQuestion, questionOrder, categoryContentTitle) => {
        //question dạng check nhưng answer là true
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
        //question dạng giá trị nhưng khác rỗng
        else if(categoryContentQuestion.categoryContentAnswer !== '' && categoryContentQuestion.categoryContentQuestionType === 'string'){
            //console.log(categoryName, currentCategory, categoryContentQuestion, questionOrder);
            const _dataExaminingForConclusion = {...dataExaminingForConclusion};
            // _dataExaminingForConclusion.categories.forEach((categoriesItem, categoriesIndex) => {
            //     if(categoriesItem.categoryName === categoryName){
            //         categoriesItem.categoryContents.forEach((categoryContentsItem) => {
            //             if(categoryContentsItem.categoryContentQuestions.length === 0){
            //                 categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion);
            //                 console.log('mảng rỗng')
            //             }
            //             else if(categoryContentsItem.categoryContentQuestions.length !== 0){
            //                 const check = categoryContentsItem.categoryContentQuestions.find((categoryContentQuestionsItem) => (categoryContentQuestionsItem.categoryContentQuestionName === categoryContentQuestion.categoryContentQuestionName))
            //                 if(check){
            //                     categoryContentsItem.categoryContentQuestions.forEach((categoryContentQuestionsItem) => {
            //                         if(categoryContentQuestionsItem.categoryContentQuestionName === categoryContentQuestion.categoryContentQuestionName)
            //                         {
            //                             categoryContentQuestionsItem.categoryContentAnswer = categoryContentQuestion.categoryContentAnswer;
            //                             //mảng đã có câu hỏi đã chọn
            //                             console.log('mảng đã có câu hỏi đã chọn')
            //                         } 
            //                     })
            //                 }
            //                 else{
            //                     categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion);
            //                     //mảng chưa có câu hỏi đã chọn
            //                     console.log('mảng chưa có câu hỏi đã chọn');
            //                 }
            //             }
            //         })
            //     }
            // })


            // _dataExaminingForConclusion.categories.forEach(categoriesItem => {
            //     // Duyệt qua từng categoryContentsItem trong categoryContents
            //     if(categoriesItem.categoryName === categoryName){
            //         categoriesItem.categoryContents.forEach(categoryContentsItem => {
            //             // Kiểm tra nếu categoryContentQuestions không rỗng
            //             if (categoryContentsItem.categoryContentQuestions.length === 0) {
            //                  // Nếu categoryContentQuestions rỗng, thêm mới đối tượng vào categoryContentQuestions
            //                  console.log('Nếu categoryContentQuestions rỗng, thêm mới đối tượng vào categoryContentQuestions');
            //                  categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion);
            //             } else {
            //                // Kiểm tra xem đã có categoryContentQuestionName chưa
            //                 const existingQuestion = categoryContentsItem.categoryContentQuestions.find(question => 
            //                     question.categoryContentQuestionName === categoryContentQuestion.categoryContentQuestionName
            //                 );
            
            //                 if (existingQuestion) {
            //                     // Nếu đã tồn tại, cập nhật categoryContentAnswer
            //                     existingQuestion.categoryContentAnswer = categoryContentQuestion.categoryContentAnswer;
            //                 } else {
            //                     // Nếu không tồn tại, thêm mới đối tượng vào categoryContentQuestions   
            //                     console.log('Nếu không tồn tại, thêm mới đối tượng vào categoryContentQuestions');
            //                     categoriesItem.categoryContents[currentCategory].categoryContentQuestions.push(categoryContentQuestion);
            //                 }
            //             }
            //         });       
            //     }
            // });

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
                                    existingQuestion.categoryContentAnswer = categoryContentQuestion.categoryContentAnswer;
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
        else if(categoryContentQuestion.categoryContentAnswer === '' && categoryContentQuestion.categoryContentQuestionType === 'string'){
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

    const handleAnswerValueQuestionHealthRecords = () => {

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
        const handleKeyDown = (event) => {
          if(dataPantientsReadyExamining.patientsId !== ''){
            if(event.keyCode === 113){
              if(dataPantientsReadyExamining.status === 0){
                handleBeginExaminingForPantient();
              }
              else if(dataPantientsReadyExamining.status === 1){
                alert(`Bạn đang trong quá trình khám cho bệnh nhân ${dataPantientsReadyExamining.patientsName}, vui lòng kết thúc đợt khám hiện tại để bắt đầu đợt khám mới!`);
              }
            }

            else if(event.keyCode === 115){
              if(dataPantientsReadyExamining.status === 1){
                if(openModalCompleteExamining === false){
                    setOpenModalAlertConfirm(true);
                }
              }
            }
          }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [dataPantientsReadyExamining, openModalCompleteExamining])

    return (
        <>
         <Container maxWidth="xl" sx={{mt: 10.6}}>
            <Box sx={{ bgcolor: '#fff', height: 'auto'}} >
                <Grid container spacing={2} sx={{pl: 0.6, pr: 0.6}}>
                    <Grid item xs={0.3}></Grid>

                    <Grid item xs={5}>
                        {/* <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>{`${moment().format('dddd')}, ${moment().format('LL')}`}</Typography> */}
                        <TableContainer component={Paper} sx={{ height: '332px', boxShadow: 4 }}>
                            <Box sx={{mt: 1.4, mb: 0.3}}>
                                <Stack direction='row' spacing={1} sx={{justifyContent: 'center'}}>
                                    <Badge badgeContent={10} color="error"><Chip label="BN chờ khám" color="info" clickable/></Badge>
                                    <Badge badgeContent={4} color="error"><Chip label="BN đang khám" variant="outlined" clickable/></Badge>
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
                                    {listDataPantientsWaitExamining.map((dataPantientItem, dataPantientIndex) => (
                                        <TableRow hover role="checkbox" key={dataPantientItem.stt}
                                        sx={{cursor: 'pointer', backgroundColor: dataPantientItem.status === 1 ? '#26c6da' : '#fff', 
                                            ':hover': {backgroundColor: dataPantientsReadyExamining.patientsName === dataPantientItem.patientsName && dataPantientItem.status === 1 ? '#00bcd4!important' : 'rgba(0, 0, 0, 0.1)!important'}
                                        }} 
                                        onClick={() => handleSelectPantientExamining(dataPantientItem)}>
                                            <TableCell align='left' sx={{width: '20px'}}>{dataPantientItem.stt}</TableCell>
                                            <TableCell align='left' sx={{width: '150px'}}>{dataPantientItem.patientsId}</TableCell>
                                            <TableCell align='left' sx={{width: '240px'}}>{dataPantientItem.patientsName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* cây thư mục khám */}
                        <Box style={{width: '100%', marginTop: '8px', borderRadius: '10px', border: '2px solid red', height: '270px'}} >
                            {mainDataExamining.length !== 0 ? 
                                <>
                                    <div className='category-scrollbar'>
                                        <List sx={{p: 0}}>
                                            {mainDataExamining.categoryPres.map((categoryItem, categoryIndex) => (
                                                <ListItemButton key={`category ${categoryIndex}`} 
                                                sx={{
                                                  pt: '4px', pb: '4px', borderRadius: '8px', ':hover': {backgroundColor: categorySelectedExamining.categoryName === categoryItem.categoryName ? '#ffc107' : 'rgba(0, 0, 0, 0.1)'},
                                                  backgroundColor: categorySelectedExamining.categoryName === categoryItem.categoryName ? '#ffd54f' : ''}} 
                                                  onClick={() => handleSelectCategoryClick(categoryItem)}>
                                                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                        <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                                        <ListItemText primary={categoryItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                                        {mainDataExamining.newCategoryPre === true ? 
                                                            null
                                                        :
                                                            <IconButton edge="end">
                                                                <CheckCircleIcon sx={{color: 'green', fontSize: '1.4rem'}} titleAccess='đã theo dõi'/>
                                                            </IconButton>
                                                        }
                                                    </Box>
                                                </ListItemButton>
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
                                                            <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem', color: '#009688'}}}>
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
                            :                
                                null
                            }
                        </Box>
                    </Grid>

                    <Grid item xs={0.25}></Grid>

                    <Grid item xs={6.3}>
                        {/* thông tin bệnh nhân */}
                        <Box sx={{boxShadow: 4, borderRadius: '20px', border: '2px solid blue', height: '220px', mb: '4px', overflow: 'auto'}}>
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
                                        <CalendarMonthIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Ngày sinh: {dataPantientsReadyExamining.patientsDOB ? moment(dataPantientsReadyExamining.patientsDOB).format("DD/MM/YYYY") : ''}</Typography>
                                    </Grid>
                                    <Grid item xs={4.5} sx={{display: 'inline-flex'}}>
                                        <InfoIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>{`Tháng tuổi: `}</Typography>
                                    </Grid>
                                    <Grid item xs={3.5} sx={{display: 'inline-flex'}}>
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

                        {/* nội dung khám */}
                        <div className='container-content-examining'>
                            {contentCategorySelectedExamining.length !== 0 ? 
                                <>
                                    <div className='content-examining' style={{height: healthRecordsContents.length === 0 ? '47.4vh' : '50vh'}}>
                                    {  
                                        <Box sx={contentCategorySelectedExamining.categoryContentTitle === null ? {marginTop: '30px'} : {}}>
                                            <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', mb: 0.2}}>{contentCategorySelectedExamining.categoryContentTitle || ''}</Typography>
                                            {/* {console.log(contentCategorySelectedExamining)} */}
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
                                                                        <Checkbox checked={questionItem.categoryContentAnswer === true ? true : false } color='error' sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} onClick={(e) => handleAnswerCheckQuestion(questionIndex, questionItem.categoryContentAnswer)}></Checkbox>
                                                                    </Grid>

                                                                    <Grid item xs={7} >
                                                                        <div className='textfield-for-answer'>
                                                                            <div className='suggest-note' key={`current ${currentContentExamining} - question ${questionIndex} - category ${contentCategorySelectedExamining.categoryContentOrder} - categoryPresOrder ${contentCategorySelectedExamining.categoryPresOrder}`} >                                                                          
                                                                                <TextareaAutosize className='textarea-autosize' rows={1} 
                                                                                    onChange={(e) => handleNoteCheckQuestion(questionIndex, e.target.value)}
                                                                                    defaultValue={questionItem.categoryContentNote}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </Grid>
                                                                </>   
                                                                :
                                                                <>
                                                                    <Grid item xs={8}>
                                                                        <div className='textfield-for-answer' 
                                                                        key={`current ${currentContentExamining} - question ${questionIndex} - category ${contentCategorySelectedExamining.categoryContentOrder} - categoryPresOrder ${contentCategorySelectedExamining.categoryPresOrder}`} >
                                                                            <input type='text' className='value-for-answer' 
                                                                                onChange={(e) => handleAnswerValueQuestion(questionIndex, e.target.value)} 
                                                                                defaultValue={questionItem.categoryContentAnswer} 
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
                                                                                <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                                                                <ListItemText primary={categoryPatientsItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                                                            </Box>
                                                                        </ListItemButton>

                                                                        <Collapse in={openCollapseHealthRecordsItem[categoryPatientsIndex]} timeout="auto" unmountOnExit>
                                                                            <div className='header-health-record' style={{marginTop: '0.4x', marginBottom: '0.4px', border: '2px solid #00bcd4', borderRadius: '20px'}}>
                                                                                <Typography variant='subtitle1' sx={{fontWeight: 'bolder', textAlign: 'center'}}>{categoryPatientsItem.categoryContents.categoryContentTitle}</Typography>

                                                                                <div className='content-health-record' style={{padding: '10px'}}>                                                                                                                                                                
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
                                                                                            <Box key={`questionItem ${questionIndex}`} style={{display: 'flex', width: '100%'}}>
                                                                                                <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', alignItems: 'center'}}>
                                                                                                    <Typography variant='subtitle1' sx={{fontSize: '1rem'}}>{questionItem.categoryContentQuestionName}</Typography>
                                                                                                </Grid>
                                                                                        
                                                                                                <Grid item xs={3} 
                                                                                                sx={{border: '2px solid rgb(218,220,224)', borderTop: '0px', borderRight: '0px', p: 0.5, display: 'flex', justifyContent: 'center'}}>
                                                                                                    <Checkbox disabled={contentCategorySelectedExamining.newMedicalBook === true ? false : true} 
                                                                                                        classes={{ root: classes.root }}
                                                                                                        checked={questionItem.categoryContentAnswer === true ? true : false }
                                                                                                        sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} color='error'
                                                                                                        onClick={(e) => handleAnswerCheckQuestionHealthRecords(categoryPatientsIndex, categoryPatientsItem.currentHealthRecordsContent, questionIndex, questionItem.categoryContentAnswer)} />
                                                                                                </Grid>
                                                                                                    
                                                                                                <Grid item xs={5} >
                                                                                                    <div className='note-for-answer'>
                                                                                                        <div className='suggest-note' key={`current ${categoryPatientsItem.currentHealthRecordsContent}-${questionIndex}`}>                                                                          
                                                                                                            <TextareaAutosize className='textarea-autosize' rows={1} 
                                                                                                                disabled={contentCategorySelectedExamining.newMedicalBook === true ? false : true}
                                                                                                                onChange={(e) => handleNoteCheckQuestionHealthRecords(categoryPatientsIndex, categoryPatientsItem.currentHealthRecordsContent, questionIndex, e.target.value)}
                                                                                                                defaultValue={questionItem.categoryContentNote}
                                                                                                            />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </Grid>
                                                                                            </Box>
                                                                                        ))}
                                                                                    </Grid>
                                                                                </div>

                                                                                <div className='footer-content-examining' style={{backgroundColor: '#00bcd4'}}>
                                                                                    <Pagination count={categoryPatientsItem.contentQuantity} page={categoryPatientsItem.currentHealthRecordsContent} 
                                                                                        color="error" sx={{m: 'auto'}} onChange={(e, value) => handeOnChangePageHealthRecords(e, value, categoryPatientsIndex)}>
                                                                                    </Pagination>
                                                                                </div>
                                                                            </div>
                                                                        </Collapse>
                                                                    </div>
                                                                ))}

                                                                {contentCategorySelectedExamining.newMedicalBook === false ?
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
                                    </div>

                                    {contentCategorySelectedExamining.categoryContentQuestions ? 
                                    <>
                                        <div className='footer-content-examining'>
                                            <Pagination count={categorySelectedExamining.contentQuantity} page={currentContentExamining} color="success" sx={{m: 'auto'}} onChange={(event, value) => handleOnChangePage(event, value)}/>
                                        </div>
                                    </>
                                    :
                                        <></>
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

        <HealthRecords openModalHealthRecords={openModalHealthRecords} setOpenModalHealthRecords={setOpenModalHealthRecords} />
        <CompleteExamining openModalCompleteExamining={openModalCompleteExamining} setOpenModalCompleteExamining={setOpenModalCompleteExamining} dataExaminingForConclusion={dataExaminingForConclusion}/>
        <AlertConfirm openModalAlertConfirm={openModalAlertConfirm} setOpenModalAlertConfirm={setOpenModalAlertConfirm} setOpenModalCompleteExamining={setOpenModalCompleteExamining} />
    </>
    )
}

export default MainDoctorExamining