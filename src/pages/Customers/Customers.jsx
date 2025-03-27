import { CiSearch } from "react-icons/ci";
import "./Customers.scss";
import { Input } from "antd";
import { IoFilter } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { useState } from "react";

const Customers = () => {
  const [like, setLike] = useState("");

  return (
    <div className="customers">
      <header>
        <Input
          style={{ padding: "12px", borderRadius: "20px" }}
          placeholder="Mijozlarni qidirish..."
          prefix={<CiSearch size={30} />}
          className="input"
        />
        <IoFilter size={35} />
      </header>
      <div className="peoples">
        <div className="people">
          <h2>Rahmatulloh Madraximov</h2>
          <p>+998 91 123 45 67</p> <br />
          <p style={{ fontWeight: "600" }}>Jami nasiya:</p>
          <p className="qarz">-800 000 so‘m</p>
          <FaRegStar size={25} color={like} onClick={() => setLike("orange")} className="star" />
        </div>
      </div>
    </div>
  );
};

export default Customers;
