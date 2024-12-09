type RegisterType = {
  name: string;
  email: string;
  password: string;
};

type LogInType = {
  email: string;
  password: string;
};

type User = {
  _id: string;
  name: string;
  username: string;
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
};

interface IUser extends User {}
