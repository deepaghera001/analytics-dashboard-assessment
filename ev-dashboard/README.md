# Electric Vehicle Population Dashboard

This is a Next.js dashboard application that visualizes data from the Electric Vehicle Population dataset.

## Features

- Interactive dashboard with multiple data visualizations
- Metrics cards showing key statistics
- Charts for:
  - EV adoption over time
  - Top manufacturers
  - Vehicle type distribution
  - Electric range analysis
  - County distribution
- Responsive design using Tailwind CSS
- Data processing with Papa Parse
- Charting with Recharts

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Recharts](https://recharts.org/) - Charting library
- [Papa Parse](https://www.papaparse.com/) - CSV parsing library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
ev-dashboard/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/             # API routes
│   │   └── components/      # React components
│   ├── lib/                 # Utility functions
│   └── public/              # Static assets
│       └── data/            # CSV data file
```

## Data Processing

The application processes the Electric Vehicle Population CSV data to extract key metrics:

- Total vehicle count
- Vehicle type distribution (BEV vs PHEV)
- Top manufacturers
- Model year trends
- Electric range statistics
- Geographic distribution by county
- CAFV eligibility breakdown

## Deployment

To deploy this application, you can use platforms like Vercel, Netlify, or any other hosting provider that supports Next.js applications.