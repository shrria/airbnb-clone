"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";

import { User } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";

import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";

const Map = dynamic(() => import("@/app/components/Map"), {
    ssr: false
});

interface ListingInfo {
    user: User | null;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined;
    description: string;
    numOfGuests: number;
    numOfRooms: number;
    numOfBathrooms: number;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfo> = ({
    user,
    category,
    description,
    numOfGuests,
    numOfRooms,
    numOfBathrooms,
    locationValue,
}) => {
    const { getByValue } = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="flex flex-col col-span-4 gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        flex flex-row items-center gap-2
                        font-semibold text-xl
                    "
                >
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div
                    className="
                        flex flex-row items-center gap-4
                        font-light text-neutral-500
                    "
                >
                    <div>{numOfGuests} guests</div>
                    <div>{numOfRooms} rooms</div>
                    <div>{numOfBathrooms} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates} />
        </div>
    );
}

export default ListingInfo;