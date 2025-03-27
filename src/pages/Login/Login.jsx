import "./Login.scss";
import logo from "../../assets/favicon.svg";
import { useState } from "react";
import { Button, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import logoIcon from "../../assets/login-icon.png";
import passIcon from "../../assets/password-icon.svg";
import API from "../../utils/API";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!login || !password) {
      toast.error("Iltimos, login va parolni kiriting!");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/auth/login", {
        login,
        hashed_password: password,
      });

      console.log("Server javobi:", response.data); // 👈 Backenddan kelgan ma'lumotni tekshirish uchun

      const token = response.data?.accessToken || response.data?.token; // Token har xil nom bilan kelishi mumkin

      if (token) {
        localStorage.setItem("token", token);
        console.log("Saqlangan Token:", token);
        toast.success("Tizimga muvaffaqiyatli kirdingiz!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error("Noto‘g‘ri javob! Token olinmadi.");
      }
    } catch (error) {
      console.error("Xatolik:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login yoki parol noto‘g‘ri!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Toaster position="top-right" richColors />
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
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <Input.Password
            style={{ padding: "12px" }}
            placeholder="Parol"
            iconRender={(visible) =>
              visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
            }
            prefix={<img src={passIcon} alt="" />}
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <p style={{ color: "#3478F7", textAlign: "right" }}>
          Parolni unutdingizmi?
        </p>
        <br />
        <Button
          type="primary"
          loading={loading}
          style={{ width: "100%", padding: "22px", borderRadius: "14px" }}
          onClick={handleLogin}
        >
          Kirish
        </Button>
      </div>
    </div>
  );
};

export default Login;
