
import React from 'react';

interface DashboardProps {
  timeDisplay: string;
  totalDelayDays: number;
  costOverrun: number;
  targetProgress: number;
}

const DashboardCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`shadow-md rounded-xl bg-white p-4 text-center ${className}`}>
        <p className="text-sm font-semibold text-gray-500">{title}</p>
        {children}
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ timeDisplay, totalDelayDays, costOverrun, targetProgress }) => {
    
    const delayColor = totalDelayDays < 0 ? 'text-green-600' : totalDelayDays < 180 ? 'text-yellow-600' : 'text-red-600';
    const costColor = costOverrun <= 0 ? 'text-green-600' : 'text-red-600';
    const costSign = costOverrun >= 0 ? '₹' : '-₹';
    const absCost = Math.abs(costOverrun).toLocaleString();

    return (
        <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DashboardCard title="Current Month">
                    <p className="text-2xl font-bold text-gray-800 mt-1">{timeDisplay}</p>
                </DashboardCard>
                <DashboardCard title="Cumulative Delay">
                    <p className={`text-2xl font-bold mt-1 ${delayColor}`}>{totalDelayDays.toLocaleString()} Days</p>
                </DashboardCard>
                <DashboardCard title="Cost Overrun">
                    <p className={`text-2xl font-bold mt-1 ${costColor}`}>{`${costSign}${absCost} Cr`}</p>
                </DashboardCard>
                <DashboardCard title="Target Progress" className="col-span-2 lg:col-span-1">
                    <p className="text-2xl font-bold text-blue-600 mt-1">{targetProgress}%</p>
                </DashboardCard>
            </div>
            <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-sm font-semibold text-gray-600 mb-2">Project Timeline (48 Months)</p>
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full transition-width duration-1000 ease-in-out" style={{ width: `${targetProgress}%` }}></div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
