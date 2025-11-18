import AccountRepository from "../../repository/AccountRepository";
import UseCase from "../UseCase";

export default class GetAllAccounts implements UseCase {
  accountRepository: AccountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(): Promise<any> {
    const account = await this.accountRepository.list();
    if (!account) throw new Error("Nao deu");
    return  account;
  }
}

 
