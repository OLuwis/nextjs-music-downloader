import SongCard from "@/app/components/song/Card";
import { Title, Subtitle } from "@/app/components";
import { fetchTrackData as soundCloudFetchTrackData } from "@/app/services/soundcloud";
import log from "loglevel";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  log.debug(`SearchParams: ${params}`);

  const url = params.url;
  log.debug(`UrlParam: ${url}`);

  const data = url!.includes("soundcloud") ? await soundCloudFetchTrackData(url as string) : null;
  log.debug(`Data: ${data}`);

  return data ?
    (
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
    )
    :
    (
      <>
        <div className="relative overflow-hidden">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
            <div className="text-center">
              <a href=".">
                <Title text="Music Downloader" />
              </a>
            </div>
            <div className="text-center">
              <Subtitle text="Invalid or unknown url." />
            </div>
          </div>
        </div>
      </>
    );
}
