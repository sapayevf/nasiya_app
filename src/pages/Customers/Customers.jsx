import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { Button, Input } from "antd";
import useDebtor from "../../hooks/useDebtor";
import "./Customers.scss";

const Customers = () => {
  const { debtors, loading, error } = useDebtor();
  const [like, setLike] = useState({});

  if (loading) return <p className="loading">Yuklanmoqda...</p>;
  if (error) return <p className="error">Xatolik yuz berdi: {error.message}</p>;

  return (
    <div className="customers">
      <header className="customers__header">
        <Input
          className="customers__search-input"
          placeholder="Mijozlarni qidirish..."
          prefix={<CiSearch size={24} />}
        />
        <Button type="primary" className="customers__add-btn">
          + Yangi mijoz
        </Button>
      </header>
      <div className="customers__list">
        {debtors.length > 0 ? (
          debtors.map((debtor) => (
            <div key={debtor.id} className="customer-card">
              <div className="customer-card__info">
                <h2 className="customer-card__name">{debtor.name}</h2>
                <p className="customer-card__phone">{debtor.phone}</p>
                <p className="customer-card__debt">{debtor.debt} so‘m</p>
              </div>
              <div className="customer-card__actions">
                <FaStar
                  size={24}
                  className={`customer-card__star ${
                    like[debtor.id] ? "active" : ""
                  }`}
                  onClick={() =>
                    setLike((prev) => ({
                      ...prev,
                      [debtor.id]: !prev[debtor.id],
                    }))
                  }
                />
                <Button danger>O‘chirish</Button>
              </div>
            </div>
          ))
        ) : (
          <p className="customers__empty">Hozircha mijozlar yo‘q</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
