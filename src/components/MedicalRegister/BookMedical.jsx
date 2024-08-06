import React, { useState, useEffect, useRef } from 'react';
//ExaminingSessios modal
import ExaminingSession from '../ManageExaminingSession/ExaminingSession';
//old disease modal
import OldDisease from '../ManageOldDisease/OldDisease';
// import OldDiseaseForRegister from '../ManageOldDisease/OldDiseaseForRegister';
import AlertProcessing from '../ManageAlertProcessing/AlertProcessing';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
//mui x date picker
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers/DateField';
//lodash
import _ from 'lodash';
//scss
import './SCSS/Shared.scss';
//moment
import moment from 'moment';
//api
import { getListProvince, getListDistrict, getListWard, getFullAddressByIdWard } from '../../Service/PlaceService';
import { createMedicalBackRegister } from '../../Service/MedicalService';
import { toast } from 'react-toastify';

function BookMedical(props) {

  const dataPatientsRegisterDefault = {
    examinationId: '',
    oldDisease: false,
    height: '',
    weight: '',
    headCircumference: '',
    reason: '',
    vaccination: false,
    medicalTypeId: '',
    userIdDoctor: '',
    patient: {
      patientId: '',
      identifier: '',
      address: '',
      fullName: '',
      dayOfBirth: '',
      codeWard: '',
      gender: '',
      fullNameMother: '',
      phoneMother: '',
      fullNameFather: '',
      phoneFather: ''
    }
  }

  const autocompleteValueDefault = { 
    dayOfBirth: null, 
    gender: {
      value: null,
      openOption: false
    }, 
    province: {
      value: null,
      openOption: false
    }, 
    district: {
      value: null,
      openOption: false
    }, 
    ward: {
      value: null,
      openOption: false
    }, 
    medicalType: {
      value: null,
      openOption: false
    },
    vaccination: false 
  }

  const dataPatientsRegisterErrorDefault = { 
    identifier: { title: '', isError: false, openTooltip: false, focus: false },
    patientId: { title: '', isError: false, openTooltip: false, focus: false },
    fullName: { title: '', isError: false, openTooltip: false, focus: false },
    dayOfBirth: { title: '', isError: false, openTooltip: false, focus: false },
    gender: { title: '', isError: false, openTooltip: false, focus: false },
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
    medicalType: { title: '', isError: false, openTooltip: false, focus: false },
    reason: { title: '', isError: false, openTooltip: false, focus: false }
  }

  const listGender = [
    {genderOrder: 1, genderName: 'Nam', genderValue: true},
    {genderOrder: 2, genderName: 'Nữ', genderValue: false},
  ]

  const listMedicalType = [
    {medicalTypeOrder: 1, medicalTypeName: 'Khám Nhi khoa phát triển', medicalTypeId: 1},
    {medicalTypeOrder: 2, medicalTypeName: 'Khám trẻ nguy cơ cao', medicalTypeId: 2},
  ]

  const [openModalExaminingSession, setOpenModalExaminingSession] = useState(false);
  const [isContinueSelectedExaminingSession, setIsContinueSelectedExaminingSession] = useState(false);

  const [openModalOldDisease, setOpenModalOldDisease] = useState(false);

  // const [openOldDiseaseRegister, setOpenOldDiseaseRegister] = useState(false);
  // const [listOldDiseaseRegister, setListOldDiseaseRegister] = useState([]);

  const [openAlertProcessing, setOpenAlertProcessing] = useState(false);

  const [dataPatientsRegister, setDataPatientsRegister] = useState(dataPatientsRegisterDefault);
  const [dataPatientsRegisterError, setDataPatientsRegisterError] = useState(dataPatientsRegisterErrorDefault);
  const [focusField, setFocusField] = useState(null);

  const [autocompleteValue, setAutocompleteValue] = useState(autocompleteValueDefault);

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState({list: [], loading: false});
  const [listWard, setListWard] = useState({list: [], loading: false});

  const formRef = useRef(null);
  const firstFocusRef = useRef(null);
  const dateFieldRef = useRef(null);
  const typingRef = useRef(null);

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
                    offset: [0, -7],
                  },
                },
              ],
            },
          },
        },
      },
    },
  });

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

      return (
        lowercasedFullName.includes(lowercasedInput) ||
        initials.includes(lowercasedInput)
      );
    });
  };

  const handleFocus = (fieldName) => {
    if(fieldName === 'Gender'){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.gender.openOption = true
        return {
          ...prevAutocompleteValue
        }
      })
    }
    else if(fieldName === 'Province'){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.province.openOption = true
        return {
          ...prevAutocompleteValue
        }
      })
    }
    else if (fieldName === 'District'){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.district.openOption = true
        return {
          ...prevAutocompleteValue
        }
      })
    }
    else if(fieldName === 'Ward'){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.ward.openOption = true
        return {
          ...prevAutocompleteValue
        }
      })
    }
    else if(fieldName === 'MedicalType'){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.medicalType.openOption = true
        return {
          ...prevAutocompleteValue
        }
      })
    }
  }

  const handleBlur = (value, fieldName) => {
    if(value === '' || value === 'DD/MM/YYYY'){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError};
      if(fieldName === 'Identifier'){
        if(typingRef.current){
          clearInterval(typingRef.current);
        }
        typingRef.current = setTimeout(() => {  
          _dataPatientsRegisterError.identifier.title = '';
          _dataPatientsRegisterError.identifier.openTooltip = false;
          _dataPatientsRegisterError.identifier.isError = false;
        _dataPatientsRegisterError.identifier.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }, 10)
      }
      // if(fieldName === 'dayOfBirth'){
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientsRegisterError.dayOfBirth.title = '';
      //     _dataPatientsRegisterError.dayOfBirth.openTooltip = false;
      //     _dataPatientsRegisterError.dayOfBirth.isError = false;
      //   _dataPatientsRegisterError.dayOfBirth.focus = false;
      //     setDataPatientsRegisterError(_dataPatientsRegisterError);
      //   }, 10)
      // }
      // else if(fieldName === 'PatientId'){     
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientsRegisterError.patientId.title = '';
      //     _dataPatientsRegisterError.patientId.openTooltip = false;
      //     _dataPatientsRegisterError.patientId.isError = false;
      //     _dataPatientsRegisterError.patientId.focus = false;
      //     setDataPatientsRegisterError(_dataPatientsRegisterError);
      //   }, 10)
      // }
      // else if(fieldName === 'PhoneMother'){     
      //   if(typingRef.current){
      //     clearInterval(typingRef.current);
      //   }
      //   typingRef.current = setTimeout(() => {  
      //     _dataPatientsRegisterError.phoneMother.title = '';
      //     _dataPatientsRegisterError.phoneMother.openTooltip = false;
      //     _dataPatientsRegisterError.phoneMother.isError = false;
      //     _dataPatientsRegisterError.phoneFather.focus = false;
      //     setDataPatientsRegisterError(_dataPatientsRegisterError);
      //   }, 10)
      // }
      if(fieldName === 'PhoneFather'){
        if(typingRef.current){
          clearInterval(typingRef.current);
        }
        typingRef.current = setTimeout(() => {  
          _dataPatientsRegisterError.phoneFather.title = '';
          _dataPatientsRegisterError.phoneFather.openTooltip = false;
          _dataPatientsRegisterError.phoneFather.isError = false;
          _dataPatientsRegisterError.patientId.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }, 10)
      }
      else if(fieldName === 'Gender'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.gender.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'Province'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.province.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'District'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.district.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'Ward'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.ward.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'MedicalType'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.medicalType.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
    }
    else if(value !== ''){
      if(fieldName === 'Gender'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.gender.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'Province'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.province.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'District'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.district.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'Ward'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.ward.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
      else if(fieldName === 'MedicalType'){
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.medicalType.openOption = false;
          return { ...prevAutocompleteValue }
        })
      }
    }
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
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        if(takenValue.length < 12){
          _dataPatientsRegisterError.identifier.title = 'Mã định danh chưa đủ 12 số';
          _dataPatientsRegisterError.identifier.openTooltip = true;
          _dataPatientsRegisterError.identifier.isError = true;
          _dataPatientsRegisterError.identifier.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
        else{
          setDataPatientsRegister(prevDataPatientsRegister => {
            prevDataPatientsRegister.patient.identifier = takenValue
            return { ...prevDataPatientsRegister }
          })

          _dataPatientsRegisterError.identifier.title = '';
          _dataPatientsRegisterError.identifier.openTooltip = false;
          _dataPatientsRegisterError.identifier.isError = false;
          _dataPatientsRegisterError.identifier.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
      }, 100)
    }
    else{
      if(focusField === 'identifier'){
        setFocusField(null);
      }

      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.identifier.title = '';
      _dataPatientsRegisterError.identifier.openTooltip = false;
      _dataPatientsRegisterError.identifier.isError = false;
      _dataPatientsRegisterError.identifier.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }  
  }

  const onChangePatientId = (value) => {
    if(value !== ''){
      const takenValue = value;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }

      typingRef.current = setTimeout(() => {
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        if(takenValue.length < 8){
          _dataPatientsRegisterError.patientId.title = 'Mã BN phải từ 8 đến 12 số';
          _dataPatientsRegisterError.patientId.openTooltip = true;
          _dataPatientsRegisterError.patientId.isError = true;
          _dataPatientsRegisterError.patientId.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
        else{
          if(focusField === 'patientId'){
            setFocusField(null);
          }
          
          setDataPatientsRegister(prevDataPatientsRegister => {
            prevDataPatientsRegister.patient.patientId = takenValue
            return { ...prevDataPatientsRegister }
          })

          _dataPatientsRegisterError.patientId.title = '';
          _dataPatientsRegisterError.patientId.openTooltip = false;
          _dataPatientsRegisterError.patientId.isError = false;
          _dataPatientsRegisterError.patientId.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
      }, 100)
    }
    // else{
    //   const _dataPatientsRegisterError = {...dataPatientsRegisterError}
    //   _dataPatientsRegisterError.patientId.title = '';
    //   _dataPatientsRegisterError.patientId.openTooltip = false;
    //   _dataPatientsRegisterError.patientId.isError = false;
    //   _dataPatientsRegisterError.patientId.focus = false;
    //   setDataPatientsRegisterError(_dataPatientsRegisterError);
    // }  
  }

  const onChangeFullName = (value) => {
    const takenValue = value

    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.patient.fullName = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(focusField === 'fullName'){
        setFocusField(null);
      }

      if(dataPatientsRegisterError.fullName.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.fullName.title = '';
        _dataPatientsRegisterError.fullName.openTooltip = false;
        _dataPatientsRegisterError.fullName.isError = false;
        _dataPatientsRegisterError.fullName.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }

      // if(dataPatientsRegister.patient.fullName !== '' && dataPatientsRegister.patient.dayOfBirth !== '' && dataPatientsRegister.patient.gender !== ''){
      //   handleFindOldDisease();
      // }
    }, 100)
  }

  const onChangeDOB = (value) => {
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

        const _dataPatientsRegisterError = {...dataPatientsRegisterError};

        if(today < takenValue || age > 2 || isNaN(age) || totalMonths > 24 || (totalMonths === 24 && totalDays > 29)){
          _dataPatientsRegisterError.dayOfBirth.title = 'Bệnh nhân lớn hơn 24 tháng tuổi không thể khám';
          _dataPatientsRegisterError.dayOfBirth.openTooltip = true;
          _dataPatientsRegisterError.dayOfBirth.isError = true;
          _dataPatientsRegisterError.dayOfBirth.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);

          setAutocompleteValue(prevAutocompleteValue => {
            prevAutocompleteValue.dayOfBirth = value
            return {
              ...prevAutocompleteValue
            }
          })
        }

        else{
          if(focusField === 'dayOfBirth'){
            setFocusField(null);
          }

          const formattedDate = moment(takenValue).format('YYYY-MM-DD');
          setDataPatientsRegister(prevDataPatientsRegister => {
          prevDataPatientsRegister.patient.dayOfBirth = formattedDate
            return {
              ...prevDataPatientsRegister
            }
          })

          setAutocompleteValue(prevAutocompleteValue => {
            prevAutocompleteValue.dayOfBirth = value
            return {
              ...prevAutocompleteValue
            }
          })

          _dataPatientsRegisterError.dayOfBirth.title = '';
          _dataPatientsRegisterError.dayOfBirth.openTooltip = false;
          _dataPatientsRegisterError.dayOfBirth.isError = false;
          _dataPatientsRegisterError.dayOfBirth.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);

          // if(dataPatientsRegister.patient.fullName !== '' && dataPatientsRegister.patient.dayOfBirth !== '' && dataPatientsRegister.patient.gender !== ''){
          //   handleFindOldDisease();
          // }
        }
      }, 100)
    }  
  }

  const onSelectGender = (e, value) => {
    if(focusField === 'gender'){
      setFocusField(null);
    }

    setDataPatientsRegister(prevDataPatientsRegister => {
      prevDataPatientsRegister.patient.gender = value.genderValue
      return {
        ...prevDataPatientsRegister
      }
    })

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.gender.value = value
      return {
        ...prevAutocompleteValue
      }
    })

    if(dataPatientsRegisterError.gender.isError){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.gender.title = '';
      _dataPatientsRegisterError.gender.openTooltip = false;
      _dataPatientsRegisterError.gender.isError = false;
      _dataPatientsRegisterError.gender.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }

    // if(dataPatientsRegister.patient.fullName !== '' && dataPatientsRegister.patient.dayOfBirth !== '' && dataPatientsRegister.patient.gender !== ''){
    //   handleFindOldDisease();
    // }
  }

  const onSelectProvine = async (e, value) => {
    if(focusField === 'province'){
      setFocusField(null);
    }

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.province.value = value
      return {
        ...prevAutocompleteValue
      }
    })

    if(autocompleteValue.district.value !== null){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.district.value = null
        return {
          ...prevAutocompleteValue
        }
      })
    }

    if(autocompleteValue.ward.value !== null){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.ward.value = null
        return {
          ...prevAutocompleteValue
        }
      })
    }

    if(dataPatientsRegisterError.province.isError){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.province.title = '';
      _dataPatientsRegisterError.province.openTooltip = false;
      _dataPatientsRegisterError.province.isError = false;
      _dataPatientsRegisterError.province.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
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

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.district.value = value
      return {
        ...prevAutocompleteValue
      }
    })

    if(autocompleteValue.ward.value !== null){
      setAutocompleteValue(prevAutocompleteValue => {
        prevAutocompleteValue.ward.value = null
        return {
          ...prevAutocompleteValue
        }
      })
    }

    if(dataPatientsRegisterError.district.isError){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.district.title = '';
      _dataPatientsRegisterError.district.openTooltip = false;
      _dataPatientsRegisterError.district.isError = false;
      _dataPatientsRegisterError.district.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
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

    setDataPatientsRegister(prevDataPatientsRegister => {
      prevDataPatientsRegister.patient.codeWard = value.code
      return {
        ...prevDataPatientsRegister
      }
    })

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.ward.value = value
      return {
        ...prevAutocompleteValue
      }
    })

    if(dataPatientsRegisterError.ward.isError){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.ward.title = '';
      _dataPatientsRegisterError.ward.openTooltip = false;
      _dataPatientsRegisterError.ward.isError = false;
      _dataPatientsRegisterError.ward.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }
  }

  const onChangeFolk = (value) => {
  }

  const onChangeAddress = (value) => {
    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if(focusField === 'address'){
        setFocusField(null);
      }
      
      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.patient.address = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.address.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.address.title = '';
        _dataPatientsRegisterError.address.openTooltip = false;
        _dataPatientsRegisterError.address.isError = false;
        _dataPatientsRegisterError.address.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onChangeFullNameMother = (value) => {
    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if(focusField === 'fullNameMother'){
        setFocusField(null);
      }

      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.patient.fullNameMother = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.fullNameMother.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.fullNameMother.title = '';
        _dataPatientsRegisterError.fullNameMother.openTooltip = false;
        _dataPatientsRegisterError.fullNameMother.isError = false;
        _dataPatientsRegisterError.fullNameMother.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onChangePhoneMother = (value) => {
    if(value !== ''){
      const takenValue = value;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }

      typingRef.current = setTimeout(() => {
        if(focusField === 'phoneMother'){
          setFocusField(null);
        }

        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        if(takenValue.length < 10){
          _dataPatientsRegisterError.phoneMother.title = 'Số điện thoại chưa đủ 10 số';
          _dataPatientsRegisterError.phoneMother.openTooltip = true;
          _dataPatientsRegisterError.phoneMother.isError = true;
          _dataPatientsRegisterError.phoneMother.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
        else{
          setDataPatientsRegister(prevDataPatientsRegister => {
            prevDataPatientsRegister.patient.phoneMother = takenValue
            return {
              ...prevDataPatientsRegister
            }
          })

          _dataPatientsRegisterError.phoneMother.title = '';
          _dataPatientsRegisterError.phoneMother.openTooltip = false;
          _dataPatientsRegisterError.phoneMother.isError = false;
          _dataPatientsRegisterError.phoneMother.focus = false;

          _dataPatientsRegisterError.phoneFather.title = '';
          _dataPatientsRegisterError.phoneFather.openTooltip = false;
          _dataPatientsRegisterError.phoneFather.isError = false;
          _dataPatientsRegisterError.phoneFather.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
      }, 100)
    }
    else{
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.phoneMother.title = '';
      _dataPatientsRegisterError.phoneMother.openTooltip = false;
      _dataPatientsRegisterError.phoneMother.isError = false;
      _dataPatientsRegisterError.phoneMother.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }  
  }

  const onChangeFullNameFather = (value) => {
    if(focusField === 'fullNameFather'){
      setFocusField(null);
    }

    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.patient.fullNameFather = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.fullNameMother.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.fullNameMother.title = '';
        _dataPatientsRegisterError.fullNameMother.openTooltip = false;
        _dataPatientsRegisterError.fullNameMother.isError = false;
        _dataPatientsRegisterError.fullNameMother.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onChangePhoneFather = (e, value) => {
    if(focusField === 'phoneFather'){
      setFocusField(null);
    }

    if(value !== ''){
      const takenValue = value;
      if(typingRef.current){
        clearInterval(typingRef.current);
      }

      typingRef.current = setTimeout(() => {
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        if(takenValue.length < 10){
          _dataPatientsRegisterError.phoneFather.title = 'Số điện thoại chưa đủ 10 số';
          _dataPatientsRegisterError.phoneFather.openTooltip = true;
          _dataPatientsRegisterError.phoneFather.isError = true;
          _dataPatientsRegisterError.phoneFather.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
        else{
          setDataPatientsRegister(prevDataPatientsRegister => {
            prevDataPatientsRegister.patient.phoneFather = takenValue
            return {
              ...prevDataPatientsRegister
            }
          })

          _dataPatientsRegisterError.phoneFather.title = '';
          _dataPatientsRegisterError.phoneFather.openTooltip = false;
          _dataPatientsRegisterError.phoneFather.isError = false;
          _dataPatientsRegisterError.phoneFather.focus = false;

          _dataPatientsRegisterError.phoneMother.title = '';
          _dataPatientsRegisterError.phoneMother.openTooltip = false;
          _dataPatientsRegisterError.phoneMother.isError = false;
          _dataPatientsRegisterError.phoneMother.focus = false;
          setDataPatientsRegisterError(_dataPatientsRegisterError);
        }
      }, 100)
    }
    else{
      if(focusField === 'phoneFather'){
        setFocusField(null);
      }

      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.phoneFather.title = '';
      _dataPatientsRegisterError.phoneFather.openTooltip = false;
      _dataPatientsRegisterError.phoneFather.isError = false;
      _dataPatientsRegisterError.phoneFather.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }
  }

  const onChangeHeight = (value) => {
    const takenValue = value;
    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if(focusField === 'height'){
        setFocusField(null);
      }

      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.height = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.height.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.height.title = '';
        _dataPatientsRegisterError.height.openTooltip = false;
        _dataPatientsRegisterError.height.isError = false;
        _dataPatientsRegisterError.height.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onChangeWeight = (value) => {
    const takenValue = value;

    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if(focusField === 'weight'){
        setFocusField(null);
      }

      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.weight = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.weight.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.weight.title = '';
        _dataPatientsRegisterError.weight.openTooltip = false;
        _dataPatientsRegisterError.weight.isError = false;
        _dataPatientsRegisterError.weight.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onChangeHeadCircumference = (value) => {
    const takenValue = value;

    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      if(focusField === 'headCircumference'){
        setFocusField(null);
      }

      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.headCircumference = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      if(dataPatientsRegisterError.headCircumference.isError){
        const _dataPatientsRegisterError = {...dataPatientsRegisterError}
        _dataPatientsRegisterError.headCircumference.title = '';
        _dataPatientsRegisterError.headCircumference.openTooltip = false;
        _dataPatientsRegisterError.headCircumference.isError = false;
        _dataPatientsRegisterError.headCircumference.focus = false;
        setDataPatientsRegisterError(_dataPatientsRegisterError);
      }
    }, 100)
  }

  const onSelectMedicalType = (e, value) => {
    if(focusField === 'medicalType'){
      setFocusField(null);
    }

    setDataPatientsRegister(prevDataPatientsRegister => {
      prevDataPatientsRegister.medicalTypeId = value.medicalTypeId
      return {
        ...prevDataPatientsRegister
      }
    })

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.medicalType.value = value
      return {
        ...prevAutocompleteValue
      }
    })

    if(dataPatientsRegisterError.medicalType.isError){
      const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      _dataPatientsRegisterError.medicalType.title = '';
      _dataPatientsRegisterError.medicalType.openTooltip = false;
      _dataPatientsRegisterError.medicalType.isError = false;
      _dataPatientsRegisterError.medicalType.focus = false;
      setDataPatientsRegisterError(_dataPatientsRegisterError);
    }
  }

  const onChangeReason = (value) => {
    const takenValue = value;

    if(typingRef.current){
      clearInterval(typingRef.current);
    }

    typingRef.current = setTimeout(() => {
      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.reason = takenValue
        return {
          ...prevDataPatientsRegister
        }
      })

      // if(dataPatientsRegisterError.reason.isError){
      //   const _dataPatientsRegisterError = {...dataPatientsRegisterError}
      //   _dataPatientsRegisterError.reason.isError = false;
      //   setDataPatientsRegisterError(_dataPatientsRegisterError);
      // }
    }, 100)
  }

  const onChangeVaccination = (bool) => {
    setDataPatientsRegister(prevDataPatientsRegister => {
      prevDataPatientsRegister.vaccination = bool
      return {
        ...prevDataPatientsRegister
      }
    })

    setAutocompleteValue(prevAutocompleteValue => {
      prevAutocompleteValue.vaccination = bool
      return {
        ...prevAutocompleteValue
      }
    })
  }

  const checkValidate = () => {
    let isValid = true;
    const _dataPatientsRegisterError = {...dataPatientsRegisterError}

    if(dataPatientsRegisterError.identifier.title !== ''){
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.identifier.focus = true;
        setFocusField('identifier');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.patientId === ''){
      _dataPatientsRegisterError.patientId.title = 'Bạn chưa nhập mã bệnh nhân';
      _dataPatientsRegisterError.patientId.openTooltip = true;
      _dataPatientsRegisterError.patientId.isError = true;
      if(Object.values(dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.patientId.focus = true;
        setFocusField('patientId');
      }
      isValid = false;
    }

    if(dataPatientsRegisterError.patientId.title !== ''){
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.patientId.focus = true;
        setFocusField('patientId');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.fullName === ''){
      _dataPatientsRegisterError.fullName.title = 'Bạn chưa nhập họ tên';
      _dataPatientsRegisterError.fullName.openTooltip = true;
      _dataPatientsRegisterError.fullName.isError = true;
      if(Object.values(dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.fullName.focus = true;
        setFocusField('fullName');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.dayOfBirth === ''){
      _dataPatientsRegisterError.dayOfBirth.title = 'Bạn chưa nhập ngày sinh';
      _dataPatientsRegisterError.dayOfBirth.openTooltip = true;
      _dataPatientsRegisterError.dayOfBirth.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.dayOfBirth.focus = true;
        if (dateFieldRef.current) {
          dateFieldRef.current.focus(); // Đặt focus vào dateField khi có lỗi
        }
      }
      isValid = false;
    }

    if(dataPatientsRegisterError.dayOfBirth.title !== ''){
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.dayOfBirth.focus = true;
        if (dateFieldRef.current) {
          dateFieldRef.current.focus(); // Đặt focus vào dateField khi có lỗi
        }
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.gender === ''){
      _dataPatientsRegisterError.gender.title = 'Bạn chưa chọn giới tính';
      _dataPatientsRegisterError.gender.openTooltip = true;
      _dataPatientsRegisterError.gender.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.gender.focus = true;
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.gender.openOption = true
          return {...prevAutocompleteValue}
        })
      setFocusField('gender');
      }
      isValid = false;
    }

    if(autocompleteValue.province.value === null){
      _dataPatientsRegisterError.province.title = 'Bạn chưa chọn tỉnh thành';
      _dataPatientsRegisterError.province.openTooltip = true;
      _dataPatientsRegisterError.province.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.province.focus = true;
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.province.openOption = true
          return {...prevAutocompleteValue}
        })
        setFocusField('province');
      }
      isValid = false;
    }

    if(autocompleteValue.district.value === null){
      _dataPatientsRegisterError.district.title = 'Bạn chưa chọn quận huyện';
      _dataPatientsRegisterError.district.openTooltip = true;
      _dataPatientsRegisterError.district.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.district.focus = true;
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.district.openOption = true
          return {...prevAutocompleteValue}
        })
        setFocusField('district');
      }
      isValid = false;
    }

    if(autocompleteValue.ward.value === null){
      _dataPatientsRegisterError.ward.title = 'Bạn chưa chọn phường xã';
      _dataPatientsRegisterError.ward.openTooltip = true;
      _dataPatientsRegisterError.ward.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.ward.focus = true;
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.ward.openOption = true
          return {...prevAutocompleteValue}
        })
        setFocusField('ward');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.address === ''){
      _dataPatientsRegisterError.address.title = 'Bạn chưa nhập địa chỉ';
      _dataPatientsRegisterError.address.openTooltip = true;
      _dataPatientsRegisterError.address.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.address.focus = true;
        setFocusField('address');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.fullNameMother === '' && dataPatientsRegister.patient.fullNameFather === ''){
      _dataPatientsRegisterError.fullNameMother.title = 'Bạn chưa nhập tên phụ huynh';
      _dataPatientsRegisterError.fullNameMother.openTooltip = true;
      _dataPatientsRegisterError.fullNameMother.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.fullNameMother.focus = true;
        setFocusField('fullNameMother');
      }
      isValid = false;
    }

    if(dataPatientsRegister.patient.phoneMother === '' && dataPatientsRegister.patient.phoneFather === ''){
      _dataPatientsRegisterError.phoneMother.title = 'Bạn chưa nhập số điện thoại';
      _dataPatientsRegisterError.phoneMother.openTooltip = true;
      _dataPatientsRegisterError.phoneMother.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.phoneMother.focus = true;
        setFocusField('phoneMother');
      }
      isValid = false;
    }

    if(dataPatientsRegisterError.phoneMother.title !== ''){
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.phoneMother.focus = true;
        setFocusField('phoneMother');
      }
      isValid = false;
    }

    if(dataPatientsRegisterError.phoneFather.title !== ''){
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.phoneFather.focus = true;
        setFocusField('phoneFather');
      }
      isValid = false;
    }

    if(dataPatientsRegister.height === ''){
      _dataPatientsRegisterError.height.title = 'Bạn chưa nhập chiều cao';
      _dataPatientsRegisterError.height.openTooltip = true;
      _dataPatientsRegisterError.height.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.height.focus = true;
        setFocusField('height');
      }
      isValid = false;
    }

    if(dataPatientsRegister.weight === ''){
      _dataPatientsRegisterError.weight.title = 'Bạn chưa nhập cân nặng';
      _dataPatientsRegisterError.weight.openTooltip = true;
      _dataPatientsRegisterError.weight.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.weight.focus = true;
        setFocusField('weight');
      }
      isValid = false;
    }

    if(dataPatientsRegister.headCircumference === ''){
      _dataPatientsRegisterError.headCircumference.title = 'Bạn chưa nhập số vòng đầu';
      _dataPatientsRegisterError.headCircumference.openTooltip = true;
      _dataPatientsRegisterError.headCircumference.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.headCircumference.focus = true;
        setFocusField('headCircumference');
      }
      isValid = false;
    }

    if(dataPatientsRegister.medicalTypeId === ''){
      _dataPatientsRegisterError.medicalType.title = 'Bạn chưa chọn loại hình khám';
      _dataPatientsRegisterError.medicalType.openTooltip = true;
      _dataPatientsRegisterError.medicalType.isError = true;
      if(Object.values(_dataPatientsRegisterError).every(item => item.focus === false)){
        _dataPatientsRegisterError.medicalType.focus = true;
        setAutocompleteValue(prevAutocompleteValue => {
          prevAutocompleteValue.medicalType.openOption = true
          return {...prevAutocompleteValue}
        })
        setFocusField('medicalType');
      }
      isValid = false;
    }

    // if(dataPatientsRegister.reason === ''){
    //   _dataPatientsRegisterError.reason.isError = true;
    //   isValid = false;
    // }

    if(dataPatientsRegister.userIdDoctor === ''){
      if(props.currentDoctorExamining.userIdDoctor === '') {
        toast.error('Bạn chưa chọn bác sĩ khám cho ngày hôm nay!', {toastId: 'error1'});
        isValid = false;
      }

    else if(props.currentDoctorExamining.userIdDoctor !== ''){
      setDataPatientsRegister(prevDataPatientsRegister => {
        prevDataPatientsRegister.userIdDoctor = props.currentDoctorExamining.userIdDoctor
          return prevDataPatientsRegister
        })
      }
    }

    setDataPatientsRegisterError(_dataPatientsRegisterError);
    return isValid;
  }

  const handleMedicalRegister = () => {
    setTimeout(() => {
      if(checkValidate()){
        firstFocusRef.current.focus();
        if(props.dataPantientAppointmentsToday){
          handleMedicalBackRegister();
        }
        else{
          setOpenModalExaminingSession(true);
        }
      }
    }, 100)
  }

  const handleMedicalBackRegister = async () => {
    setOpenAlertProcessing(true);
    const responseCreateMedicalBackRegister = await createMedicalBackRegister(dataPatientsRegister);
    if(responseCreateMedicalBackRegister.status === 200){
      toast.success(responseCreateMedicalBackRegister.data, {toastId: 'success5'})
      props.setCompleteMedicalRegister(true);
      handleResetField();
    }
    else{
      toast.error(responseCreateMedicalBackRegister.data, {toastId: 'error5'})
    }
    setOpenAlertProcessing(false);
  }

  const handleApplyPantientOldDiseaseData = async () => {
    setOpenAlertProcessing(true);
    document.getElementById('patientIdentifier').value = dataPatientsRegister.patient.identifier;
    document.getElementById('patientId').value = dataPatientsRegister.patient.patientId;
    document.getElementById('patientFullName').value = dataPatientsRegister.patient.fullName;

    const _autocompleteValue = {...autocompleteValue};
    _autocompleteValue.dayOfBirth = moment(dataPatientsRegister.patient.dayOfBirth);

    const response = await getFullAddressByIdWard(dataPatientsRegister.patient.codeWard);
    const responseListDistrict = await getListDistrict(response.provinceCode);
    const responseListWard = await getListWard(response.districtCode);

    const indexListGender = listGender.findIndex(gender => gender.genderValue === dataPatientsRegister.patient.gender);
    const indexListProvince = listProvince.findIndex(province => province.code === response.provinceCode);
    const indexListDistrict = responseListDistrict.findIndex(district => district.code === response.districtCode);
    const indexListWard = responseListWard.findIndex(ward => ward.code === response.wardCode);
    const indexListMedicalType = listMedicalType.findIndex(medicalType => medicalType.medicalTypeId === dataPatientsRegister.medicalTypeId);
    
    _autocompleteValue.gender.value = listGender[indexListGender];
    _autocompleteValue.province.value = listProvince[indexListProvince];
    _autocompleteValue.district.value = responseListDistrict[indexListDistrict];
    _autocompleteValue.ward.value = responseListWard[indexListWard];
    _autocompleteValue.medicalType.value = listMedicalType[indexListMedicalType];
    _autocompleteValue.vaccination = dataPatientsRegister.vaccination;
    setAutocompleteValue(_autocompleteValue);

    document.getElementById('patientAddress').value = dataPatientsRegister.patient.address;
    document.getElementById('patientFullNameMother').value = dataPatientsRegister.patient.fullNameMother;
    document.getElementById('patientPhoneMother').value = dataPatientsRegister.patient.phoneMother
    document.getElementById('patientFullNameFather').value = dataPatientsRegister.patient.fullNameFather;
    document.getElementById('patientPhoneFather').value = dataPatientsRegister.patient.phoneFather;

    setDataPatientsRegisterError(dataPatientsRegisterErrorDefault);
    setOpenAlertProcessing(false);
    setFocusField('height');
  }

  const handleApplyPantientAppointmentsTodayData = async () => {
    setOpenAlertProcessing(true);
    document.getElementById('patientIdentifier').value = props.dataPantientAppointmentsToday.patient.identifier;
    document.getElementById('patientId').value = props.dataPantientAppointmentsToday.patient.patientId;
    document.getElementById('patientFullName').value = props.dataPantientAppointmentsToday.patient.fullName;

    const _autocompleteValue = {...autocompleteValue};
    _autocompleteValue.dayOfBirth = moment(props.dataPantientAppointmentsToday.patient.dayOfBirth);

    const response = await getFullAddressByIdWard(props.dataPantientAppointmentsToday.patient.codeWard);
    const responseListDistrict = await getListDistrict(response.provinceCode);
    const responseListWard = await getListWard(response.districtCode);

    const indexListGender = listGender.findIndex(gender => gender.genderValue === props.dataPantientAppointmentsToday.patient.gender);
    const indexListProvince = listProvince.findIndex(province => province.code === response.provinceCode);
    const indexListDistrict = responseListDistrict.findIndex(district => district.code === response.districtCode);
    const indexListWard = responseListWard.findIndex(ward => ward.code === response.wardCode);
    const indexListMedicalType = listMedicalType.findIndex(medicalType => medicalType.medicalTypeId === props.dataPantientAppointmentsToday.medicalTypeId);
    
    _autocompleteValue.gender.value = listGender[indexListGender];
    _autocompleteValue.province.value = listProvince[indexListProvince];
    _autocompleteValue.district.value = responseListDistrict[indexListDistrict];
    _autocompleteValue.ward.value = responseListWard[indexListWard];
    _autocompleteValue.medicalType.value = listMedicalType[indexListMedicalType];
    _autocompleteValue.vaccination = props.dataPantientAppointmentsToday.vaccination;
    setAutocompleteValue(_autocompleteValue);

    document.getElementById('patientAddress').value = props.dataPantientAppointmentsToday.patient.address;
    document.getElementById('patientFullNameMother').value = props.dataPantientAppointmentsToday.patient.fullNameMother;
    document.getElementById('patientPhoneMother').value = props.dataPantientAppointmentsToday.patient.phoneMother
    document.getElementById('patientFullNameFather').value = props.dataPantientAppointmentsToday.patient.fullNameFather;
    document.getElementById('patientPhoneFather').value = props.dataPantientAppointmentsToday.patient.phoneFather;

    setDataPatientsRegisterError(dataPatientsRegisterErrorDefault);
    setOpenAlertProcessing(false);
    setFocusField('height');
  }

  const handleResetField = () => {
    formRef.current.reset();
    const inputs = formRef.current.querySelectorAll('input, textarea');
    inputs.forEach(input => input.dispatchEvent(new Event('input', { bubbles: true })));

    setAutocompleteValue(autocompleteValueDefault);

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

    if(props.dataPantientAppointmentsToday){
      props.setDataPantientAppointmentsToday();
    }

    setFocusField(null);

    setDataPatientsRegister(dataPatientsRegisterDefault);
    setDataPatientsRegisterError(dataPatientsRegisterErrorDefault);

    firstFocusRef.current.focus();
  }

  const handleOpenModalOldDisease = () => {
    handleResetField();
    setDataPatientsRegister(dataPatientsRegisterDefault);
    setAutocompleteValue(autocompleteValueDefault);
    setDataPatientsRegisterError(dataPatientsRegisterErrorDefault);
    setOpenModalOldDisease(true);
  }

  const handleGetListProvince = async () => {
    const response = await getListProvince();
    if(response !== 400){
      setListProvince(response);
    }
  }

  // const handleFindOldDisease = async () => {
  //   const response = await getListOldDisease('', '', dataPatientsRegister.patient.fullName, dataPatientsRegister.patient.dayOfBirth, dataPatientsRegister.patient.gender);
  //   if(response.length !== 0){
  //     setListOldDiseaseRegister(response);
  //     setOpenOldDiseaseRegister(true);
  //   }
  // }

  useEffect(() => {
    handleGetListProvince();
    firstFocusRef.current.focus();
  }, [])

  useEffect(() => {
    if(dataPatientsRegister.oldDisease === true){
      handleApplyPantientOldDiseaseData();
    }
  }, [dataPatientsRegister.oldDisease])

  useEffect(() => {
    if(props.dataPantientAppointmentsToday){
      setDataPatientsRegister(props.dataPantientAppointmentsToday);
      handleApplyPantientAppointmentsTodayData();
    }
  }, [props.dataPantientAppointmentsToday]) 

  useEffect(() => {
    if(props.onF2Press){
      if(openModalExaminingSession === true && openModalOldDisease === false){
        setIsContinueSelectedExaminingSession(true);
        props.setOnF2Press(false);
      }
      else{
        handleMedicalRegister();
        props.setOnF2Press(false);
      }
    }
    
    if(props.onF4Press){
      if(openModalExaminingSession === true || openModalOldDisease === true){
        props.setOnF4Press(false);
      }
      else{
        handleResetField();
        props.setOnF4Press(false);
      }
    }

    if(props.onF8Press){
      if(openModalExaminingSession === true || openModalOldDisease === true){
        props.setOnF8Press(false);
      }
      else{
        handleOpenModalOldDisease();
        props.setOnF8Press(false);
      }
    }
  }, [props.onF2Press, props.onF4Press, props.onF8Press])

  return (
    <>
      <Container sx={{'&.MuiContainer-maxWidthLg': {pr: 0}}}>
        <Box sx={{ minHeight: '36.4rem', borderRadius: '20px', boxShadow: 5, pt: 1.2, pb: 1.2, pl: 2.4, pr: 2.4, mt: 1.5}}>
          <Typography variant='h6' sx={{textAlign: 'center', fontWeight: 'bolder', color: 'blue'}}>Thông tin đăng ký khám</Typography> 
          <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}} component="form" ref={formRef}>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.identifier.title}</h6>} open={dataPatientsRegisterError.identifier.openTooltip} placement="left" PopperProps={{sx: { zIndex: 2 } }}> 
              <div style={{width: '18%', marginTop: '20px'}}>
                <TextField error={true ? dataPatientsRegisterError.identifier.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                  label="Mã định danh" variant="outlined" id='patientIdentifier'
                  inputRef={focusField === 'identifier' ? (input) => input && focusField === 'identifier' && input.focus() : firstFocusRef}
                  onChange={(e) => onChangeIdentifier(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => handleBlur(e.target.value, 'Identifier')}
                  inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"}, maxLength: 12 }}
                  InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                /> 
              </div>
            </Tooltip>
          </ThemeProvider>

          <ThemeProvider theme={tooltipTheme}>
            <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.patientId.title}</h6>} open={dataPatientsRegisterError.patientId.openTooltip} placement="top" PopperProps={{sx: { zIndex: 2 } }}> 
              <div style={{width: '18%', marginTop: '20px'}}>
                <TextField error={true ? dataPatientsRegisterError.patientId.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                  label="Mã BN" variant="outlined" id='patientId'
                  inputRef={(input) => input && focusField === 'patientId' && input.focus()}
                  onChange={(e) => onChangePatientId(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={(e) => handleBlur(e.target.value, 'PatientId')}
                  inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"}, maxLength: 12 }}
                  InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                /> 
              </div>
            </Tooltip>
          </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.fullName.title}</h6>} open={dataPatientsRegisterError.fullName.openTooltip} placement="top" PopperProps={{sx: { zIndex: 2 } }} 
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: { offset: [37, -7], },
                      },
                    ],
                  },
                }} 
              > 
                <div style={{width: '30%', display: 'inline-grid', marginTop: '20px'}}>
                  <TextField error={true ? dataPatientsRegisterError.fullName.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    label="Họ tên" variant="outlined" id="patientFullName"                   
                    inputRef={(input) => input && focusField === 'fullName' && input.focus()}
                    onChange={(e) => onChangeFullName(e.target.value)}
                    inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"} }}
                    InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                  /> 
                </div>
              </Tooltip>
            </ThemeProvider>
      
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="vi">
              <ThemeProvider theme={tooltipTheme}>
                <DemoContainer components={['DatePicker']} >
                  <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.dayOfBirth.title}</h6>} open={dataPatientsRegisterError.dayOfBirth.openTooltip} placement="bottom" PopperProps={{sx: { zIndex: 2 } }}>    
                    <Box sx={{width: 142, mt: '12px !important'}}>
                      <div style={{width: '100%', }}>
                        <DateField label="Ngày sinh" 
                          format='DD/MM/YYYY' value={autocompleteValue.dayOfBirth}
                          disabled={dataPatientsRegister.oldDisease === true ? true : false}
                          slotProps={{ 
                            textField: 
                              { 
                                inputRef: dateFieldRef,
                                error: true ? dataPatientsRegisterError.dayOfBirth.isError === true : false,
                                onBlur: (e) => handleBlur(e.target.value, 'dayOfBirth'),
                                sx: {'& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } },
                              }
                          }}
                          onChange={(value) => onChangeDOB(value)}
                        />
                      </div>
                    </Box>
                  </Tooltip>
                </DemoContainer>
              </ThemeProvider>      
            </LocalizationProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.gender.title}</h6>} open={dataPatientsRegisterError.gender.openTooltip} placement="top" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '12%', marginTop: '20px'}}>
                  <Autocomplete disablePortal id='patientGender' disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    value={autocompleteValue.gender.value}
                    options={listGender} 
                    getOptionLabel={(option) => option.genderName}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.genderName}
                      </li>
                    )}
                    onChange={(e, value) => onSelectGender(e, value)}
                    open={autocompleteValue.gender.openOption}
                    onFocus={() => handleFocus('Gender')}
                    onBlur={(e) => handleBlur(e.target.value, 'Gender')}
                    renderInput={(params) => ( 
                      <TextField {...params} 
                        label="Giới tính" 
                        inputRef={(input) => input && focusField === 'gender' && input.focus()}
                        error={true ? dataPatientsRegisterError.gender.isError === true : false} 
                        sx={{'& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } }}
                      /> 
                    )}
                    disableClearable // Bỏ icon xóa
                    popupIcon={null} // Bỏ icon dropdown
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
             
            {/* <TextField label="Dân tộc" variant="outlined" sx={{width: '12%', '&.MuiTextField-root' : {marginTop: '15px'}}}/> */}

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.province.title}</h6>} open={dataPatientsRegisterError.province.openTooltip} placement="left" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '19.2%', marginTop: '20px'}}>
                  <Autocomplete disablePortal disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    value={autocompleteValue.province.value}
                    options={listProvince} 
                    noOptionsText={'Đang tải...'}
                    filterOptions={filterOptions}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.name}
                      </li>
                    )}
                    onChange={(e, value) => onSelectProvine(e, value)}
                    open={autocompleteValue.province.openOption}
                    onFocus={() => handleFocus('Province')}
                    onBlur={(e) => handleBlur(e.target.value, 'Province')}
                    renderInput={(params) => (
                      <TextField {...params} 
                        label="Thành phố" 
                        inputRef={(input) => input && focusField === 'province' && input.focus()}
                        error={true ? dataPatientsRegisterError.province.isError === true : false} 
                        sx={{'& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } }}
                      />
                    )}
                    disableClearable // Bỏ icon xóa
                    popupIcon={null} // Bỏ icon dropdown
                  />
                </div>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.district.title}</h6>} open={dataPatientsRegisterError.district.openTooltip} placement="top" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '24%', marginTop: '20px'}}>
                  <Autocomplete disablePortal disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    value={autocompleteValue.district.value}
                    options={listDistrict.list} 
                    noOptionsText={listDistrict.loading ? 'Đang tải...' : ''}
                    open={autocompleteValue.district.openOption}
                    onFocus={() => handleFocus('District')}
                    onBlur={(e) => handleBlur(e.target.value, 'District')}
                    filterOptions={filterOptions}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.fullName}
                      </li>
                    )}
                    onChange={(e, value) => onSelectDistrict(e, value)}
                    renderInput={(params) => (
                      <TextField {...params} 
                        label="Quận/Huyện" 
                        inputRef={(input) => input && focusField === 'district' && input.focus()}
                        error={true ? dataPatientsRegisterError.district.isError === true : false} 
                        sx={{'& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } }}
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
                </div>
              </Tooltip>
            </ThemeProvider>
            
            <ThemeProvider theme={tooltipTheme}>
              <>
                <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.ward.title}</h6>} open={dataPatientsRegisterError.ward.openTooltip} placement="bottom" PopperProps={{sx: { zIndex: 2 } }}>
                  <div style={{width: '23.5%', marginTop: '20px'}}>
                    <Autocomplete disablePortal disabled={dataPatientsRegister.oldDisease === true ? true : false}
                      value={autocompleteValue.ward.value}
                      options={listWard.list} 
                      noOptionsText={listWard.loading ? 'Đang tải...' : ''}
                      filterOptions={filterOptions}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.fullName}
                        </li>
                      )}
                      onChange={(e, value) => onSelectWard(e, value)}
                      open={autocompleteValue.ward.openOption}
                      onFocus={() => handleFocus('Ward')}
                      onBlur={(e) => handleBlur(e.target.value, 'Ward')}
                      renderInput={(params) => (
                        <TextField {...params} 
                          label="Phường/Xã" 
                          inputRef={(input) => input && focusField === 'ward' && input.focus()}
                          error={true ? dataPatientsRegisterError.ward.isError === true : false} 
                          sx={{'& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } }}
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
                  </div>
                </Tooltip>
              </>
            </ThemeProvider>
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.address.title}</h6>} open={dataPatientsRegisterError.address.openTooltip} placement="bottom" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '30%', display: 'inline-grid', marginTop: '20px'}}>
                  <TextField error={true ? dataPatientsRegisterError.address.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    label="Địa chỉ" variant="outlined" id='patientAddress'
                    inputRef={(input) => input && focusField === 'address' && input.focus()}
                    onChange={(e) => onChangeAddress(e.target.value)}
                    inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"} }}
                    InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.fullNameMother.title}</h6>} open={dataPatientsRegisterError.fullNameMother.openTooltip} placement="left" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '30%', display: 'inline-grid', marginTop: '20px'}}>
                  <TextField error={true ? dataPatientsRegisterError.fullNameMother.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    label="Họ tên mẹ" variant="outlined" id='patientFullNameMother'
                    inputRef={(input) => input && focusField === 'fullNameMother' && input.focus()}
                    autoFocus={dataPatientsRegisterError.fullNameMother.focus}
                    onChange={(e) => onChangeFullNameMother(e.target.value)}
                    inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"} }}
                    InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.phoneMother.title}</h6>} open={dataPatientsRegisterError.phoneMother.openTooltip} placement="bottom" PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '18%', marginTop: '20px'}}>
                  <TextField error={true ? dataPatientsRegisterError.phoneMother.isError === true : false} disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    label="Điện thoại" variant="outlined" id='patientPhoneMother' 
                    inputRef={(input) => input && focusField === 'phoneMother' && input.focus()}
                    onChange={(e) => onChangePhoneMother(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => handleBlur(e.target.value, 'PhoneMother')}
                    inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"}, maxLength: 10 }}
                    InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
            

            <TextField label="Họ tên cha" disabled={dataPatientsRegister.oldDisease === true ? true : false}
              variant="outlined" id='patientFullNameFather' 
              sx={{width: '30.4%', '&.MuiTextField-root' : {marginTop: '20px'}}} 
              onChange={(e) => onChangeFullNameFather(e.target.value)}
              inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"} }}
              InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
            />
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.phoneFather.title}</h6>} open={dataPatientsRegisterError.phoneFather.openTooltip}>
                <div style={{width: '18%', marginTop: '20px'}}>
                  <TextField label="Điện thoại" disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    inputRef={(input) => input && focusField === 'phoneFather' && input.focus()}
                    variant="outlined" id='patientPhoneFather'
                    onChange={(e) => onChangePhoneFather(e, e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => handleBlur(e.target.value, 'PhoneFather')}
                    inputProps={{ style: { WebkitTextFillColor: dataPatientsRegister.oldDisease ? "#ff1744" :  "black"}, maxLength: 10 }}
                    InputLabelProps={dataPatientsRegister.oldDisease === true ? {shrink: Boolean(true) } : null}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.height.title}</h6>} open={dataPatientsRegisterError.height.openTooltip} placement='left' PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '22%', marginTop: '20px'}}>
                  <TextField label="Chiều cao bé" variant="outlined" id='patientHeight' error={true ? dataPatientsRegisterError.height.isError === true : false}
                    inputRef={(input) => input && focusField === 'height' && input.focus()}
                    InputProps={{endAdornment: <InputAdornment position="end">(cm)</InputAdornment>}}
                    onChange={(e) => onChangeHeight(e.target.value)}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.weight.title}</h6>} open={dataPatientsRegisterError.weight.openTooltip} PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '22%', marginTop: '20px'}}>
                  <TextField label="Cân nặng bé" variant="outlined" id='patientWeight' error={true ? dataPatientsRegisterError.weight.isError === true : false}
                    inputRef={(input) => input && focusField === 'weight' && input.focus()}
                    InputProps={{endAdornment: <InputAdornment position="end">(kg)</InputAdornment>}}
                    onChange={(e) => onChangeWeight(e.target.value)}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>  
            
            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.headCircumference.title}</h6>} open={dataPatientsRegisterError.headCircumference.openTooltip} placement='top-start' PopperProps={{sx: { zIndex: 2 } }}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: { offset: [70, -7], },
                      },
                    ],
                  },
                }} 
              >
                <div style={{width: '22%', marginTop: '20px'}}>
                  <TextField label="Vòng đầu bé" variant="outlined" id='patientHeadCircumference' error={true ? dataPatientsRegisterError.headCircumference.isError === true : false}
                    inputRef={(input) => input && focusField === 'headCircumference' && input.focus()}
                    InputProps={{endAdornment: <InputAdornment position="end">(cm)</InputAdornment>}}
                    onChange={(e) => onChangeHeadCircumference(e.target.value)}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.medicalType.title}</h6>} open={dataPatientsRegisterError.medicalType.openTooltip} placement='bottom' PopperProps={{sx: { zIndex: 2 } }}>
                <div style={{width: '30.5%', marginTop: '20px'}}>
                  <Autocomplete disablePortal id='patientMedicalType' disabled={dataPatientsRegister.oldDisease === true ? true : false}
                    value={autocompleteValue.medicalType.value}
                    options={listMedicalType} 
                    getOptionLabel={(option) => option.medicalTypeName}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.medicalTypeName}
                      </li>
                    )}
                    onChange={(e, value) => onSelectMedicalType(e, value)}
                    open={autocompleteValue.medicalType.openOption}
                    onFocus={() => handleFocus('MedicalType')}
                    onBlur={(e) => handleBlur(e.target.value, 'MedicalType')}
                    renderInput={(params) => ( 
                      <TextField {...params} 
                        label="Loại hình khám" 
                        inputRef={(input) => input && focusField === 'medicalType' && input.focus()}
                        error={true ? dataPatientsRegisterError.medicalType.isError === true : false} 
                        sx={{
                          '& .MuiInputBase-input': { WebkitTextFillColor: dataPatientsRegister.oldDisease === true ? '#ff1744' : '' } ,
                          '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.Mui-disabled.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot.css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root': {paddingLeft: '4px', paddingRight: '0px'},
                          '& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-adornedEnd.MuiAutocomplete-inputRoot.css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root': {paddingLeft: '4px', paddingRight: '0px'}
                        }}
                      /> 
                    )}
                    disableClearable // Bỏ icon xóa
                    popupIcon={null} // Bỏ icon dropdown
                  />
                </div>
              </Tooltip>
            </ThemeProvider>

            <ThemeProvider theme={tooltipTheme}>
              <Tooltip title={<h6 style={{ margin: '0px' }}>{dataPatientsRegisterError.reason.title}</h6>} open={dataPatientsRegisterError.reason.openTooltip} >
                <div style={{width: '100%' }}>
                  <TextField fullWidth label="Lý do khám" multiline rows={3} variant="outlined" id='patientReason' error={true ? dataPatientsRegisterError.reason.isError === true : false}
                    sx={{'&.MuiTextField-root' : {marginTop: '20px'}}} 
                    onChange={(e) => onChangeReason(e.target.value)}
                  />
                </div>
              </Tooltip>
            </ThemeProvider>
            
            <FormControlLabel control={<Checkbox checked={autocompleteValue.vaccination}/>} sx={{width: '100%'}}
              label="Bệnh nhân có tham gia tiêm ngừa" onChange={(e) => onChangeVaccination(e.target.checked)}/>  

            <Box sx={{display: 'flex', justifyContent: 'center', mt: 1, width: '100%'}}>
              <Button variant="contained" color="primary" sx={{mr: 1}} onClick={() => handleMedicalRegister()}>Đăng ký (f2)</Button>
              <Button variant="contained" color="warning" onClick={() => handleResetField()}>Làm mới (f4)</Button>
              <Button variant="contained" color="error" sx={{ml: 1}} onClick={() => handleOpenModalOldDisease()}>Bệnh cũ (f8)</Button>
            </Box>
          </Box>         
        </Box>
      </Container>

      <ExaminingSession 
        openModalExaminingSession={openModalExaminingSession} setOpenModalExaminingSession={setOpenModalExaminingSession} 
        handleResetField={handleResetField} setCompleteMedicalRegister={props.setCompleteMedicalRegister}
        isContinueSelectedExaminingSession={isContinueSelectedExaminingSession} setIsContinueSelectedExaminingSession={setIsContinueSelectedExaminingSession}
        dataPatientsRegister={dataPatientsRegister} 
      />

      <OldDisease 
        openModalOldDisease={openModalOldDisease} setOpenModalOldDisease={setOpenModalOldDisease}
        dataPatientsRegister={dataPatientsRegister} setDataPatientsRegister={setDataPatientsRegister}
      />

      {/* <OldDiseaseForRegister
        openOldDiseaseRegister={openOldDiseaseRegister} setOpenOldDiseaseRegister={setOpenOldDiseaseRegister}
        setDataPatientsRegister={setDataPatientsRegister}
        listOldDiseaseRegister={listOldDiseaseRegister} setListOldDiseaseRegister={setListOldDiseaseRegister}
      /> */}

      <AlertProcessing
        openAlertProcessing={openAlertProcessing} setOpenAlertProcessing={setOpenAlertProcessing}            
      />
    </>
  )
}

export default BookMedical