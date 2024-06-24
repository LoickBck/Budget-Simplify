import React, { useState, useEffect } from 'react';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Expense = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        isRegular: false,
        date: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentExpenseId, setCurrentExpenseId] = useState(null);
    const [alert, setAlert] = useState(null);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await fetch('/expenses', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des dépenses:', error);
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
            const url = isEditing ? `/expenses/${currentExpenseId}` : '/expenses';
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
                setAlert({ type: 'success', message: isEditing ? 'Dépense mise à jour avec succès' : 'Dépense créée avec succès' });
                fetchExpenses();
                setFormData({ name: '', amount: '', category: '', isRegular: false, date: '' });
                setIsEditing(false);
                setCurrentExpenseId(null);
            }
        } catch (error) {
            console.error('Erreur lors de l\'opération:', error);
            setAlert({ type: 'error', message: 'Erreur lors de l\'opération' });
        }
    };

    const handleEdit = (expense) => {
        setFormData({
            name: expense.name,
            amount: expense.amount,
            category: categories.find(category => category.id === expense.category.id), // Assurez-vous que la catégorie est un objet complet
            isRegular: expense.isRegular,
            date: expense.date
        });
        setIsEditing(true);
        setCurrentExpenseId(expense.id);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/expenses/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                setAlert({ type: 'success', message: 'Dépense supprimée avec succès' });
                fetchExpenses();
            } else {
                setAlert({ type: 'error', message: 'Erreur lors de la suppression de la dépense' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la dépense:', error);
            setAlert({ type: 'error', message: 'Erreur lors de la suppression de la dépense' });
        }
    };

    return (
        <div>
            {alert && <Alert type={alert.type} message={alert.message} />}
            <div className="container mx-auto">
                <h1 className="text-center text-2xl font-bold my-4">Gestion des Dépenses</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700">Nom de la dépense</label>
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
                            value={formData.category.id}
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
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                        />
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
                            Dépense régulière
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        {isEditing ? 'Mettre à jour la dépense' : 'Ajouter une dépense'}
                    </button>
                </form>
                <div className="mt-8">
                    <h2 className="text-center text-xl font-bold">Liste des Dépenses</h2>
                    <ul className="mt-4">
                        {expenses.map(expense => (
                            <li key={expense.id} className="bg-gray-100 p-4 rounded my-2 shadow">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-bold">{expense.name}</h3>
                                        <p>{expense.amount}€ - {formData.category.name} - {expense.isRegular ? 'Régulière' : 'Exceptionnelle'} - {expense.date}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(expense)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
                                        >
                                            <i className="fas fa-pen"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(expense.id)}
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

export default Expense;
