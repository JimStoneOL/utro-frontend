
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


export const ReportPage=()=>{

    return(
        <>
          <Box sx={{ p: 5, border: '1px solid grey',borderColor:'#42a5f5' }}>
                <Stack spacing={3} border>
                <a class="waves-effect waves-light btn pink lighten-5" href='http://localhost:8080/api/pdf/generate/remains/0a0654b2-5eb7-4b44-8aa8-cc026fa8da0f'><div className='txt' style={{color:'black'}}>Отчёт об остатках</div></a>
                <a class="waves-effect waves-light btn pink lighten-5" href='http://localhost:8080/api/pdf/generate/moves/6ac62d91-9045-4e32-ad3f-5cbe1f823ff5'><div className='txt' style={{color:'black'}}>Отчёт о движениях</div></a>
                </Stack> 
            </Box>
        </>
    )
}