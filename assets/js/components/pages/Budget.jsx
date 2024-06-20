import React, { useState, useEffect } from 'react';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Budget = () => {
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        totalAmount: 0
    });
    const [expenseData, setExpenseData] = useState({
        name: '',
        amount: 0,
        budget: '',
        category: ''
    });
    const [incomeData, setIncomeData] = useState({
        name: '',
        amount: 0,
        budget: '',
        category: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentBudgetId, setCurrentBudgetId] = useState(null);
    const [alert, setAlert] = useState(null);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        fetchBudgets();
        fetchExpenses();
        fetchIncomes();
        fetchCategories();
    }, []);

    const fetchBudgets = async () => {
        try {
            const response = await fetch('/budgets', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setBudgets(data);
        } catch (error) {
            console.error('Error fetching budgets:', error);
        }
    };

    const fetchExpenses = async () => {
        try {
            const response = await fetch('/expenses', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setExpenses(data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const fetchIncomes = async () => {
        try {
            const response = await fetch('/incomes', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setIncomes(data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
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
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleExpenseChange = (e) => {
        setExpenseData({
            ...expenseData,
            [e.target.name]: e.target.value
        });
    };

    const handleIncomeChange = (e) => {
        setIncomeData({
            ...incomeData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `/budgets/${currentBudgetId}` : '/budgets';
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
                if (data.errors) {
                    setAlert({ type: 'error', message: 'Validation errors occurred' });
                } else {
                    throw new Error(data.message || 'An error occurred while saving the budget.');
                }
                return;
            }

            setAlert({ type: 'success', message: `Budget ${isEditing ? 'mis à jour' : 'créé'} avec succès` });
            setFormData({ name: '', totalAmount: 0 });
            setIsEditing(false);
            setCurrentBudgetId(null);
            fetchBudgets();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la sauvegarde du budget.' });
        }
    };

    const handleExpenseSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(expenseData),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setAlert({ type: 'error', message: 'Validation errors occurred' });
                } else {
                    throw new Error(data.message || 'An error occurred while saving the expense.');
                }
                return;
            }

            setAlert({ type: 'success', message: 'Dépense créée avec succès' });
            setExpenseData({ name: '', amount: 0, budget: '', category: '' });
            fetchExpenses();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la sauvegarde de la dépense.' });
        }
    };

    const handleIncomeSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/incomes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(incomeData),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                if (data.errors) {
                    setAlert({ type: 'error', message: 'Validation errors occurred' });
                } else {
                    throw new Error(data.message || 'An error occurred while saving the income.');
                }
                return;
            }

            setAlert({ type: 'success', message: 'Revenu créé avec succès' });
            setIncomeData({ name: '', amount: 0, budget: '', category: '' });
            fetchIncomes();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la sauvegarde du revenu.' });
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/budgets/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to delete budget');
            }

            setAlert({ type: 'success', message: 'Budget supprimé avec succès' });
            fetchBudgets();
        } catch (error) {
            console.error('Error:', error);
            setAlert({ type: 'error', message: 'Une erreur est survenue lors de la suppression du budget.' });
        }
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col p-6 mt-16 2xl:mt-0">
                {alert && <Alert type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        {isEditing ? 'Modifier le budget' : 'Créer un nouveau budget'}
                    </h2>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Nom du budget
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="totalAmount" className="block text-sm font-medium leading-5 text-gray-700">
                                    Montant total
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="totalAmount"
                                        name="totalAmount"
                                        type="number"
                                        value={formData.totalAmount}
                                        onChange={handleChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                {isEditing ? (
                                    <>
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({ name: '', totalAmount: 0 });
                                                setCurrentBudgetId(null);
                                            }}
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                                        >
                                            Valider
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Ajouter
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Liste des budgets</h2>
                        <ul className="mt-6 space-y-4">
                            {budgets.map(budget => (
                                <li key={budget.id} className="bg-gray-100 px-4 py-2 rounded shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{budget.name}</h3>
                                            <p>Montant total: {budget.totalAmount} €</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setCurrentBudgetId(budget.id);
                                                    setFormData({ name: budget.name, totalAmount: budget.totalAmount });
                                                }}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(budget.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Expense Form */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Ajouter une dépense</h2>
                        <form onSubmit={handleExpenseSubmit}>
                            <div>
                                <label htmlFor="expenseName" className="block text-sm font-medium leading-5 text-gray-700">
                                    Nom de la dépense
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="expenseName"
                                        name="name"
                                        type="text"
                                        value={expenseData.name}
                                        onChange={handleExpenseChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="expenseAmount" className="block text-sm font-medium leading-5 text-gray-700">
                                    Montant
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="expenseAmount"
                                        name="amount"
                                        type="number"
                                        value={expenseData.amount}
                                        onChange={handleExpenseChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="expenseBudget" className="block text-sm font-medium leading-5 text-gray-700">
                                    Budget
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="expenseBudget"
                                        name="budget"
                                        value={expenseData.budget}
                                        onChange={handleExpenseChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Sélectionner un budget</option>
                                        {budgets.map(budget => (
                                            <option key={budget.id} value={budget.id}>
                                                {budget.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="expenseCategory" className="block text-sm font-medium leading-5 text-gray-700">
                                    Catégorie
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="expenseCategory"
                                        name="category"
                                        value={expenseData.category}
                                        onChange={handleExpenseChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Income Form */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Ajouter un revenu</h2>
                        <form onSubmit={handleIncomeSubmit}>
                            <div>
                                <label htmlFor="incomeName" className="block text-sm font-medium leading-5 text-gray-700">
                                    Nom du revenu
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="incomeName"
                                        name="name"
                                        type="text"
                                        value={incomeData.name}
                                        onChange={handleIncomeChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="incomeAmount" className="block text-sm font-medium leading-5 text-gray-700">
                                    Montant
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="incomeAmount"
                                        name="amount"
                                        type="number"
                                        value={incomeData.amount}
                                        onChange={handleIncomeChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="incomeBudget" className="block text-sm font-medium leading-5 text-gray-700">
                                    Budget
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="incomeBudget"
                                        name="budget"
                                        value={incomeData.budget}
                                        onChange={handleIncomeChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Sélectionner un budget</option>
                                        {budgets.map(budget => (
                                            <option key={budget.id} value={budget.id}>
                                                {budget.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label htmlFor="incomeCategory" className="block text-sm font-medium leading-5 text-gray-700">
                                    Catégorie
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <select
                                        id="incomeCategory"
                                        name="category"
                                        value={incomeData.category}
                                        onChange={handleIncomeChange}
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-green-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    >
                                        <option value="">Sélectionner une catégorie</option>
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Expenses List */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Liste des dépenses</h2>
                        <ul className="mt-6 space-y-4">
                            {expenses.map(expense => (
                                <li key={expense.id} className="bg-gray-100 px-4 py-2 rounded shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{expense.name}</h3>
                                            <p>Montant: {expense.amount} €</p>
                                            <p>Catégorie: {expense.category}</p>
                                            <p>Budget: {expense.budget}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Incomes List */}
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <h2 className="text-center text-2xl leading-9 font-extrabold text-gray-900">Liste des revenus</h2>
                        <ul className="mt-6 space-y-4">
                            {incomes.map(income => (
                                <li key={income.id} className="bg-gray-100 px-4 py-2 rounded shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">{income.name}</h3>
                                            <p>Montant: {income.amount} €</p>
                                            <p>Catégorie: {income.category}</p>
                                            <p>Budget: {income.budget}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;
