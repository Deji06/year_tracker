import React, { useState } from "react";
import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isLeapYear from "dayjs/plugin/isLeapYear";
import Abacus from "./components/Abacus";
import HistorySection from "./components/HistorySection";
import toast from 'react-hot-toast'

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);

const App = () => {
  const currentDate = dayjs()
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

  toast.promise(
    fetch("https://quoteslate.vercel.app/api/quotes/random")
    // fetch("https://type.fit/api/quotes")
      .then(res => res.json()),
    {
      loading: 'Fetching inspiration...',
      success: (data) => {
        return (
          <div className="text-left">
            <p className="text-xl font-bold mb-3"> {formattedDate}</p>
            <p className="italic mb-3">"{data.quote}"</p>
            <p className="text-right font-medium">— {data.author}</p>
            <p className="mt-4 text-sm opacity-90">Make today legendary!</p>
          </div>
        );
      },
      error: () => {
        const fallbacks = [
          { quote: "The future belongs to those who believe in the beauty of their dreams." },
          { quote: "Don't wait for opportunity. Create it." },
          { quote: "E go be! ✊ or not lmao", author: "Naija Spirit" },  
          { quote: "You are never too old to set another goal or dream a new dream." },
          { quote: "Small steps every day lead to big results.", author: "Unknown" },
          { quote: "No matter how hot your anger is, it cannot cook yam." },
          { quote: "The child who is carried on the back will not know how far the journey is."}
        ];
        const fb = fallbacks[Math.floor(Math.random() * fallbacks.length)];

        return (
          <div className="text-left">
            <p className="text-xl font-bold mb-3">{formattedDate}</p>
            <p className="italic mb-3">"{fb.quote}"</p>
            <p className="mt-4 text-sm opacity-90">You're doing great. Keep going!</p>
          </div>
        );
      },
    },
    {
      duration: 5000, // 10 seconds
      style: {
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        // color: 'white',
        borderRadius: '16px',
        padding: '20px',
        // maxWidth: '500px',
      },
    }
  );
};


  return (
    <>
      <div className="pt-5 m-4">
        <p className="text-center capitalize text-[30px] font-bold hidden sm:flex w-fit m-auto">year tracker</p>
        <div className="flex flex-col sm:flex-row sm:flex-row-reverse space-y-3 justify-between items-cente p-2 ">
          <p className="text-[20px] capitalize">
            welcome, guest{" "}
            <span className="text-[20px] font-medium">{guestId}</span>
          </p>
          <div className="flex items-center gap-x-3 ">
            <CalendarDays className="" size={30} />
            <p className="text-[30px]"> {dayjs().year()}</p>
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
          onDayClick={(dayNumber) => handleDayClick(dayNumber, currentDate.year())}
          // onDayClick ={handleDayClick}      
        />

        <HistorySection  currentDate={currentDate}/>
      </div>
    </>
  );
};

export default App;
