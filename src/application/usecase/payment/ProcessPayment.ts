import AccountRepository from "../../repository/AccountRepository";
import RideRepository from "../../repository/RideRepository";
import PaymentRepository from "../../repository/PaymentRepository";
import UseCase from "../UseCase";
import Payment from "../../../domain/entity/Payment";

export default class ProcessPayment implements UseCase {

    constructor(readonly rideRepository: RideRepository, readonly accountRepository: AccountRepository, readonly paymentRepository: PaymentRepository) {
    }

    async execute(input: Input): Promise<void> {

        const payment = Payment.create(input.rideId, input.amount, input.date, input.status)
        await this.paymentRepository.savePayment(payment)

    }

}

type Input = {
    rideId: string,
    amount: number
    date: Date,
    status: string,
}
