
import AccountGateway from "../../src/application/gateway/AccountGateway";
import PaymentGateway from "../../src/application/gateway/PaymentGateway";
import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import FinishRide from "../../src/application/usecase/ride/FinishRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import StartRide from "../../src/application/usecase/ride/StartRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttps";
import PaymentGatewayFake from "../../src/infra/gateway/PaymentGatewayHttps";
import { AxiosAdapter } from "../../src/infra/http/HttpClient";

import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection;

let paymentGateway: PaymentGateway
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;
let finishRide: FinishRide;
let accountGateway: AccountGateway;

beforeEach(() => {
	connection = new PgPromiseAdapter();
	const httpClient = new AxiosAdapter()
	accountGateway = new AccountGatewayHttp(httpClient)
	paymentGateway = new PaymentGatewayFake()

	const rideRepository = new RideRepositoryDatabase(connection);
	const positionRepository = new PositionRepositoryDatabase(connection);

	requestRide = new RequestRide(rideRepository, accountGateway);
	getRide = new GetRide(rideRepository, accountGateway, positionRepository);
	acceptRide = new AcceptRide(rideRepository, accountGateway);
	startRide = new StartRide(rideRepository);
	finishRide = new FinishRide(rideRepository, paymentGateway)

});

test("Deve encerrar uma corrida", async function () {
	const inputSignupPassenger = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		isPassenger: true
	}
	const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger);
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
	const outputSignupDriver = await accountGateway.signup(inputSignupDriver);
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
	 await paymentGateway.savePayment(inputPayment)
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
