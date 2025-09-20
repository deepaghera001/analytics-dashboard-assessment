// Function to process EV data
export async function processEVData() {
  try {
    let data;
    
    // Check if we're running on the server or client
    if (typeof window === 'undefined') {
      // Server-side: Read the file directly
      const fs = await import('fs/promises');
      const path = await import('path');
      const Papa = await import('papaparse');
      
      // Read the CSV file
      const filePath = path.join(process.cwd(), 'public', 'data', 'Electric_Vehicle_Population_Data.csv');
      const csvData = await fs.readFile(filePath, 'utf8');
      
      // Parse the CSV data
      const parsedData = Papa.default.parse(csvData, {
        header: true,
        skipEmptyLines: true
      });
      
      data = parsedData.data;
    } else {
      // Client-side: Fetch data from our API route
      const response = await fetch('/api/ev-data');
      data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch data');
      }
    }
    
    const metrics = processParsedData(data);
    metrics.rawData = data; // Store raw data for filtering
    return metrics;
  } catch (error) {
    console.error('Error processing EV data:', error);
    throw error;
  }
}

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

// Get top N makes by vehicle count
export function getTopMakes(metrics, limit = 10) {
  return Object.entries(metrics.makes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([make, count]) => ({ make, count }));
}

// Get vehicle type distribution
export function getVehicleTypeDistribution(metrics) {
  return Object.entries(metrics.vehicleTypes)
    .map(([type, count]) => ({ type, count }));
}

// Get model year trend data
export function getModelYearTrend(metrics) {
  return Object.entries(metrics.modelYears)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([year, count]) => ({ year, count }));
}

// Get electric range distribution
export function getRangeDistribution(metrics) {
  return Object.entries(metrics.electricRange.distribution)
    .map(([range, count]) => ({ range, count }));
}

// Get county distribution
export function getCountyDistribution(metrics) {
  return Object.entries(metrics.counties)
    .sort((a, b) => b[1] - a[1])
    .map(([county, count]) => ({ county, count }));
}

// Filter data based on selected filters
export function filterData(rawData, filters) {
  if (!filters) return rawData;
  
  return rawData.filter(row => {
    // Filter by make
    if (filters.make && row['Make'] !== filters.make) {
      return false;
    }
    
    // Filter by vehicle type
    if (filters.vehicleType && row['Electric Vehicle Type'] !== filters.vehicleType) {
      return false;
    }
    
    // Filter by county
    if (filters.county && row['County'] !== filters.county) {
      return false;
    }
    
    // Filter by model year
    if (filters.modelYear && row['Model Year'] !== filters.modelYear) {
      return false;
    }
    
    return true;
  });
}