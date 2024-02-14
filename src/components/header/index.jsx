import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth"; // Firebase Authentication modülü

import { IoIosLogOut } from "react-icons/io";
import { ReactComponent as Logo } from "../../images/definexlogooriginal.svg";
import { ReactComponent as AllianzLogo } from "../../images/allianz-logo.svg";

import "./index.scss";

function Header() {
  const [isLogin, setIslogin] = useState(false);
  const navigate = useNavigate();

  const getUserName = sessionStorage.getItem("user");

  useEffect(() => {
    const getLogin = sessionStorage.getItem("user");
    if (getLogin) {
      setIslogin(true);
    }
  }, []);

  const handleLogoutClick = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      sessionStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed. Error:", error.message);
    }
  };

  return (
    <div className="container-header">
      <div className="responsive-wrapper">
        <div className="container-header__wrapper">
          <div>
            <Logo height={25} width={80} />
            <AllianzLogo height={25} width={80} color="white" />
          </div>
          <div className="container-header__name">
            <div>{getUserName}</div>
            <IoIosLogOut onClick={handleLogoutClick} className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
