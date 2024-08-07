import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";

import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/favorites/FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorite listings."
            />
        );
    }

    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    );
}

export default FavoritesPage;