import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../redux/slices/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.admin);
  useEffect(() => {
    console.log("heloo users", users);
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [dispatch, user]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    console.log(formData); // Add this before dispatch(addUser(formData));

    e.preventDefault();
    // reset the from after submission
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };
  const handleRoleChange = (userId, newRole) => {
    dispatch(updateUser({ id: userId, role: newRole }));
  };
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {/* Add ne user form */}
      {loading && <p>Loading...</p>}
      {error && <p>Error:{error}</p>}
      <div className=" p-6 rounded-lg mb-6 ">
        <h3 className="text-lg font-bold mb-4 ">Add new user</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              name="name"
              value={formData.name}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              className="w-full p-2 border rounded "
            />
          </div>
          <div className="mb-4 ">
            <label className="block text-gray-700 ">Role</label>
            <select
              name="role"
              onChange={handleChange}
              value={formData.role}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add user
          </button>
        </form>
      </div>
      {/* User List Managemnet */}
      <div className="overflow-x-auto shadow-md  sm:rounded-lg ">
        <table className="min-w-full text-left text-gray-500 ">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4 ">Name</th>
              <th className="py-3 px-4 ">Email</th>
              <th className="py-3 px-4 ">Role</th>
              <th className="py-3 px-4 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4 ">{user.email}</td>
                <td className="p-4">
                  <select
                    className="p-2  border rounded"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4 ">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
