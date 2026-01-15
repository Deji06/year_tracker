// import React, { useState } from "react";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isLeapYear from "dayjs/plugin/isLeapYear";
import Abacus from "./components/Abacus";
import HistorySection from "./components/HistorySection";
import toast from "react-hot-toast";
import { quotes } from "./constants/quotes";

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);

const App = () => {
  const currentDate = dayjs();
  const daysUsed = dayjs().dayOfYear();
  const totalDays = dayjs().isLeapYear() ? 366 : 365;
  const daysRemaining = totalDays - daysUsed;
  const yearPercentage = ((daysUsed / totalDays) * 100).toFixed(2);

  const storedGuest = localStorage.getItem("guestId");

  const guestId =
    storedGuest ??
    (() => {
      const id = Math.random().toString(36).substring(2, 6).toUpperCase();
      localStorage.setItem("guestId", id);
      return id;
    })();

  const handleDayClick = async (dayNumber: number, year: number) => {
    const clickedDate = dayjs(`${year}-01-01`).add(dayNumber - 1, "day");
    const formattedDate = clickedDate.format("MMMM D, YYYY");
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    toast(
        <div className="text-left py-1">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-extrabold text-[#fdf0dd] tracking-tight">
              {formattedDate}
            </p>
            {/* <span className="text-xl text-green-700">
              {quote.type === "pidgin" ? "🇳🇬" : ""}
            </span> */}
          </div>

          <div
            className={`pl-4 border-l-4 ${
              quote.type === "pidgin" ? "border-green-600" : "border-indigo-600"
            }`}
          >
            <p className="text-[17px] italic font-semibold text-white leading-snug">
              "{quote.quote}"
            </p>
          </div>

          <div className="mt-5 flex justify-between items-end">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest ${
                quote.type === "pidgin"
                  ? "bg-green-100 text-green-700"
                  : "bg-indigo-100 text-indigo-700"
              }`}
            >
              {quote.type === "pidgin" ? "Street Wisdom" : "Daily Light"}
            </span>
            <p className="font-bold text-sm text-gray-500">— {quote.author}</p>
          </div>
        </div>
      ),
      {
        duration: 5000,
        style: {
          borderRadius: "16px",
          padding: "20px",
          // minWidth: '340px',
          // boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
          border: "1px solid #f3f4f6",
        },
      }
  };

  return (
    <>
      <div className="pt-5 m-4">
        <div className="max-w-4xl mx-auto px-4 pt-8">
          {/* 1. Header Section: Title and Year */}
          <div className="flex flex-col items-center justify-center mb-8 gap-y-2">
            <div className="flex items-center gap-x-3 text-amber-800">
              <CalendarDays size={32} />
              <p className="text-3xl font-mono font-bold">{dayjs().year()}</p>
            </div>
            <h1 className="text-4xl sm:text-5xl font-mono font-black uppercase tracking-tighter text-center">
              Year In View
            </h1>
          </div>

          {/* 2. User/Guest Bar: Clean and Minimal */}
          <div className="flex flex-row justify-between items-center bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
            <p className="text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wider">
              Welcome, Guest
            </p>
            <div className="bg-white px-3 py-1 rounded-lg shadow-sm border border-gray-200">
              <span className="text-lg font-mono font-bold text-indigo-600">
                {guestId}
              </span>
            </div>
          </div>
        </div>

        <div className="border border-white rounded-[15px] bg-white md:w-[50%] m-auto h-[160px] flex flex-col items-center justify-center">
          <p className="text-[50px]">{yearPercentage} %</p>
          <span className="text-[14px]">of year completed</span>
        </div>

        <div className="border mt-5 border-white rounded-[15px] bg-white md:w-[30%] m-auto h-[60px] flex items-center justify-evenly">
          {daysUsed < 2 ? (
            <p className="text-[14px]">
              <span className="font-bold text-[20px]">{daysUsed}</span> day
              passes
            </p>
          ) : (
            <p className="text-[14px]">
              <span className="font-bold text-[20px]">{daysUsed}</span> days
              passed
            </p>
          )}
          <div className="border h-5 "></div>
          {daysRemaining < 2 ? (
            <p className="text-[14px]">
              <span className="font-bold text-[20px]">{daysRemaining}</span> day
              remaining
            </p>
          ) : (
            <p className="text-[14px]">
              <span className="font-bold text-[20px]">{daysRemaining}</span>{" "}
              days remaining
            </p>
          )}
        </div>

        <Abacus
          year={dayjs().year()}
          daysPassed={daysUsed}
          totalDays={totalDays}
          currentDayOfYear={daysUsed}
          isCurrentYear={true}
          onDayClick={(dayNumber) =>
            handleDayClick(dayNumber, currentDate.year())
          }
          // onDayClick ={handleDayClick}
        />

        <HistorySection currentDate={currentDate} />
      </div>
    </>
  );
};

export default App;
