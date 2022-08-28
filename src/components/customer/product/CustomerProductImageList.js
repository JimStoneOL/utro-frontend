import { Box } from "@mui/material"
import { CustomerProductImageCard } from "./CustomerProductImageCard"

export const CustomerProductImageList=({dataList})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <CustomerProductImageCard data={item}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}