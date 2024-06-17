import React, { useEffect, useState } from 'react';
import '../../../styles/app.css';

const Alert = ({ type, message, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            const fadeOutTimer = setTimeout(() => {
                onClose();
            }, 500); // Correspond à la durée de l'animation de fade-out
            return () => clearTimeout(fadeOutTimer);
        }, 3500); // 3.5 seconds to display + 500ms for fade-out

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 transform z-50 transition-transform duration-300 ${show ? 'slide-in' : 'slide-out' } ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`p-4 border-l-4 ${type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`} role="alert">
                <p className="font-bold">{type === 'success' ? 'Succès' : 'Attention'}</p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Alert;
