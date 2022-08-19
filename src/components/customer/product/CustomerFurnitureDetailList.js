import { CustomerFurnitureProductDetailList } from "./CustomerFurnitureProductDetailList"


export const CustomerFurnitureDetailList=({dataList})=>{

  console.log(dataList)

    return(<>
        {
            dataList.map((item,i)=>{ 

              return(
               <>
               <CustomerFurnitureProductDetailList data={item}/>
               </>
              ) 
              
             })
        }
      
      </>)

}