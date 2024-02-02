import '../styles/EventContent.css'

function EventContent({ selectedEvent }) {
    return (
        <div className='event-box'>
            <div className="event">
                <div className="title">{ selectedEvent.title }</div>
                <div className="date-debut">{ selectedEvent.startDate }</div>
                <div className="date-fin">{ selectedEvent.endDate }</div>
                <div className="location">{ selectedEvent.location }</div>
                <div className="description">{ selectedEvent.description }</div>
            </div>
        </div>
    )
}
export default EventContent