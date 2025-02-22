import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import Onboarding from "./pages/root/onboarding";
import { useUserContext } from "@components/AuthContext";
import LoadingComponent from "@components/loadingComponent";
import MainDashboard from "./pages/root/Dashboard/MainDashboard";
import CreateUpload from "./pages/root/CreateUpload";
import HomePage from "./pages/root/HomePage";

export default function Home() {
  const { isLoading } = useUserContext();
  if (isLoading) {
    return <LoadingComponent />;
  }

  // const logOut = () => {
  //   localStorage.removeItem("rental_token");
  //   setUser({
  //     _id: "",
  //     fullname: "",
  //     email: "",
  //     password: "",
  //     imageUrl: "",
  //     role: "",
  //     businessId: "",
  //   });
  //   setIsAuthenticated(false);
  // };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/onboarding/:userId" element={<Onboarding />} />
      <Route path="/dashboard/:userId" element={<MainDashboard />} />
      <Route
        path="/create_upload_rent_your_car/:userId/:role"
        element={<CreateUpload />}
      />
    </Routes>
  );
}
