import React, { useState, useEffect } from 'react';
import ExpenseForm from '../form/ExpenseForm';
import IncomeForm from '../form/IncomeForm';
import Alert from '../utils/Alert';
import { useAuth } from '../../context/AuthContext';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [currentTransaction, setCurrentTransaction] = useState(null); // For editing
    const [currentPage, setCurrentPage] = useState(1);
    const [transactionsPerPage] = useState(10); // Transactions per page
    const [transactionType, setTransactionType] = useState('all'); // Filter for transaction type
    const [sortField, setSortField] = useState('date'); // Sort field
    const [sortOrder, setSortOrder] = useState('desc'); // Sort order
    const { isAuthenticated, logout } = useAuth();
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, []);

    useEffect(() => {
        filterTransactions();
    }, [search, transactions, transactionType, sortField, sortOrder]);

    useEffect(() => {
        paginateTransactions();
    }, [filteredTransactions, currentPage]);

    const fetchTransactions = async () => {
        const expenseResponse = await fetch('/expenses', { method: 'GET', credentials: 'include' });
        const incomeResponse = await fetch('/incomes', { method: 'GET', credentials: 'include' });
        const expenses = await expenseResponse.json();
        const incomes = await incomeResponse.json();
        setTransactions([...expenses.map(expense => ({...expense, type: 'expense'})), ...incomes.map(income => ({...income, type: 'income'}))]);
    };

    const filterTransactions = () => {
        let filtered = transactions;

        // Filter by transaction type
        if (transactionType !== 'all') {
            filtered = filtered.filter(transaction => transaction.type === transactionType);
        }

        // Filter by search query
        filtered = filtered.filter(transaction =>
            transaction.name.toLowerCase().includes(search.toLowerCase()) ||
            transaction.category.name.toLowerCase().includes(search.toLowerCase()) ||
            transaction.date.includes(search)
        );

        // Sort transactions
        filtered.sort((a, b) => {
            if (sortField === 'amount') {
                return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
            } else if (sortField === 'category') {
                return sortOrder === 'asc'
                    ? a.category.name.localeCompare(b.category.name)
                    : b.category.name.localeCompare(a.category.name);
            } else {
                return sortOrder === 'asc'
                    ? new Date(a.date) - new Date(b.date)
                    : new Date(b.date) - new Date(a.date);
            }
        });

        setFilteredTransactions(filtered);
        setCurrentPage(1); // Reset to the first page when filters change
    };

    const paginateTransactions = () => {
        const startIndex = (currentPage - 1) * transactionsPerPage;
        const endIndex = startIndex + transactionsPerPage;
        return filteredTransactions.slice(startIndex, endIndex);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleOpenModal = (type, transaction = null) => {
        setModalType(type);
        setCurrentTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentTransaction(null);
    };

    const handleDeleteTransaction = async (transaction) => {
        const url = transaction.type === 'income' ? `/incomes/${transaction.id}` : `/expenses/${transaction.id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (response.ok) {
            fetchTransactions();
            setAlert({ type: 'success', message: 'Transaction supprimée avec succès.' });
        } else {
            setAlert({ type: 'error', message: 'Erreur lors de la suppression de la transaction.' });
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const generatePageNumbers = () => {
        let pages = [];
        const maxPagesToShow = 5;
        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

        if (totalPages <= maxPagesToShow) {
            pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        } else if (currentPage <= halfMaxPagesToShow) {
            pages = Array.from({ length: maxPagesToShow }, (_, index) => index + 1);
        } else if (currentPage + halfMaxPagesToShow >= totalPages) {
            pages = Array.from({ length: maxPagesToShow }, (_, index) => totalPages - maxPagesToShow + index + 1);
        } else {
            pages = Array.from({ length: maxPagesToShow }, (_, index) => currentPage - halfMaxPagesToShow + index);
        }

        return pages;
    };

    const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const paginatedTransactions = paginateTransactions();
    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex h-screen bg-gray-100 mt-16 xl:mt-0">
            <div className={`flex-grow p-6 ${isModalOpen ? 'blur-sm' : ''}`}>
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                </header>
                {alert && (
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}
                <div className="bg-white p-4 rounded shadow mb-8">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher une transaction"
                            value={search}
                            onChange={handleSearch}
                            className="p-2 border border-gray-300 rounded w-full"
                        />
                        <button className="bg-primary text-white p-2 rounded ml-2">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                            <label className="mr-2">Type:</label>
                            <select
                                value={transactionType}
                                onChange={(e) => setTransactionType(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="all">Tous</option>
                                <option value="income">Revenu</option>
                                <option value="expense">Dépense</option>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <label className="mr-2">Trier par:</label>
                            <select
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                className="p-2 border border-gray-300 rounded"
                            >
                                <option value="date">Date</option>
                                <option value="amount">Montant</option>
                                <option value="category">Catégorie</option>
                            </select>
                            <button onClick={() => handleSortChange(sortField)} className="ml-2 text-primary">
                                {sortOrder === 'asc' ? (
                                    <i className="fa-solid fa-arrow-up"></i>
                                ) : (
                                    <i className="fa-solid fa-arrow-down"></i>
                                )}
                            </button>
                        </div>
                    </div>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 text-left">Date</th>
                                <th className="py-2 text-left">Description</th>
                                <th className="py-2 text-left">Catégorie</th>
                                <th className="py-2 text-left">Montant</th>
                                <th className="py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedTransactions.map((transaction, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{transaction.date}</td>
                                    <td className="py-2">{transaction.name}</td>
                                    <td className="py-2">{transaction.category.name}</td>
                                    <td className="py-2">{transaction.type === 'expense' ? `-${transaction.amount}€` : `+${transaction.amount}€`}</td>
                                    <td className="py-2">
                                        <button className="text-warning mx-2" onClick={() => handleOpenModal(transaction.type, transaction)}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button className="text-danger mx-2" onClick={() => handleOpenModal('delete', transaction)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <button
                            onClick={() => handleOpenModal('transaction')}
                            className="bg-primary text-white px-4 py-2 rounded">
                            Ajouter une transaction
                        </button>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-primary text-white px-4 py-2 rounded">
                            <i className="fas fa-chevron-left"></i>
                        </button>

                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`bg-primary text-white px-4 py-2 rounded ${currentPage === page ? 'bg-secondary' : ''}`}>
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-primary text-white px-4 py-2 rounded">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                            {modalType === 'delete' ? 'Confirmer la suppression' : currentTransaction ? 'Modifier une transaction' : 'Ajouter une transaction'}
                                        </h3>
                                        <div className="mt-2">
                                            {modalType === 'transaction' && (
                                                <div className="flex justify-around my-4">
                                                    <button onClick={() => setModalType('income')} className="bg-primary text-white px-4 py-2 rounded mr-2">Revenu</button>
                                                    <button onClick={() => setModalType('expense')} className="bg-danger text-white px-4 py-2 rounded">Dépense</button>
                                                </div>
                                            )}
                                            {modalType === 'income' && <IncomeForm transaction={currentTransaction} fetchTransactions={fetchTransactions} closeModal={handleCloseModal} setAlert={setAlert} />}
                                            {modalType === 'expense' && <ExpenseForm transaction={currentTransaction} fetchTransactions={fetchTransactions} closeModal={handleCloseModal} setAlert={setAlert} />}
                                            {modalType === 'delete' && (
                                                <div>
                                                    <p>Voulez-vous vraiment supprimer cette transaction ?</p>
                                                    <div className="mt-4 flex justify-end">
                                                        <button onClick={() => handleDeleteTransaction(currentTransaction)} className="bg-danger text-white px-4 py-2 rounded mr-2">Supprimer</button>
                                                        <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded">Annuler</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={handleCloseModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transactions;
