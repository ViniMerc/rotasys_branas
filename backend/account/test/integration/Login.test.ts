import MailerGateway from "../../src/application/gateway/MailerGateway";
import GetAccount from "../../src/application/usecase/account/GetAccount";
import Login from "../../src/application/usecase/account/Login";
import Signup from "../../src/application/usecase/account/Signup";
import Account from "../../src/domain/entity/Account";
import DatabaseConnection, {
  PgPromiseAdapter,
} from "../../src/infra/database/DatabaseConnection";
import MailerGatewayFake from "../../src/infra/gateway/MailerGatewayFake";
import {
  AccountRepositoryDatabase,
  AccountRepositoryMemory,
} from "../../src/infra/repository/AccountRepository";
import sinon from "sinon";

let connection: DatabaseConnection;
let signup: Signup;
let getAccount: GetAccount;
let login: Login;
let mailerGateway: MailerGateway;

beforeEach(() => {
  connection = new PgPromiseAdapter();
  const accountRepository = new AccountRepositoryDatabase(connection);
  mailerGateway = new MailerGatewayFake();
  signup = new Signup(accountRepository, mailerGateway);
  getAccount = new GetAccount(accountRepository);
  login = new Login(accountRepository);
});

test("Deve logar em uma conta", async function () {
  const inputSignup = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "97456321558",
    isPassenger: true,
    password: "123456",
  };
  const outputSignup = await signup.execute(inputSignup);
  expect(outputSignup.accountId).toBeDefined();
  const outputGetAccount = await getAccount.execute(outputSignup.accountId);
  const loginInput = {
    email: outputGetAccount.email,
    password: outputGetAccount.password,
  };
  const loginOutput = await login.execute(loginInput);

  expect(loginOutput.password).toBe(inputSignup.password);
});

afterEach(async () => {
  await connection.close();
});
