"use client";

import { useState, useEffect } from 'react';
import MetricsCard from '../../components/dashboard/MetricsCard';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setData({
        totalVehicles: 50000,
        averageRange: 123,
        topMake: 'TESLA',
        years: 10
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Component Test Page</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricsCard 
          title="Total Vehicles" 
          value={data.totalVehicles.toLocaleString()} 
          description="Total electric vehicles in dataset" 
        />
        <MetricsCard 
          title="Avg. Electric Range" 
          value={`${data.averageRange} miles`} 
          description="Average electric range of vehicles" 
        />
        <MetricsCard 
          title="Top Manufacturer" 
          value={data.topMake} 
          description="Leading EV manufacturer" 
        />
        <MetricsCard 
          title="Model Years" 
          value={data.years} 
          description="Years of data represented" 
        />
      </div>
    </div>
  );
}