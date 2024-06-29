import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "@/app/properties/PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login"
        />;
    }

    const listings = await getListings({
        userId: currentUser.id
    });

    if (listings.length === 0) {
        return <EmptyState
            title="No properties found"
            subtitle="Looks like you have not added any properties yet."
        />;
    }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
};

export default PropertiesPage;