const { NavLink } = require("react-router-dom");

function ContactLink({img, chat, last}) {
    return (
        <NavLink>
            <div className="contact-img">
                <img src={img} alt=""  width={20} height={20}/>
            </div>
            <h3>{chat}</h3>
            <p>{last}</p>
        </NavLink>
    )
}
export default ContactLink