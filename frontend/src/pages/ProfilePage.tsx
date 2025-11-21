import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <div className="text-center mt-20">Please login first.</div>;

  // DELETE ACCOUNT
//   const handleDelete = async () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account? This action cannot be undone."
//     );
//     if (!confirmDelete) return;

//     try {
//       await api.delete(`/users/${user.id}`);
//       localStorage.removeItem("access_token");
//       navigate("/login");
//     } catch (err) {
//       alert("Failed to delete account.");
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      {/* PAGE HEADER */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800">Profile</h1>
        <p className="text-gray-500 mt-1">
          Manage your personal information, payment settings, and security.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto mt-10 space-y-8">

        {/* TOP PROFILE SUMMARY */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center gap-6">

            {/* AVATAR */}
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-600">
              {user.full_name[0].toUpperCase()}
            </div>

            {/* NAME + EMAIL */}
            <div>
              <h2 className="text-xl font-medium text-gray-900">{user.full_name}</h2>
              <p className="text-gray-600">{user.email}</p>

              <button
                onClick={() => navigate("/update-profile")}
                className="mt-3 text-blue-600 hover:underline text-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </section>

        {/* PERSONAL INFORMATION SECTION */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="text-gray-800 font-medium mt-1">{user.full_name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email Address</p>
              <p className="text-gray-800 font-medium mt-1">{user.email}</p>
            </div>
          </div>
        </section>

        {/* PAYMENT SECTION */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>

          <p className="text-gray-500 text-sm mb-1">UPI / VPA</p>
          <p className="text-gray-800 font-medium mb-3">
            {user.vpa_address || "Not added"}
          </p>

          <button
            onClick={() => navigate("/add-payment-method")}
            className="text-blue-600 hover:underline text-sm"
          >
            Add / Update Payment Method
          </button>
        </section>

        {/* DANGER ZONE */}
        <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>

          <p className="text-gray-600 mb-3">
            Permanently delete your account. This action cannot be undone.
          </p>

          {/* <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Delete Account
          </button> */}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
