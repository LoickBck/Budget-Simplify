import React, { useState, useEffect } from 'react';

const ExpenseForm = ({ transaction, fetchTransactions, closeModal }) => {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: '',
        isRegular: false,
        date: ''
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
        if (transaction) {
            setFormData({
                ...transaction,
                category: transaction.category.id
            });
        }
    }, [transaction]);

    const fetchCategories = async () => {
        const response = await fetch('/categories', { method: 'GET', credentials: 'include' });
        const data = await response.json();
        setCategories(data);
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
        const method = transaction ? 'PUT' : 'POST';
        const url = transaction ? `/expenses/${transaction.id}` : '/expenses';
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });
        if (response.ok) {
            fetchTransactions();
            closeModal();
        }
    };

    return (
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
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600">Ajouter une dépense</button>
        </form>
    );
};

export default ExpenseForm;
