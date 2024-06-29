"use client";

import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";

import Modal from "@/app/components/modals/Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import CountrySelect, { CountrySelectValue } from "@/app/components/input/CountrySelect";
import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/input/Calendar";
import Counter from "@/app/components/input/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [numOfRooms, setNumOfRooms] = useState(1);
    const [numOfBathrooms, setNumOfBathrooms] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });

    const Map = useMemo(() => dynamic(() => import("@/app/components/Map"), {
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep(value => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep(value => value + 1);
    }, []);

    const onSubmit = useCallback(() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            numOfGuests,
            numOfRooms,
            numOfBathrooms,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery,
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [step, searchModal, location, router, numOfGuests, numOfRooms, numOfBathrooms, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return "Search";
        }

        return "Next";
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return "Cancel";
        }

        return "Back";
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Make sure everything is ready!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Fill in the details!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests?"
                    value={numOfGuests}
                    onChange={(value) => setNumOfGuests(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={numOfRooms}
                    onChange={(value) => setNumOfRooms(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={numOfBathrooms}
                    onChange={(value) => setNumOfBathrooms(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={step === STEPS.LOCATION ? undefined : secondaryActionLabel}
            body={bodyContent}
        />
    );
}

export default SearchModal;