// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import api from "../lib/axios";
// import toast from "react-hot-toast";

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/auth/register", formData);
//       localStorage.setItem("token", res.data.token);
//       toast.success("Registration successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-base-200">
//       <div className="card p-8 bg-base-100 shadow-lg max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="input input-bordered w-full"
//             onChange={handleChange}
//             required
//           />
//           <button className="btn btn-primary w-full">Register</button>
//         </form>
//         <p className="text-center mt-4 text-sm">
//           Already have an account? <Link to="/login" className="text-primary">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";


const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await api.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card p-8 bg-base-100 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
