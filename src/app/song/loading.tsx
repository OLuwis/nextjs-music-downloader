import { LoaderIcon } from "@/app/icons";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
