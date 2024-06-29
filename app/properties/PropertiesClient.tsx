"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Listing, User } from "@prisma/client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Listing deleted!");
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            }).finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <Container>
            <Heading
                title="Properties"
                subtitle="List of your properties"
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
                        actionId={listing.id}
                        onAction={onCancel}
                        actionLabel="Delete property"
                        disabled={deletingId === listing.id}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default PropertiesClient;