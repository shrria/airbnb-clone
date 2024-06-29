"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { Listing, Reservation, User } from "@prisma/client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/listings/ListingCard";

interface TripsClientProps {
    reservations: (Reservation & { listing: Listing })[];
    currentUser?: User | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success("Reservation cancelled!");
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
                title="Trips"
                subtitle="Where you've been & where you're going"
            />
            <div
                className="
                    grid gap-8 mt-10
                    grid-cols-1 sm:grid-cols-2
                    md:grid-cols-3 lg:grid-cols-4
                    xl:grid-cols-5 2xl:grid-cols-6
                "
            >
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        actionLabel="Cancel reservation"
                        disabled={deletingId === reservation.id}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}

export default TripsClient;