"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { User } from "@prisma/client";
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser,
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId,
        currentUser,
    });

    return (
        <div
            onClick={toggleFavorite}
            className="relative hover:opacity-80 transition cursor-pointer"
        >
            <AiOutlineHeart
                size={28}
                className="absolute -top-[2px] -right-[2px] fill-white"
            />

            <AiFillHeart
                size={24}
                className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/40"}
            />

        </div>
    );
}

export default HeartButton;