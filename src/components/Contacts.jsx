import "./mainpage.css"

function Contacts(){
    return(
        <>
            <div className="container-contacts">
                <div>
                    <h1>Контакты</h1>
                </div>
                <div>
                    <span>Мы всегда рады услышать ваше мнение и помочь вам! <br/>
                        Если у вас есть вопросы, предложения или вы хотите связаться с нами <br/>
                        по любому поводу, не стесняйтесь использовать информацию ниже.
                    </span>
                </div>
            </div>
            
            <div>
                <form>
                    <label htmlFor="name">Имя</label>
                    <input id="name" className="name-input" type="text"/>

                    <label htmlFor="email">Почта</label>
                    <input id="emaill" type="email"/>

                    <label htmlFor="message">Сообщение</label>
                    <textarea id="message"></textarea>

                    <button type="submit">Отправить</button>
                </form>
            </div>
        </>
    )
}
export default Contacts