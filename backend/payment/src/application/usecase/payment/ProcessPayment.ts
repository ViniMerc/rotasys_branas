import PaymentRepository from "../../repository/PaymentRepository";
import UseCase from "../UseCase";
import Payment from "../../../domain/entity/Payment";

export default class ProcessPayment implements UseCase {
 
    constructor(  readonly paymentRepository: PaymentRepository) {
   
    }

    async execute(input: Input): Promise<Output> {
        const payment = Payment.create(input.rideId, input.amount, input.date, input.status)
        await this.paymentRepository.savePayment(payment)
        return {
            transactionId: payment.transactionId
        }
    }

}

type Input = {
    rideId: string,
    amount: number
    date: Date,
    status: string,
}

type Output = {
	transactionId: string
}

