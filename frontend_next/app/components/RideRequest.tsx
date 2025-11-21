import axios, { AxiosError } from "axios";

interface Account {
  accountId: string;
  isDriver: boolean;
  [key: string]: unknown;
}

interface LoginResponse {
  accountId: string;
}

export default class RideRequest {
  email = "";
  password = "";
  accountId = "";
  fromLat = 0;
  fromLong = 0;
  toLat = 0;
  toLong = 0;
  driverId = "";
  status = "";

  // TODO move this login for a higher order
  async login() {
    try {
      const input = {
        email: this.email || "john.doe0.5846046343365061@gmail.com",
        password: this.password || "123456",
      };
      const response = await axios.post<LoginResponse>("http://localhost:3001/login", input);
      const output = response.data;
      this.accountId = output.accountId;
    } catch (error) {
      console.error("Login error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      throw new Error(axiosError.response?.data?.message || "Failed to login");
    }
  }

  //TODO change id to something better
  updateId() {
    this.accountId = "c3b61f26-cff6-4320-853f-4498a285b67d";
  }

  async requestRide() {
    try {
      const input = {
        accountId: this.accountId,
        fromLat: this.fromLat || -27.584905257808835,
        fromLong: this.fromLong || -48.545022195325124,
        toLat: this.toLat || -27.496887588317275,
        toLong: this.toLong || -48.522234807851476,
      };

      const newRide = await axios.post(
        "http://localhost:3000/request_ride",
        input
      );

      this.status = "requested";

      if (!newRide?.data) {
        return "Já existe uma corrida para esse passageiro em aberto";
      }

      //TODO Add a loading
      const listOfAccounts = await axios.get<Account[]>("http://localhost:3001/accounts");

      const listOfDrivers = listOfAccounts.data.filter(
        (item) => item.isDriver === true
      );

      if (listOfDrivers.length === 0) {
        throw new Error("No drivers available");
      }

      // Wait for driver assignment (simulating driver acceptance)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      
      this.driverId = listOfDrivers[0].accountId;
      this.status = "accepted";

      console.log(this.driverId);
    } catch (error) {
      console.error("Request ride error:", error);
      const axiosError = error as AxiosError<{ message?: string }>;
      if (axiosError.response?.status === 400 || axiosError.response?.status === 409) {
        throw new Error(axiosError.response?.data?.message || "Já existe uma corrida para esse passageiro em aberto");
      }
      throw new Error(axiosError.message || "Failed to request ride");
    }
  }
}
