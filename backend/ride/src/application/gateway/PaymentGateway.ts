export default interface PaymentGateway {
	send (amount: number, trasactionId: string, date:Date): Promise<void>;
}
