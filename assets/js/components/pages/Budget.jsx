import React, { useState, useEffect } from 'react';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';
import Expense from './Expense';
import Income from './Income';

const Budget = () => {
    const [alert, setAlert] = useState(null);
    const { isAuthenticated, logout } = useAuth();

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div className="bg-gray-50 flex flex-col lg:flex-row mt-16 xl:mt-0">
            <div className="flex-1 flex flex-col p-6 mt-16 lg:mt-0">
                {alert && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Gestion des Finances
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <Expense />
                    </div>
                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <Income />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;
