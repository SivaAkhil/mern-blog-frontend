



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";

import "./styles/Header.css";

import { signoutSuccess } from "../redux/user/userSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const location = useLocation();
  const path = location.pathname;
  const { currentUser } = useSelector((state) => state.user);
  console.log("Current pathname:", path);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="navbar-container">
      <Link to="/" className="custom-link">
        <span className="custom-span">Ankita's</span>
      </Link>
      <form className="search-form">
        <TextInput
          type="text"
          placeholder="Search..."
          className="hidden lg:inline"
        />
      </form>
        {/* <Button className="custom-button" color="gray">
          <AiOutlineSearch size={22} />
        </Button> */}

      <div className={`navbar-collapse-links ${isOpen ? "open" : ""}`}>
        <Link className={`links ${path === "/" ? "active" : ""}`} to="/">
          Home
        </Link>
        <Link
          className={`links ${path === "/about" ? "active" : ""}`}
          to="/about"
        >
          About
        </Link>
        <Link
          className={`links ${path === "/projects" ? "active" : ""}`}
          to="/projects"
        >
          Projects
        </Link>
      </div>

      <div className="change-signin">
        {/* <Button className="change-btn" onClick={handleToggle}>
          <FaMoon className="moon" />
        </Button> */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} />}
            className="dropdown-menu"
          >
            <Dropdown.Header className="username-dropdown">
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item className="username-dropdown">
                Profile
              </Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-up">
            <Button className="sign-in-btn">Sign In</Button>
          </Link>
        )}
      </div>
      {/* <Navbar.Toggle /> */}
    </Navbar>
  );
};

export default Header;

