import { Box } from "@mui/material"
import { StorekeeperFurnitureWarehouseCard } from "./StorekeeperFurnitureWarehouseCard"

export const StorekeeperFurnitureWarehouseList=({dataList})=>{

    console.log(dataList)

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
                            <StorekeeperFurnitureWarehouseCard data={item}/>
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