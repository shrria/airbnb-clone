"use client";

import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";

const Search = () => {
    const searchModal = useSearchModal();
    return (
        <div onClick={searchModal.onOpen}
            className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
            <div className="flex flex-row items-center justify-between">
                <div className="px-6 text-sm font-semibold">
                    Anywhere
                </div>
                <div className="hidden sm:block px-6 border-x-[1px] flex-1 text-sm text-center font-semibold">
                    Any Week
                </div>
                <div className="flex flex-row gap-3 pl-6 pr-2 items-center text-sm text-gray-600">
                    <div className="hidden sm:block">Add Guests</div>
                    <div className="p-2 bg-rose-500 rounded-full text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;