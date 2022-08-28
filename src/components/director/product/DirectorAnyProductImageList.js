import { Box } from "@mui/material"
import { DirectorAnyProductImageCard } from "./DirectorAnyProductImageCard"

export const DirectorAnyProductImageList=({dataList})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <DirectorAnyProductImageCard data={item}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}