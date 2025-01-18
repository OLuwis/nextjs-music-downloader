import SongCard from "@/app/components/song/Card";
import Title from "@/app/components/home/Title";
import { fetchTrackData as soundCloudFetchTrackData } from "@/app/services/soundcloud";
import { fetchTrackData as youtubeMusicFetchTrackData } from "@/app/services/youtube";
import { stdout } from "process";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const url = (await searchParams).url;

  stdout.write(url as string)

  const data = url!.includes("soundcloud") ? await soundCloudFetchTrackData(url as string) : await youtubeMusicFetchTrackData(url as string);

  stdout.write(JSON.stringify(data))

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <a href=".">
              <Title text="Music Downloader" />
            </a>
          </div>
          <span className="block h-10 sm:h-20 aspect-square"></span>
          <SongCard data={data} />
        </div>
      </div>
    </>
  );
}
