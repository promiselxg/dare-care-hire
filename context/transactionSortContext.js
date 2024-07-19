"use client";

import host from "@/utils/host";
import { createContext, useState, useEffect } from "react";

const TransactionContext = createContext();

const TransactionSortProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${host.url}/transaction`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const res = await response.json();
        console.log(res);
        setData(res);
        console.log(data);
      } catch (error) {
        console.error("Fetch error:", error);
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
        const response = await fetch(`${host.url}/transaction/analytics`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSortedData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortTransactionTable = async (transactionID) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${host.url}/transaction?transaction_id=${transactionID}`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      setSortedData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSort = async () => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // First fetch request
        const responsePromise = fetch(`${host.url}/transaction`, {
          cache: "no-store",
        });

        // Second fetch request
        const resPromise = fetch(`${host.url}/transaction/analytics`, {
          cache: "no-store",
        });

        // Wait for both requests to complete
        const [response, res] = await Promise.all([
          responsePromise,
          resPromise,
        ]);

        // Check for errors in responses
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        if (!res.ok) {
          throw new Error("Failed to fetch analytics data");
        }

        // Extract JSON data from responses
        const responseData = await response.json();
        const resData = await res.json();

        // Set data into state
        setData(responseData);
        setSortedData(resData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
