import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '../../context/AuthContext';

const Budgets = () => {
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        checkMonthChange();
        fetchCategories();
        fetchTransactions();
    }, []);

    useEffect(() => {
        calculateMonthlyBudget();
    }, [transactions]);

    useEffect(() => {
        checkBudgetExceeded();
    }, [categories, monthlyBudget]);

    useEffect(() => {
        saveCategorySelection();
    }, [categories]);

    const fetchCategories = async () => {
        const response = await fetch('/categories', { method: 'GET', credentials: 'include' });
        const data = await response.json();
        const savedCategories = getSavedCategorySelection(data);
        setCategories(savedCategories);
    };

    const fetchTransactions = async () => {
        const expenseResponse = await fetch('/expenses', { method: 'GET', credentials: 'include' });
        const incomeResponse = await fetch('/incomes', { method: 'GET', credentials: 'include' });
        const expenses = await expenseResponse.json();
        const incomes = await incomeResponse.json();
        setTransactions([...expenses.map(expense => ({...expense, type: 'expense'})), ...incomes.map(income => ({...income, type: 'income'}))]);
    };

    const calculateMonthlyBudget = () => {
        // This function is not needed anymore for initializing the budget
        // since the budget starts at 0 and is updated by handleCategoryClick
    };

    const getCategoryTotalForMonth = (categoryId) => {
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();
        
        return transactions.reduce((total, transaction) => {
            const transactionDate = dayjs(transaction.date);
            if (transaction.category.id === categoryId && transactionDate.month() === currentMonth && transactionDate.year() === currentYear) {
                return total + parseFloat(transaction.amount);
            }
            return total;
        }, 0);
    };

    const handleCategoryClick = (category) => {
        const currentMonth = dayjs().month();
        const currentYear = dayjs().year();

        const categoryTransactions = transactions.filter(transaction => 
            transaction.category.id === category.id && 
            dayjs(transaction.date).month() === currentMonth && 
            dayjs(transaction.date).year() === currentYear
        );

        const totalAmount = categoryTransactions.reduce((total, transaction) => {
            return transaction.type === 'expense' ? total - parseFloat(transaction.amount) : total + parseFloat(transaction.amount);
        }, 0);

        const updatedCategories = categories.map(cat => 
            cat.id === category.id ? {...cat, validated: !cat.validated} : cat
        );
        setCategories(updatedCategories);

        setMonthlyBudget(prevBudget => category.validated ? prevBudget - totalAmount : prevBudget + totalAmount);
    };

    const getBudgetColor = () => {
        if (monthlyBudget > 0) return 'text-green-500';
        if (monthlyBudget < 0) return 'text-red-500';
        return 'text-blue-500';
    };

    const checkBudgetExceeded = () => {
        const allSelected = categories.every(category => category.validated);
        if (allSelected && monthlyBudget < 0) {
            setShowNotification(true);
        } else {
            setShowNotification(false);
        }
    };

    const saveCategorySelection = () => {
        localStorage.setItem('selectedCategories', JSON.stringify(categories));
    };

    const getSavedCategorySelection = (categories) => {
        const savedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
        if (savedCategories) {
            return categories.map(category => {
                const savedCategory = savedCategories.find(savedCat => savedCat.id === category.id);
                return savedCategory ? {...category, validated: savedCategory.validated} : category;
            });
        }
        return categories;
    };

    const checkMonthChange = () => {
        const lastVisitedMonth = localStorage.getItem('lastVisitedMonth');
        const currentMonth = dayjs().format('YYYY-MM');
        if (lastVisitedMonth !== currentMonth) {
            localStorage.setItem('lastVisitedMonth', currentMonth);
            localStorage.removeItem('selectedCategories');
            setCategories(prevCategories => prevCategories.map(cat => ({ ...cat, validated: false })));
            setMonthlyBudget(0);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16 xl:mt-0">
            <header className="w-full mb-8 text-center">
                <h1 className="text-3xl font-bold">Gestion du Budget</h1>
                <div className="mt-4 text-xl">
                    Budget Mensuel: <span className={getBudgetColor()}>{monthlyBudget.toFixed(2)}€</span>
                </div>
            </header>

            {showNotification && (
                <div className="bg-red-500 text-white p-4 rounded mb-4 shadow-md flex flex-row">
                    <p>Attention : Le budget mensuel est dépassé !</p>
                    <button onClick={() => setShowNotification(false)} className="bg-red-700 text-white p-2 rounded">
                        Fermer
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {categories.map(category => (
                    <div 
                        key={category.id} 
                        className={`p-4 rounded shadow transition-transform transform hover:scale-105 cursor-pointer ${category.validated ? 'bg-primary' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <h2 className="text-xl font-semibold">{category.name}</h2>
                        <p>{getCategoryTotalForMonth(category.id).toFixed(2)}€</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Budgets;
