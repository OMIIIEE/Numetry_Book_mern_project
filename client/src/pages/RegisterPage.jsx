import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    reEnterPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formValid, setFormValid] = useState(false); // New state variable

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validateForm = () => {
    const { name, username, email, phone, password, reEnterPassword } = user;
    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Full Name is required";
      isValid = false;
    } else if (name.length < 3) {
      formErrors.name = "Name must be between 3 and 15 characters";
      isValid = false;
    }

    if (!username.trim()) {
      formErrors.username = "User Name is required";
      isValid = false;
    } else if (username.length < 3) {
      formErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      formErrors.email = "Email address is invalid";
      isValid = false;
    }
    if (!phone) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(phone)) {
      formErrors.phone = "Phone number is invalid";
      isValid = false;
    }
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (password !== reEnterPassword) {
      formErrors.reEnterPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    let errorsTemp = { ...errors };

    switch (name) {
      case "name":
        if (!/^[a-zA-Z ]+$/.test(value)) {
          errorsTemp.name = "Name must contain only letters and spaces";
        } else if (!value.trim()) {
          errorsTemp.name = "Name is required";
        } else {
          errorsTemp.name =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Name must be between 3 and 15 characters";
        }
        break;

      case "username":
        if (!/^\S+$/.test(value)) {
          errorsTemp.username = "Username cannot contain spaces";
        } else {
          errorsTemp.username =
            value.length >= 3 && value.length <= 15
              ? ""
              : "Username must be between 3 and 15 characters";
        }
        break;

      case "email":
        errorsTemp.email = validateEmail(value) ? "" : "Invalid email format";
        break;
      case "phone":
        if (!/^[7-9]/.test(value)) {
          errorsTemp.phone = "Invalid phone Number format ";
        } else {
          errorsTemp.phone = validatePhone(value)
            ? ""
            : "Phone number is invalid";
        }
        break;
      case "password":
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/.test(value)) {
          errorsTemp.password =
            "Password must contain at least one number, one special character, one uppercase character, one lowercase character, and be at least 8 characters long";
        } else {
          errorsTemp.password = "";
        }
      case "reEnterPassword":
        errorsTemp.reEnterPassword =
          value === user.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }
    setErrors(errorsTemp);
  };

  useEffect(() => {
    // Check if there are any errors
    const isValid = Object.values(errors).every((error) => error === "");
    // Update form validity state
    setFormValid(isValid);
  }, [errors]);

  

  const register = async (e) => {
    e.preventDefault();
    const { name, username, email, phone, password, reEnterPassword } = user;
    if (validateForm()) {
    try {
      // const role = email.endsWith("numetry.com") ? "admin" : "user";
      const res = await axios.post("http://localhost:9003/api/auth/register", {
        ...user,  
      });
      console.log(res);
      // sendPhoneOtp();
      alert(res.data.message);

      if (res.data.success) {
        // sendPhoneOtp();
        navigate("/login");
        // sendPhoneOtp();
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
    }
  };

  return (
    <div className="w-full items-center justify-center">
      <section className="flex justify-center items-center h-3/4 p-12">
        <div className="container mx-auto flex justify-center items-center w-full">
          {/* <div className="flex  shadow-lg w-3/4"> */}
          {/* <div className="w-3/5 flex items-center justify-center">
              <img
                src={loginImg}
                alt="login"
                className="w-4/5 object-contain h-3/4"
              />
            </div> */}
          <div className="login_form p-8 bg-[#5AB2FF] relative w-2/4 flex flex-col justify-center h-auto overflow-y-auto">
            <div className="user h-20 absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

            <h2 className="text-center mb-6 text-7xl text-white font-comforter">
              Register
            </h2>
            <Form onSubmit={register} className="flex gap-4 flex-col">
              <FormGroup>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  placeholder="Enter your Full Name"
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.name && <p className="text-red-700">{errors.name}</p>}
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.username && (
                  <p className="text-red-700">{errors.username}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.email && <p className="text-red-700">{errors.email}</p>}
              </FormGroup>

              <FormGroup>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  placeholder="Enter your Phone No."
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.phone && <p className="text-red-700">{errors.phone}</p>}
              </FormGroup>

              <FormGroup>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.password && (
                  <p className="text-red-700 text-sm">{errors.password}</p>
                )}
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  name="reEnterPassword"
                  value={user.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your Password"
                  className="w-full p-2.5 rounded-lg border-none text-base"
                />
                {errors.reEnterPassword && (
                  <p className="text-red-700">{errors.reEnterPassword}</p>
                )}
              </FormGroup>

              <Button
                className="inline-block px-6 py-1 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:bg-transparent hover:text-white transition-colors duration-300"
                type="submit"
                color="success"
              >
                Register
              </Button>
            </Form>

            <p className="text-white text-center mt-4">
              Already have an account?
              <Link to="/login" className="text-[#FFFF80]">
                Login
              </Link>
            </p>
            {/* </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
