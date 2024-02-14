import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Content from "../content";
import Header from "../header";

import "./index.scss";

function Layout() {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const currentUser = sessionStorage.getItem("user");
      if (!currentUser) {
       navigate("/login")
      }
      setUser(currentUser);
    };

    checkUser();
  }, []); 

  return (
    <div className="container-layout">
      <Header />
      <Content />
    </div>
  );
}

export default Layout;
