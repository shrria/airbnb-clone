import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";

import EmptyState from "@/app/components/EmptyState";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

interface IParams {
    listingId?: string;
}

const ListingPage = async (
    { params }: { params: IParams }
) => {
    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();
    const reservations = await getReservations({ listingId: params.listingId });

    if (!listing) {
        return <EmptyState />;
    }

    return (
        <div>
            <ListingClient
                listing={listing}
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    );
};

export default ListingPage;