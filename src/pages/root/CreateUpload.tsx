import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useNavigate, useParams } from "react-router-dom";
import { endPoint } from "@components/AuthContext";
const CreateUpload = () => {
  const { userId, role } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    images: [] as File[],
    description: "",
    availableUntil: "",
    userId: userId,
    role: role,
    isApproved: false,
    isRentedByBusiness: false,
    location: "",
    insuranceUrl: "",
    insuranceFile: null,
    yellowCardUrl: "",
    yellowCardFile: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleInsuranceFile = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      insuranceFile: file,
      insuranceUrl: URL.createObjectURL(file),
    }));
  };
  const handleYellowCaFile = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      yellowCardFile: file,
      yellowCardUrl: URL.createObjectURL(file),
    }));
  };

  const handleImagesChange = (files: File[]) => {
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Final API URL:", `${endPoint}/root/cars/create`);

    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        (value as File[]).forEach((file) => form.append("images", file));
      } else if (key === "location") {
        // Ensure location is sent as a string
        form.append(
          "location",
          Array.isArray(value) ? value.join(", ") : String(value)
        );
      } else {
        form.append(key, String(value));
      }
    });

    if (formData.insuranceFile) {
      form.append("insuranceFile", formData.insuranceFile);
    }

    if (formData.yellowCardFile) {
      form.append("yellowCardFile", formData.yellowCardFile);
    }

    try {
      const response = await fetch(`${endPoint}/root/cars/create`, {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      if (!data.car) return setError(data.message);
      navigate(`/dashboard/${userId}`);
    } catch (error) {
      console.error("Error uploading car:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg overflow-hidden">
      {" "}
      {/* Modernized container */}
      <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
        {" "}
        {/* Slightly smaller heading */}
        Upload a Car
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {" "}
        {/* Reduced spacing */}
        {/* Input fields - shared styling */}
        {["brand", "model", "year", "pricePerDay"].map((field) => (
          <input
            key={field}
            type={
              field === "year" || field === "pricePerDay" ? "number" : "text"
            }
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalized placeholder
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            onChange={handleChange}
            required
          />
        ))}
        {/* Image Upload */}
        <ImageUpload onImagesChange={handleImagesChange} />
        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 h-24 resize-none" // Added resize-none
          onChange={handleChange}
          required
        ></textarea>
        {/* Date and Selects - shared styling */}
        {["availableUntil", "transmission", "fuelType"].map((field) => (
          <div key={field} className="relative">
            {" "}
            {/* For icon positioning */}
            {field === "availableUntil" ? (
              <input
                type="datetime-local"
                name={field}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                onChange={handleChange}
                required
              />
            ) : (
              <select
                name={field}
                className="w-full p-3 border border-gray-300 rounded-md appearance-none pr-8 focus:ring-2 focus:ring-blue-500 transition-all duration-300" // Added appearance-none and padding
                onChange={handleChange}
                required
              >
                <option value="">
                  Select {field.charAt(0).toUpperCase() + field.slice(1)}
                </option>
                {field === "transmission" ? (
                  <>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </>
                ) : (
                  <>
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </>
                )}
              </select>
            )}
            {/* Optional Icon (e.g., down arrow for selects) */}
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
        <div>
          <input
            type="location"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
          />
        </div>
        {/* Insurance */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Insurance
          </label>{" "}
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
            onChange={handleInsuranceFile}
          />
          {formData.insuranceUrl && (
            <img
              src={formData.insuranceUrl}
              alt="User Image"
              className="w-1/2 h-32 rounded-lg object-cover mt-2 mx-2"
            />
          )}
        </div>
        {/* Yellow card */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Yellow card
          </label>{" "}
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            required
            onChange={handleYellowCaFile}
          />
          {formData.yellowCardUrl && (
            <img
              src={formData.yellowCardUrl}
              alt="User Image"
              className="w-1/2 h-32 rounded-lg object-cover mt-2 mx-2"
            />
          )}
        </div>
        {error && (
          <div className="w-full text-white text-xl py-10 text-center bg-red-700">
            {error}
          </div>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-medium transition-all duration-300" // Simplified button styling
        >
          {loading ? "Uploading..." : "Upload Car"}
        </button>
      </form>
    </div>
  );
};

export default CreateUpload;
