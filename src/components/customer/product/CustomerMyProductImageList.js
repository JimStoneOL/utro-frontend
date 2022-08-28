import { Box } from "@mui/material"
import { CustomerMyProductImageCard } from "./CustomerMyProductImageCard"

export const CustomerMyProductImageList=({dataList,productId,update})=>{
  
    return(<>
      <Box 
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
        {
            dataList.map((item,i)=>{ 
    
              return(
               <>
               <CustomerMyProductImageCard data={item} productId={productId} update={update}/>
               </>
              ) 
              
             })
        }
      </Box>
      </>)
}