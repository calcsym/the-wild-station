"use client";

import { useState } from "react";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range &&
    range.from !== undefined &&
    range.to !== undefined &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}
function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const { regularPrice, discount } = cabin;
  const { minBookingLength, maxBookingLength } = settings;

  const displayRange =
    range?.from && range?.to && isAlreadyBooked(range, bookedDates)
      ? {}
      : range;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  function handleSelect(selectedRange) {
    // If there's a 'from' but user is clicking again to start over — reset
    if (selectedRange?.from && !selectedRange?.to) {
      // Clicking same day or any other — start fresh
      setRange({ from: selectedRange.from, to: undefined });
    } else {
      // Normal range complete
      setRange(selectedRange);
    }
  }

  function isDateDisabled(date) {
    return (
      isPast(date) || bookedDates.some((booked) => isSameDay(booked, date))
    );
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        mode="range"
        selected={displayRange}
        onSelect={handleSelect}
        className="pt-12 place-self-center"
        numberOfMonths={2}
        disabled={isDateDisabled}
        captionLayout="dropdown"
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        // NOTE: min/max booking length can be handled through validation or UI, not DayPicker props
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights > 0 && (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          )}
        </div>

        {(range?.from || range?.to) && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;

/*
function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange &&
    displayRange.to !== undefined &&
    displayRange.from !== undefined
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        selected={displayRange}
        onSelect={(range) => {
          // If only "from" is selected and the user clicks it again or another one, start a new range
          if (range?.from && !range.to) {
            setRange((prevRange) => {
              // If user re-clicks the same day or new day, restart selection
              if (prevRange?.from && isSameDay(range.from, prevRange.from)) {
                return { from: undefined, to: undefined };
              }

              return range;
            });
          } else {
            setRange(range);
          }
        }}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range && (range.from !== undefined || range.to !== undefined) ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

/* perplexity.ai
function DateSelector({ settings, cabin, bookedDates }) {
  const [selectedDates, setSelectedDates] = useState([]);

  const { regularPrice, discount } = cabin;
  const numNights = selectedDates.length;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  function handleSelect(dates) {
    if (!dates) {
      setSelectedDates([]);
      return;
    }
    if (dates.length > maxBookingLength) return;
    setSelectedDates(dates);
  }

  function isDateDisabled(date) {
    return (
      isPast(date) || bookedDates.some((booked) => isSameDay(booked, date))
    );
  }

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="multiple"
        selected={selectedDates}
        onSelect={handleSelect}
        numberOfMonths={2}
        disabled={isDateDisabled}
        footer={
          numNights > 0
            ? `Selected: ${selectedDates
                .map((date) => date.toLocaleDateString())
                .join(", ")}`
            : "Pick one or more days."
        }
        captionLayout="dropdown"
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {selectedDates.length > 0 && (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => setSelectedDates([])}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default DateSelector;

{<DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />}*/
