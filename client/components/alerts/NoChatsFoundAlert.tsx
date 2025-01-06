import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function NoChatsFoundAlert() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>No chats</AlertTitle>
      <AlertDescription>Search for users to start a chat</AlertDescription>
    </Alert>
  );
}
