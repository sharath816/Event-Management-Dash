import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import EventManagement from './components/EventManagement';
import TaskTracker from './components/TaskTracker';
import AttendeeManagement from './components/AttendeeManagement';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
import Footer from './components/Footer';

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <header className="d-flex justify-content-between align-items-center fixed-top" style={{ padding: '10px 20px' }}>
        <div className="flex-grow-1 text-center">
          <h1>Event Management Dashboard</h1>
        </div>
        {isAuthenticated && (
          <button onClick={logout} className="btn btn-danger">Logout</button>
        )}
      </header>
      <div className="container" style={{ marginTop: '150px' }}>
        {!isAuthenticated && location.pathname !== '/login' && (
          <div className="row my-4">
            <div className="col-md-12 text-center">
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </div>
          </div>
        )}


        {isAuthenticated && (
          <div className="row">
            <div className="col-md-6 mb-6">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Manage Events</h5>
                  <Link to="/events" className="btn btn-primary">Go to Events</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-6">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Manage Attendees</h5>
                  <Link to="/attendees" className="btn btn-primary">Go to Attendees</Link>
                </div>
              </div>
            </div>
          </div>

        )}

        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}

          {isAuthenticated && (
            <>
              <Route path="/events" element={<EventManagement />} />
              <Route path="/tasks/:title" element={<TaskTracker />} />
              <Route path="/attendees" element={<AttendeeManagement />} />
            </>
          )}
        </Routes>

      </div>
      { }
      <div>
        <Footer />
      </div>
    </>
  );
}

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
