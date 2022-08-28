import { Box } from "@mui/material"
import { DirectorProductImageCard } from "./DirectorProductImageCard"

export const DirectorProductImageList=({dataList,productId,update})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <DirectorProductImageCard data={item} productId={productId} update={update}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}