
import '../../../utils/styles/vertical-menu.css'
import { DirectorEmailCard } from './DirectorEmailCard'

export const DirectorEmailList=({dataList})=>{
    console.log(dataList)
    return(<>
    <br/>
   <main>
        {
            dataList.map((item,i)=>{ 
              return(
               <>
              <div className="section">
                 <DirectorEmailCard data={item}/>
              </div>
               </>
              ) 
             })
        }
      </main>
      </>)
}