import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../Headers/Headers";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { MdAccountBalanceWallet } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

function MoneyTrack() {
  const [emptyData, setEmptyData] = useState({
    id: uuidv4(),
    name: "",
    amount: "",
    type: "Income",
  });

  const [amounts, setAmounts] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });

  const [lists, listItems] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }

    const storedLists = JSON.parse(localStorage.getItem("lists")) ?? [];
    const storedAmounts = JSON.parse(localStorage.getItem("amounts")) ?? {
      balance: 0,
      income: 0,
      expenses: 0,
    };

    listItems(Array.isArray(storedLists) ? storedLists : []);
    setAmounts(
      typeof storedAmounts === "object" && storedAmounts !== null
        ? storedAmounts
        : { balance: 0, income: 0, expenses: 0 }
    );
  }, []);

  useEffect(() => {
    if (lists.length > 0) {
      localStorage.setItem("lists", JSON.stringify(lists));
    }
    const finds = Object.values(amounts).find((each) => each > 0);
    if (finds) {
      localStorage.setItem("amounts", JSON.stringify(amounts));
    }
  }, [lists, amounts]);

  const userName = Cookies.get("Srinu");

  const addData = (e) => {
    e.preventDefault(1);
    if (emptyData.name.trim() === "" || emptyData.amount.trim() === "") {
      return toast("Please enter all the details");
    }
    listItems([...lists, emptyData]);
    if (emptyData.type === "Expenses") {
      setAmounts((prevData) => ({
        ...amounts,
        balance: prevData.balance - parseInt(emptyData.amount),
        expenses: prevData.expenses + parseInt(emptyData.amount),
      }));
    } else {
      setAmounts((prevData) => ({
        ...amounts,
        balance: prevData.balance + parseInt(emptyData.amount),
        income: prevData.income + parseInt(emptyData.amount),
      }));
    }
    setEmptyData((prevData) => ({
      ...prevData,
      name: "",
      amount: "",
      id: uuidv4(),
    }));
  };

  const handelItems = (name, value) => {
    setEmptyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const ChangeTheList = (value) => {
    const newLists = lists.filter((each) => value !== each.id);

    listItems(newLists);

    const deletedValue = lists.find((each) => each.id === value);
    console.log(lists);
    if (lists.length === 1) {
      localStorage.removeItem("lists");
      localStorage.removeItem("amounts");
    }

    if (deletedValue) {
      if (deletedValue.type === "Expenses") {
        setAmounts((prevData) => ({
          ...prevData, // Fix: update previous state, not entire state
          balance: prevData.balance + parseInt(deletedValue.amount) || 0,
          expenses: prevData.expenses - parseInt(deletedValue.amount) || 0,
        }));
      } else {
        setAmounts((prevData) => ({
          ...prevData,
          balance: prevData.balance - parseInt(deletedValue.amount) || 0,
          income: prevData.income - parseInt(deletedValue.amount) || 0,
        }));
      }
    }
  };

  return (
    <>
      <Headers />
      <div className="flex flex-col justify-center items-center min-h-screen py-6 shadow-sm border border-gray-500  bg-gradient-to-b from-black to-slate-500 px-2 md:px-28">
        <div className="bg-[url('https://assets.ccbp.in/frontend/react-js/money-manager/money-manager-bg.png')] bg-cover bg-center h-32  w-full p-8 round rounded-2xl mx-20  ">
          <h1 className="text-[18px] font-bold">Hi, {userName}</h1>
          <p>
            Welcome to your{" "}
            <span className="text-blue-500 font-bold">money manager</span>
          </p>
        </div>
        <div className="flex flex-col gap-3 justify-between items-center w-full my-4 sm:flex-row sm:w-[full] sm:gap-4 md:gap-3 ">
          <div className="flex justify-center items-center bg-[#ecfccb] w-[250px] p-4 round rounded-2xl shadow-lg sm:w-[200px]">
            <MdAccountBalanceWallet className="h-12 w-12" />
            <div className="pl-4 font-bold">
              <p className="sm:text-[8px]">Your Balance</p>
              <p>RS {amounts.balance}</p>
            </div>
          </div>

          <div className="flex justify-center items-center bg-[#cffafe] w-[250px] p-4 round rounded-2xl shadow-lg sm:w-[200px]">
            <FaMoneyBillTrendUp className="h-12 w-12" />
            <div className="pl-4 font-bold">
              <p className="sm:text-[8px]">Your Income</p>
              <p>RS {amounts.income}</p>
            </div>
          </div>
          <div className="flex justify-center items-center bg-[#7c3aed] w-[250px] p-4 round rounded-2xl shadow-lg sm:w-[220px]">
            <GiPayMoney className="h-12 w-12" />
            <div className="pl-4 font-bold">
              <p className="sm:text-[8px]">Your Expenses</p>
              <p>RS {amounts.expenses}</p>
            </div>
          </div>
        </div>
        <div className="py-8">
          <div className=" flex flex-col justify-center gap-2 sm:flex-row sm:gap-5 md:gap-5 px-12 items-center ">
            <form
              className="bg-white w-[350px] font-mono h-[400px] flex flex-col justify-center p-6 shadow-2xl rounded-md sm:w-[250px] md:min-w-[250px] lg:w-[350px]"
              onSubmit={addData}
            >
              <h2 className="text-[24px] font-mono text-center">
                Add Transaction
              </h2>
              <label className="font-bold" htmlFor="Subject">
                TITLE
              </label>
              <input
                type="text"
                value={emptyData.name}
                id="Subject"
                className="w-full border border-black outline-none pl-2 h-8 rounded-md my-2 bg-white text-black"
                placeholder="TITLE"
                onChange={(e) => handelItems("name", e.target.value)}
              />
              <label className="font-bold" htmlFor="amount">
                AMOUNT
              </label>
              <input
                type="number"
                id="amount"
                value={emptyData.amount}
                placeholder="AMOUNT"
                className="w-full border border-black bg-white text-black outline-none pl-2 h-8 rounded-md my-2"
                onChange={(e) => handelItems("amount", e.target.value)}
              />
              <label className="font-bold" htmlFor="select">
                TYPE
              </label>
              <select
                id="select"
                value={emptyData.type}
                className="w-full border border-black outline-none text-black bg-white pl-2 h-8 rounded-md my-2"
                onChange={(e) => handelItems("type", e.target.value)}
              >
                <option key="income" value="Income">
                  Income
                </option>
                <option key="expenses" value="Expenses">
                  Expenses
                </option>
              </select>
              <Button type="submit" className="button">
                Add
              </Button>
            </form>

            <div className="bg-white w-[350px] min-h-[400px] flex flex-col   p-6 shadow-2xl rounded-md sm:w-[350px] md:w-[480px]  lg:w-[630px]">
              <h2>History</h2>
              <div className="grid grid-cols-3 items-center my-3 font-bold font-mono bg-slate-500 p-3 text-white round rounded-xl lg:flex lg:gap-36 ">
                <p className="text-sm">Title</p>
                <p className="text-sm">Amount</p>
                <p className="text-sm">Type</p>
              </div>
              <div className=" my-3 ">
                {lists.map((each) => (
                  <div
                    key={each.id}
                    className="my-1 w-full grid grid-cols-4 font-bold gap-11 sm:gap-14 lg:gap-32 px-3 justify-center bg-slate-500 h-10   items-center font-serif text-white round rounded-xl"
                  >
                    <p className="text-sm truncate w-14 lg:w-24 text-ellipsis overflow-hidden whitespace-nowrap">
                      {each.name}
                    </p>
                    <p className="text-sm truncate w-14 lg:w-24 text-ellipsis overflow-hidden whitespace-nowrap">
                      {each.amount}
                    </p>
                    <p className="text-sm">{each.type}</p>
                    <p
                      onClick={() => ChangeTheList(each.id)}
                      className="cursor-pointer"
                    >
                      <MdOutlineDeleteOutline />
                    </p>
                  </div>
                ))}
              </div>
              {lists.length === 0 && <p>No Data Found</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoneyTrack;
