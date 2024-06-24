import React, { useState, useEffect } from 'react';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        isRegular: false
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentIncomeId, setCurrentIncomeId] = useState(null);
    const [alert, setAlert] = useState(null);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        fetchIncomes();
        fetchCategories();
    }, []);

    const fetchIncomes = async () => {
        try {
            const response = await fetch('/incomes', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setIncomes(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des revenus:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/categories', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des catégories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `/incomes/${currentIncomeId}` : '/incomes';
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                setAlert({ type: 'error', message: data.message || 'Erreur lors de l\'opération' });
            } else {
                setAlert({ type: 'success', message: isEditing ? 'Revenu mis à jour avec succès' : 'Revenu créé avec succès' });
                fetchIncomes();
                setFormData({ name: '', amount: '', category: '', isRegular: false });
                setIsEditing(false);
                setCurrentIncomeId(null);
            }
        } catch (error) {
            console.error('Erreur lors de l\'opération:', error);
            setAlert({ type: 'error', message: 'Erreur lors de l\'opération' });
        }
    };

    const handleEdit = (income) => {
        setFormData({
            name: income.name,
            amount: income.amount,
            category: income.category.id,
            isRegular: income.isRegular
        });
        setIsEditing(true);
        setCurrentIncomeId(income.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/incomes/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setAlert({ type: 'success', message: 'Revenu supprimé avec succès' });
                fetchIncomes();
            } else {
                setAlert({ type: 'error', message: 'Erreur lors de la suppression du revenu' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du revenu:', error);
            setAlert({ type: 'error', message: 'Erreur lors de la suppression du revenu' });
        }
    };

    return (
        <div>
            {alert && <Alert type={alert.type} message={alert.message} />}
            <div className="container mx-auto">
                <h1 className="text-center text-2xl font-bold my-4">Gestion des Revenus</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom du revenu</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Montant</label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Catégorie</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        >
                            <option value="">Sélectionnez une catégorie</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            <input
                                type="checkbox"
                                name="isRegular"
                                checked={formData.isRegular}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            Revenu régulier
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Mettre à jour le revenu' : 'Ajouter un revenu'}
                    </button>
                </form>
                <div className="mt-8">
                    <h2 className="text-center text-xl font-bold">Liste des Revenus</h2>
                    <ul className="mt-4">
                        {incomes.map(income => (
                            <li key={income.id} className="bg-gray-100 p-4 rounded my-2 shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold">{income.name}</h3>
                                        <p>{income.amount}€ - {income.category.name} - {income.isRegular ? 'Régulier' : 'Exceptionnel'}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(income)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(income.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Income;
