"use client";

import host from "@/utils/host";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const TransactionContext = createContext();

const TransactionSortProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host.url}/transaction?limit=9`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSortTransactionTable = async (transactionID) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${host.url}/transaction?transaction_id=${transactionID}`
      );
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSort = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host.url}/transaction`);
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        data,
        loading,
        handleSortTransactionTable,
        handleResetSort,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionContext, TransactionSortProvider };
