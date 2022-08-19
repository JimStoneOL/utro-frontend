import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export const DirectorHome=()=>{
    return(
        <>
        <br/>
            <Box sx={{ p: 5, border: '1px solid grey',borderColor:'#42a5f5' }}>
                <Stack spacing={3} border>
                <NavLink to="/user"><Button variant="outlined">Пользователи</Button></NavLink>
                <NavLink to="/report"><Button variant="outlined">Отчёты</Button></NavLink>

                </Stack> 
            </Box>
        </>
    )
}