export class User {
  Code?: number;
  UserName: string;
  Password: string;

  constructor(UserName: string, Password: string) {
    this.UserName = UserName;
    this.Password = Password;
  }
}
