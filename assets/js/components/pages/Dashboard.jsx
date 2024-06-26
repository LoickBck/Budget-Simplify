import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import dayjs from 'dayjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [financialOverview, setFinancialOverview] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        totalSavings: 0,
        expensesData: { labels: [], values: [], colors: [] },
        incomeData: { labels: [], values: [], colors: [] },
    });
    const [viewType, setViewType] = useState('annual'); // 'monthly' or 'annual'
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
    const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));

    useEffect(() => {
        fetchFinancialOverview();
    }, [viewType, selectedMonth, selectedYear]);

    const fetchFinancialOverview = async () => {
        let endpoint;
        if (viewType === 'monthly') {
            endpoint = `/report/overview?viewType=monthly&month=${selectedMonth}`;
        } else {
            endpoint = `/report/overview?viewType=annual&year=${selectedYear}`;
        }

        const response = await fetch(endpoint, { method: 'GET', credentials: 'include' });
        const data = await response.json();

        setFinancialOverview({
            totalIncome: data.totalIncome || 0,
            totalExpenses: data.totalExpenses || 0,
            totalSavings: data.totalSavings || 0,
            expensesData: data.expensesData || { labels: [], values: [], colors: [] },
            incomeData: data.incomeData || { labels: [], values: [], colors: [] },
        });
    };

    const renderPieChart = (data, title) => (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 mt-16 xl:mt-0">
            <div className="bg-white shadow-md rounded p-4">
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <div className="relative" style={{ height: '300px' }}>
                    <Pie
                        data={{
                            labels: data.labels,
                            datasets: [
                                {
                                    data: data.values,
                                    backgroundColor: data.colors,
                                    borderColor: data.colors,
                                    borderWidth: 1,
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            interaction: {
                                mode: 'nearest',
                                axis: 'x',
                                intersect: false,
                            },
                            plugins: {
                                legend: {
                                    position: 'bottom',
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toLocaleString()} €`,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center flex-col mb-6">
                <h1 className="text-3xl font-bold mb-6">Résumé</h1>
                <div className="flex items-center">
                    <select 
                        className="p-2 border border-gray-300 rounded mr-2"
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                    >
                        <option value="monthly">Mensuel</option>
                        <option value="annual">Annuel</option>
                    </select>
                    {viewType === 'monthly' ? (
                        <input 
                            type="month" 
                            value={selectedMonth} 
                            onChange={(e) => setSelectedMonth(e.target.value)} 
                            className="p-2 border border-gray-300 rounded" 
                        />
                    ) : (
                        <input 
                            type="number" 
                            value={selectedYear} 
                            onChange={(e) => setSelectedYear(e.target.value)} 
                            className="p-2 border border-gray-300 rounded" 
                            min="2000"
                            max={dayjs().year()}
                        />
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4">Total des revenus</h2>
                    <p className="text-2xl">{financialOverview.totalIncome.toLocaleString()} €</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4">Total des dépenses</h2>
                    <p className="text-2xl">{financialOverview.totalExpenses.toLocaleString()} €</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-2xl font-bold mb-4">Économies totales</h2>
                    <p className="text-2xl">{financialOverview.totalSavings.toLocaleString()} €</p>
                </div>
            </div>

            <div className="flex flex-wrap -mx-4">
                {renderPieChart(financialOverview.expensesData, 'Dépenses')}
                {renderPieChart(financialOverview.incomeData, 'Revenus')}
            </div>
        </div>
    );
};

export default Dashboard;
