"use client";

import { Listing, User } from "@prisma/client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";


interface FavoritesClientProps {
    listings: Listing[];
    currentUser: User | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
    listings,
    currentUser,
}) => {
    return (
        <Container>
            <Heading
                title="Favorites"
                subtitle="List of places you have favorited."
            />
            <div
                className="
                    grid gap-8 mt-10
                    grid-cols-1 sm:grid-cols-2
                    md:grid-cols-3 lg:grid-cols-4
                    xl:grid-cols-5 2xl:grid-cols-6
                "
            >
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        currentUser={currentUser}
                    />
                ))}
            </div>

        </Container>
    );
}

export default FavoritesClient;