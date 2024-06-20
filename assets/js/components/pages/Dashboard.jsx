import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Alert from '../utils/Alert';

const Dashboard = () => {
    const [alerts, setAlerts] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            const response = await fetch('/alerts', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setAlerts(data);
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    const handleCloseAlert = () => {
        setAlerts([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col p-6 mt-16 xl:mt-0">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Dashboard
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    {alerts.length > 0 && (
                        <Alert type="error" message="Budget dépassement alert!" onClose={handleCloseAlert} />
                    )}
                </div>
                {/* Add charts and analysis here */}
            </div>
        </div>
    );
};

export default Dashboard;
