import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Sparkles } from "lucide-react";

type HistoryEvent = {
  year: number;
  text: string;
};

const HistorySection = ({ currentDate }: { currentDate: dayjs.Dayjs }) => {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const month = currentDate.month() + 1; // 1 for January
      const day = currentDate.date(); // 8

      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`
        );
        const data = await response.json();

        // Filter case-insensitively for "brazil" (or switch back to "nigeria")
        const matchingEvents = data.events
          .filter(
            (event: any) =>
              event.text.toLowerCase().includes("nigeria") ||
              event.text.toLowerCase().includes("nigerian")
          )
          .map((event: any) => ({
            year: event.year,
            text: event.text,
          }))
          .slice(0, 10);

        setEvents(
          matchingEvents.length > 0
            ? matchingEvents
            : [
                {
                  year: 0,
                  text: "No matching events found today. check again tomorrow!",
                },
              ]
        );
      } catch (error) {
        console.error("Error:", error);
        setEvents([{ year: 0, text: "Failed to load events." }]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentDate]);

  return (
    <div className="mt-8 p-4 bg-white rounded-[15px] border border-gray-200 sm:w-[40%] h-fit mx-auto">
      <div className="flex  gap-x-3 items-center sm:justify-center">
        <Sparkles color="brown" />

        <h3 className="text-[14px] capitalize font-bold">
          on this day in nigeria history
        </h3>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul className=" pt-3 pl-2 space-y-3 text-[14px]">
          {events.map((event, index) => (
            <li key={index} className="flex flex-col gap-y-2">
              {event.year !== 0 && (
                <span className="font-bold text-amber-800">{event.year}</span>
              )}{" "}
              {event.text}
              <div className="border border-amber-800 w-full"></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistorySection;
