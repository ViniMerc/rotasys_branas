import Payment from "../../../domain/entity/Payment";
import PaymentRepository from "../../repository/PaymentRepository";
import RideRepository from "../../repository/RideRepository";
import UseCase from "../UseCase";

export default class FinishRide implements UseCase {

	constructor(readonly rideRepository: RideRepository, readonly paymentRepository: PaymentRepository) {
	}

	async execute(input: Input): Promise<void> {
		const ride = await this.rideRepository.getRideById(input.rideId);
		ride.finish();
		const payment = Payment.create(input.rideId, input.amount, input.date, input.status)
		await this.paymentRepository.savePayment(payment)
		await this.rideRepository.updateRide(ride);
	}
}

type Input = {
	rideId: string,
	amount: number,
	date: Date,
	status: string,
}
