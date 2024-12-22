import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EventManagement.css';
function EventManagement() {
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState({ title: '', description: '', location: '', date: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            setError('Failed to fetch events.');
        }
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', eventData);
            fetchEvents();
            setEventData({ title: '', description: '', location: '', date: '' });
            setError(null);
        } catch (error) {
            console.error('Error creating event:', error);
            setError('Failed to create event.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/events/${id}`);
            fetchEvents();
            setError(null);
        } catch (error) {
            console.error('Error deleting event:', error);
            setError('Failed to delete event.');
        }
    };

    return (
        <div>
            <h2>Manage Events</h2>
            {error && <div className="alert alert-danger">{error}</div>} {/*   */}
            <form onSubmit={handleSubmit}>
                <input
                    name="title"
                    placeholder="Title"
                    value={eventData.title}
                    onChange={handleChange}
                    required
                    className="form-control mb-3"
                />
                <input
                    name="description"
                    placeholder="Description"
                    value={eventData.description}
                    onChange={handleChange}
                    className="form-control mb-3"
                />
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            name="location"
                            placeholder="Location"
                            value={eventData.location}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            name="date"
                            type="date"
                            value={eventData.date}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                </div>


                { }
                <button type="submit" className="btn btn-primary">Add Event</button>
            </form>

            <ol>
                {events.map(event => (
                    <li key={event._id} style={{ marginBottom: '10px' }}>
                        {event.title} - {new Date(event.date).toLocaleDateString()}

                        { }
                        <Link to={`/tasks/${encodeURIComponent(event.title)}`} style={{ marginLeft: '6px' }}>Manage Tasks</Link>
                        <button onClick={() => handleDelete(event._id)} className="buttone">Delete </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default EventManagement;
