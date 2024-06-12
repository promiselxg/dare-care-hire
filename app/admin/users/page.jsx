"use client";

import { cn } from "@/lib/utils";
import { raleway } from "@/lib/fonts";
import "../../admin/dashboard.css";
import useFetch from "@/hooks/useFetch";
import { UsersDataTable } from "../_components/table/users/data-table";
import { UsersColumn } from "../_components/table/users/columns";

const SettingsPage = () => {
  const { loading, data: users } = useFetch("/users");
  console.log(users);
  return (
    <>
      <section className="w-full flex h-screen flex-col gap-y-5 p-5 overflow-y-scroll bg-[whitesmoke]">
        <div className="flex md:items-center md:justify-between w-full my-5  flex-col md:flex-row justify-start items-start">
          <h1
            className={cn(
              `${raleway.className} uppercase font-[600] my-4 md:my-0`
            )}
          >
            Manage Users
          </h1>
        </div>
        <UsersDataTable columns={UsersColumn} data={users} loading={loading} />
      </section>
    </>
  );
};

export default SettingsPage;
