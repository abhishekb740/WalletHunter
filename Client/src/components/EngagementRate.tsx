import React, { useEffect, useState } from 'react';
import { EngagementRateResponse } from '../types';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EngagementRate: React.FC = () => {
  const [messagesPerDay, setMessagesPerDay] = useState<{ _id: number; totalMessages: number }[]>([]);

  useEffect(() => {
    const fetchEngagementRate = async () => {
      try {
        const response = await fetch('https://wallethunter.onrender.com/api/engagement-rate');
        const data: EngagementRateResponse = await response.json();
        setMessagesPerDay(data.messagesPerDay);
      } catch (error) {
        console.error('Error fetching engagement rate:', error);
      }
    };
    fetchEngagementRate();
  }, []);

  const data = {
    labels: messagesPerDay.map(day => `Day ${day._id}`),
    datasets: [
      {
        label: 'Messages per Day',
        data: messagesPerDay.map(day => day.totalMessages),
        fill: false,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
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
        text: 'Engagement Rate',
      },
    },
  };

  return (
    <div className="card">
      <h3>Engagement Rate</h3>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default EngagementRate;
