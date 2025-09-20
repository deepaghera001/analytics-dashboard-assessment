import { processEVData } from '../../../lib/dataProcessor';

export async function GET() {
  try {
    // Process data directly without fetch
    const metrics = await processEVData();
    
    // Return a subset of the data for testing
    const testData = {
      totalVehicles: metrics.totalVehicles,
      topMakes: Object.entries(metrics.makes)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([make, count]) => ({ make, count })),
      vehicleTypes: metrics.vehicleTypes,
      averageRange: metrics.electricRange.average
    };
    
    return new Response(JSON.stringify(testData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error processing test data:', error);
    return new Response(JSON.stringify({ error: 'Failed to process data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}