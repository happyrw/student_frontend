import { Link } from "react-router-dom";

const BusinessDashboard = ({ cars }: { cars: any }) => {
  console.log("BusinessDashboard", cars);
  const orderedCars = cars?.orders;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Company Dashboard</h2>

      {!orderedCars || orderedCars.length === 0 ? (
        <p className="text-gray-400">No orders available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-nowrap p-3">Car Image</th>
                <th className="text-nowrap p-3">Car Brand</th>
                <th className="text-nowrap p-3">Car Model</th>
                <th className="text-nowrap p-3">Start Date</th>
                <th className="text-nowrap p-3">End Date</th>
                <th className="text-nowrap p-3">Total Price</th>
                <th className="text-nowrap p-3">Status</th>
                <th className="text-nowrap p-3">Contact</th>
                <th className="text-nowrap p-3">Location</th>
                <th className="text-nowrap p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderedCars.map((order: any) => (
                <tr key={order._id} className="border-b border-gray-700">
                  <td className="p-3">
                    <img
                      src={order.carId.images[0]} // Assuming the car image is within the `carId` object
                      alt={order.carId.brand}
                      className="w-20 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3">{order.carId.brand}</td>
                  <td className="p-3">{order.carId.model}</td>
                  <td className="p-3">
                    {new Date(order.startDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {new Date(order.endDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">${order.totalPrice}</td>
                  <td className="p-3 text-nowrap">
                    {order.status === "pending" ? (
                      <span className="text-red-500">Pending</span>
                    ) : (
                      <span className="text-green-500">Approved</span>
                    )}
                  </td>
                  <td className="p-3">{order.contact}</td>
                  <td className="p-3 text-nowrap">{order.carId.location}</td>
                  <td className="p-3">
                    <Link
                      to={`/single_car_item/${order.carId._id}`}
                      className="w-full py-2 px-4 bg-white text-black mt-2 hover:text-black hover:bg-white rounded-lg"
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
