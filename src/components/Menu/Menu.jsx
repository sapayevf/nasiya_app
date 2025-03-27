import "./Menu.scss";
import { FaFile, FaUserFriends } from "react-icons/fa";
import { IoMdHome, IoMdSettings } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/" className="item">
        <IoMdHome size={30} color="gray" />
        Asosiy
      </NavLink>
      <NavLink to="/customers" className="item">
        <FaUserFriends size={30} color="gray" />
        Mijozlar
      </NavLink>
      <NavLink className="item">
        <FaFile size={30} color="gray" />
        Hisobot
      </NavLink>
      <NavLink className="item">
        <IoMdSettings size={30} color="gray" />
        Sozlama
      </NavLink>
    </div>
  );
};

export default Menu;
