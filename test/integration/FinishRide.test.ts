import MailerGateway from "../../src/application/gateway/MailerGateway";
import GetAccount from "../../src/application/usecase/account/GetAccount";
import Signup from "../../src/application/usecase/account/Signup";
import AcceptRide from "../../src/application/usecase/ride/AcceptRide";
import FinishRide from "../../src/application/usecase/ride/FinishRide";
import GetRide from "../../src/application/usecase/ride/GetRide";
import RequestRide from "../../src/application/usecase/ride/RequestRide";
import StartRide from "../../src/application/usecase/ride/StartRide";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import MailerGatewayFake from "../../src/infra/gateway/MailerGatewayFake";
import { AccountRepositoryDatabase } from "../../src/infra/repository/AccountRepository";
import PaymentRepositoryDatabase from "../../src/infra/repository/PaymentRepositoryDatabase";
import PositionRepositoryDatabase from "../../src/infra/repository/PositionRepositoryDatabase";
import RideRepositoryDatabase from "../../src/infra/repository/RideRepositoryDatabase";

let connection: DatabaseConnection;
let signup: Signup;
let mailerGateway: MailerGateway;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;
let finishRide: FinishRide;

beforeEach(() => {
	connection = new PgPromiseAdapter();
	const accountRepository = new AccountRepositoryDatabase(connection);
	mailerGateway = new MailerGatewayFake();
	signup = new Signup(accountRepository, mailerGateway);
	const rideRepository = new RideRepositoryDatabase(connection);
	const positionRepository = new PositionRepositoryDatabase(connection);
	const paymentRepository = new PaymentRepositoryDatabase(connection)
	requestRide = new RequestRide(rideRepository, accountRepository);
	getRide = new GetRide(rideRepository, accountRepository, positionRepository);
	acceptRide = new AcceptRide(rideRepository, accountRepository);
	startRide = new StartRide(rideRepository);
	finishRide = new FinishRide(rideRepository, paymentRepository)
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
	const inputFinishRide = {
		rideId: outputRequestRide.rideId,
		amount: 23,
		date: new Date(),
		status: "closed",
	}
	await finishRide.execute(inputFinishRide)
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	expect(outputGetRide.status).toBe("closed");
});

afterEach(async () => {
	await connection.close();
});
