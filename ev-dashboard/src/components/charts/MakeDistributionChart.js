"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MakeDistributionChart({ data }) {
  // Custom tick formatter for Y-axis to handle long manufacturer names
  const formatYAxisTick = (tickItem) => {
    if (tickItem.length > 15) {
      return `${tickItem.substring(0, 12)}...`;
    }
    return tickItem;
  };

  // Custom tooltip formatter to show full manufacturer name
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-bold text-gray-800">{`Manufacturer: ${label}`}</p>
          <p className="text-green-600">{`Vehicles: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-96"> {/* Increased height for better visibility */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 120, // Increased left margin for longer names
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis 
            dataKey="make" 
            type="category" 
            scale="band" 
            tick={{ fontSize: 12 }}
            tickFormatter={formatYAxisTick}
            width={100}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="count" 
            fill="#10b981" 
            name="Number of Vehicles"
            radius={[0, 4, 4, 0]} // Rounded corners for bars
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}