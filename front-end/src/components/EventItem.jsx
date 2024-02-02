import { useMutation } from 'react-query';
import axios from 'axios';
import trash from '../assets/delete.png';
import pencil from '../assets/pencil.png';
import '../styles/EventItem.css';

function EventItem({
  id,
  title,
  date,
  object,
  setSelectedEvent,
  setEventToUpdate,
  evenements,
  setEvenements,
}) {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const deleteEvent = async (id) => {
    const response = axios.delete(
      `https://talkmail-server.onrender.com/api/agenda/events/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  };
  const { mutate } = useMutation(deleteEvent, {
    onSuccess: (res) => {
      const filterEvents = evenements.filter((ev) => ev._id !== id);
      setEvenements(filterEvents);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUpdateEvent = (event) => {
    event.stopPropagation();
    setSelectedEvent(null);
    setEventToUpdate(object);
  };

  return (
    <div className="event-item" onClick={() => setSelectedEvent(object)}>
      <h4 className="event-title">{object.title}</h4>
      <span className="event-date">{object.startDate}</span>
      <div className="options">
        <img
          src={trash}
          alt="delete-event"
          width={15}
          height={15}
          style={{ paddingRight: '.8rem' }}
          onClick={() => mutate(id)}
        />
        <img
          src={pencil}
          alt="update-event"
          width={15}
          height={15}
          style={{ paddingRight: '.8rem' }}
          onClick={(e) => handleUpdateEvent(e)}
        />
      </div>
    </div>
  );
}
export default EventItem;
