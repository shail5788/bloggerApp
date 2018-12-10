export class IUser {
  success: String;
  message: {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    lastlogin: string;
  };
  token: String;
}
