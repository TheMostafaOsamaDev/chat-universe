"use client";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatar } from "@/helpers";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import { axiosBase } from "@/lib/api/axiosBase";
import { updateUser } from "@/lib/auth-client";

export default function AvatarUpload({ url }: { url: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosBase.post("/auth/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await res.data;

      console.log(data);

      await updateUser(
        {
          image: data.avatar,
        },
        {
          onSuccess: () => {
            if (avatarRef.current) {
              avatarRef.current.srcset = getAvatar(data.avatar);
            }
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <Avatar className="size-52">
        <AvatarImage src={getAvatar(url)} ref={avatarRef} />
        <AvatarFallback />
      </Avatar>

      <div className="absolute bottom-0 right-0 overflow-hidden cursor-pointer">
        <Button
          className="rounded-full p-5"
          variant={"outline"}
          size={"icon"}
          onClick={() => inputRef?.current?.click()}
        >
          <Pen />
        </Button>
        <input
          type="file"
          className="absolute w-0 h-0 opacity-0"
          ref={inputRef}
          accept="image/*"
          onChange={handleUpload}
        />
      </div>
    </div>
  );
}
