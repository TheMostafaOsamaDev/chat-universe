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
};

interface IUser extends User {}
