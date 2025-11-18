import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";

export default class Login implements UseCase {
  accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(input: Input): Promise<Output> {
    const account = await this.accountRepository.getAccountByEmail(input.email);
    if (!account) throw new Error("Account not found");

    if (account.getPassword() !== input.password)
      throw new Error("Incorrect Password");

    return {
      accountId: account.accountId,
      name: account.getName(),
      email: account.getEmail(),
      cpf: account.getCpf(),
      carPlate: account.getCarPlate(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
      password: account.getPassword(),
    };
  }
}

type Output = {
  accountId: string;
  name: string;
  email: string;
  cpf: string;
  carPlate: string;
  isPassenger: boolean;
  isDriver: boolean;
  password: string;
};

type Input = {
  email: string;
  password: string;
};
