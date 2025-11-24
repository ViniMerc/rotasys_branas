import PaymentRepository from "../../repository/PaymentRepository";
import UseCase from "../UseCase";

export default class GetPayment implements UseCase {
	

	constructor (readonly paymenteRepository: PaymentRepository) {

	}

	async execute(paymentId: string): Promise<any> {
 
		const transaction = await this.paymenteRepository.getPaymentById(paymentId)
		// console.log(transaction)
		return transaction
	}

}

 
