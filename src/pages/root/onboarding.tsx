import { useUserContext } from "@components/AuthContext";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user } = useUserContext();

  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const isAdmin = user.email === import.meta.env.VITE_ADMIN_EMAIL_ADDRESS;

  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    location: "",
    contact: "",
  });

  const endPoint = import.meta.env.VITE_BACKEND_ADDRESS;

  useEffect(() => {
    if (!userId || isAdmin) {
      navigate("/");
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (user.role) {
      navigate("/");
    }
  }, [user]);

  const handleOnboarding = async () => {
    if (!role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${endPoint}/auth/user/update_user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate(`/dashboard/${userId}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      setError("An error occurred while completing onboarding.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${endPoint}/root/business/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessData,
          userId,
          role,
        }),
      });

      const data = await response.json();
      if (!data.business) return setError(data.message);

      if (response.ok) {
        window.location.replace(`/dashboard/${userId}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Onboarding error:", error);
      setError("An error occurred while completing onboarding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4 text-white">
          Select Your Role
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="flex flex-col gap-4">
          <button
            className={`p-3 rounded-md ${
              role === "carOwner"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-white"
            }`}
            onClick={() => setRole("carOwner")}
          >
            🚗 I am a Car Owner
          </button>

          <button
            className={`p-3 rounded-md ${
              role === "business"
                ? "bg-blue-500 text-white"
                : "bg-gray-600 text-white"
            }`}
            onClick={() => setRole("business")}
          >
            🏢 I am a Company
          </button>
        </div>

        {role === "business" && (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={businessData.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                placeholder="Enter your business name"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={businessData.description}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                placeholder="Enter a description for your business"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={businessData.location}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                placeholder="Enter your business location"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={businessData.contact}
                onChange={handleChange}
                className="w-full p-2 mt-1 border rounded-md bg-gray-700 text-white"
                placeholder="Enter your contact number"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 mt-2 bg-blue-600 text-white rounded-md"
              >
                {loading ? "Processing..." : "Submit"}
              </button>
            </div>
          </form>
        )}

        {role === "carOwner" && (
          <button
            onClick={handleOnboarding}
            disabled={loading}
            className="w-full p-3 mt-6 bg-green-500 text-white rounded-md"
          >
            {loading ? "Processing..." : "Continue"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
