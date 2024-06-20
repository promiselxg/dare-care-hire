"use client";

import { formatDateWithoutTime } from "@/utils/getDateDifference";
import host from "@/utils/host";
import axios from "axios";
import { createContext, useState, useEffect } from "react";

const DriverContext = createContext();

const DriverProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${host.url}/driver`, {
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
  }, []);

  const handleSort = async (account_type, date) => {
    const formattedDate = formatDateWithoutTime(date);
    try {
      setLoading(true);
      const response = await axios.get(
        `${host.url}/driver?account_type=${account_type}&date=${formattedDate}`,
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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSort = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${host.url}/driver`, {
        headers: {
          "Cache-Control": "no-store",
          "Access-Control-Allow-Origin": "*", // Allow all origins
          "Access-Control-Allow-Methods": "GET", // Allow methods
          "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow headers
        },
      });
      setData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DriverContext.Provider
      value={{ data, loading, handleSort, handleResetSort }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export { DriverContext, DriverProvider };
