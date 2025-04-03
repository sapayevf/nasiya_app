import React, { useState } from "react";
import { useDebtor } from "../hooks/useDebtor";
import { Search, Plus, Trash2, Edit, Phone, MapPin } from "lucide-react";
import { format } from "date-fns";
import "../styles/customers.scss";

function Customers() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    debtors,
    isLoading,
    error,
    deleteDebtor,
    searchDebtors,
    isDeletingDebtor,
  } = useDebtor();

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length >= 2) {
      await searchDebtors(value);
    }
  };

  if (isLoading) {
    return (
      <div className="customers-page">
        <div className="loading">
          <div className="loading__spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customers-page">
        <div className="error">Error loading customers: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="customers-page">
      <div className="header">
        <h1 className="header__title">Customers</h1>
        <button className="header__add-button">
          <Plus />
          Add Customer
        </button>
      </div>

      <div className="search-bar">
        <Search />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {debtors?.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className="customer-info">
                    <img
                      className="customer-info__avatar"
                      src={
                        customer.avatar ||
                        `https://ui-avatars.com/api/?name=${customer.name}`
                      }
                      alt={customer.name}
                    />
                    <span className="customer-info__name">{customer.name}</span>
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    <Phone />
                    {customer.phone}
                  </div>
                </td>
                <td>
                  <div className="address-info">
                    <MapPin />
                    {customer.address}
                  </div>
                </td>
                <td>{format(new Date(customer.createdAt), "MMM dd, yyyy")}</td>
                <td>
                  <div className="actions">
                    <button className="edit">
                      <Edit />
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteDebtor(customer.id)}
                      disabled={isDeletingDebtor}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
