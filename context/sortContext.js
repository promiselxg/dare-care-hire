"use client";

import { formatDateWithoutTime } from "@/utils/getDateDifference";
import host from "@/utils/host";
import { createContext, useState, useEffect } from "react";

const DriverContext = createContext();

const DriverProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${host.url}/driver`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-store",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Fetch error:", error);
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
      const response = await fetch(
        `${host.url}/driver?account_type=${account_type}&date=${formattedDate}`,
        {
          method: "GET",
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSort = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${host.url}/driver`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-store",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data);
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
