type RegisterType = {
  name: string;
  email: string;
  password: string;
};

type LoginType = {
  email: string;
  password: string;
};

type UpdateProfileType = {
  username: string;
  name: string;
  oldUsername: string;
};

type User = {
  _id: string;
  name: string;
  username: string;
  image: string;
  email: string;
  password: string;
  avatar: string;
  isOnline: boolean;
  clientSocketId: string;
};

type ChatUser = {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  lastMessage: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
};

type SocketError = {
  message: string;
};

type Message = {
  _id: string;
  message: string;
  sender: string;
  receiver: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type UserChat = {
  _id: string;
  isBlocked: boolean;
  isDeleted: boolean;
  lastMessage: string;
  user1: User;
  user2: User;
  createdAt: string;
  updatedAt: string;
};

type ChatMessage = {
  conversation: string; // ID of the conversation thread
  createdAt: string; // Timestamp when the message was created
  isDeleted: boolean; // Whether the message is deleted
  message: string; // Content of the chat message
  receiver: string; // ID of the receiver user
  sender: string; // ID of the sender user
  updatedAt: string; // Timestamp when the message was last updated
  media: string[]; // Array of media files attached to the message
  __v: number; // Version key (used in MongoDB for document versioning)
  _id: string; // Unique identifier of the chat message
};

type Conversation = {
  _id: string; // Unique identifier for the conversation
  createdAt: string; // Timestamp when the conversation was created
  isBlocked: boolean; // Indicates if the conversation is blocked
  isDeleted: boolean; // Indicates if the conversation is deleted
  lastMessage: string; // The last message exchanged in the conversation
  updatedAt: string; // Timestamp when the conversation was last updated
  user1: string; // ID of the first user in the conversation
  user2: string; // ID of the second user in the conversation
  __v: number; // Version key (used in MongoDB for document versioning)
};

interface IUser extends User {}
