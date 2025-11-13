import crypto from "crypto";

export default class Payment {
	constructor(readonly transactionId: string, readonly rideId: string, readonly amount: number, readonly date: Date, readonly status: string) {
	}
	static create(  rideId: string, amount: number, date: Date, status: string) {
		const transactionId = crypto.randomUUID();
		return new Payment(transactionId,rideId, amount, date, status);
	}
}