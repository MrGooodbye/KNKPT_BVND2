import React, { useState, useContext, useEffect, useRef } from 'react';
//mui theme
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//context
import { UserContext } from '../../context/UserContext';

function Home() {

    const { user, loading } = useContext(UserContext);

    return (
        <Container> 
            <Box sx={{mt: 1}}>
                {loading === false && user && user.isLogin ?
                    user.positionName === 'Nursing' ? 
                        <>
                            <Typography variant='subtitle1' sx={{ml: 2, fontSize: '1.35rem'}}>Nếu bạn thấy dòng chữ này hãy nhấn vào <span style={{fontWeight: 'bolder', color: 'blue'}}>"Đăng ký khám"</span> ở thanh menu có logo của bệnh viện để chuyển về trang đăng ký khám</Typography>
                        </>
                    :
                        user.positionName === 'Doctor' ? 
                            <>
                                <Typography variant='subtitle1' sx={{ml: 2, fontSize: '1.35rem'}}>{`Kiểm tra thanh menu (có logo của bệnh viện) bên góc phải có hiện tên người dùng`}</Typography> 
                                <Typography variant='subtitle1' sx={{ml: 2, fontSize: '1.35rem'}}>Nếu đúng tên bác sĩ đang khám hãy nhấn vào <span style={{fontWeight: 'bolder', color: 'blue'}}>"Khám bệnh"</span> để chuyển về trang khám bệnh</Typography>
                                <Typography variant='subtitle1' sx={{ml: 2, fontSize: '1.35rem'}}>Nếu sai tên bác sĩ đang khám hãy nhấn vào tên người dùng đó sẽ hiện ra menu nhỏ, nhấn đăng xuất</Typography>       
                            </>
                        :
                            null
                :
                    <Typography variant='subtitle1' sx={{ml: 2, fontSize: '1.35rem'}}>Nhấn vào <span style={{fontWeight: 'bolder', color: 'blue'}}>"Đăng nhập"</span> trên thanh menu (có logo của bệnh viện) bên góc phải</Typography> 
                }
            </Box>
        </Container>
    )
}

export default Home