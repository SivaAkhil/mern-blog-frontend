// import React from "react";
// import { Sidebar } from "flowbite-react";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// import {
//   HiUser,
//   HiArrowSmRight,
//   HiDocumentText,
//   HiOutlineUserGroup,
//   HiAnnotation,
//   HiChartPie,
// } from 'react-icons/hi';
// import './styles/DashSidebar.css'

// export default function DashSidebar() {
//   const location = useLocation();
//   const [tab, setTab] = useState("");
//   useEffect(() => {
//     const urlParams = new URLSearchParams(location.search);
//     const tabFromUrl = urlParams.get("tab");
//     if (tabFromUrl) {
//       setTab(tabFromUrl);
//     }
//   }, [location.search]);
//   return (
//     <Sidebar className="sidbar-main-container">
//       <Sidebar.Items>
//         <Sidebar.ItemGroup className="item-group">
//           <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'}  className='item'>
//             Profile
//           </Sidebar.Item>
//           <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer item'>
//             sign out
//           </Sidebar.Item>
//         </Sidebar.ItemGroup>
//       </Sidebar.Items>
//     </Sidebar>
//   );
// }

import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import "./styles/DashSidebar.css";
import { signoutSuccess } from "../redux/user/userSlice";
import {useDispatch } from "react-redux";
import { useSelector } from 'react-redux';


export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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
    // <Sidebar className="sidebar-content w-full md:w-56">
    //   <Sidebar.Items>
    //     <Sidebar.ItemGroup className="item-group">
    //       <Link to="/dashboard?tab=profile">
    //         <Sidebar.Item
    //           icon={HiUser}
    //           label={"User"}
    //           active={tab === "profile"}
    //           className={`item ${tab === "profile" ? "active" : ""}`}
    //         >
    //           Profile
    //         </Sidebar.Item>
    //       </Link>
    //       <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer item">
    //         Sign Out
    //       </Sidebar.Item>
    //     </Sidebar.ItemGroup>
    //   </Sidebar.Items>
    // </Sidebar>
    <Sidebar className="sidebar-content w-full md:w-56">
  <Sidebar.Items>
    <Sidebar.ItemGroup className="item-group">
      {/* <Sidebar.Item
        icon={HiUser}
        label={"User"}
        active={tab === "profile"}
        className={`item ${tab === "profile" ? "active" : ""}`}
        onClick={() => history.push("/dashboard?tab=profile")}
      >
        Profile
      </Sidebar.Item> */}
       <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              className={`item ${tab === "profile" ? "active" : ""}`}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                className={`item ${tab === "posts" ? "active" : ""}`}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  className={`item ${tab === "users" ? "active" : ""}`}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              {/* <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link> */}
            </>
          )}
      <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignout} className="cursor-pointer item">
        Sign Out
      </Sidebar.Item>
    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>

  );
}
