import axios from "axios";

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
    const input = {
      email: this.email || "john.doe0.5846046343365061@gmail.com",
      password: this.password || "123456",
    };
    const response = await axios.post("http://localhost:3001/login", input);
    const output = response.data;
    this.accountId = output.accountId;
  }

  //TODO change id to something better
  updateId() {
    this.accountId = "c3b61f26-cff6-4320-853f-4498a285b67d";
  }

  async requestRide() {
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

    if (!newRide) {
      return "Já existe uma corrida para esse passageiro em aberto";
    }

    //TODO Add a loading
    const listOfAccounts = await axios.get("http://localhost:3001/accounts");

    const listOfDrivers = listOfAccounts.data.map(
      (item: any) => item.isDriver === true
    );

    setTimeout(() => {
      this.driverId = listOfDrivers[0].accountId;
    }, 4000);

    this.status = "accepted";

	console.log(this.driverId)
  }
}
