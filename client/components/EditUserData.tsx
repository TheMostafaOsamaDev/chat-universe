"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { keys } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import { updateProfileFn } from "@/lib/api/tanstack/auth-functions";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatAxiosError } from "@/helpers/format-axios-error";
import { AxiosError } from "axios";
import { updateUser } from "@/lib/auth-client";

interface IUserData {
  name: string;
  email: string;
  avatar: string;
  mongoId: string;
  username: string;
  createdAt: Date;
}

export default function EditUserData({ data }: { data: IUserData }) {
  const { toast } = useToast();
  const updateProfile = useMutation({
    mutationKey: ["updateProfile", data.mongoId],
    mutationFn: updateProfileFn,
    onError: (error) => {
      console.log(formatAxiosError(error as AxiosError));
      toast({
        description: formatAxiosError(error as AxiosError),
        variant: "destructive",
      });
    },
    onSuccess: async (data) => {
      await updateUser(
        {
          name: data.name,
          username: data.username,
        },
        {
          onSuccess: () => {
            toast({
              description: "Profile updated",
            });
          },
          onError: (ctx) => {
            toast({
              description: ctx.error.message,
              variant: "destructive",
            });
          },
        }
      );
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const name = formData.get("name") as string;

    if (!name || !username) {
      return toast({
        description: "Name and username are required",
      });
    }

    if (name === data.name && username === data.username) {
      return toast({
        description: "No changes detected",
      });
    }

    // Name must be less than or equal 50 characters
    if (name.length >= 50) {
      return toast({
        description: "Name must be less than or equal 50 characters",
      });
    }

    // Name must be more than or equal to 6 characters
    if (name.length < 6) {
      return toast({
        description: "Name must be more than or equal 6 characters",
      });
    }

    // Username must be less than or  equal 20 characters
    if (username.length >= 20) {
      return toast({
        description: "Username must be less than or equal 20 characters",
      });
    }

    // Username must be more than or equal to 3 characters
    if (username.length < 3) {
      return toast({
        description: "Username must be more than or equal 3 characters",
      });
    }

    console.log({ name, username, oldUsername: data.username });

    updateProfile.mutate({ name, username, oldUsername: data.username });
  };

  return (
    <form className="space-y-4 w-[350px]" onSubmit={handleSubmit}>
      {keys.map((key) => (
        <div key={key.key} className="space-y-2">
          <Label htmlFor={key.key}>{key.label}</Label>
          <Input
            id={key.key}
            name={key.key}
            type={key.type}
            required={key.required}
            defaultValue={data[key.key]} // TypeScript now knows key.key is a valid key of IUserData
            disabled={key.disabled}
          />
        </div>
      ))}

      <div className="space-y-3 flex flex-col">
        <Button type="submit">Submit</Button>
        <Button variant={"secondary"} type="reset">
          Reset
        </Button>
      </div>
    </form>
  );
}
