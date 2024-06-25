import React, { useEffect, useState, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';

Chart.register(...registerables);

const Rapport = () => {
    const [monthlyReport, setMonthlyReport] = useState(null);
    const [annualReport, setAnnualReport] = useState(null);
    const [comparisonReport, setComparisonReport] = useState(null);
    const [period1, setPeriod1] = useState({ start: '', end: '' });
    const [period2, setPeriod2] = useState({ start: '', end: '' });
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
    const [selectedYear, setSelectedYear] = useState(dayjs().format('YYYY'));
    const chartRef = useRef(null);

    useEffect(() => {
        fetchMonthlyReport(selectedMonth);
        fetchAnnualReport(selectedYear);
    }, [selectedMonth, selectedYear]);

    const fetchMonthlyReport = async (month) => {
        const response = await fetch(`/report/monthly?month=${month}`, { method: 'GET', credentials: 'include' });
        const data = await response.json();
        setMonthlyReport(data);
    };

    const fetchAnnualReport = async (year) => {
        const response = await fetch(`/report/annual?year=${year}`, { method: 'GET', credentials: 'include' });
        const data = await response.json();
        setAnnualReport(data);
    };

    const fetchComparisonReport = async () => {
        const response = await fetch(`/report/comparison?period1Start=${period1.start}&period1End=${period1.end}&period2Start=${period2.start}&period2End=${period2.end}`, { method: 'GET', credentials: 'include' });
        const data = await response.json();
        setComparisonReport(data);
    };

    const downloadImage = (chart, title) => {
        const link = document.createElement('a');
        link.href = chart.toBase64Image();
        link.download = `${title}.png`;
        link.click();
    };

    const renderChart = (data, title) => (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <Bar
                ref={chartRef}
                data={{
                    labels: data.categories.map(cat => cat.name),
                    datasets: [
                        {
                            label: 'Montant',
                            data: data.categories.map(cat => cat.amount),
                            backgroundColor: data.categories.map(cat => cat.amount >= 0 ? 'rgba(76, 175, 79, 0.2)' : 'rgba(255, 99, 132, 0.2)'),
                            borderColor: data.categories.map(cat => cat.amount >= 0 ? 'rgba(76, 175, 79, 1)' : 'rgba(255, 99, 132, 1)'),
                            borderWidth: 1,
                        },
                    ],
                }}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
            <button onClick={() => downloadImage(chartRef.current, title)} className="bg-primary text-white px-4 py-2 rounded mt-4">Télécharger le rapport</button>
        </div>
    );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Rapport</h1>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Rapport Mensuel</h3>
                <input 
                    type="month" 
                    value={selectedMonth} 
                    onChange={(e) => setSelectedMonth(e.target.value)} 
                    className="p-2 border border-gray-300 rounded mt-2 mb-4" 
                />
                {monthlyReport && renderChart(monthlyReport, 'Rapport Mensuel')}
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Rapport Annuel</h3>
                <input 
                    type="number" 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)} 
                    className="p-2 border border-gray-300 rounded mt-2 mb-4" 
                    min="2000"
                    max={dayjs().year()}
                />
                {annualReport && renderChart(annualReport, 'Rapport Annuel')}
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Comparer les Périodes</h3>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <label className="block text-gray-700">Période 1 - Début</label>
                        <input type="date" value={period1.start} onChange={e => setPeriod1({ ...period1, start: e.target.value })} className="p-2 border border-gray-300 rounded mt-2" />
                    </div>
                    <div className="mr-4">
                        <label className="block text-gray-700">Période 1 - Fin</label>
                        <input type="date" value={period1.end} onChange={e => setPeriod1({ ...period1, end: e.target.value })} className="p-2 border border-gray-300 rounded mt-2" />
                    </div>
                </div>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <label className="block text-gray-700">Période 2 - Début</label>
                        <input type="date" value={period2.start} onChange={e => setPeriod2({ ...period2, start: e.target.value })} className="p-2 border border-gray-300 rounded mt-2" />
                    </div>
                    <div className="mr-4">
                        <label className="block text-gray-700">Période 2 - Fin</label>
                        <input type="date" value={period2.end} onChange={e => setPeriod2({ ...period2, end: e.target.value })} className="p-2 border border-gray-300 rounded mt-2" />
                    </div>
                </div>
                <button onClick={fetchComparisonReport} className="bg-primary text-white px-4 py-2 rounded">Comparer</button>
            </div>

            {comparisonReport && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">Comparaison des Périodes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderChart(comparisonReport.period1, 'Période 1')}
                        {renderChart(comparisonReport.period2, 'Période 2')}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rapport;
