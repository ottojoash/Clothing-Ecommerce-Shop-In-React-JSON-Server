import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/profile/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUserFormData({
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        adress: data.adress,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.message);
    }
  };

  useEffect(() => {
    if (loginState) {
      getUserData();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, [loginState, navigate]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const getResponse = await fetch(`https://backendshop-5bmm.onrender.com/api/users/profile/${id}`);
      if (!getResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const userObj = await getResponse.json();

      const putResponse = await fetch(`https://backendshop-5bmm.onrender.com/api/users/profile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          name: userFormData.name,
          lastname: userFormData.lastname,
          email: userFormData.email,
          phone: userFormData.phone,
          adress: userFormData.adress,
          password: userFormData.password,
          userWishlist: userObj.userWishlist,
        }),
      });
      if (!putResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const putData = await putResponse.json();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form className="max-w-7xl mx-auto text-center px-10" onSubmit={updateProfile}>
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => setUserFormData({ ...userFormData, lastname: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Adress</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => setUserFormData({ ...userFormData, adress: e.target.value })}
            />
          </div>

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
            />
          </div>
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;
