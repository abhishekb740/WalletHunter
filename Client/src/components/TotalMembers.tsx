import React, { useEffect, useState } from 'react';
import { TotalMembersResponse } from '../types';

const TotalMembers: React.FC = () => {
  const [totalMembers, setTotalMembers] = useState<number>(0);

  useEffect(() => {
    const fetchTotalMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/total-members');
        const data: TotalMembersResponse = await response.json();
        setTotalMembers(data.totalMembers);
      } catch (error) {
        console.error('Error fetching total members:', error);
      }
    };
    fetchTotalMembers();
  }, []);

  return (
    <div className="card">
      <h3>Total Members</h3>
      <p className='gradient'>{totalMembers}</p>
    </div>
  );
};

export default TotalMembers;
