import { promises as fs } from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  try {
    // Read the CSV file
    const filePath = path.join(process.cwd(), 'public', 'data', 'Electric_Vehicle_Population_Data.csv');
    const csvData = await fs.readFile(filePath, 'utf8');
    
    // Parse the CSV data
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true
    });
    
    // Return the parsed data as JSON
    return new Response(JSON.stringify(parsedData.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading or parsing CSV file:', error);
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}