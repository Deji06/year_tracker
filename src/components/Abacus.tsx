import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

dayjs.extend(dayOfYear);
dayjs.extend(isLeapYear);

type AbacusProps = {
  year: number;
  daysPassed: number;
  totalDays: number;
  currentDayOfYear: number;
  isCurrentYear: boolean;
  onDayClick: (dayNumber: number) => void;
};

const abacus = ({
  year,
  daysPassed,
  totalDays,
  currentDayOfYear,
  isCurrentYear,
  onDayClick,
}: AbacusProps) => {

  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-1.5 justify-center max-w-lg mx-auto p-4 bg-gray-50 rounded-xl">
        {days.map((dayNumber) => {
          const isToday = isCurrentYear && dayNumber === currentDayOfYear;
          const isPast = isCurrentYear && dayNumber < currentDayOfYear;

          return (
            <div
              key={dayNumber}
              onClick={() => onDayClick(dayNumber)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  isToday
                    ? "bg-amber-800 ring-1 ring-red-700 scale-130 shadow-lg"
                    : isPast
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }
              `}
              title={dayjs(`${year}-01-01`)
                .add(dayNumber - 1, "day")
                .format("MMM D")}
            />
          );
        })}
      </div>

      <p className="text-center text-[15px] text-gray-600 mt-4">
        Day {daysPassed} of {totalDays}
      </p>
    </div>
  );
};

export default abacus;
