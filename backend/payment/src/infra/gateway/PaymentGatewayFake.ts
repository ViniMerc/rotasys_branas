import PaymentGateway from "../../application/gateway/PaymentGateway";

export default class PaymentGatewayFake implements PaymentGateway {

	async send (amount: number, trasactionId: string,date: Date) {
		// console.log(amount, trasactionId,date);
	}
}
