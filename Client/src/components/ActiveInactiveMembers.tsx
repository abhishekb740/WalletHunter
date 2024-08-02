import React, { useEffect, useState } from 'react';
import { ActiveInactiveResponse } from '../types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ActiveInactiveMembers: React.FC = () => {
  const [activeMembers, setActiveMembers] = useState<number>(0);
  const [inactiveMembers, setInactiveMembers] = useState<number>(0);

  useEffect(() => {
    const fetchActiveInactiveMembers = async () => {
      try {
        const response = await fetch('https://wallethunter.onrender.com/api/active-vs-inactive');
        const data: ActiveInactiveResponse = await response.json();
        setActiveMembers(data.activeMembers);
        setInactiveMembers(data.inactiveMembers);
      } catch (error) {
        console.error('Error fetching active vs inactive members:', error);
      }
    };
    fetchActiveInactiveMembers();
  }, []);

  const data = {
    labels: ['Active Members', 'Inactive Members'],
    datasets: [
      {
        data: [activeMembers, inactiveMembers],
        backgroundColor: ['#007bff', '#dc3545'],
        hoverBackgroundColor: ['#0056b3', '#c82333'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Active vs Inactive Members',
      },
    },
  };

  return (
    <div className="card">
      <h3>Active vs Inactive Members</h3>
      <div className="chart-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ActiveInactiveMembers;
