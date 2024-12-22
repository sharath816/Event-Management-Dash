// src/components/TaskTracker.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './TaskTracker.css';

function TaskTracker() {
    const { title, eventId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const fetchTasksForEvent = useCallback(async () => {
        setLoading(true);
        try {
            console.log("Fetching tasks for title:", title);
            const response = await axios.get(`http://localhost:5000/api/tasks/event?title=${encodeURIComponent(title)}`);
            setTasks(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            setError('Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    }, [title]);

    useEffect(() => {
        if (title) {
            fetchTasksForEvent();
        }
    }, [title, fetchTasksForEvent]);

    const handleStatusUpdate = async (taskId) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'Completed' });
            fetchTasksForEvent();
        } catch (error) {
            console.error('Error updating task status:', error);
            setError('Failed to update task status.');
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const newTask = { title: newTaskTitle, eventId };
            console.log("Creating task:", newTask); 
            const response = await axios.post('http://localhost:5000/api/tasks', newTask);
            console.log("Response:", response.data); 
            setNewTaskTitle('');
            fetchTasksForEvent();
        } catch (error) {
            console.error('Error creating task:', error.response ? error.response.data : error.message);
            setError('Failed to create task.');
        }
    };

    return (
        <div>
            <h2>Task Tracker for Event - {title}</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleCreateTask}>
                <input
                    type="text"
                    placeholder="New Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    required
                />
                <button type="submit" className="buttone">Add Task</button>
            </form>

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <ul>
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task._id}>
                                {task.title} - Status: {task.status}

                                {task.status === 'Pending' && (
                                    <button onClick={() => handleStatusUpdate(task._id)} >Complete Task</button>
                                )}
                            </li>
                        ))
                    ) : (
                        <li>No tasks found for this event.</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default TaskTracker;
