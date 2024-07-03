import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import bgimage from '../assets/loginbg.jpg'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    let errorsTemp = { ...errors };

    switch (name) {
      case "email":
        errorsTemp.email = validateEmail(value) ? "" : "Invalid email format";
        break;
      case "password":
        errorsTemp.password =
          value.length >= 6
            ? ""
            : "Password must be at least 6 characters long";
        break;
      default:
        break;
    }
    setErrors(errorsTemp);
  };

  const login = async (e) => {
    e.preventDefault();

    let errorsTemp = {}; 
    if (!validateEmail(user.email)) {
      errorsTemp.email = "Invalid email format";
    }
    if (user.password.length < 6) {
      errorsTemp.password = "Password must be at least 6 characters long";
    }
    setErrors(errorsTemp);

    if (Object.keys(errorsTemp).length === 0) {
      try {
        const res = await axios.post("http://localhost:9004/api/auth/login", user);
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          alert(res.data.message);
          const { role } = res.data;
          if (role === 'admin') {
            navigate("/admin-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error(err);
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
  //   <div className="w-full items-center justify-center" style={{ backgroundImage: 'url(https://cdn.dribbble.com/users/1338391/screenshots/15318231/media/4c725fe4efbaa9d498f39f13600e396a.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
  //   <section className="flex justify-center items-center h-screen p-12">
  //     <Container className="flex justify-center items-center w-full">
  //       <Row>
  //         <Col lg="8" className="m-auto h-full">
  //           <div className="login_container flex shadow-lg h-[60vh] w-[30vw] bg-white bg-opacity-10 backdrop-blur-md border border-opacity-30 rounded-lg">
  //             <div className="login_form p-8   relative w-full flex flex-col justify-center shadow-lg rounded-lg">
  //               <h2 className="text-center mb-8 text-5xl text-pink-600 font-comforter">
  //                 Login
  //               </h2>
  //               <Form onSubmit={login} className="flex gap-4 flex-col">
  //                 <FormGroup>
  //                   <input
  //                     type="text"
  //                     name="email"
  //                     value={user.email}
  //                     onChange={handleChange}
  //                     placeholder="Enter your Email"
  //                     className="w-full p-2.5 rounded-lg border-none text-base focus:outline-none focus:ring-2 focus:ring-[#5AB2FF]"
  //                     required
  //                   />
  //                   <span className="text-red-700">{errors.email}</span>
  //                 </FormGroup>
  //                 <FormGroup>
  //                   <input
  //                     type="password"
  //                     name="password"
  //                     value={user.password}
  //                     onChange={handleChange}
  //                     placeholder="Enter your Password"
  //                     className="w-full p-2.5 rounded-lg border-none text-base focus:outline-none focus:ring-2 focus:ring-[#5AB2FF]"
  //                     required
  //                   />
  //                   {errors.password && <p className="text-red-700">{errors.password}</p>}
  //                 </FormGroup>
  //                 <Button
  //                   className="inline-block px-6 py-1 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:bg-transparent hover:text-white transition-colors duration-300"
  //                   type="submit"
  //                 >
  //                   Login
  //                 </Button>
  //               </Form>
  //               <p className="text-white text-center mt-4">
  //                 Don't have an account?{" "}
  //                 <Link to="/register" className="text-[#FFFF80]">
  //                   Create
  //                 </Link>
  //               </p>
  //             </div>
  //           </div>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </section>
  // </div>

  <div className="w-full items-center justify-center" style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
  <section className="flex justify-center items-center h-screen p-12">
    <Container className="flex justify-center items-center w-full">
      <Row>
        <Col lg="8" className="m-auto h-full">
          <div className=" flex shadow-2xl h-[60vh] w-[30vw] backdrop-blur-sm bg-white bg-opacity-20  rounded-lg">
            <div className="login_form p-8  relative w-full flex flex-col justify-center shadow-lg rounded-lg">
              <h2 className="text-center font-medium antialiased mb-4 text-6xl text-purple-800 font-comforter">
                Login
              </h2>
              <Form onSubmit={login} className="flex gap-4 flex-col">
                <FormGroup className="relative pt-4 mb-6 flex flex-col">
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100   placeholder-purple-900"
                    required
                  />
                  {errors.email && <span className="text-red-700 mt-2">{errors.email}</span>}
                </FormGroup>
                <FormGroup className="relative pt-4 mb-6 flex flex-col">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    className="w-full p-1.5 border-b-2 border-black bg-transparent outline-none transition-all duration-100 text-black  placeholder-purple-900"
                    required
                  />
                  {errors.password && <span className="text-red-700 mt-2">{errors.password}</span>}
                </FormGroup>
                <Button
                  className="inline-block px-6 py-1  text-purple-800 font-medium border-2 border-black rounded hover:bg-purple-800 hover:text-white transition-colors duration-300"
                  type="submit"
                >
                  Login
                </Button>
              </Form>
              <p className="text-black text-center mt-4">
                Don't have an account? 
                <Link to="/register" className="text-lg font-semibold text-purple-600">
                   Create
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
</div>
  );
};

export default Login;
