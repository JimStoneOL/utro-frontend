import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useHttp } from '../../../utils/hooks/http.hook';
import { useContext } from 'react';
import { AuthContext } from '../../../utils/context/AuthContext';
import { Loader } from '../../../utils/component/Loader';

export const ReportPage=()=>{

    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

        const getRemains =async event=>{
            console.log('yes')
        try {
             await request('http://localhost:8080/api/pdf/generate/moves', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
        } catch (e) {console.log(e)}
    }

    if (loading) {
        return <Loader/>
      }
      const pressHandler = event=>{
        request('http://localhost:8080/api/pdf/generate/moves', 'GET', null, {
            Authorization: `Bearer ${token}`
          })
      }
    return(
        <>
          <Box sx={{ p: 5, border: '1px solid grey',borderColor:'#42a5f5' }}>
                <Stack spacing={3} border>
                <a class="waves-effect waves-light btn pink lighten-5" href='http://localhost:8080/api/pdf/generate/remains'><div className='txt' style={{color:'black'}}>Отчёт об остатках</div></a>
                <a class="waves-effect waves-light btn pink lighten-5" href='http://localhost:8080/api/pdf/generate/moves'><div className='txt' style={{color:'black'}}>Отчёт о движения</div></a>
                </Stack> 
            </Box>
        </>
    )
}