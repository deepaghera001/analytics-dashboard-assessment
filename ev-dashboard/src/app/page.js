"use client";

import { useState, useEffect } from 'react';
import { processEVData, getTopMakes, getVehicleTypeDistribution, getModelYearTrend, getRangeDistribution, getCountyDistribution, filterData } from '../lib/dataProcessor';
import EVAdoptionChart from '../components/charts/EVAdoptionChart';
import MakeDistributionChart from '../components/charts/MakeDistributionChart';
import VehicleTypeChart from '../components/charts/VehicleTypeChart';
import RangeAnalysisChart from '../components/charts/RangeAnalysisChart';
import MetricsCard from '../components/dashboard/MetricsCard';
import FilterControls from '../components/dashboard/FilterControls';

export default function Home() {
  const [metrics, setMetrics] = useState(null);
  const [filteredMetrics, setFilteredMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEVData() {
      try {
        setLoading(true);
        const data = await processEVData();
        setMetrics(data);
        setFilteredMetrics(data);
      } catch (err) {
        console.error('Error loading EV data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadEVData();
  }, []);

  const handleFilterChange = (filters) => {
    if (!metrics) return;
    
    // Apply filters to raw data
    const filteredData = filterData(metrics.rawData, filters);
    
    // Re-process the filtered data
    const processedFilteredData = processParsedData(filteredData);
    setFilteredMetrics(processedFilteredData);
  };

  // Process the parsed CSV data into useful metrics
  function processParsedData(data) {
    // Initialize metrics objects
    const metrics = {
      totalVehicles: data.length,
      vehicleTypes: {},
      makes: {},
      modelYears: {},
      electricRange: {
        average: 0,
        max: 0,
        min: 0,
        distribution: {}
      },
      counties: {},
      cafvEligibility: {},
      years: []
    };

    let totalRange = 0;
    let validRangeCount = 0;
    let maxRange = 0;
    let minRange = Infinity;

    // Process each row of data
    data.forEach(row => {
      // Vehicle Type
      const vehicleType = row['Electric Vehicle Type'] || 'Unknown';
      metrics.vehicleTypes[vehicleType] = (metrics.vehicleTypes[vehicleType] || 0) + 1;

      // Make
      const make = row['Make'] || 'Unknown';
      metrics.makes[make] = (metrics.makes[make] || 0) + 1;

      // Model Year
      const modelYear = row['Model Year'] || 'Unknown';
      metrics.modelYears[modelYear] = (metrics.modelYears[modelYear] || 0) + 1;

      // Electric Range
      const range = parseInt(row['Electric Range']) || 0;
      if (range > 0) {
        totalRange += range;
        validRangeCount++;
        maxRange = Math.max(maxRange, range);
        minRange = Math.min(minRange, range);
        
        // Group ranges into buckets for distribution
        const rangeBucket = Math.floor(range / 50) * 50;
        const bucketLabel = `${rangeBucket}-${rangeBucket + 49}`;
        metrics.electricRange.distribution[bucketLabel] = (metrics.electricRange.distribution[bucketLabel] || 0) + 1;
      }

      // County
      const county = row['County'] || 'Unknown';
      metrics.counties[county] = (metrics.counties[county] || 0) + 1;

      // CAFV Eligibility
      const cafv = row['Clean Alternative Fuel Vehicle (CAFV) Eligibility'] || 'Unknown';
      metrics.cafvEligibility[cafv] = (metrics.cafvEligibility[cafv] || 0) + 1;
    });

    // Calculate average range
    metrics.electricRange.average = validRangeCount > 0 ? Math.round(totalRange / validRangeCount) : 0;
    metrics.electricRange.max = maxRange;
    metrics.electricRange.min = minRange === Infinity ? 0 : minRange;

    // Get unique years for time series data
    metrics.years = Object.keys(metrics.modelYears).sort();

    return metrics;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg font-medium">Loading EV data...</p>
          <p className="mt-2 text-gray-500">Processing electric vehicle population dataset</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <div className="text-red-500 text-3xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-gray-600 text-lg">No data available</p>
        </div>
      </div>
    );
  }

  // Process data for charts using filtered metrics
  const topMakes = getTopMakes(filteredMetrics);
  const vehicleTypeData = getVehicleTypeDistribution(filteredMetrics);
  const yearTrendData = getModelYearTrend(filteredMetrics);
  const rangeDistribution = getRangeDistribution(filteredMetrics);
  const countyDistribution = getCountyDistribution(filteredMetrics);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Electric Vehicle Population Dashboard</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analytics and insights from the EV population dataset
            </p>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Filter Controls */}
          <FilterControls metrics={metrics} onFilterChange={handleFilterChange} />
          
          {/* Metrics Cards */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Metrics</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <MetricsCard 
                title="Total Vehicles" 
                value={filteredMetrics.totalVehicles.toLocaleString()} 
                description="Total electric vehicles in dataset" 
                color="blue"
              />
              <MetricsCard 
                title="Avg. Electric Range" 
                value={`${filteredMetrics.electricRange.average} miles`} 
                description="Average electric range of vehicles" 
                color="green"
              />
              <MetricsCard 
                title="Top Manufacturer" 
                value={topMakes.length > 0 ? topMakes[0].make : 'N/A'} 
                description="Leading EV manufacturer" 
                color="purple"
              />
              <MetricsCard 
                title="Model Years" 
                value={filteredMetrics.years.length} 
                description="Years of data represented" 
                color="amber"
              />
            </div>
          </div>

          {/* Charts Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Data Visualizations</h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* EV Adoption Over Time */}
              <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">EV Adoption Over Time</h3>
                <div className="h-80">
                  <EVAdoptionChart data={yearTrendData} />
                </div>
              </div>

              {/* Top Manufacturers */}
              <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Top EV Manufacturers</h3>
                <div className="h-96"> {/* Increased height for better visibility */}
                  <MakeDistributionChart data={topMakes} />
                </div>
              </div>

              {/* Vehicle Type Distribution */}
              <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Vehicle Type Distribution</h3>
                <div className="h-80">
                  <VehicleTypeChart data={vehicleTypeData} />
                </div>
              </div>

              {/* Electric Range Analysis */}
              <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Electric Range Analysis</h3>
                <div className="h-80">
                  <RangeAnalysisChart data={rangeDistribution} />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Insights */}
          <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">County Distribution (Top 10)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {countyDistribution.slice(0, 10).map((item, index) => (
                <div key={index} className="border rounded-lg p-4 text-center hover:bg-gray-50 transition-colors">
                  <div className="text-lg font-semibold text-gray-800">{item.county}</div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">{item.count.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 mt-1">vehicles</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            Electric Vehicle Population Dashboard • Data sourced from Washington State Department of Licensing
          </p>
        </div>
      </footer>
    </div>
  );
}