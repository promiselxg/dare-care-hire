"use client";

import host from "@/utils/host";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const TransactionContext = createContext();

const TransactionSortProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host.url}/transaction`, {
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*", // Allow all origins
            "Access-Control-Allow-Methods": "GET", // Allow methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    handleResetSort();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host.url}/transaction/analytics`, {
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*", // Allow all origins
            "Access-Control-Allow-Methods": "GET", // Allow methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
          },
        });
        setSortedData(response.data);
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
        `${host.url}/transaction?transaction_id=${transactionID}`,
        {
          headers: {
            "Cache-Control": "no-store",
            "Access-Control-Allow-Origin": "*", // Allow all origins
            "Access-Control-Allow-Methods": "GET", // Allow methods
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
          },
        }
      );

      setData(response?.data);
      setSortedData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSort = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host.url}/transaction`, {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "GET", // Allow methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
        },
      });
      const res = await axios.get(`${host.url}/transaction/analytics`, {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "GET", // Allow methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
        },
      });
      setData(response?.data);
      setSortedData(res.data);
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
        sortedData,
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
