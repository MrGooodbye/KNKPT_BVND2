import React, { useState, useContext, useEffect } from 'react';
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
//mui icon
import SendIcon from '@mui/icons-material/Send';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
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
//
import TextareaAutosize from 'react-textarea-autosize';
//scss
import './SCSS/HealthRecords.scss';

function HealthRecords(props) {

    const listHealthRecords = [
      {periodExams: 'Khám 21 tháng', status: 0, dateExams: '20/04/2024', doctorExams: '', conclude: ''},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'},
      {periodExams: 'Khám 20 tháng', status: 2, dateExams: '10/03/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 2'},
      {periodExams: 'Khám 18 tháng', status: 2, dateExams: '01/01/2024', doctorExams: 'Nguyễn Văn A', conclude: 'kết luận 1'}
    ]

    const handleCloseModalHealthRecords = (event, reason) => {
      if(reason && reason === "backdropClick"){
        return;
      }
      else{
        props.setOpenModalHealthRecords(false);
      }
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

    const MainDataExaminingFake = [
      {
          "categoryName": "Nhóm máu mẹ / con",
          "categoryContents": [
              {
                  "categoryContentOrder": 1,
                  "categoryContentTitle": null,
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Nhóm máu mẹ",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Nhóm máu con",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              }
          ]
      },
      {
          "categoryName": "Tiểu sử bệnh lý của mẹ",
          "categoryContents": [
              {
                  "categoryContentOrder": 1,
                  "categoryContentTitle": "Bệnh lý trước mang thai",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Hen suyễn",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Tiểu đường",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Béo phì",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Bệnh lý tuyến giáp",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Bệnh tim",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Bệnh thận mạn",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 7,
                          "categoryContentQuestionName": "Sức khỏe răng miệng kém",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 8,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 2,
                  "categoryContentTitle": "Biến chứng thai kỳ",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Tiểu đường thai kỳ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Tăng huyết áp thai kỳ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Tiền sản giật",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Sản giật",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 3,
                  "categoryContentTitle": "Bệnh lý nhiễm trùng",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Nhiễm Streptococcus nhóm B",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Viêm màng ối",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Nhiễm trùng tiết niệu",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "HIV",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Viêm gan B",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Giang mai",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 7,
                          "categoryContentQuestionName": "Nhiễm Toxoplasma",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 8,
                          "categoryContentQuestionName": "Nhiễm CMV",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 9,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 4,
                  "categoryContentTitle": "Thuốc / Độc chất",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Thuốc lá",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Rượu",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Thuốc đang sử dụng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Thuốc đã sử dụng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              }
          ]
      },
      {
          "categoryName": "Tiền căn sản khoa",
          "categoryContents": [
              {
                  "categoryContentOrder": 1,
                  "categoryContentTitle": null,
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Tuổi thai (tuần)",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Cân nặng (kg)",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Chiều dài (cm)",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Vòng đầu (cm)",
                          "categoryContentQuestionType": "string",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 2,
                  "categoryContentTitle": "Tình trạng trước sinh",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Sinh non",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Tuổi thai: "
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Ối vỡ sớm",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Thời gian vỡ ối: "
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Sinh thường",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Can thiệp: "
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Sinh mổ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Lý do mổ: "
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Chuyển dạ kéo dài",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Thời gian chuyển dạ"
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Sốt lúc sinh",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 7,
                          "categoryContentQuestionName": "Chảy máu lúc sinh",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 8,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 3,
                  "categoryContentTitle": "Tình trạng khi sinh",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Bất thường lúc sinh",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Bệnh lý bẩm sinh",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Tiêm ngừa lao",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Tiêm ngừa VGSV B",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Tiêm Vitamin K1",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 4,
                  "categoryContentTitle": "Chăm sóc sau sinh",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Nằm với mẹ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Dưỡng nhi",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Chăm sóc đặc biệt",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Sữa mẹ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Sữa công thức",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Vitamin D",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 7,
                          "categoryContentQuestionName": "Vàng da",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 8,
                          "categoryContentQuestionName": "Bệnh lý cần theo giỏi",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 9,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              }
          ]
      },
      {
          "categoryName": "Xét nghiệm",
          "categoryContents": [
              {
                  "categoryContentOrder": 1,
                  "categoryContentTitle": null,
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Huyết đồ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Tổng quát",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Điện di Hemoglobin",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Bilan đạm, lipid (bệnh nhân suy dinh dưỡng, béo phì)",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Tổng quan tích nước tiểu",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              }
          ]
      },
      {
          "categoryName": "Khám tổng quát",
          "categoryContents": [
              {
                  "categoryContentOrder": 1,
                  "categoryContentTitle": "Khám da",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Rối loạn sắc tố",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Sang thương da",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Tình trạng móng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 2,
                  "categoryContentTitle": "Khám đầu",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Thóp trước (thường đóng lúc 14 tháng)",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Biến dạng họp sọ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 3,
                  "categoryContentTitle": "Khám mắt",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Mi mắt",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Nhãn cầu",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Đồng tử",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Phản xạ ánh sáng đỏ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Vận động mắt theo vật",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Đánh giá thị lực theo bảng câu hỏi",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": "Bảng thị lực"
                      },
                      {
                          "categoryContentQuestionOrder": 7,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 4,
                  "categoryContentTitle": "Khám miệng",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Nấm miệng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Sâu răng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Mảng bám",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "viêm nướu",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 5,
                  "categoryContentTitle": "Khám tim",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Nhịp tim",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Âm thổi",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 6,
                  "categoryContentTitle": "Khám bụng",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Rốn",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Khối vùng bụng",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 7,
                  "categoryContentTitle": "Khám xương khớp",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Dị tật cột sống",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Dị tật chi",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Bàn chân bẹt",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Dáng đi bất thường",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              },
              {
                  "categoryContentOrder": 8,
                  "categoryContentTitle": "Khám thần kinh",
                  "categoryContentQuestions": [
                      {
                          "categoryContentQuestionOrder": 1,
                          "categoryContentQuestionName": "Tương tác giao tiếp",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 2,
                          "categoryContentQuestionName": "Nhận thức",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 3,
                          "categoryContentQuestionName": "Vận động thô",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 4,
                          "categoryContentQuestionName": "Vận động tinh",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 5,
                          "categoryContentQuestionName": "Sức cơ",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      },
                      {
                          "categoryContentQuestionOrder": 6,
                          "categoryContentQuestionName": "Khác",
                          "categoryContentQuestionType": "check",
                          "categoryContentAnswer": null,
                          "categoryContentNote": null
                      }
                  ]
              }
          ]
      }
  ]

    const [dataExaminingSelected, setDataExaminingSelected] = useState(MainDataExaminingFake);
    const [mainDataExaminingForConclusion, setMainDataExaminingForConclusion] = useState([]);

    const [openCollapse, setOpenCollapse] = useState([]);

    //state vị trí nội dung hiện tại
    const [currentContentExamining, setCurrentContentExamining] = useState([1]);

    const handleSetDataCompleteExamining = () => {
        setDataExaminingSelected(MainDataExaminingFake);

        // const editMainDataExamining = props.mainDataExamining.filter((data) => data.categoryName !== 'Sổ sức khỏe' && data.categoryName !== 'Đánh giá dinh dưỡng' && data.categoryName !== 'Sổ tiêm ngừa');
        // setDataExaminingSelected(editMainDataExamining);

        const editMainDataExamining = [...dataExaminingSelected];

        //console.log(editMainDataExamining);

        const processedData = editMainDataExamining.map(category => {
            const firstContent = category.categoryContents[0];
            return {
              ...category,
              categoryContents: [firstContent],
              contentQuantity: category.categoryContents.length
            };
          });

        setMainDataExaminingForConclusion(processedData);

        // console.log(processedData);
    }

    const handleOpenCollapseByCategory = (categoryIndex) => {
        setOpenCollapse((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[categoryIndex] = !newOpen[categoryIndex];
            return newOpen;
        });
    };

    const handleAnswerCheckQuestion = () => {
        console.log(dataExaminingSelected);
    }

    const handleOnChangePage = (categoryIndex, page) => {
        //set lại số trang hiện tại
        setCurrentContentExamining((prevCurrentContentExamining) => {
            const newContentExamining = [...prevCurrentContentExamining];
            newContentExamining[categoryIndex] = newContentExamining[categoryIndex + 1];
            return newContentExamining;
        })

        //
        // console.log('index category: ', categoryIndex, 'trang tiep theo: ', page);
        //console.log(dataExaminingSelected[categoryIndex].categoryContents[page - 1]);

        const a = [...mainDataExaminingForConclusion];
        const b = dataExaminingSelected[categoryIndex].categoryContents[page - 1];

        a[categoryIndex].categoryContents = [b];

        setMainDataExaminingForConclusion(a);

        // console.log(a);
        // console.log(mainDataExaminingForConclusion);
        // console.log([b]);

        //console.log(mainDataExaminingForConclusion[categoryIndex].categoryContents);

        
    }


    useEffect(() => {
      handleSetDataCompleteExamining();
    }, [])
  

    return (
      <>
          <Dialog fullWidth={true} maxWidth={'md'} open={props.openModalHealthRecords} onClose={(event, reason) => handleCloseModalHealthRecords(event, reason)} disableEscapeKeyDown={true}>
              <DialogTitle sx={{ p: 1, fontWeight: 'bolder', fontSize: '22px', textAlign: 'center' }}>Khám 20 tháng</DialogTitle>
              <IconButton onClick={() => handleCloseModalHealthRecords()}sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
              </IconButton>
              <DialogContent dividers sx={{pt: '15px', pb: '15px'}}>
                  <Box sx={{pl: 6, pr: 6}}>
                  <List sx={{p: 0}}>
                        {mainDataExaminingForConclusion.map((categoryItem, categoryIndex) => (
                            <Box key={`category ${categoryIndex}`}>
                                {/* cây thư mục khám */}
                                <ListItemButton sx={{pt: '4px', pb: '4px', borderRadius: '8px', ':hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}, backgroundColor: ''}} onClick={() => handleOpenCollapseByCategory(categoryIndex)}>
                                    <ListItemIcon sx={{minWidth: '30px', '& .MuiSvgIcon-fontSizeMedium': {fontSize: '1rem', color: '#2962ff'}}}><SendIcon /></ListItemIcon>
                                    <ListItemText primary={categoryItem.categoryName} sx={{'& .MuiListItemText-primary': {fontSize: '1.25rem', fontWeight: 'bolder', color: 'deeppink'}}}/>
                                </ListItemButton>

                                <Collapse in={openCollapse[categoryIndex]} timeout="auto" unmountOnExit>
                                    {categoryItem.categoryContents.map((contentItem, contentIndex) => (
                                        <div key={`category ${categoryIndex} content ${contentIndex}`} className='header-content-category'>
                                            <div className='content-examining'>
                                                <div className='title-examining'>
                                                    <Typography variant='h6' sx={{fontWeight: 'bolder', textAlign: 'center', fontSize: '1.2rem', mt: 0, mb: 0.2}}>{contentItem.categoryContentTitle}</Typography>
                                                </div>       


                                                <div className='question-examining' style={contentItem.categoryContentTitle === null ? {marginTop: '25px'} : {marginTop: '2px'}}>
                                                    {contentItem.categoryContentQuestions.map((questionItem, questionIndex) => (
                                                        <Box key={`category ${categoryIndex} content ${contentIndex} question ${questionIndex}`}>
                                                            <Grid container rowSpacing={0}>
                                                                {questionIndex === 0 ? 
                                                                    <>
                                                                        <Grid item xs={4} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7}}>
                                                                            <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>Tình trạng</Typography>
                                                                        </Grid>

                                                                        {questionItem.categoryContentQuestionType === 'check' ? 
                                                                            <>
                                                                                <Grid item xs={1} sx={{border: '2px solid rgb(218,220,224)', borderRight: '0px', p: 0.7, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                                                        <CheckBoxIcon sx={{fontSize: '1.22rem', color: 'gray'}}/><Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', margin: 'auto', lineHeight: '1.6'}}>Có</Typography>
                                                                                </Grid>
                                                                                <Grid item xs={7} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder', ml: 0.5}}>Ghi chú</Typography>
                                                                                </Grid>
                                                                            </>
                                                                            : 
                                                                                <Grid item xs={8} sx={{border: '2px solid rgb(218,220,224)', p: 0.7}}>
                                                                                    <Typography variant='subtitle1' sx={{color: 'blue', fontWeight: 'bolder'}}>Giá trị</Typography>
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
                                                                            <Checkbox checked={questionItem.categoryContentAnswer === true ? true : false } color='error' sx={{'& .MuiSvgIcon-fontSizeMedium': {fontSize: '1.2rem'}}} onClick={() => handleAnswerCheckQuestion(categoryIndex)}></Checkbox>
                                                                        </Grid>

                                                                        <Grid item xs={7} >
                                                                            <div className='note-for-answer'>
                                                                                <div className='suggest-note' key={`category ${categoryIndex} content ${contentIndex} question ${questionIndex} current ${currentContentExamining[categoryIndex]}`}>                                                                          
                                                                                    <TextareaAutosize className='test' rows={1} style={{width: '100%', color: 'red', border: 'none', outline: 'none'}} 
                                                                                        
                                                                                        //value={questionItem.categoryContentNote}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </Grid>
                                                                    </>   
                                                                    :
                                                                    <>
                                                                        <Grid item xs={8}>
                                                                            <input type='text' className='value-for-answer' defaultValue={questionItem.categoryContentAnswer} />
                                                                        </Grid>
                                                                    </>
                                                                }
                                                            </Grid>
                                                        </Box>
                                                    ))}
                                                </div>                                             
                                            </div>

                                            <div className='footer-content-category'>
                                                <Pagination count={categoryItem.contentQuantity} page={currentContentExamining[categoryIndex]} color="success" sx={{m: 'auto'}} onChange={(e, page) => handleOnChangePage(categoryIndex, page)}/>
                                            </div>
                                        </div>
                                    ))}
                                </Collapse>
                            </Box>
                        ))}
                    </List>
                    <TextareaAutosize disabled placeholder='Kết luận của bác sĩ' style={{width: '100%', height: '10vh', padding: '10px', fontSize: '18px', marginTop: '5px'}} value={'đây là kết luận'}/>
                  </Box>
              </DialogContent>
              <DialogActions sx={{justifyContent: 'center'}}>
                <Button variant='contained' color='secondary' onClick={(event, reason) => handleCloseModalHealthRecords(event, reason)}>Đóng</Button>
              </DialogActions>
          </Dialog>
      </>
    )
}

export default HealthRecords






// <Box>
//                     <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', fontSize: '1.2rem'}}>Thông tin bệnh nhân</Typography>
//                       <Box sx={{pl: 2, pr: 2, mt: 1, mb: 1}}>
//                         <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4}}>
//                           <Grid item xs={4} sx={{display: 'inline-flex'}}>
//                             <PinIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Mã BN: 000001</Typography>
//                           </Grid>
//                           <Grid item xs={8} sx={{display: 'inline-flex'}}>
//                             <PersonIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Họ tên: Tạ Thị Phương Thảo Thảo Thảo</Typography>
//                           </Grid>
//                           <Grid item xs={4} sx={{display: 'inline-flex'}}>
//                             <CalendarMonthIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Ngày sinh: 01/01/2024</Typography>
//                           </Grid>
//                           <Grid item xs={4} sx={{display: 'inline-flex'}}>
//                             {/* <MaleIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Giới tính: Nam</Typography> */}
//                             <FemaleIcon sx={{color: 'coral', fontSize: '27px'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Giới tính: Nữ</Typography>
//                           </Grid>
//                           <Grid item xs={4} sx={{display: 'inline-flex'}}>
//                             <InfoIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Tháng tuổi: 4</Typography>
//                           </Grid>
//                           <Grid item xs={4} sx={{display: 'inline-flex'}}>
//                             <PhoneIcon sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Số điện thoại: 0987654321</Typography>
//                           </Grid>
//                           <Grid item xs={8} sx={{display: 'inline-flex'}}>
//                             <Home sx={{color: 'tomato'}}/><Typography variant='subtitle1' sx={{ml: 1}}>Địa chỉ: Đây là địa chỉ</Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder', fontSize: '1.2rem', mt: 1.4, mb: 0.5}}>Khám và theo dõi sức khỏe định kỳ</Typography>
//                     <TableContainer component={Paper} sx={{boxShadow: 4, mb: 1.5}}>
//                       <Table stickyHeader>
//                         <TableHead>
//                             <TableRow sx={{"& th": {color: "rgba(96, 96, 96)", backgroundColor: "pink"}}}>
//                             <TableCell align='left' sx={{fontSize: '0.9rem', color: 'black'}}>Kỳ khám</TableCell>
//                             <TableCell align="left" sx={{fontSize: '0.9rem'}}>Trạng thái</TableCell>
//                             <TableCell align="left" sx={{fontSize: '0.9rem'}}>Ngày khám</TableCell>
//                             <TableCell align="left" sx={{fontSize: '0.9rem'}}>Bác sĩ khám</TableCell>
//                             <TableCell align="left" sx={{fontSize: '0.9rem'}}>Kết luận</TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody sx={{":before": {boxSizing: 'unset'}, ":after": {boxSizing: 'unset'}}}>
//                         {listHealthRecords.map((row, index) => (
//                           <TableRow hover role="checkbox" key={index} sx={{cursor: 'pointer',}} onClick={(e) => console.log(row)}>
//                             <TableCell align='left' sx={{width: '120px'}}><DescriptionIcon sx={{mr: 0.5, mb: 0.4, color: 'dodgerblue'}}/>{row.periodExams}</TableCell>
//                             <TableCell align='left' sx={{width: '105px'}}>{handleRenderExamsStatus(row.status)}</TableCell>
//                             <TableCell align='left' sx={{width: '62px'}}>{row.dateExams}</TableCell>
//                             <TableCell align='left' sx={{width: '120px'}}>{row.doctorExams}</TableCell>
//                             <TableCell align='left' sx={{width: '160px'}}>{row.conclude}</TableCell>
//                           </TableRow>
//                         ))}
//                        </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </Box>