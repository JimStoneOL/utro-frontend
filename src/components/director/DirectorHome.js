import { NavLink } from "react-router-dom"
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { DirectorEmailLoadList } from "./email/DirectorEmailLoadList";

export const DirectorHome=()=>{
    return(
        <>
        <br/>
            <Box sx={{ p: 5, border: '1px solid grey',borderColor:'#42a5f5' }}>
                <Stack spacing={3} border>
                <NavLink to="/user"><a class="waves-effect waves-light btn pink lighten-5"  style={{width:'100%'}}><div className='txt' style={{color:'black'}}>Пользователи</div></a></NavLink>
                <NavLink to="/report"><a class="waves-effect waves-light btn pink lighten-5"  style={{width:'100%'}}><div className='txt' style={{color:'black'}}>Отчёты</div></a></NavLink>

                </Stack> 
            </Box>
            <DirectorEmailLoadList/>
        </>
    )
}