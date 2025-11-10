
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { HistoryEntry } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartsProps {
    history: HistoryEntry[];
}

const chartOptions = (title: string, yAxisLabel: string) => ({
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        y: {
            beginAtZero: false,
            title: { display: true, text: yAxisLabel },
        },
        x: {
            title: { display: true, text: 'Decision Round' },
        },
    },
    plugins: {
        legend: { display: false },
        title: { display: true, text: title, font: { size: 18 } },
    },
});

const Charts: React.FC<ChartsProps> = ({ history }) => {
    const labels = history.map(h => h.label);

    const delayData = {
        labels,
        datasets: [{
            label: 'Cumulative Delay (Days)',
            data: history.map(h => h.delay),
            borderColor: '#ef4444',
            backgroundColor: '#fecaca',
            tension: 0.2,
            fill: false,
            pointBackgroundColor: '#ef4444',
        }],
    };

    const costData = {
        labels,
        datasets: [{
            label: 'Cumulative Cost (₹ Cr)',
            data: history.map(h => h.cost),
            borderColor: '#22c55e',
            backgroundColor: '#dcfce7',
            tension: 0.2,
            fill: false,
            pointBackgroundColor: '#22c55e',
        }],
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="shadow-md rounded-xl bg-white p-4">
                <Line options={chartOptions('Cumulative Delay (Days)', 'Days')} data={delayData} />
            </div>
            <div className="shadow-md rounded-xl bg-white p-4">
                <Line options={chartOptions('Cumulative Cost (₹ Cr)', 'Cost Overrun (₹ Cr)')} data={costData} />
            </div>
        </div>
    );
};

export default Charts;
