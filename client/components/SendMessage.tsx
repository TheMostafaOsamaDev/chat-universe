"use client";

import { Send, Upload, X, File } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SocketClient } from "@/lib/socket-client";
import { axiosBase } from "@/lib/api/axiosBase";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { AxiosError } from "axios";

interface UploadedFile extends File {
  preview?: string;
}

const MAX_FILES = 20; // Maximum files allowed

export default function SendMessage({ userId }: { userId: string }) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const params = useParams();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = e.currentTarget.message.value;
    const userChattingWith = params.userId;

    if (typeof message !== "string" || message.trim() === "") {
      return toast({
        description: "Message cannot be empty",
      });
    }

    if (typeof userChattingWith !== "string") {
      return toast({
        description: "Invalid user",
      });
    }

    // Handle file uploads
    const files = [];
    if (uploadedFiles.length > 0) {
      try {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append("files", file);
        });

        // Send files to server
        const res = await axiosBase.post("/chat/send-message", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const data: string[] = res.data;

        files.push(...data);
      } catch (error) {
        console.log(error);
        const axiosError = formatAxiosError(error as AxiosError);
        return toast({
          description: axiosError.message,
          variant: "destructive",
        });
      }
    }

    const instance = SocketClient.getInstance();

    instance.emit("sendMessage", {
      message,
      userChattingWith,
      media: files,
    });

    // Reset input and uploaded files
    setUploadedFiles([]);
    inputRef.current!.focus();
    inputRef.current!.value = "";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const totalFiles = uploadedFiles.length + newFiles.length;

    if (totalFiles > MAX_FILES) {
      toast({
        description: `You can only upload up to ${MAX_FILES} files.`,
        variant: "destructive",
      });
      return;
    }

    const hasLargeFiles = newFiles.some((file) => file.size > 10 * 1024 * 1024);

    if (hasLargeFiles) {
      return toast({
        description: "Files must be smaller than 10MB",
        variant: "destructive",
      });
    }

    const processedFiles = newFiles.map((file) => {
      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      }
      return file;
    });

    setUploadedFiles((prev) => [...prev, ...processedFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const file = prev[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="w-full">
      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="mb-3 p-2 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">
            Uploaded Files:
          </div>
          <div className="flex flex-wrap gap-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-background rounded-lg p-2 pr-3"
              >
                {file.type.startsWith("image/") ? (
                  <div className="relative w-8 h-8">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <File className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                <span className="text-sm truncate max-w-[150px]">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-muted-foreground hover:text-foreground ml-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Form */}
      <form
        className="w-full py-3 bg-background flex items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Send message"
          className="focus-visible:ring-offset-0 focus-visible:ring-0 border-2 focus-visible:border-primary h-full"
          name="message"
          ref={inputRef}
        />
        <Button variant="secondary" className="relative cursor-pointer" asChild>
          <div>
            <Upload />
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              accept="image/*,.pdf,.doc,.docx,.txt"
              // max files is 10
            />
          </div>
        </Button>

        <Button type="submit">
          <Send />
        </Button>
      </form>
    </div>
  );
}
