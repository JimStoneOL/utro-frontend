import { Box } from "@mui/material"
import { StorekeeperClothWarehouseCard } from "./StorekeeperClothWarehouseCard"

export const StorekeeperClothWarehouseList=({dataList})=>{
  
            return(<>
                            <Box
                        component="ul"
                        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}>
                            <ul>
                    {
                            dataList.map((item,i)=>{ 
                
                            return(
                            <>
                            <li>
                                <div className="mini_card">
                            <StorekeeperClothWarehouseCard data={item}/>
                                </div>
                            </li>
                            </>

                            ) 
                            
                            })
                            }
                            </ul>
                            </Box>
        </>)
}