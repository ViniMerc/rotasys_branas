
import PaymentGateway from "../../src/application/gateway/PaymentGateway";

import Signup from "../../src/application/usecase/account/Signup";
import ProcessPayment from "../../src/application/usecase/payment/ProcessPayment";
import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import FinishRide from "../../src/application/usecase/ride/FinishRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import StartRide from "../../src/application/usecase/ride/StartRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import PaymentGatewayFake from "../../src/infra/gateway/PaymentGatewayHttps";

import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection;
let signup: Signup;
let paymentGateway: PaymentGateway
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;
let finishRide: FinishRide;
let processPayment: ProcessPayment

beforeEach(() => {
	connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
 	paymentGateway = new PaymentGatewayFake()
	signup = new Signup(accountRepository, mailerGateway);
	const rideRepository = new RideRepositoryDatabase(connection);
	const positionRepository = new PositionRepositoryDatabase(connection);
	const paymentRepository = new PaymentRepositoryDatabase(connection)
	requestRide = new RequestRide(rideRepository, accountRepository);
	getRide = new GetRide(rideRepository, accountRepository, positionRepository);
	acceptRide = new AcceptRide(rideRepository, accountRepository);
	startRide = new StartRide(rideRepository);
	finishRide = new FinishRide(rideRepository, paymentRepository)
	processPayment = new ProcessPayment(paymentGateway, paymentRepository)
});

test("Deve encerrar uma corrida", async function () {
	const inputSignupPassenger = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		isPassenger: true
	}
	const outputSignupPassenger = await signup.execute(inputSignupPassenger);
	const inputRequestRide = {
		passengerId: outputSignupPassenger.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
	}
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	const inputSignupDriver = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		carPlate: "AAA9999",
		isDriver: true
	}
	const outputSignupDriver = await signup.execute(inputSignupDriver);
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId
	}
	await acceptRide.execute(inputAcceptRide);
	const inputStartRide = {
		rideId: outputRequestRide.rideId
	}
	await startRide.execute(inputStartRide);
	const inputPayment = {
		rideId: outputRequestRide.rideId,
		amount: Math.random(),
		date: new Date(),
		status: "closed",
	}
	await processPayment.execute(inputPayment)
	const inputFinishRide = {
		rideId: outputRequestRide.rideId,
	}
	await finishRide.execute(inputFinishRide)
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	expect(outputGetRide.status).toBe("closed");
});

afterEach(async () => {
	await connection.close();
});
