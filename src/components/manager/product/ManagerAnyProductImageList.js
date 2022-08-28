import { Box } from "@mui/material"
import { ManagerAnyProductImageCard } from "./ManagerAnyProductImageCard"

export const ManagerAnyProductImageList=({dataList})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <ManagerAnyProductImageCard data={item}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}