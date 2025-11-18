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

	 login () {
		if (!this.email || !this.password) return
		
	 }

	 

	back() {
		this.step--;
	}

	restart() {
		this.step = 1;
		this.successMessage = ""
		this.isPassenger = false;
		this.name = "";
		this.email = "";
		this.cpf = "";
		this.password = "";
		this.confirmPassword = "";
		this.errorMessage = "";
		this.accountId = "";
		this.carPlate = "";
		this.isDriver = false
	}

	calculateProgress() {
		let progress = 0;
		if (this.isPassenger) progress += 30;
		if (this.isDriver) progress += 15;
		if (this.carPlate) progress += 15
		if (this.name) progress += 15;
		if (this.email) progress += 15;
		if (this.cpf) progress += 15;
		if (this.password && this.confirmPassword && this.password === this.confirmPassword) progress += 25;
		return progress;
	}

	sendMessage() {

		this.successMessage = "Conta criada com sucesso!";
	}

	async confirm() {
		 
		const input = {
			name: this.name,
			email: this.email,
			cpf: this.cpf,
			isPassenger: this.isPassenger,
			isDriver: this.isDriver,
			carPlate: this.carPlate,
		}

		const response = await axios.post("http://localhost:3001/signup", input);

		const output = response.data;

		this.accountId = output.accountId;
	}


	populateDriver() {
		this.isPassenger = false;
		this.name = "John Driver";
		this.email = `john.doe${Math.random()}@gmail.com`;
		this.cpf = "97456321558";
		this.password = "123456";
		this.confirmPassword = "123456";
		this.isDriver = true;
		this.carPlate = "AAA9999"
	}

		populatePassenger() {
		this.isPassenger = true;
		this.name = "Passenger Doe";
		this.email = `john.doe${Math.random()}@gmail.com`;
		this.cpf = "97456321558";
		this.password = "123456";
		this.confirmPassword = "123456";
		this.isDriver = false;
		this.carPlate = ""
	}

}