import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { getChatlink } from "@/helpers";

const VideoFormats = [".mp4", ".webm", ".ogg", ".mov"];
const ImageFormats = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];

const FileIcon = () => (
  <Image src="/images/file.png" alt="File" width={35} height={35} />
);

const isFileType = (url: string, formats: string[]) =>
  formats.some((format) => url.toLowerCase().endsWith(format));

const DownloadButton = ({ url }: { url: string }) => {
  const handleDownload = () => {
    window.open(getChatlink(url), "_blank");
  };

  return (
    <button
      onClick={handleDownload}
      className="absolute bottom-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
      aria-label="Download file"
    >
      <Download className="w-5 h-5 text-white" />
    </button>
  );
};

export default function MediaViewer({
  media,
  className,
}: {
  media: string[];
  className: string;
}) {
  const containerClasses = "relative w-48 h-48 p-2 bg-secondary rounded-md";

  return (
    <div className={className + " space-y-2"}>
      {media.map((url, index) => {
        // Check for video formats
        if (isFileType(url, VideoFormats)) {
          return (
            <div key={index} className={containerClasses}>
              <video
                src={getChatlink(url)}
                controls
                className="w-full h-full object-contain rounded"
              />
              <DownloadButton url={url} />
            </div>
          );
        }

        // Check for image formats
        if (isFileType(url, ImageFormats)) {
          return (
            <div key={index} className={containerClasses}>
              <Image
                src={getChatlink(url)}
                alt={`Media ${index + 1}`}
                width={192}
                height={192}
                className="w-full h-full object-contain rounded"
              />
              <DownloadButton url={url} />
            </div>
          );
        }

        // Return file icon for other formats
        return (
          <div
            key={index}
            className={containerClasses + " flex items-center justify-center"}
          >
            <FileIcon />
            <DownloadButton url={url} />
          </div>
        );
      })}
    </div>
  );
}
