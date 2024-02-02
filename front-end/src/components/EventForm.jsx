import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import moment from 'moment';
import '../styles/EventForm.css';

function EventForm({ date, eventToUpdate, evenements, setEvenements }) {
  const formattedDate = moment(date).add(1, 'days').toISOString().slice(0, 16);
  const user = JSON.parse(sessionStorage.getItem('user'));

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(formattedDate);
  const [isAllDay, setIsAllDay] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const createEvent = async ({
    title,
    startDate,
    endDate,
    description,
    location,
  }) => {
    const response = await axios.post(
      'https://talkmail-server.onrender.com/api/agenda/events',
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        isAllDay: isAllDay,
        description: description,
        location: location,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  };
  const { mutate: mutatePost } = useMutation(createEvent, {
    onSuccess: (data) => {
      setEvenements([data.event, ...evenements]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateEvent = async ({
    title,
    startDate,
    endDate,
    description,
    location,
  }) => {
    const response = await axios.put(
      `https://talkmail-server.onrender.com/api/agenda/events/${eventToUpdate._id}`,
      {
        title: title,
        startDate: startDate,
        endDate: endDate,
        isAllDay: isAllDay,
        description: description,
        location: location,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  };

  const { mutate: mutateUpdate } = useMutation(updateEvent, {
    onSuccess: (data) => {
      const upEvIndex = evenements.findIndex(
        (ev) => ev._id === eventToUpdate._id,
      );
      if (upEvIndex !== -1) {
        const updatedEvents = [...evenements];
        updatedEvents[upEvIndex] = data;
        setEvenements(updatedEvents);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (eventToUpdate !== null) {
      setTitle(eventToUpdate.title);
      setStartDate(eventToUpdate.startDate);
      setEndDate(eventToUpdate.endDate);
      setIsAllDay(eventToUpdate.isAllDay);
      setLocation(eventToUpdate.location);
      setDescription(eventToUpdate.description);
    }
  }, [eventToUpdate]);

  const modifieEvent = async (e) => {
    e.preventDefault();
    mutateUpdate({
      title,
      startDate,
      endDate,
      isAllDay,
      description,
      location,
    });
  };

  const addEvent = async (e) => {
    e.preventDefault();
    mutatePost({ title, startDate, endDate, isAllDay, description, location });
  };

  function submitEvent(e) {
    if (eventToUpdate !== null) {
      modifieEvent(e);
    } else {
      addEvent(e);
    }
  }

  return (
    <div className="form-box">
      <form className="eventForm" onSubmit={(e) => submitEvent(e)}>
        <div className="inputs">
          <input
            type="text"
            placeholder="Titre"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="inputs">
          <label for="date_debut">Debut : </label>
          <input
            type="datetime-local"
            id="date_debut"
            value={formattedDate}
            onChange={(e) => {
              setStartDate(moment(e.target.value));
            }}
          />
        </div>
        <div className="inputs">
          <label for="date_fin">Fin : </label>
          <input
            type="datetime-local"
            className="fin"
            id="date_fin"
            value={formattedDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <div class="toggle">
          <input
            type="checkbox"
            id="temp"
            onChange={(e) => {
              setIsAllDay(e.target.checked);
            }}
            checked={isAllDay}
          />
          <label for="temp">Journee entiere</label>
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Localisation"
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            value={location}
          />
        </div>
        <div className="inputs">
          <textarea
            name="descr"
            placeholder="Description"
            cols="40"
            rows="10"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          ></textarea>
        </div>
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
}
export default EventForm;
