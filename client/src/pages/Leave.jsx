

function Leave() {
  // Dummy data for demonstration
  const leaveRequests = [
    { id: 1, employee: 'John Doe', type: 'Annual Leave', startDate: '2023-10-26', endDate: '2023-10-28', status: 'Pending' },
    { id: 2, employee: 'Jane Smith', type: 'Sick Leave', startDate: '2023-10-20', endDate: '2023-10-20', status: 'Approved' },
    { id: 3, employee: 'Peter Jones', type: 'Casual Leave', startDate: '2023-11-01', endDate: '2023-11-03', status: 'Rejected' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leave Management</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-3">All Leave Requests</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Leave Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">{request.employee}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{request.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leave;