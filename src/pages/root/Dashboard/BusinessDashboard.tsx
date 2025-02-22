import CarCountdown from "@components/CarCountdown";
import { ICar } from "./CarOwnerDashboard";

const BusinessDashboard = ({ cars }: { cars: ICar[] }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-4">Company Dashboard</h2>

      {cars.length === 0 ? (
        <p className="text-gray-400">No cars available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-nowrap p-3">Image</th>
                <th className="text-nowrap p-3">Brand</th>
                <th className="text-nowrap p-3">Model</th>
                <th className="text-nowrap p-3">Year</th>
                <th className="text-nowrap p-3">Price/Day</th>
                <th className="text-nowrap p-3">Status</th>
                <th className="text-nowrap p-3">Rental</th>
                <th className="text-nowrap p-3">Available Until</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id} className="border-b border-gray-700">
                  <td className="p-3">
                    <img
                      src={car.images[0]}
                      alt={car.brand}
                      className="w-20 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3">{car.brand}</td>
                  <td className="p-3">{car.model}</td>
                  <td className="p-3">{car.year}</td>
                  <td className="p-3">${car.pricePerDay}</td>
                  <td className="p-3 text-nowrap">
                    {car.isApproved ? (
                      <span className="text-green-500">Approved</span>
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td className="p-3 text-nowrap">
                    {car.isRentedByBusiness ? (
                      <span className="text-yellow-500">Rented</span>
                    ) : (
                      <span className="text-blue-500">Available</span>
                    )}
                  </td>
                  <td className="p-3 text-nowrap">
                    <CarCountdown availableUntil={car.availableUntil} />
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
