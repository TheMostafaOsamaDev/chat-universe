"use client";

import { Send, Upload, X, File } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { SocketClient } from "@/lib/socket-client";
import { axiosBase } from "@/lib/api/axiosBase";

interface UploadedFile extends File {
  preview?: string;
}

export default function SendMessage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const params = useParams();
  const { toast } = useToast();

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
    if (uploadedFiles.length > 0) {
      const formData = new FormData();
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Send files to server
      await axiosBase.post("/chat/send-message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    // Reset form and uploaded files
    setUploadedFiles([]);
    e.currentTarget.reset();

    const instance = SocketClient.getInstance();

    instance.emit("sendMessage", {
      message,
      userChattingWith,
    });

    e.currentTarget.reset();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
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
