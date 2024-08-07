import getCurrentUser from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
    });

    return favorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
