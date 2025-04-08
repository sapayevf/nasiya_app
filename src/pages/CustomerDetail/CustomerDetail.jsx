import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Button, Modal, message, Dropdown } from "antd";
import {
  ArrowLeftOutlined,
  StarFilled,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDebtor } from "../../hooks/useDebtor";
import AddDebtModal from "../../components/AddDebtModal";
import dayjs from "dayjs";
import "./CustomerDetail.scss";

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { useDebtorById, deleteDebtor } = useDebtor();
  const { data: debtor, isLoading: loading, error } = useDebtorById(id);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

  const calculateTotalDebt = (debts = []) => {
    return debts.reduce((sum, debt) => {
      const debtSum = parseFloat(debt.debt_sum) || 0;
      return sum + debtSum;
    }, 0);
  };

  const menuItems = [
    {
      key: "edit",
      label: "Tahrirlash",
    },
    {
      key: "delete",
      label: "O'chirish",
      danger: true,
    },
  ];

  if (loading) {
    return (
      <div className="customer-detail__loading">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="customer-detail__error">
        <p>{error.message}</p>
        <Button onClick={() => navigate("/customers")}>Orqaga</Button>
      </div>
    );
  }

  return (
    <div className="customer-detail">
      <div className="customer-detail__header">
        <button className="back-button" onClick={() => navigate("/customers")}>
          <ArrowLeftOutlined />
          <span>{debtor?.full_name || "Mijoz"}</span>
        </button>
        <div className="actions">
          <StarFilled className="favorite-icon" />
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <MoreOutlined className="more-icon" />
          </Dropdown>
        </div>
      </div>

      {debtor && (
        <>
          <div className="customer-detail__summary">
            <div className="total-debt">
              <div className="total-debt__label">Umumiy nasiya:</div>
              <div
                className={`total-debt__amount ${
                  calculateTotalDebt(debtor.debts) === 0 ? "zero" : ""
                }`}
              >
                {calculateTotalDebt(debtor.debts).toLocaleString()} so'm
              </div>
            </div>
            {debtor.debts && debtor.debts.length === 0 && (
              <div className="empty-state">Mijozda hali nasiya mavjud emas</div>
            )}
          </div>

          {debtor.debts && debtor.debts.length > 0 && (
            <div className="customer-detail__debts">
              <h3 className="section-title">Faol nasiyalar</h3>
              {debtor.debts.map((debt) => (
                <div key={debt.id || Math.random()} className="debt-item">
                  <div className="debt-item__date">
                    {dayjs(debt.created_at).format("DD.MM.YYYY HH:mm")}
                  </div>
                  {debt.next_payment_date && (
                    <div className="debt-item__payment-date">
                      Keyingi to'lov:{" "}
                      <span>
                        {dayjs(debt.next_payment_date).format("DD.MM.YYYY")}
                      </span>
                    </div>
                  )}
                  <div className="debt-item__amount">
                    {parseFloat(debt.debt_sum).toLocaleString()} so'm
                  </div>
                  {debt.total_debt_sum && debt.paid_sum !== undefined && (
                    <div className="debt-item__progress">
                      <div
                        className="debt-item__progress-bar"
                        style={{
                          width: `${
                            (debt.paid_sum / debt.total_debt_sum) * 100
                          }%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            className="customer-detail__add-button"
            onClick={() => setIsDebtModalOpen(true)}
          >
            <PlusOutlined />
            Qo'shish
          </button>
        </>
      )}

      <AddDebtModal
        isOpen={isDebtModalOpen}
        onClose={() => setIsDebtModalOpen(false)}
        debtorId={id}
        onSuccess={() => {
          setIsDebtModalOpen(false);
        }}
      />
    </div>
  );
};

export default CustomerDetail;
