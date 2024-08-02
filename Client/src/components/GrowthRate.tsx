import React, { useEffect, useState } from 'react';
import { GrowthRateResponse } from '../types';

const GrowthRate: React.FC = () => {
  const [growthRate, setGrowthRate] = useState<number>(0);

  useEffect(() => {
    const fetchGrowthRate = async () => {
      try {
        const response = await fetch('https://wallethunter.onrender.com/api/growth-rate');
        const data: GrowthRateResponse = await response.json();
        setGrowthRate(data.growthRate);
      } catch (error) {
        console.error('Error fetching growth rate:', error);
      }
    };
    fetchGrowthRate();
  }, []);

  return (
    <div className="card">
      <h3>Growth Rate</h3>
      <p className='gradient'>{growthRate}</p>
    </div>
  );
};

export default GrowthRate;
