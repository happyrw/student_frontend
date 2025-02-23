import { endPoint } from "@components/AuthContext";
import CarCountdown from "@components/CarCountdown";
import { Button } from "@components/components/ui/button";
import { Check, Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export interface ICar {
  availableUntil: string;
  brand: string;
  businessId: string;
  createdAt: string;
  description: string;
  fuelType: string;
  images: string[];
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

const CarOwnerDashboard = ({
  cars,
  setCars,
}: {
  cars: ICar[];
  setCars: any;
}) => {
  const [carForDetail, setCarForDetail] = useState<ICar>();
  const [addTime, setAddTime] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [availableUntil, setAvailableUntil] = useState<string>();
  const [showType, setShowType] = useState("car");
  const [orders, setOrders] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleCarClick = (carId: string) => {
    const car = cars.find((c: ICar) => c._id === carId);
    setCarForDetail(car);
  };

  const handleAddTime = async () => {
    try {
      setSaving(true);
      const formattedAvailableUntil = new Date(
        availableUntil as string
      ).toISOString();

      const response = await fetch(
        `${endPoint}/root/cars/update/${carForDetail?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ availableUntil: formattedAvailableUntil }),
        }
      );

      const data = await response.json();
      if (data) {
        const updatedCar = cars.map((car) =>
          car._id === carForDetail?._id
            ? { ...car, availableUntil: availableUntil }
            : car
        );
        setCars(updatedCar);
      }
      alert("Time added successfully");
      setCarForDetail(undefined);
    } catch (error) {
      alert("Try again");
      console.error("Error adding time:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleAction = async (orderId: string, action: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${endPoint}/root/orders/update/${orderId}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        const updatedOrders = orders.map((order: any) =>
          order._id === orderId ? { ...order, status: action } : order
        );
        setOrders(updatedOrders);
      }
      console.log(`Action: ${action} for carId: ${orderId}`);

      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch car orders from the backend
  const getCarOrders = async () => {
    const response = await fetch(`${endPoint}/root/orders/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    getCarOrders();
  }, []);
  console.log("orders", orders);

  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Cars</h2>

      <div className="flex items-center gap-2 mb-2">
        <Button
          onClick={() => setShowType("car")}
          className={`w-full bg-slate-700 ${
            showType === "car" && "border-2 border-white"
          }`}
        >
          Cars
        </Button>
        <Button
          onClick={() => setShowType("order")}
          className={`w-full bg-blue-700 ${
            showType === "order" && "border-2 border-white"
          }`}
        >
          Business Orders
        </Button>
      </div>

      <div>
        {showType === "car" && (
          <div>
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
                            src={
                              car.images?.[0] ||
                              "https://via.placeholder.com/100"
                            }
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
                          <div className="flex items-center gap-2">
                            ${car.pricePerDay}{" "}
                            <button
                              onClick={() => handleCarClick(car._id)}
                              className="text-black bg-white w-full flex items-center justify-center rounded-md"
                            >
                              <Eye />
                            </button>
                          </div>
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
        )}
      </div>

      {showType === "order" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Business Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md">
                <thead>
                  <tr className="text-left bg-gray-700 text-white">
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      Company
                    </th>
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      Location
                    </th>
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      Start Date
                    </th>
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      End Date
                    </th>
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      Status
                    </th>
                    <th className="text-nowrap py-2 px-7 border border-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr
                      key={order._id}
                      className="border-t border-gray-600 hover:bg-gray-800 transition"
                    >
                      <td className="py-2 px-4 border border-gray-600">
                        {order.businessId.name}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        {order.businessId.location}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        {new Date(order.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        {new Date(order.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        {order.status}
                      </td>
                      <td className="py-2 px-4 border border-gray-600">
                        <div className="flex items-center gap-2">
                          {order.status === "Confirmed" ||
                          order.status === "Cancelled" ? (
                            <button className="flex items-center bg-blue-700 w-full justify-center gap-4 rounded-md py-2">
                              Done <Check />
                            </button>
                          ) : (
                            <>
                              <button
                                disabled={loading}
                                onClick={() =>
                                  handleAction(order._id, "Confirmed")
                                }
                                className="bg-gray-700 text-white py-1 px-3 rounded-md"
                                value="confirm"
                              >
                                {loading ? "Confirm..." : "Confirm"}
                              </button>
                              <button
                                disabled={loading}
                                onClick={() =>
                                  handleAction(order._id, "Cancelled")
                                }
                                className="bg-red-700 text-white py-1 px-3 rounded-md"
                                value="cancel"
                              >
                                {loading ? "Cancel..." : "Cancel"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* POPUP FOR DETAILS */}
      {carForDetail && (
        <div className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setCarForDetail(undefined)}
              className="absolute top-3 right-3 text-white px-4 py-2 rounded-full text-sm font-medium bg-red-700 hover:bg-red-900 transition"
            >
              Close
            </button>

            {/* Car Details */}
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Car Details
            </h3>
            {/* Car Image */}
            <div className="flex items-center justify-between gap-5">
              {carForDetail.images && (
                <img
                  src={carForDetail.images[0]}
                  alt={carForDetail.model}
                  className="mt-4 w-1/2 h-48 object-cover rounded-lg shadow"
                />
              )}
              {carForDetail.images && (
                <img
                  src={carForDetail.images[1]}
                  alt={carForDetail.model}
                  className="mt-4 w-1/2 h-48 object-cover rounded-lg shadow"
                />
              )}
            </div>
            <div className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Brand:</strong>{" "}
                {carForDetail.brand}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Model:</strong>{" "}
                {carForDetail.model}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Year:</strong>{" "}
                {carForDetail.year}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Price per Day:</strong> $
                {carForDetail.pricePerDay}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Fuel Type:</strong>{" "}
                {carForDetail.fuelType}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Transmission:</strong>{" "}
                {carForDetail.transmission}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Description:</strong>{" "}
                {carForDetail.description}
              </p>
              {/* TIME INPUT */}
              {addTime ? (
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="date"
                    className="w-full text-black border border-gray-300 rounded-md p-2 focus:outline-none"
                    placeholder="Enter available until"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                  />
                  <Button disabled={saving} onClick={handleAddTime}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-black">
                    <strong className="text-gray-900">Available Until:</strong>
                    <CarCountdown
                      availableUntil={carForDetail.availableUntil}
                    />
                  </p>
                  <Button onClick={() => setAddTime(true)}>
                    <Plus />
                  </Button>
                </div>
              )}
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">Is Approved:</strong>{" "}
                {carForDetail.isApproved ? "Yes" : "No"}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <strong className="text-gray-900">
                  Is Rented By Business:
                </strong>{" "}
                {carForDetail.isRentedByBusiness ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarOwnerDashboard;
