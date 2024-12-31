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
      if (inputRef.current) {
        // disable the input to prevent multiple uploads
        inputRef.current.disabled = true;
      }

      const res = await axiosBase.post("/auth/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await res.data;

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
      console.error(error);
    } finally {
      if (inputRef.current) {
        // enable the input
        inputRef.current.disabled = false;
      }
    }
  };

  return (
    <div className="relative">
      <Avatar className="size-52  border-2">
        <AvatarImage src={getAvatar(url)} ref={avatarRef} />
        <AvatarFallback />
      </Avatar>

      <div className="absolute bottom-2 right-2 overflow-hidden cursor-pointer">
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
