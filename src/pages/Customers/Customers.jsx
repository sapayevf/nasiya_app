import { CiSearch } from "react-icons/ci";
import "./Customers.scss";
import { Input } from "antd";
import { IoFilter } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchDebtors } from "../../hooks/useDebtor";

const Customers = () => {
  const [debtors, setDebtors] = useState([]);
  const [like, setLike] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDebtors = async () => {
      try {
        const data = await fetchDebtors();
        if (Array.isArray(data)) {
          setDebtors(data);
        } else {
          setDebtors([]);
        }
      } catch (error) {
        console.error("Mijozlarni olishda xatolik:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getDebtors();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi: {error.message}</p>;

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
        {debtors.length > 0 ? (
          debtors.map((debtor) => (
            <div key={debtor.id} className="people">
              <h2>{debtor.name}</h2>
              <p>{debtor.phone}</p> <br />
              <p style={{ fontWeight: "600" }}>Jami nasiya:</p>
              <p className="qarz">{debtor.debt} so‘m</p>
              <FaStar
                size={25}
                color={like[debtor.id] ? "orange" : "gray"}
                onClick={() =>
                  setLike((prev) => ({
                    ...prev,
                    [debtor.id]: !prev[debtor.id],
                  }))
                }
                className="star"
              />
            </div>
          ))
        ) : (
          <p>Hozircha hech qanday ma'lumot yo‘q</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
