import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AtttendeeManagement.css'; 
function AttendeeManagement() {
  const [attendees, setAttendees] = useState([]);
  const [attendeeData, setAttendeeData] = useState({ name: '', email: '' });

    useEffect(() => {
        fetchAttendees();
    }, []);

    const fetchAttendees = async () => {
        const response = await axios.get('http://localhost:5000/api/attendees');
        setAttendees(response.data);
    };

    const handleChange = (e) => {
        setAttendeeData({ ...attendeeData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/attendees', attendeeData);
        fetchAttendees();
        setAttendeeData({ name: '', email: '' });
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/attendees/${id}`);
        fetchAttendees();
    };

  return (
      <div>
          <h2>Manage Attendees</h2>
          <form onSubmit={handleSubmit}>
              <input
                  name="name"
                  placeholder="Name"
                  value={attendeeData.name}
                  onChange={handleChange}
                  required
                  className="form-control mb-3" 
              />
              <input
                  name="email"
                  placeholder="Email"
                  value={attendeeData.email}
                  onChange={handleChange}
                  required
                  className="form-control mb-3" 
              />

              { }
              <button type="submit" className="btn btn-primary">Add Attendee</button>
          </form>

          <ol style={{ padding: 0 }}>
              {attendees.map(attendee => (
                  <li key={attendee._id} >
                      {attendee.name} - {attendee.email}
                      <button onClick={() => handleDelete(attendee._id)} className="buttone">Delete</button>
                  </li>
              ))}
          </ol>
      </div>
  );
}

export default AttendeeManagement;
