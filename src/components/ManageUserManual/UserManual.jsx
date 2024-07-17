import React from 'react'
//mui theme
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//mui icon
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function UserManual(props) {

    return (
        <Dialog fullWidth={true} maxWidth={'sm'} open={props.openModalUserManual} disableEscapeKeyDown={true}>
            <DialogTitle sx={{ fontWeight: 'bolder', fontSize: '20px', textAlign: 'center', color: 'red', textTransform: 'uppercase' }}>Hướng dẫn sử dụng</DialogTitle>
            <IconButton onClick={() => props.setOpenModalUserManual(false)} sx={{position: 'absolute', right: 5, top: 7}}>
                <CloseIcon fontSize='medium'/>
            </IconButton>
            <DialogContent dividers sx={{pl: '15px', pr: '15px'}}>
                <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder'}}>Điều dưỡng</Typography>
                    <Box sx={{pl: '5px', pr: '5px'}}>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Đăng ký khám</Typography>
                        <Typography>Nhấn phím F2 hoặc nút Đăng ký trên màn hình</Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Làm mới form thông tin đăng ký khám</Typography>
                        <Typography>Nhấn phím F4 hoặc nút Làm mới trên màn hình</Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Tìm bệnh cũ</Typography>
                        <Typography>Nhấn phím F8 hoặc nút Bệnh cũ trên màn hình, sau khi nhập thông tin và tìm được bệnh nhân, click đúp thông tin bệnh nhân để form thông tin đăng ký khám nhận dữ liệu</Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Sửa thông tin bệnh nhân</Typography>
                        <Typography>Trong bảng danh sách đăng ký khám trong ngày, nhấn vào bệnh nhân để mở form sửa thông tin</Typography>
                    </Box>
                <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder'}}>Bác sĩ</Typography>
                    <Box sx={{pl: '5px', pr: '5px'}}>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Khám bệnh</Typography>
                        <Typography>Bước 1: Nhấn chọn bệnh nhân để khám</Typography>
                        <Typography>Bước 2: Nhấn F2 để bắt đầu khám</Typography>
                        <Typography>Bước 3: Nhấn F4 để kết thúc khám</Typography>
                        <Typography sx={{color: 'green', fontWeight: 'bolder'}}>Sửa thông tin hỏi bệnh khi đã kết thúc khám</Typography>

                    </Box>
                
                <Typography variant='h6' sx={{color: 'blue', fontWeight: 'bolder'}}>Admin</Typography>
                {/* <Typography variant='subtitle1' sx={{color: 'red'}}>Nếu có sự cố liên hệ zalo: 0987654321 (chỉ phục vụ giờ hành chính)</Typography> */}
            </DialogContent>
        </Dialog>
    )
}

export default UserManual