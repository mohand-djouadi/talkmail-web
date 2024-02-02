import React, { useEffect } from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import '../styles/Agenda.css';
import noEvents from '../assets/noEvents.png';
import moment from 'moment';
import EventForm from '../components/EventForm';
import Empty from '../components/Empty';
import { useQuery } from 'react-query';
import axios from 'axios';
import EventItem from '../components/EventItem';
import EventContent from '../components/EventContent';

function Agenda() {
  const [date, setDate] = useState(new Date());
  const [evenements, setEvenements] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventToUpdate, setEventToUpdate] = useState(null);

  const handleEvent = (event) => {
    setSelectedEvent(event);
  };

  const user = JSON.parse(sessionStorage.getItem('user'));

  const {
    data: eventsData,
    isLoading,
    isError,
  } = useQuery('events', async () => {
    const response = await axios.get(
      'https://talkmail-server.onrender.com/api/agenda/events',
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  });
  const events = eventsData || [];

  useEffect(() => {
    setEvenements(events);
  }, [events]);

  useEffect(() => {
    setSelectedEvent(null);
  }, [eventToUpdate]);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des conversation</div>;
  }
  // console.log('selectedEvent',selectedEvent)
  return (
    <div
      className="page"
      style={{
        marginLeft: 85,
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        color: 'white',
      }}
    >
      <div
        style={{
          borderRight: '2px solid #AEEFEB',
        }}
      >
        <div className="calendar-box">
          <Calendar value={date} onChange={setDate} />
        </div>
        <div className="events-list">
          {events.length === 0 ? (
            <Empty
              image={noEvents}
              message="you have no events"
              height={65}
              width={65}
            />
          ) : (
            evenements.map((event) => (
              <EventItem
                key={event._id}
                id={event._id}
                title={event.title}
                date={event.startDate}
                object={event}
                setSelectedEvent={setSelectedEvent}
                setEventToUpdate={setEventToUpdate}
                evenements={evenements}
                setEvenements={setEvenements}
              />
            ))
          )}
        </div>
      </div>
      {selectedEvent === null ? (
        <EventForm
          date={date}
          eventToUpdate={eventToUpdate}
          evenements={evenements}
          setEvenements={setEvenements}
        />
      ) : (
        <EventContent selectedEvent={selectedEvent} />
      )}
    </div>
  );
}

export default Agenda;
