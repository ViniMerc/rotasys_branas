
export default class Payment {
	constructor(readonly rideId: string, readonly amount: number, readonly date: Date, readonly status: string) {
	}
	static create(rideId: string, amount: number, date: Date, status: string) {
		return new Payment(rideId, amount, date, status);
	}
}