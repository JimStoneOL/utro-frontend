import { ManagerFurnitureProductDetailList } from "./ManagerFurnitureProductDetailList"


export const ManagerFurnitureDetailList=({dataList})=>{

  console.log(dataList)

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