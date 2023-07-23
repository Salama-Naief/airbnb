import EmptyState from "@/components/Utils/EmptyState";
import { IParams, getListings } from "./actions/getListings";
import ListingCart from "@/components/Listings/ListingCart";
import getCurrentUser from "./actions/getCurrent";
import { Listing } from "@prisma/client";
import HomeSkeleton from "@/skeletons/HomeSkeleton";
import { notFound } from "next/navigation";

interface HomeProps {
  searchParams: IParams;
}

const HomePage = async ({ searchParams }: HomeProps) => {
  const listingsData: any = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if (listingsData.status === "error") {
    return notFound();
  }
  if (listingsData.listings.length <= 0) {
    return <EmptyState showReset />;
  }

  return (
    <main className="relative py-12 container mx-auto">
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          "
      >
        {listingsData.status === "success" &&
          listingsData.listings?.map((listing: Listing) => (
            <ListingCart
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
      </div>
    </main>
  );
};
export default HomePage;
