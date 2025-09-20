export default function MetricsCard({ title, value, description, color = 'blue' }) {
  // Define color classes based on the color prop
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500'
  };

  const borderClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    amber: 'border-amber-500',
    red: 'border-red-500'
  };

  return (
    <div className={`bg-white overflow-hidden shadow-lg rounded-xl border-t-4 ${borderClasses[color]} transition-all duration-300 hover:shadow-xl`}>
      <div className="px-6 py-8">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-full p-3 ${colorClasses[color]}`}>
            <div className="h-6 w-6 text-white">
              {/* Simple icon based on title */}
              {title.includes('Total') && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              )}
              {title.includes('Range') && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              {title.includes('Manufacturer') && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              )}
              {title.includes('Years') && (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              )}
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-3xl font-semibold text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </div>
  );
}