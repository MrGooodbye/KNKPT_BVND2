import React, { useState, useContext, useEffect, useRef } from 'react';
//modal
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
//mui x date picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
//toast
import {toast} from 'react-toastify';
//lodash
import _ from 'lodash';
//moment
import moment from 'moment';
//api
import { getListProvince, getListDistrict, getListWard, getFullAddressByIdWard } from '../../Service/PlaceService';
import { updateMedicalRegister, getListMedicalExaminationsGiveRegister } from '../../Service/MedicalRegisterService';

function ManageInfoPantients(props) {
  const dataPatientInfoDefault = {
    examinationId: "",
    height: "",
    weight: "",
    headCircumference: "",
    reason: "",
    vaccination: false,
    id: "",
    patient: {
      identifier: "",
      address: "",
      fullName: "",
      dayOfBirth: null,
      codeWard: "",
      gender: true,
      fullNameMother: "",
      phoneMother: "",
      fullNameFather: "",
      phoneFather: "",
      patientId: ""
    }
  }

  const dataPatientInfoErrorDefault = {
    identifier: { title: '', isError: false, openTooltip: false, focus: false },
    fullName: { title: '', isError: false, openTooltip: false, focus: false },
    gender: { title: '', isError: false, openTooltip: false, focus: false },
    dayOfBirth: { title: '', isError: false, openTooltip: false, focus: false },
    examiningSession: { title: '', isError: false, openTooltip: false, focus: false },
    province: { title: '', isError: false, openTooltip: false, focus: false },
    district: { title: '', isError: false, openTooltip: false, focus: false },
    ward: { title: '', isError: false, openTooltip: false, focus: false },
    address: { title: '', isError: false, openTooltip: false, focus: false },
    fullNameMother: { title: '', isError: false, openTooltip: false, focus: false },
    phoneMother: { title: '', isError: false, openTooltip: false, focus: false },
    phoneFather: { title: '', isError: false, openTooltip: false, focus: false },
    height: { title: '', isError: false, openTooltip: false, focus: false },
    weight: { title: '', isError: false, openTooltip: false, focus: false },
    headCircumference: { title: '', isError: false, openTooltip: false, focus: false },
  } 

  const listGender = [
    {genderOrder: 1, genderName: 'Nam', genderValue: true},
    {genderOrder: 2, genderName: 'Nữ', genderValue: false},
  ]

  const selectedAutoCompleteDefault = { 
    gender: { value: null, openOption: false }, 
    examiningSession: {value: null, openOption: false, loading: false},
    province: { value: null, openOption: false }, 
    district: { value: null, openOption: false }, 
    ward: { value: null, openOption: false },
  }

  const typingRef = useRef(null);
  const dateFieldRef = useRef(null);

  const [loading, setLoading] = useState();

  const [dataPatientInfoNotEdit, setDataPatientInfoNotEdit] = useState();
  const [dataPatientInfo, setDataPatientInfo] = useState(dataPatientInfoDefault);
  const [dataPatientInfoError, setDataPatientInfoError] = useState(dataPatientInfoErrorDefault);
    
  const [selectedAutoComplete, setSelectedAutoComplete] = useState(selectedAutoCompleteDefault);

  const [listExaminingSession, setListExaminingSession] = useState([]);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState({list: [], loading: false});
  const [listWard, setListWard] = useState({list: [], loading: false});

  const [focusField, setFocusField] = useState(null);

  const [openAlertProcessing, setOpenAlertProcessing] = useState(false);

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
          slotProps: {
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -8],
                  },
                },
              ],
            },
          },
        },
      },
    },
  });

  const handleFocus = (fieldName) => {
    if(fieldName === 'Gender'){
      setSelectedAutoComplete(prevSelectedAutoComplete  => {
        prevSelectedAutoComplete.gender.openOption = true
        return {...prevSelectedAutoComplete}
      })
    }
    else if(fieldName === 'ExaminingSession'){
      setSelectedAutoComplete(prevSelectedAutoComplete  => {
        prevSelectedAutoComplete.examiningSession.openOption = true
        return {...prevSelectedAutoComplete}
      })
    }
    else if(fieldName === 'Province'){
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.province.openOption = true
        return {...prevSelectedAutoComplete}
      })
    }
    else if (fieldName === 'District'){
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.district.openOption = true
        return {...prevSelectedAutoComplete}
      })
    }
    else{
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.ward.openOption = true
        return {...prevSelectedAutoComplete}
      })
    }
  }

  const handleBlur = (value, fieldName) => {
    if(value === '' || value === 'DD/MM/YYYY'){
      //const _dataPatientInfoError = {...dataPatientInfoError};
      // if(fieldName === 'patientId'){
      //   _dataPatientInfoError.patientId.title = '';
      //   _dataPatientInfoError.patientId.openTooltip = false;
      //   setDataPatientInfoError(_dataPatientInfoError);
      // }
      // if(fieldName === 'dayOfBirth'){
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientInfoError.dayOfBirth.title = '';
      //     _dataPatientInfoError.dayOfBirth.openTooltip = false;
      //     _dataPatientInfoError.dayOfBirth.isError = false;
      //     setDataPatientInfoError(_dataPatientInfoError);
      //   }, 10)
      // }
      // if(fieldName === 'PhoneMother'){     
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientInfoError.phoneMother.title = '';
      //     _dataPatientInfoError.phoneMother.openTooltip = false;
      //     _dataPatientInfoError.phoneMother.isError = false;
      //     setDataPatientInfoError(_dataPatientInfoError);
      //   }, 10)
      // }
      // if(fieldName === 'PhoneFather'){
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientInfoError.phoneFather.title = '';
      //     _dataPatientInfoError.phoneFather.openTooltip = false;
      //     _dataPatientInfoError.phoneFather.isError = false;
      //     setDataPatientInfoError(_dataPatientInfoError);
      //   }, 10)
      // }
      // if(fieldName === 'Gender'){
      //   setSelectedAutoComplete(prevSelectedAutoComplete => {
      //     prevSelectedAutoComplete.gender.openOption = false;
      //     return {...prevSelectedAutoComplete}
      //   })
      // }
      // if(fieldName === 'ExaminingSession'){
      //   setSelectedAutoComplete(prevSelectedAutoComplete  => {
      //     prevSelectedAutoComplete.examiningSession.openOption = false
      //     return {...prevSelectedAutoComplete}
      //   })
      // }
      // if(fieldName === 'Province'){
      //   setSelectedAutoComplete(prevSelectedAutoComplete => {
      //     prevSelectedAutoComplete.province.openOption = false;
      //     return {...prevSelectedAutoComplete}
      //   })
      // }
      // if(fieldName === 'District'){
      //   setSelectedAutoComplete(prevSelectedAutoComplete => {
      //     prevSelectedAutoComplete.district.openOption = false;
      //     return {...prevSelectedAutoComplete}
      //   })
      // }
      // if(fieldName === 'Ward'){
      //   setSelectedAutoComplete(prevSelectedAutoComplete => {
      //     prevSelectedAutoComplete.ward.openOption = false;
      //     return {...prevSelectedAutoComplete}
      //   })
      // }
    }
    else if(value !== ''){
      if(fieldName === 'Gender'){
        setSelectedAutoComplete(prevSelectedAutoComplete => {
          prevSelectedAutoComplete.gender.openOption = false;
          return {...prevSelectedAutoComplete}
        })
      }
      else if(fieldName === 'ExaminingSession'){
        setSelectedAutoComplete(prevSelectedAutoComplete  => {
          prevSelectedAutoComplete.examiningSession.openOption = false
          return {...prevSelectedAutoComplete}
        })
      }
      else if(fieldName === 'Province'){
        setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.province.openOption = false;
          return {...prevSelectedAutoComplete}
        })
      }
      else if(fieldName === 'District'){
        setSelectedAutoComplete(prevSelectedAutoComplete => {
          prevSelectedAutoComplete.district.openOption = false;
          return {...prevSelectedAutoComplete}
        })
      }
      else if(fieldName === 'Ward'){
        setSelectedAutoComplete(prevSelectedAutoComplete => {
          prevSelectedAutoComplete.ward.openOption = false;
          return {...prevSelectedAutoComplete}
        })
      }
    }
  };

  const handleKeyDown = (event) => {
    if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Tab') 
    {
      event.preventDefault();
    }
  }

  const filterOptions = (options, { inputValue }) => {
    const lowercasedInput = inputValue.toLowerCase();
  
    return options.filter(option => {
      const lowercasedFullName = option.fullName.toLowerCase();
      const initials = option.fullName.split(' ').map(word => word[0]).join('').toLowerCase();
  
      return (lowercasedFullName.includes(lowercasedInput) || initials.includes(lowercasedInput));
    });
  };

  const onChangeIdentifier = (value) => {
    if(value !== ''){
      if(focusField === 'identifier'){
        setFocusField(null);
      }

      const takenValue = value;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }

      typingRef.current = setTimeout(() => {
        const _dataPatientInfoError = {...dataPatientInfoError}
        if(takenValue.length < 12){
          _dataPatientInfoError.identifier.title = 'Mã định danh chưa đủ 12 số';
          _dataPatientInfoError.identifier.openTooltip = true;
          _dataPatientInfoError.identifier.isError = true;
          _dataPatientInfoError.identifier.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
        else{
          setDataPatientInfo(prevDataPatientsRegister => {
            prevDataPatientsRegister.patient.identifier = takenValue
            return { ...prevDataPatientsRegister }
          })

          _dataPatientInfoError.identifier.title = '';
          _dataPatientInfoError.identifier.openTooltip = false;
          _dataPatientInfoError.identifier.isError = false;
          _dataPatientInfoError.identifier.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
      }, 100)
    }
    else{
      if(focusField === 'identifier'){
        setFocusField(null);
      }

      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.identifier.title = '';
      _dataPatientInfoError.identifier.openTooltip = false;
      _dataPatientInfoError.identifier.isError = false;
      _dataPatientInfoError.identifier.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }  
  }

  const onChangeFullName = (value) => {
    const takenValue = value
    
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
      prevDataPatientInfo.patient.fullName = takenValue
        return {...prevDataPatientInfo}
      })

      if(focusField === 'fullName'){
        setFocusField(null);
      }
    
      if(dataPatientInfoError.fullName.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.fullName.title = '';
        _dataPatientInfoError.fullName.openTooltip = false;
        _dataPatientInfoError.fullName.isError = false;
        _dataPatientInfoError.fullName.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangeDOB = async (value) => {
    if(value){
      const takenValue = value._d;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }
    
      typingRef.current = setTimeout(() => {
        const today = new Date();
        const yearsDifference = today.getFullYear() - takenValue.getFullYear();
        const monthsDifference = today.getMonth() - takenValue.getMonth();
        const daysDifference = today.getDate() - takenValue.getDate();
        const age = today.getFullYear() - takenValue.getFullYear();

        let totalMonths = yearsDifference * 12 + monthsDifference;
        let totalDays = daysDifference;

        if (daysDifference < 0) {
          totalMonths -= 1;
          totalDays += 30; // Giả sử mỗi tháng có 30 ngày
        }
            
        const _dataPatientInfoError = {...dataPatientInfoError}
    
        if(today < takenValue || isNaN(age) || totalMonths > 24 || (totalMonths === 24 && totalDays > 29)){
          _dataPatientInfoError.dayOfBirth.title = 'Bệnh nhân lớn hơn 24 tháng tuổi không thể khám';
          _dataPatientInfoError.dayOfBirth.openTooltip = true;
          _dataPatientInfoError.dayOfBirth.isError = true;
          _dataPatientInfoError.dayOfBirth.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
    
        else{
          const formattedDate = moment(takenValue).format('YYYY-MM-DD');
          setDataPatientInfo(prevDataPatientInfo => {
            prevDataPatientInfo.patient.dayOfBirth = formattedDate
            return {...prevDataPatientInfo}
          })
    
          _dataPatientInfoError.dayOfBirth.title = '';
          _dataPatientInfoError.dayOfBirth.openTooltip = false;
          _dataPatientInfoError.dayOfBirth.isError = false;
          _dataPatientInfoError.dayOfBirth.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);

          onChangeDOBToGetExaminingSession(formattedDate);
        }
      }, 100)
    }  
  }

  const onChangeDOBToGetExaminingSession = async (formattedDate) => {
    setSelectedAutoComplete(prevSelectedAutoComplete => {
      prevSelectedAutoComplete.examiningSession.value = null
      return {...prevSelectedAutoComplete}
    })

    setSelectedAutoComplete(prevSelectedAutoComplete => {
      prevSelectedAutoComplete.examiningSession.loading = true
      return {...prevSelectedAutoComplete}
    });

    const responseListMedicalExaminationsGiveRegister = await getListMedicalExaminationsGiveRegister(formattedDate);
    setListExaminingSession(responseListMedicalExaminationsGiveRegister.exams);

    setSelectedAutoComplete(prevSelectedAutoComplete => {
      prevSelectedAutoComplete.examiningSession.loading = false
      return {...prevSelectedAutoComplete}
    });
  }

  const onSelectGender = (e, value) => {
    if(focusField === 'gender'){
      setFocusField(null);
    }

    setDataPatientInfo(prevDataPatientInfo=> {
      prevDataPatientInfo.patient.gender = value.genderValue
      return {...prevDataPatientInfo}
    })

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.gender.value = value
      return{...prevSelectedAutoComplete}
    })
    
    if(dataPatientInfoError.gender.isError){
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.gender.isError = false;
      _dataPatientInfoError.gender.title = '';
      _dataPatientInfoError.gender.openTooltip = false;
      _dataPatientInfoError.gender.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }
  }

  const onSelectExaminingSession = (e, value) => {
    if(focusField === 'examiningSession'){
      setFocusField(null);
    }

    setDataPatientInfo(prevDataPatientInfo=> {
      prevDataPatientInfo.examinationId = value.id
      return {...prevDataPatientInfo}
    })

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.examiningSession.value = value
      return{...prevSelectedAutoComplete}
    })

    if(dataPatientInfoError.examiningSession.isError){
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.examiningSession.isError = false;
      _dataPatientInfoError.examiningSession.title = '';
      _dataPatientInfoError.examiningSession.openTooltip = false;
      _dataPatientInfoError.examiningSession.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }
  }

  const onSelectProvine = async (e, value) => {
    if(focusField === 'province'){
      setFocusField(null);
    }

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.province.value = value
      return{...prevSelectedAutoComplete}
    })

    if(selectedAutoComplete.district.value !== null){
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.district.value = null
        return {...prevSelectedAutoComplete}
      })
    }

    if(selectedAutoComplete.ward.value !== null){
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.ward.value = null
        return {...prevSelectedAutoComplete}
      })
    }

    if(dataPatientInfoError.province.isError){
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.province.isError = false;
      _dataPatientInfoError.province.title = '';
      _dataPatientInfoError.province.openTooltip = false;
      _dataPatientInfoError.province.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }

    setListWard(prevListWard => {
      prevListWard.list = []
      return {...prevListWard}
    });

    setListDistrict(prevListDistrict => {
      prevListDistrict.loading = true
      return {...prevListDistrict}
    });

    const responseListDistrict = await getListDistrict(value.code);
    setListDistrict(prevListDistrict => {
      prevListDistrict.loading = false
      prevListDistrict.list = responseListDistrict
      return {...prevListDistrict}
    });
  }

  const onSelectDistrict = async (e, value) => {
    if(focusField === 'district'){
      setFocusField(null);
    }

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.district.value = value;
      return{ ...prevSelectedAutoComplete }
    })

    if(selectedAutoComplete.ward.value !== null){
      setSelectedAutoComplete(prevSelectedAutoComplete => {
        prevSelectedAutoComplete.ward.value = null
        return {...prevSelectedAutoComplete}
      })
    }

    if(dataPatientInfoError.district.isError){
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.district.isError = false;
      _dataPatientInfoError.district.title = '';
      _dataPatientInfoError.district.openTooltip = false;
      _dataPatientInfoError.district.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }

    setListWard(prevListWard => {
      prevListWard.loading = true
      return {...prevListWard}
    });

    const responseListWard = await getListWard(value.code);
    setListWard(prevListWard => {
      prevListWard.loading = false
      prevListWard.list = responseListWard
      return {...prevListWard}
    })
  }

  const onSelectWard = (e, value) => {
    if(focusField === 'ward'){
      setFocusField(null);
    }

    setDataPatientInfo(prevDataPatientInfo => {
      prevDataPatientInfo.patient.codeWard = value.code
      return { ...prevDataPatientInfo }
    })

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.ward.value = value;
        return{ ...prevSelectedAutoComplete }
    })

    if(dataPatientInfoError.ward.isError){
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.ward.isError = false;
      _dataPatientInfoError.ward.title = '';
      _dataPatientInfoError.ward.openTooltip = false;
      _dataPatientInfoError.ward.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }
  }

  const onChangeAddress = (value) => {
    if(focusField === 'address'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.patient.address = takenValue
        return { ...prevDataPatientInfo }
      })
    
      if(dataPatientInfoError.address.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.address.isError = false;
        _dataPatientInfoError.address.title = '';
        _dataPatientInfoError.address.openTooltip = false;
        _dataPatientInfoError.address.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangeFullNameMother = (value) => {
    if(focusField === 'fullNameMother'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.patient.fullNameMother = takenValue
        return { ...prevDataPatientInfo }
      })
    
      if(dataPatientInfoError.fullNameMother.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.fullNameMother.isError = false;
        _dataPatientInfoError.fullNameMother.title = '';
        _dataPatientInfoError.fullNameMother.openTooltip = false;
        _dataPatientInfoError.fullNameMother.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangePhoneMother = (value) => {
    if(focusField === 'phoneMother'){
      setFocusField(null);
    }

    if(value !== ''){
      const takenValue = value;

      if(typingRef.current){
        clearInterval(typingRef.current);
      }
      
      typingRef.current = setTimeout(() => {
        const _dataPatientInfoError = {...dataPatientInfoError}
        if(takenValue.length < 10){
          _dataPatientInfoError.phoneMother.title = 'Số điện thoại chưa đủ 10 số';
          _dataPatientInfoError.phoneMother.openTooltip = true;
          _dataPatientInfoError.phoneMother.isError = true;
          _dataPatientInfoError.phoneMother.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
          
        else{
          setDataPatientInfo(prevDataPatientInfo => {
            prevDataPatientInfo.patient.phoneMother = takenValue
            return {...prevDataPatientInfo} 
          })
      
          _dataPatientInfoError.phoneMother.title = '';
          _dataPatientInfoError.phoneMother.openTooltip = false;
          _dataPatientInfoError.phoneMother.isError = false;
          _dataPatientInfoError.phoneMother.focus = false;
      
          _dataPatientInfoError.phoneFather.title = '';
          _dataPatientInfoError.phoneFather.openTooltip = false;
          _dataPatientInfoError.phoneFather.isError = false;
          _dataPatientInfoError.phoneFather.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
      }, 10)
    }

    else{
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.phoneMother.title = '';
      _dataPatientInfoError.phoneMother.openTooltip = false;
      _dataPatientInfoError.phoneMother.isError = false;
      _dataPatientInfoError.phoneMother.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }  
  }

  const onChangeFullNameFather = (value) => {
    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.patient.fullNameFather = takenValue
        return {...prevDataPatientInfo}
      })
    
      if(dataPatientInfoError.fullNameMother.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.fullNameMother.isError = false;
        _dataPatientInfoError.fullNameMother.title = '';
        _dataPatientInfoError.fullNameMother.openTooltip = false;
        _dataPatientInfoError.fullNameMother.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangePhoneFather = (value) => {
    if(focusField === 'phoneFather'){
      setFocusField(null);
    }

    if(value !== ''){
      const takenValue = value;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }
      
      typingRef.current = setTimeout(() => {
        const _dataPatientInfoError = {...dataPatientInfoError}
        if(takenValue.length < 10){
          _dataPatientInfoError.phoneFather.title = 'Số điện thoại chưa đủ 10 số';
          _dataPatientInfoError.phoneFather.openTooltip = true;
          _dataPatientInfoError.phoneFather.isError = true;
          _dataPatientInfoError.phoneFather.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }

        else{
          setDataPatientInfo(prevDataPatientInfo => {
            prevDataPatientInfo.patient.phoneFather = takenValue
            return {...prevDataPatientInfo} 
          })
                
          _dataPatientInfoError.phoneFather.title = '';
          _dataPatientInfoError.phoneFather.openTooltip = false;
          _dataPatientInfoError.phoneFather.isError = false;
          _dataPatientInfoError.phoneFather.focus = false;
                
          _dataPatientInfoError.phoneMother.title = '';
          _dataPatientInfoError.phoneMother.openTooltip = false;
          _dataPatientInfoError.phoneMother.isError = false;
          _dataPatientInfoError.phoneMother.focus = false;
          setDataPatientInfoError(_dataPatientInfoError);
        }
      }, 100)
    }

    else{
      const _dataPatientInfoError = {...dataPatientInfoError}
      _dataPatientInfoError.phoneFather.title = '';
      _dataPatientInfoError.phoneFather.openTooltip = false;
      _dataPatientInfoError.phoneFather.isError = false;
      _dataPatientInfoError.phoneFather.focus = false;
      setDataPatientInfoError(_dataPatientInfoError);
    }  
  }

  const onChangeHeight = (value) => {
    if(focusField === 'height'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.height = takenValue
        return {...prevDataPatientInfo}
      })
    
      if(dataPatientInfoError.height.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.height.title = '';
        _dataPatientInfoError.height.openTooltip = false;
        _dataPatientInfoError.height.isError = false;
        _dataPatientInfoError.height.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangeWeight = (value) => {
    if(focusField === 'weight'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.weight = takenValue
        return {...prevDataPatientInfo}
      })
    
      if(dataPatientInfoError.weight.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.weight.title = '';
        _dataPatientInfoError.weight.openTooltip = false;
        _dataPatientInfoError.weight.isError = false;
        _dataPatientInfoError.weight.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangeHeadCircumference = (value) => {
    if(focusField === 'headCircumference'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }
    
    typingRef.current = setTimeout(() => {
      setDataPatientInfo(prevDataPatientInfo => {
        prevDataPatientInfo.headCircumference = takenValue
        return {...prevDataPatientInfo}
      })
    
      if(dataPatientInfoError.headCircumference.isError){
        const _dataPatientInfoError = {...dataPatientInfoError}
        _dataPatientInfoError.headCircumference.title = '';
        _dataPatientInfoError.headCircumference.openTooltip = false;
        _dataPatientInfoError.headCircumference.isError = false;
        _dataPatientInfoError.headCircumference.focus = false;
        setDataPatientInfoError(_dataPatientInfoError);
      }
    }, 100)
  }

  const onChangeVaccination = (bool) => {
    setDataPatientInfo(prevDataPatientInfo => {
      prevDataPatientInfo.vaccination = bool
      return {...prevDataPatientInfo}
    })
  }

  const handleCloseModalInfoPantients = (event, reason) => {
    if(reason && reason === "backdropClick"){
      return;
    }
    else{
      setListDistrict(prevListDistrict => {
        prevListDistrict.loading = false
        prevListDistrict.list = []
        return {...prevListDistrict}
      })
      setListWard(prevListWard => {
        prevListWard.loading = false
        prevListWard.list = []
        return {...prevListWard}
      })
      setListExaminingSession([]);
      setSelectedAutoComplete(selectedAutoCompleteDefault);
      setDataPatientInfo(dataPatientInfoDefault);
      setDataPatientInfoNotEdit('');
      setDataPatientInfoError(dataPatientInfoErrorDefault);
      setLoading(true);
      props.setSelectedPantientInfo();
      props.setOpenModalInfoPantients(false);
    }
  }

  const handleGetListProvince = async () => {
    const responseListProvince = await getListProvince();
    setListProvince(responseListProvince);
  }

  const handleApplyPantientDataToField = async () => {
    setOpenAlertProcessing(true);   
      
    const editPropsDataPatientInfo = {...dataPatientInfo};
    editPropsDataPatientInfo.examinationId = props.selectedPantientInfo.examinationId
    editPropsDataPatientInfo.height = props.selectedPantientInfo.height
    editPropsDataPatientInfo.weight = props.selectedPantientInfo.weight
    editPropsDataPatientInfo.headCircumference = props.selectedPantientInfo.headCircumference
    editPropsDataPatientInfo.reason = props.selectedPantientInfo.reason
    editPropsDataPatientInfo.vaccination = props.selectedPantientInfo.vaccination
    editPropsDataPatientInfo.id = props.selectedPantientInfo.id
    editPropsDataPatientInfo.patient.identifier = props.selectedPantientInfo.patient.identifier
    editPropsDataPatientInfo.patient.address = props.selectedPantientInfo.patient.address
    editPropsDataPatientInfo.patient.fullName = props.selectedPantientInfo.patient.fullName
    editPropsDataPatientInfo.patient.dayOfBirth = props.selectedPantientInfo.patient.dayOfBirth
    editPropsDataPatientInfo.patient.codeWard = props.selectedPantientInfo.patient.codeWard
    editPropsDataPatientInfo.patient.gender = props.selectedPantientInfo.patient.gender
    editPropsDataPatientInfo.patient.fullNameMother = props.selectedPantientInfo.patient.fullNameMother
    editPropsDataPatientInfo.patient.phoneMother = props.selectedPantientInfo.patient.phoneMother
    editPropsDataPatientInfo.patient.fullNameFather = props.selectedPantientInfo.patient.fullNameFather
    editPropsDataPatientInfo.patient.phoneFather = props.selectedPantientInfo.patient.phoneFather
    editPropsDataPatientInfo.patient.patientId = props.selectedPantientInfo.patient.patientId

    setDataPatientInfo(_.cloneDeep(editPropsDataPatientInfo));
    setDataPatientInfoNotEdit(_.cloneDeep(editPropsDataPatientInfo));
        
    const response = await getFullAddressByIdWard(props.selectedPantientInfo.patient.codeWard);
    const responseListDistrict = await getListDistrict(response.provinceCode);
    setListDistrict(prevListDistrict => {
      prevListDistrict.list = responseListDistrict;
      return {...prevListDistrict}
    });
    const responseListWard = await getListWard(response.districtCode);
    setListWard(prevListWard => {
      prevListWard.list = responseListWard;
      return {...prevListWard}
    });
    const responseListMedicalExaminationsGiveRegister = await getListMedicalExaminationsGiveRegister(props.selectedPantientInfo.patient.dayOfBirth);
    setListExaminingSession(responseListMedicalExaminationsGiveRegister.exams);
     
    const selectedGender = listGender.find(gender => gender.genderValue === props.selectedPantientInfo.patient.gender);
    const indexListExamining = responseListMedicalExaminationsGiveRegister.exams.findIndex(examiningSession => examiningSession.id === props.selectedPantientInfo.examinationId)
    const indexListProvince = listProvince.findIndex(province => province.code === response.provinceCode);
    const indexListDistrict = responseListDistrict.findIndex(district => district.code === response.districtCode);
    const indexListWard = responseListWard.findIndex(ward => ward.code === response.wardCode);

    setSelectedAutoComplete((prevSelectedAutoComplete) => {
      prevSelectedAutoComplete.gender.value = selectedGender
      prevSelectedAutoComplete.examiningSession.value = responseListMedicalExaminationsGiveRegister.exams[indexListExamining];
      prevSelectedAutoComplete.province.value = listProvince[indexListProvince];
      prevSelectedAutoComplete.district.value = responseListDistrict[indexListDistrict];
      prevSelectedAutoComplete.ward.value = responseListWard[indexListWard];
      return prevSelectedAutoComplete
    })

    setLoading(false);
    setOpenAlertProcessing(false);   
  }

  const checkValidate = () => {
      const _dataPatientInfoError = {...dataPatientInfoError}
      let isValid = true;

      if(dataPatientInfoError.identifier.title !== ''){
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.identifier.focus = true;
          setFocusField('identifier');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.patient.fullName === ''){
        _dataPatientInfoError.fullName.title = 'Bạn chưa nhập họ tên';
        _dataPatientInfoError.fullName.openTooltip = true;
        _dataPatientInfoError.fullName.isError = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.fullName.focus = true;
          setFocusField('fullName');
        }
        isValid = false;
      }

      if(dataPatientInfo.patient.gender === ''){
        _dataPatientInfoError.gender.title = 'Bạn chưa chọn giới tính';
        _dataPatientInfoError.gender.isError = true;
        _dataPatientInfoError.gender.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.gender.focus = true;
          setFocusField('gender');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.patient.dayOfBirth === ''){
        _dataPatientInfoError.dayOfBirth.title = 'Bạn chưa nhập ngày sinh';
        _dataPatientInfoError.dayOfBirth.isError = true;
        _dataPatientInfoError.dayOfBirth.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.dayOfBirth.focus = true;
          if (dateFieldRef.current) {
            dateFieldRef.current.focus(); // Đặt focus vào dateField khi có lỗi
          }
        }
        isValid = false;
      }
  
      if(dataPatientInfoError.dayOfBirth.title !== ''){
        _dataPatientInfoError.dayOfBirth.isError = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.dayOfBirth.focus = true;
          if (dateFieldRef.current) {
            dateFieldRef.current.focus(); // Đặt focus vào dateField khi có lỗi
          }
        }
        isValid = false;
      }

      if(selectedAutoComplete.examiningSession.value === null){
        _dataPatientInfoError.examiningSession.title = 'Bạn chưa chọn lại kỳ khám';
        _dataPatientInfoError.examiningSession.isError = true;
        _dataPatientInfoError.examiningSession.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.examiningSession.focus = true;
          setFocusField('examiningSession');
        }
        isValid = false;
      }

      if(selectedAutoComplete.province.value === null){
        _dataPatientInfoError.province.title = 'Bạn chưa chọn tỉnh thành';
        _dataPatientInfoError.province.isError = true;
        _dataPatientInfoError.province.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.province.focus = true;
          setFocusField('province');
        }
        isValid = false;
      }
  
      if(selectedAutoComplete.district.value === null){
        _dataPatientInfoError.district.title = 'Bạn chưa chọn quận huyện';
        _dataPatientInfoError.district.isError = true;
        _dataPatientInfoError.district.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.district.focus = true;
          setFocusField('district');
        }
        isValid = false;
      }
  
      if(selectedAutoComplete.ward.value === null){
        _dataPatientInfoError.ward.title = 'Bạn chưa chọn phường xã';
        _dataPatientInfoError.ward.isError = true;
        _dataPatientInfoError.ward.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.ward.focus = true;
          setFocusField('ward');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.patient.address === ''){
        _dataPatientInfoError.address.title = 'Bạn chưa nhập địa chỉ';
        _dataPatientInfoError.address.isError = true;
        _dataPatientInfoError.address.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.address.focus = true;
          setFocusField('address');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.patient.fullNameMother === '' && dataPatientInfo.patient.fullNameFather === ''){
        _dataPatientInfoError.fullNameMother.title = 'Bạn chưa nhập tên phụ huynh';
        _dataPatientInfoError.fullNameMother.isError = true;
        _dataPatientInfoError.fullNameMother.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.fullNameMother.focus = true;
          setFocusField('fullNameMother');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.patient.phoneMother === '' && dataPatientInfo.patient.phoneFather === ''){
        _dataPatientInfoError.phoneMother.title = 'Bạn chưa nhập số điện thoại';
        _dataPatientInfoError.phoneMother.isError = true;
        _dataPatientInfoError.phoneMother.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.phoneMother.focus = true;
          setFocusField('phoneMother');
        }
        isValid = false;
      }
  
      if(_dataPatientInfoError.phoneMother.title !== ''){
        _dataPatientInfoError.phoneMother.isError = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.phoneMother.focus = true;
          setFocusField('phoneMother');
        }
        isValid = false;
      }
  
      if(_dataPatientInfoError.phoneFather.title !== ''){
        _dataPatientInfoError.phoneFather.isError = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.phoneFather.focus = true;
          setFocusField('phoneFather');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.height === ''){
        _dataPatientInfoError.height.title = 'Bạn chưa nhập chiều cao';
        _dataPatientInfoError.height.isError = true;
        _dataPatientInfoError.height.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.height.focus = true;
          setFocusField('height');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.weight === ''){
        _dataPatientInfoError.weight.title = 'Bạn chưa nhập cân nặng';
        _dataPatientInfoError.weight.isError = true;
        _dataPatientInfoError.weight.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.weight.focus = true;
          setFocusField('weight');
        }
        isValid = false;
      }
  
      if(dataPatientInfo.headCircumference === ''){
        _dataPatientInfoError.headCircumference.title = 'Bạn chưa nhập số vòng đầu';
        _dataPatientInfoError.headCircumference.isError = true;
        _dataPatientInfoError.headCircumference.openTooltip = true;
        if(Object.values(_dataPatientInfoError).every(item => item.focus === false)){
          _dataPatientInfoError.headCircumference.focus = true;
          setFocusField('headCircumference');
        }
        isValid = false;
      }
  
      // if(dataPatientInfo.reason === ''){
      //   _dataPatientInfoError.reason.isError = true;
      //   isValid = false;
      // }

      if(_.isEqual(dataPatientInfo, dataPatientInfoNotEdit) === true){
        toast.warning('Hiện không có gì để cập nhật', {toastId: 'warning1'});
        isValid = false;
      }

      setDataPatientInfoError(_dataPatientInfoError);
      return isValid;
  }

  const handleUpdateMedicalRegister = async () => {
    if(checkValidate()){
      setOpenAlertProcessing(true);
      const response = await updateMedicalRegister(dataPatientInfo);
      if(response.status === 200){
        toast.success(response.data, {toastId: 'success1'});
        props.setCompleteMedicalRegister(true);
        handleCloseModalInfoPantients();
      }
      else{
        toast.error(response.data, {toastId: 'error1'});
        props.setCompleteMedicalRegister(true);
        handleCloseModalInfoPantients();
      }
      setOpenAlertProcessing(false);
    }
  }

  useEffect(() => {
    if(listProvince.length === 0){
      handleGetListProvince();
    }
  }, [])

  useEffect(() => {
    if(props.selectedPantientInfo){
      props.setIsContinueUpdateMedicalRegister(false);
      handleApplyPantientDataToField();
    }
  }, [props.selectedPantientInfo])

  useEffect(() => {
    if(props.openModalInfoPantients && props.isContinueUpdateMedicalRegister && loading === false){
      handleUpdateMedicalRegister();
      props.setIsContinueUpdateMedicalRegister(false);
    }
  }, [props.isContinueUpdateMedicalRegister, loading])

  return (
    <>
      <Dialog fullWidth={true} maxWidth='md' open={props.openModalInfoPantients} onClose={(event, reason) => handleCloseModalInfoPantients(event, reason)} >
        <DialogTitle sx={{ p: 1, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center', color: 'blue' }}>Thông tin bệnh nhân</DialogTitle>
        <IconButton onClick={() => handleCloseModalInfoPantients()} sx={{position: 'absolute', right: 5, top: 7}}>
          <CloseIcon fontSize='medium'/>
        </IconButton>
        <DialogContent dividers sx={{pt: 1.5, pb: 1.5}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', pl: 4.2, pr: 4.2, mb: 0.8}}>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.identifier.title}</h6>} open={dataPatientInfoError.identifier.openTooltip} placement='left'> 
              <TextField error={true ? dataPatientInfoError.identifier.isError === true : false}
                label="Mã định danh" variant="outlined" 
                sx={{width: '18%', '&.MuiTextField-root' : {marginTop: '7.5px'}}}
                inputProps={{ maxLength: 12 }}
                inputRef={(input) => input && focusField === 'identifier' && input.focus()}
                defaultValue={dataPatientInfo.patient.identifier}
                onChange={(e) => onChangeIdentifier(e.target.value)}
              />
            </Tooltip>
          </ThemeProvider>
                      
          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.fullName.title}</h6>} open={dataPatientInfoError.fullName.openTooltip} placement='top'
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: { offset: [-10, -6], },
                    },
                  ],
                },
              }} 
            > 
              <TextField error={true ? dataPatientInfoError.fullName.isError === true : false}
                label="Họ tên" variant="outlined" 
                sx={{width: '32%', '&.MuiTextField-root' : {marginTop: '7.5px'}}} 
                inputRef={(input) => input && focusField === 'fullName' && input.focus()}
                defaultValue={dataPatientInfo.patient.fullName}
                onChange={(e) => onChangeFullName(e.target.value)}
              />
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.gender.title}</h6>} open={dataPatientInfoError.gender.openTooltip} placement='top'>
              <Autocomplete 
                sx={{width: '12%', marginTop: '7.5px'}}
                options={listGender} 
                getOptionLabel={(option) => option.genderName}
                value={selectedAutoComplete.gender.value}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.genderName}
                  </li>
                )}
                onChange={(e, value) => onSelectGender(e, value)}
                open={selectedAutoComplete.gender.openOption}
                onFocus={() => handleFocus('Gender')}
                onBlur={(e) => handleBlur(e.target.value, 'Gender')}
                renderInput={(params) => ( 
                  <TextField {...params} 
                    label="Giới tính" 
                    inputRef={(input) => input && focusField === 'gender' && input.focus()}
                    error={true ? dataPatientInfoError.gender.isError === true : false}                     
                  /> 
                )}
                disableClearable // Bỏ icon xóa
                popupIcon={null} // Bỏ icon dropdown
              />
            </Tooltip>
          </ThemeProvider>

          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
            <ThemeProvider theme={tooltipTheme}>
              <DemoContainer components={['DatePicker']}>  
                <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.dayOfBirth.title}</h6>} open={dataPatientInfoError.dayOfBirth.openTooltip}>    
                  <Box sx={{width: 110}}>
                    <DatePicker label="Ngày sinh" 
                      format='DD/MM/YYYY' defaultValue={moment(dataPatientInfo.patient.dayOfBirth)}
                      disableFuture={true} disableOpenPicker 
                      slotProps={{ 
                        textField: 
                          { 
                            inputRef: dateFieldRef,
                            error: true ? dataPatientInfoError.dayOfBirth.isError === true : false,
                            onBlur: (e) => handleBlur(e.target.value, 'dayOfBirth'),
                          }
                        }}
                      onChange={(value) => onChangeDOB(value)}
                    />
                  </Box>
                </Tooltip>
              </DemoContainer>
            </ThemeProvider>
          </LocalizationProvider>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.examiningSession.title}</h6>} open={dataPatientInfoError.examiningSession.openTooltip} placement='right'>
              <Autocomplete 
                sx={{width: '18%', mt: '7.5px'}}
                options={listExaminingSession} 
                noOptionsText={selectedAutoComplete.examiningSession.loading ? 'Đang tải...' : ''}
                getOptionLabel={(option) => option.name}
                value={selectedAutoComplete.examiningSession.value}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.name}
                  </li>
                )}
                onChange={(e, value) => onSelectExaminingSession(e, value)}
                open={selectedAutoComplete.examiningSession.openOption}
                onFocus={() => handleFocus('ExaminingSession')}
                onBlur={(e) => handleBlur(e.target.value, 'ExaminingSession')}
                renderInput={(params) => ( 
                  <TextField {...params} 
                    label="Kỳ khám" 
                    inputRef={(input) => input && focusField === 'examiningSession' && input.focus()}
                    error={true ? dataPatientInfoError.examiningSession.isError === true : false} 
                    sx={{'& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot': {pl: '6px', pr: '6px'}}}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {selectedAutoComplete.examiningSession.loading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }} 
                  /> 
                )}
                disableClearable // Bỏ icon xóa
                popupIcon={null} // Bỏ icon dropdown
              />
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.province.title}</h6>} open={dataPatientInfoError.province.openTooltip} placement='left'>
              <Autocomplete 
                sx={{width: '20%', mt: 2}}
                options={listProvince} 
                filterOptions={filterOptions}
                getOptionLabel={(option) => option.name}
                value={selectedAutoComplete.province.value}
                renderOption={(props, option) => (
                  <li {...props}>
                    {option.name}
                  </li>
                )}
                onChange={(e, value) => onSelectProvine(e, value)}
                open={selectedAutoComplete.province.openOption}
                onFocus={() => handleFocus('Province')}
                onBlur={(e) => handleBlur(e.target.value, 'Province')}
                renderInput={(params) => ( 
                  <TextField {...params} 
                    label="Thành phố"
                    inputRef={(input) => input && focusField === 'province' && input.focus()}
                    error={true ? dataPatientInfoError.province.isError === true : false}  
                  /> 
                )}
                disableClearable // Bỏ icon xóa
                popupIcon={null} // Bỏ icon dropdown
              />
            </Tooltip>
          </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.district.title}</h6>} open={dataPatientInfoError.district.openTooltip} placement='top'>
                <Autocomplete 
                  sx={{width: '20%', mt: 2}}
                  options={listDistrict.list} 
                  noOptionsText={listDistrict.loading ? 'Đang tải...' : ''}
                  filterOptions={filterOptions}
                  getOptionLabel={(option) => option.name}
                  value={selectedAutoComplete.district.value}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.fullName}
                    </li>
                  )}
                  onChange={(e, value) => onSelectDistrict(e, value)}
                  open={selectedAutoComplete.district.openOption}
                  onFocus={() => handleFocus('District')}
                  onBlur={(e) => handleBlur(e.target.value, 'District')}
                  renderInput={(params) => ( 
                    <TextField {...params} 
                      label="Quận/huyện" 
                      inputRef={(input) => input && focusField === 'district' && input.focus()}
                      error={true ? dataPatientInfoError.district.isError === true : false} 
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {listDistrict.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }} 
                    /> 
                  )}
                  disableClearable // Bỏ icon xóa
                  popupIcon={null} // Bỏ icon dropdown
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.ward.title}</h6>} open={dataPatientInfoError.ward.openTooltip}>
                <Autocomplete 
                  sx={{width: '20%', mt: 2}}
                  options={listWard.list}
                  noOptionsText={listWard.loading ? 'Đang tải...' : ''}
                  filterOptions={filterOptions}
                  getOptionLabel={(option) => option.name}
                  value={selectedAutoComplete.ward.value}
                  renderOption={(props, option) => (
                    <li {...props}>
                      {option.fullName}
                    </li>
                  )}
                  onChange={(e, value) => onSelectWard(e, value)}
                  open={selectedAutoComplete.ward.openOption}
                  onFocus={() => handleFocus('Ward')}
                  onBlur={(e) => handleBlur(e.target.value, 'Ward')}
                  renderInput={(params) => ( 
                    <TextField {...params} 
                      label="Phường/Xã" 
                      inputRef={(input) => input && focusField === 'ward' && input.focus()}
                      error={true ? dataPatientInfoError.ward.isError === true : false}  
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {listWard.loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }} 
                    /> 
                  )}
                  disableClearable // Bỏ icon xóa
                  popupIcon={null} // Bỏ icon dropdown
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.address.title}</h6>} open={dataPatientInfoError.address.openTooltip} placement='right'>
                <TextField error={true ? dataPatientInfoError.address.isError === true : false}
                  label="Địa chỉ" variant="outlined" 
                  sx={{width: '36%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputRef={(input) => input && focusField === 'address' && input.focus()}
                  defaultValue={dataPatientInfo.patient.address}
                  onChange={(e) => onChangeAddress(e.target.value)}
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.fullNameMother.title}</h6>} open={dataPatientInfoError.fullNameMother.openTooltip} placement='left'>
                <TextField error={true ? dataPatientInfoError.fullNameMother.isError === true : false}
                  label="Họ tên mẹ" variant="outlined" 
                  sx={{width: '32%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputRef={(input) => input && focusField === 'fullNameMother' && input.focus()}
                  defaultValue={dataPatientInfo.patient.fullNameMother}
                  onChange={(e) => onChangeFullNameMother(e.target.value)}
                />    
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.phoneMother.title}</h6>} open={dataPatientInfoError.phoneMother.openTooltip}>
                <TextField error={true ? dataPatientInfoError.phoneMother.isError === true : false}
                  label="Số điện thoại" variant="outlined" 
                  sx={{width: '16%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputProps={{ maxLength: 10 }}
                  inputRef={(input) => input && focusField === 'phoneMother' && input.focus()}
                  defaultValue={dataPatientInfo.patient.phoneMother}
                  onChange={(e) => onChangePhoneMother(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Tooltip>
            </ThemeProvider>

            <TextField 
              label="Họ tên cha" variant="outlined" sx={{width: '32%', '&.MuiTextField-root' : {mt: 2}}} 
              defaultValue={dataPatientInfo.patient.fullNameFather}
              onChange={(e) => onChangeFullNameFather(e.target.value)}
            />

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.phoneFather.title}</h6>} open={dataPatientInfoError.phoneFather.openTooltip} placement='right'>
                <TextField error={true ? dataPatientInfoError.phoneFather.isError === true : false}
                  label="Số điện thoại" variant="outlined" 
                  sx={{width: '16%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputProps={{ maxLength: 10 }}
                  inputRef={(input) => input && focusField === 'phoneFather' && input.focus()}
                  defaultValue={dataPatientInfo.patient.phoneFather}
                  onChange={(e) => onChangePhoneFather(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.height.title}</h6>} open={dataPatientInfoError.height.openTooltip} placement='left'>
                <TextField error={true ? dataPatientInfoError.height.isError === true : false}
                  label='Chiều cao' 
                  sx={{width: '20%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputRef={(input) => input && focusField === 'height' && input.focus()}
                  InputProps={{endAdornment: <InputAdornment position="end">{'(cm)'}</InputAdornment>}} 
                  defaultValue={dataPatientInfo.height}
                  onChange={(e) => onChangeHeight(e.target.value)}
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.weight.title}</h6>} open={dataPatientInfoError.weight.openTooltip}>
                <TextField error={true ? dataPatientInfoError.weight.isError === true : false}
                  label='Cân nặng' 
                  sx={{width: '20%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputRef={(input) => input && focusField === 'weight' && input.focus()}
                  InputProps={{endAdornment: <InputAdornment position="end">{'(kg)'}</InputAdornment>}} 
                  defaultValue={dataPatientInfo.weight}
                  onChange={(e) => onChangeWeight(e.target.value)}
                />
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientInfoError.headCircumference.title}</h6>} open={dataPatientInfoError.headCircumference.openTooltip} placement='right'>
                <TextField error={true ? dataPatientInfoError.headCircumference.isError === true : false}
                  label='Vòng đầu' 
                  sx={{width: '20%', '&.MuiTextField-root' : {mt: 2}}} 
                  inputRef={(input) => input && focusField === 'headCircumference' && input.focus()}
                  InputProps={{endAdornment: <InputAdornment position="end">{'(cm)'}</InputAdornment>}} 
                  defaultValue={dataPatientInfo.headCircumference}
                  onChange={(e) => onChangeHeadCircumference(e.target.value)}
                />
              </Tooltip>
            </ThemeProvider>

            <FormControlLabel sx={{width: '30%', mt: 2}} control={<Checkbox checked={dataPatientInfo.vaccination}/>} 
              label="Có tham gia tiêm ngừa"
              onChange={(e) => onChangeVaccination(e.target.checked)}
            />  
          </Box>
        </DialogContent>
        <DialogActions sx={{justifyContent: 'center'}}>
          <Button variant="contained" onClick={() => handleUpdateMedicalRegister()}>Sửa (F1)</Button>
          <Button variant="contained" color='secondary' onClick={(event, reason) => handleCloseModalInfoPantients(event, reason)}>Đóng (ESC)</Button>
        </DialogActions>
      </Dialog>

      <AlertProcessing openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing} />
    </>
  )
}

export default ManageInfoPantients