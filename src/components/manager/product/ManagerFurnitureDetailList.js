import { ManagerFurnitureProductDetailList } from "./ManagerFurnitureProductDetailList"


export const ManagerFurnitureDetailList=({dataList})=>{


    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <ManagerFurnitureProductDetailList data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}