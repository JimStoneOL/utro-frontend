export const DirectorUpdateProfile=()=>{
    return(
        <div className="row">
        <div className="">
          <div className="card center">
            <div className='teal lighten-2'>
            <div className="card-content white-text">
              <span className="card-title">Обновление профиля</span>
              <div className="teal lighten-2">
              <div className="input-field teal lighten-2">
                  <input
                    placeholder="Введите имя"
                    id="user_firstname"
                    type="text"
                    name="user_lastname"
                    className="yellow-input"
                  />
                  </div>
                  <div className="input-field teal lighten-2">
                  <input
                    placeholder="Введите фамилию"
                    id="user_lastname"
                    type="text"
                    name="user_lastname"
                    className="yellow-input"
                  />
                  </div>
                
                  <div className="input-field teal lighten-2">
                    Аватар <br/>
                  <input
                    placeholder="Добавьте изображение"
                    type="file"
                  />
                  </div>
              </div>
            </div>
            <div className="card-action">
              <button
                className="btn own-button"
                style={{marginRight: 10}}
              >
                Обновить
              </button>
            </div>
            </div>
          </div>
        </div>
        
      </div>
    )
}