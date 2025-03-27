import "./Home.scss";
import user from "../../assets/user.png";
import wallet from "../../assets/wallet.svg";
import calendar from "../../assets/calendar.svg";
import { Button, Drawer } from "antd";
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import CalendarComponent from "../../components/Calendar/Calendar";

const Home = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  return (
    <div className="home">
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img width={60} src={user} alt="" />
          <h3>thesapayev</h3>
        </div>
        <Button
          onClick={() => setOpenCalendar(true)}
          style={{
            padding: "6px",
            width: "50px",
            height: "50px",
            borderRadius: "14px",
          }}
        >
          <img width={35} src={calendar} alt="" />
        </Button>
      </header>

      <div className="balans">
        <div>
          <h2 style={{ color: "white" }}>
            {showBalance ? "135 214 200 so'm" : "******"}
          </h2>
          <p style={{ textAlign: "center", color: "#F6F6F6" }}>
            Umumiy nasiya:
          </p>
        </div>
        <button className="hide" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? (
            <EyeInvisibleOutlined
              style={{ color: "white", fontSize: "24px" }}
            />
          ) : (
            <EyeOutlined style={{ color: "white", fontSize: "24px" }} />
          )}
        </button>
      </div>
      <div>
        <div className="clients">
          <div className="clients-info">
            <h3>
              Kechiktirilgan <br /> to‘lovlar
            </h3>
            <h5 className="count">26</h5>
          </div>
          <div className="clients-info">
            <h3>
              Mijozlar <br /> soni
            </h3>
            <h5
              className="count"
              style={{
                color: "#30AF49",
              }}
            >
              151
            </h5>
          </div>
        </div>
      </div>
      <div>
        <h2>Hamyoningiz</h2>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div className="wallet">
              <img src={wallet} alt="" />
            </div>
            <div>
              <p>Hisobingizda</p>
              <h2>300 000 so‘m</h2>
            </div>
          </div>
          <button className="add-balans">+</button>
        </div>
      </div>

      <CalendarComponent
        open={openCalendar}
        onClose={() => setOpenCalendar(false)}
      />
    </div>
  );
};

export default Home;
