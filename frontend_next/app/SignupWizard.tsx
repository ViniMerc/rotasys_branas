import axios from "axios";

export default class SignupWizard {
	step = 1;
	isPassenger = false;
	isDriver = false;
	carPlate = "";
	name = "";
	email = "";
	cpf = "";
	password = "";
	confirmPassword = "";
	errorMessage = "";
	successMessage = "";
	accountId = "";

	validate() {
		this.errorMessage = "";
		if (this.step === 1 && !this.isPassenger && !this.isDriver) {
			this.errorMessage = "Selecione o tipo de conta";
			return false;
		}
		if (this.step === 1 && this.isDriver && !this.carPlate) {
			this.errorMessage = "Adicione a placa do carro ";
			return false;
		}
		if (this.step === 2 && !this.name) {
			this.errorMessage = "Digite o nome";
			return false;
		}
		if (this.step === 2 && !this.email) {
			this.errorMessage = "Digite o email";
			return false;
		}
		if (this.step === 2 && !this.cpf) {
			this.errorMessage = "Digite o cpf";
			return false;
		}
		if (this.step === 3 && !this.password) {
			this.errorMessage = "Digite a senha";
			return false;
		}
		if (this.step === 3 && !this.confirmPassword) {
			this.errorMessage = "Digite a confirmação da senha";
			return false;
		}
		if (this.step === 3 && this.password && this.confirmPassword && (this.password !== this.confirmPassword)) {
			this.errorMessage = "A senha e a confirmação da senha devem ser iguais";
			return false;
		}
		return true;
	}

	next() {
		if (!this.validate()) return;
		this.step++;
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
		if (!this.validate()) return;
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