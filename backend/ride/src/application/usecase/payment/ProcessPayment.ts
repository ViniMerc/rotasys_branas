import AccountRepository from "../../repository/AccountRepository";
import RideRepository from "../../repository/RideRepository";
import PaymentRepository from "../../repository/PaymentRepository";
import UseCase from "../UseCase";
import Payment from "../../../domain/entity/Payment";
import PaymentGateway from "../../gateway/PaymentGateway";

export default class ProcessPayment implements UseCase {
    paymentGateway: PaymentGateway

    constructor(paymentGateway: PaymentGateway, readonly paymentRepository: PaymentRepository) {
        this.paymentGateway = paymentGateway
    }

    async execute(input: Input): Promise<void> {
        const payment = Payment.create(input.rideId, input.amount, input.date, input.status)
        await this.paymentRepository.savePayment(payment)
        await this.paymentGateway.send(input.amount, payment.transactionId, input.date)
    }

}

type Input = {
    rideId: string,
    amount: number
    date: Date,
    status: string,
}
