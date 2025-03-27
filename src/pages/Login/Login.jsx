import "./Login.scss";
import logo from "../../assets/favicon.svg";
import { useState } from "react";
import { Button, Input } from "antd";
import {
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import logoIcon from "../../assets/login-icon.png";
import passIcon from "../../assets/password-icon.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <div>
        <img width={50} src={logo} alt="Logo" />
        <br />
        <br />
        <h2>Dasturga kirish</h2>
        <br />

        <p>Iltimos, tizimga kirish uchun login va parolingizni kiriting.</p>
        <br />

        <div className="inputs">
          <Input
            style={{ padding: "12px" }}
            placeholder="Login"
            prefix={<img src={logoIcon} alt="" />}
            className="input"
          />

          <Input.Password
            style={{ padding: "12px" }}
            placeholder="Parol"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            prefix={<img src={passIcon} alt="" />}
            className="input"
          />
          <br />
        </div>
        <p style={{ color: "#3478F7", textAlign: "right" }}>Parolni unutdingizmi?</p>
        <br />

        <Button
          type="primary"
          succses
          style={{ width: "100%", padding: "22px", borderRadius: "14px" }}
        >
          Kirish
        </Button>
      </div>
    </div>
  );
};

export default Login;
