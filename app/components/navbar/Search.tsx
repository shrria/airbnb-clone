"use client";

import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";
import useCountries from "@/app/hooks/useCountries";
import { useMemo } from "react";
import { differenceInCalendarDays } from "date-fns";

const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getByValue } = useCountries();

    const locationValue = params?.get("locationValue");
    const startDate = params?.get("startDate");
    const endDate = params?.get("endDate");
    const numOfGuests = params?.get("numOfGuests");

    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getByValue(locationValue)?.label;
        }

        return "Anywhere";
    }, [getByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (!startDate || !endDate) {
            return "Any Week";
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);
        let diff = differenceInCalendarDays(end, start);

        if (diff === 0) {
            diff = 1;
        }

        return `${diff} Day${diff > 1 ? "s" : ""}`;
    }, [endDate, startDate]);

    const guestsLabel = useMemo(() => {
        let numOfGuestsInt = parseInt(numOfGuests as string);

        if (!numOfGuestsInt) {
            return "Add Guests";
        }

        return `${numOfGuestsInt} Guest${numOfGuestsInt > 1 ? "s" : ""}`;
    }, [numOfGuests]);

    return (
        <div onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="px-6 text-sm font-semibold">
                    {locationLabel}
                </div>
                <div className="hidden sm:block px-6 border-x-[1px] flex-1 text-sm text-center font-semibold">
                    {durationLabel}
                </div>
                <div className="flex flex-row gap-3 pl-6 pr-2 items-center text-sm text-gray-600">
                    <div className="hidden sm:block">
                        {guestsLabel}
                    </div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;