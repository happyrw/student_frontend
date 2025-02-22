import CarCountdown from "@components/CarCountdown";

export interface ICar {
  availableUntil: string;
  brand: string;
  businessId: string;
  createdAt: string;
  description: string;
  fuelType: string;
  images: string;
  isApproved: boolean;
  isRentedByBusiness: boolean;
  model: string;
  ownerId: string;
  pricePerDay: string;
  transmission: string;
  updatedAt: string;
  year: string;
  _id: string;
}

const CarOwnerDashboard = ({ cars }: { cars: ICar[] }) => {
  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Cars</h2>

      {cars.length === 0 ? (
        <p className="text-gray-400">No cars added yet.</p>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="text-left bg-gray-700 text-white">
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Image
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Brand
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Model
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Year
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Fuel Type
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Price/Day
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Transmission
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Available Until
                </th>
                <th className="text-nowrap py-2 px-7 border border-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr
                  key={car._id}
                  className="border-t border-gray-600 hover:bg-gray-800 transition"
                >
                  <td className="py-2 px-4 border border-gray-600">
                    <img
                      src={car.images?.[0] || "https://via.placeholder.com/100"}
                      alt={car.brand}
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.brand}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.model}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.year}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.fuelType}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    ${car.pricePerDay}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.transmission}
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    <CarCountdown availableUntil={car.availableUntil} />
                  </td>
                  <td className="py-2 px-4 border border-gray-600">
                    {car.isApproved ? (
                      <span className="text-green-400">Approved</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
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

export default CarOwnerDashboard;
