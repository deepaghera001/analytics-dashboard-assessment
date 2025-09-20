"use client";

import { useState } from 'react';

export default function FilterControls({ metrics, onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({
    make: '',
    vehicleType: '',
    county: '',
    modelYear: ''
  });

  // Extract unique values for dropdowns
  const makes = metrics ? Object.keys(metrics.makes).sort() : [];
  const vehicleTypes = metrics ? Object.keys(metrics.vehicleTypes).sort() : [];
  const counties = metrics ? Object.keys(metrics.counties).sort() : [];
  const modelYears = metrics ? Object.keys(metrics.modelYears).sort() : [];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value
    };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters = {
      make: '',
      vehicleType: '',
      county: '',
      modelYear: ''
    };
    setSelectedFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-2xl font-bold text-gray-800">Data Filters</h3>
        <button 
          onClick={clearFilters}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Clear All Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Manufacturer Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Manufacturer</label>
          <div className="relative">
            <select
              value={selectedFilters.make}
              onChange={(e) => handleFilterChange('make', e.target.value)}
              className="w-full rounded-lg border-0 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-sm appearance-none"
            >
              <option value="" disabled hidden>Select Manufacturer</option>
              <option value="">All Manufacturers</option>
              {makes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Vehicle Type Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Vehicle Type</label>
          <div className="relative">
            <select
              value={selectedFilters.vehicleType}
              onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
              className="w-full rounded-lg border-0 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-sm appearance-none"
            >
              <option value="" disabled hidden>Select Vehicle Type</option>
              <option value="">All Vehicle Types</option>
              {vehicleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* County Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">County</label>
          <div className="relative">
            <select
              value={selectedFilters.county}
              onChange={(e) => handleFilterChange('county', e.target.value)}
              className="w-full rounded-lg border-0 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-sm appearance-none"
            >
              <option value="" disabled hidden>Select County</option>
              <option value="">All Counties</option>
              {counties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Model Year Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Model Year</label>
          <div className="relative">
            <select
              value={selectedFilters.modelYear}
              onChange={(e) => handleFilterChange('modelYear', e.target.value)}
              className="w-full rounded-lg border-0 bg-gray-50 py-3 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 shadow-sm appearance-none"
            >
              <option value="" disabled hidden>Select Model Year</option>
              <option value="">All Years</option>
              {modelYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}