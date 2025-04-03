import { useEffect, useState } from "react";
import {
  SearchOutlined,
  SlidersOutlined,
  StarFilled,
  StarOutlined,
  UserAddOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Dropdown, Spin, Alert, message, Button } from "antd";
import AddDebtorModal from "../../components/AddDebtorModal";
import AddDebtModal from "../../components/AddDebtModal";
import { useDebtor } from "../../hooks/useDebtor";
import "./Customers.scss";
import { useNavigate } from "react-router";
import debounce from "lodash/debounce";

const Customers = () => {
  const {
    debtors,
    loading,
    error,
    addDebtor,
    updateFavorite,
    setSearchQuery,
    refetch,
  } = useDebtor();

  const [filterVisible, setFilterVisible] = useState(false);
  const [isDebtorModalOpen, setIsDebtorModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [selectedDebtorId, setSelectedDebtorId] = useState(null);
  const navigate = useNavigate();

  // Debounced search handler
  const debouncedSearch = debounce((value) => {
    setSearchQuery(value);
  }, 300);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleAddDebtor = async (debtorData) => {
    try {
      await addDebtor(debtorData);
      message.success("Mijoz muvaffaqiyatli qo'shildi!");
      setIsDebtorModalOpen(false);
      refetch();
    } catch (err) {
      message.error(err.message || "Mijozni qo'shishda xatolik yuz berdi");
    }
  };

  const handleToggleFavorite = async (e, debtorId, currentFavorite) => {
    e.stopPropagation();
    try {
      await updateFavorite(debtorId, !currentFavorite);
      message.success("Mijoz holati yangilandi");
    } catch (err) {
      message.error(
        err.message || "Mijoz holatini yangilashda xatolik yuz berdi"
      );
    }
  };

  const handleOpenDebtModal = (e, debtorId) => {
    e.stopPropagation();
    setSelectedDebtorId(debtorId);
    setIsDebtModalOpen(true);
  };

  const menuItems = [
    { key: "1", label: "Mashhur" },
    { key: "2", label: "Yangi mijozlar" },
    { key: "3", label: "Faol mijozlar" },
    { key: "4", label: "No-faol mijozlar" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calculateTotalDebt = (debts) => {
    return debts.reduce(
      (sum, debt) => sum + parseFloat(debt.debt_sum || "0"),
      0
    );
  };

  return (
    <section className="customers">
      <div className="container">
        <div className="customers__search">
          <form
            className="customers__search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Mijozlarni qidirish..."
              onChange={handleSearch}
            />
            <SearchOutlined className="customers__search-icon" />
          </form>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={["click"]}
            open={filterVisible}
            onOpenChange={setFilterVisible}
          >
            <button className="customers__search-btn">
              <SlidersOutlined className="customers__search-btn__icon" />
            </button>
          </Dropdown>
        </div>

        {loading ? (
          <Spin size="large" className="customers__loading" />
        ) : error ? (
          <Alert message={error} type="error" />
        ) : (
          <div className="customers__list">
            {debtors.length > 0 ? (
              debtors.map((customer) => {
                const totalDebt = calculateTotalDebt(customer.debts);
                return (
                  <div
                    key={customer.id}
                    className="customers__item"
                    onClick={() => navigate(`/customer/${customer.id}`)}
                  >
                    <div className="customers__info">
                      <div className="customers__header">
                        <h3 className="customers__name">
                          {customer.full_name}
                        </h3>
                        <div className="customers__actions">
                          
                          <div
                            className="customers__favorite"
                            onClick={(e) =>
                              handleToggleFavorite(
                                e,
                                customer.id,
                                customer.is_favorite
                              )
                            }
                          >
                           <br />
                          </div>
                        </div>
                      </div>
                      <p className="customers__phone">
                        {customer.phone_numbers.length > 0
                          ? customer.phone_numbers[0].number
                          : "Telefon raqami yo'q"}
                      </p>
                      <p className="customers__debt-label">Jami nasiya:</p>
                      <p
                        className={`customers__debt ${
                          totalDebt < 0 ? "negative" : "positive"
                        }`}
                      >
                        {totalDebt.toLocaleString()} so'm
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Hech qanday mijoz topilmadi.</p>
            )}
          </div>
        )}

        <button
          className="customers__add"
          onClick={() => setIsDebtModalOpen(true)}
        >
          <UserAddOutlined />
        </button>
      </div>

      <AddDebtorModal
        isOpen={isDebtorModalOpen}
        onClose={() => setIsDebtorModalOpen(false)}
        onAddDebtor={handleAddDebtor}
      />

      <AddDebtModal
        isOpen={isDebtModalOpen}
        onClose={() => {
          setIsDebtModalOpen(false);
          setSelectedDebtorId(null);
        }}
        debtorId={selectedDebtorId}
        onSuccess={() => {
          refetch();
          message.success("Nasiya muvaffaqiyatli qo'shildi!");
        }}
      />
    </section>
  );
};

export default Customers;
