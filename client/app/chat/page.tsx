import Image from "next/image";

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      <Image
        src="/svg/mailbox.svg"
        width={200}
        height={200}
        alt="mailbox image"
      />

      <p className="text-lg">
        Bring your friends and family together with our chat feature.
      </p>
    </div>
  );
}
