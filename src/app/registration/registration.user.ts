export class User {
  username: String;
  email: String;
  password: String;

  constructor(name: String, email: String, password: String) {
    this.username = name;
    this.email = email;
    this.password = password;
  }
}