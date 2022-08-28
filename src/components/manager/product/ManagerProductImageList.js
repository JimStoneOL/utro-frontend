import { Box } from "@mui/material"
import { ManagerProductImageCard } from "./ManagerProductImageCard"

export const ManagerProductImageList=({dataList,productId,update})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <ManagerProductImageCard data={item} productId={productId} update={update}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}