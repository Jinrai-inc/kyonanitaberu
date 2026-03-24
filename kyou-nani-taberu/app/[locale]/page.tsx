import { getDefaultLocation } from "@/lib/defaultLocation";
import { fetchDefaultPlaces } from "@/lib/fetchDefaultPlaces";
import MainApp from "@/components/MainApp";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const defaultLoc = getDefaultLocation(locale);

  // SSR: fetch default places for Tokyo Station so the page has content for bots
  const defaultPlaces = await fetchDefaultPlaces(defaultLoc.lat, defaultLoc.lng, locale);

  return (
    <MainApp
      initialPlaces={defaultPlaces}
      defaultLocationName={defaultLoc.name}
      defaultLat={defaultLoc.lat}
      defaultLng={defaultLoc.lng}
    />
  );
}
