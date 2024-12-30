export const AUTH_ROUTES = ["/log-in", "/sign-up"];
export const PROTECTED_ROUTES = ["/chat", "/profile"];

// Profile Editable Inputs
// Define a type for the keys of IUserData that you want to use
export type EditableUserKeys = "email" | "name" | "username";

export const keys: Array<{
  key: EditableUserKeys;
  label: string;
  type: string;
  required: boolean;
  disabled?: boolean;
}> = [
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
    disabled: true,
  },
  {
    key: "name",
    label: "Name",
    type: "text",
    required: true,
  },
  {
    key: "username",
    label: "Username",
    type: "text",
    required: true,
  },
];
