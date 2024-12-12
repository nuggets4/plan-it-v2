import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { Plus, X } from 'lucide-react';

const WeeklyCalendar = ({ selectedDays = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2024-12-11",
      time: "10:00",
      type: "work"
    },
    {
      id: 2,
      title: "Lunch with Client",
      date: "2024-12-13",
      time: "12:30",
      type: "personal"
    }
  ]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    type: "work"
  });

  const dayNameMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
  };

  const generateWeekDays = () => {
    const start = startOfWeek(currentDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(start, i);
      // If no days are selected, show all days
      // Otherwise, only show selected days
      if (selectedDays.length === 0 || selectedDays.includes(dayNameMap[day.getDay()])) {
        days.push(day);
      }
    }
    return days;
  };

  const getEventsForDay = (date) => {
    return events.filter(event => 
      isSameDay(parseISO(event.date), date)
    ).sort((a, b) => a.time.localeCompare(b.time));
  };

  const handleAddEvent = () => {
    const id = Math.max(0, ...events.map(e => e.id)) + 1;
    setEvents([...events, { ...newEvent, id }]);
    setNewEvent({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      type: "work"
    });
    setShowEventForm(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const weekDays = generateWeekDays();
  const gridCols = selectedDays.length === 0 ? 7 : selectedDays.length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setCurrentDate(addDays(currentDate, -7))}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded"
        >
          Previous Week
        </button>
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">
            {format(weekDays[0], 'MMMM d')} - {format(weekDays[weekDays.length - 1], 'MMMM d, yyyy')}
          </h2>
          <button
            onClick={() => setShowEventForm(!showEventForm)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>
        </div>
        <button 
          onClick={() => setCurrentDate(addDays(currentDate, 7))}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded"
        >
          Next Week
        </button>
      </div>

      {showEventForm && (
        <div className="mb-4 p-4 border rounded bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Add New Event</h3>
            <button onClick={() => setShowEventForm(false)}>
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="p-2 border rounded"
            />
            <select
              value={newEvent.type}
              onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
              className="p-2 border rounded"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="p-2 border rounded"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleAddEvent}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
      )}

      <div className={`grid grid-cols-${gridCols} gap-2`}>
        {weekDays.map((day) => (
          <div 
            key={day.toString()} 
            className="border rounded p-2"
          >
            <div className="text-center">
              <div className="font-bold">{format(day, 'EEE')}</div>
              <div>{format(day, 'd')}</div>
            </div>
            <div className="mt-2 space-y-1">
              {getEventsForDay(day).map(event => (
                <div
                  key={event.id}
                  className={`p-1 rounded text-sm ${
                    event.type === 'work' 
                      ? 'bg-blue-100 text-blue-800'
                      : event.type === 'personal'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{event.time}</span>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="truncate">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;