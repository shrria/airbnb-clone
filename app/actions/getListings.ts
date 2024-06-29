import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  numOfGuests?: number;
  numOfRooms?: number;
  numOfBathrooms?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      numOfGuests,
      numOfRooms,
      numOfBathrooms,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (numOfGuests) {
      query.numOfGuests = {
        gte: +numOfGuests,
      };
    }

    if (numOfRooms) {
      query.numOfRooms = {
        gte: +numOfRooms,
      };
    }

    if (numOfBathrooms) {
      query.numOfBathrooms = {
        gte: +numOfBathrooms,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (category) {
      query.category = category;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
