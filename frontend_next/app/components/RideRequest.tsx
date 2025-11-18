import axios from "axios";

export default class RideRequest {
  email = "";
  password = "";
  accountId = "";

  step = 1;
  isPassenger = false;
  isDriver = false;
  carPlate = "";
  name = "";
  cpf = "";
  confirmPassword = "";
  errorMessage = "";
  successMessage = "";

  async login() {
    const input = {
      email: this.email,
      password: this.password,
    };
    const response = await axios.post("http://localhost:3001/login", input);
    const output = response.data;
    this.accountId = output.accountId;
  }
}
