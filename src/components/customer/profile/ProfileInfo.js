export const ProfileInfo=({userData,image})=>{

    const getRole=()=>{
    let role=userData.role[0].name
    if(role==='ROLE_CUSTOMER'){
        return 'Заказчкик'
    }
    if(role==='ROLE_MANAGER'){
        return 'Менеджер'
    }
    if(role==='ROLE_DIRECTOR'){
        return 'Директор'
    }
    if(role==='ROLE_STOREKEEPER'){
        return 'Кладовщик'
    }
}

    return(
        <div class="col s12 m7">
        <div class="card horizontal">
          <div class="card-image">
            <img src={`data:image/jpeg;base64,${image.imageBytes}`}/>
          </div>
          <div class="card-stacked">
            <div class="card-content">
              <p>
              email: {userData.username} <br/>
              имя: {userData.firstname} <br/>
              фамилия: {userData.lastname} <br/>
              роль: {getRole()}
            </p>
            </div>
          </div>
        </div>
      </div>
    )
  }