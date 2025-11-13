import PaymentGateway from "../../application/gateway/PaymentGateway";

export default class PaymentGatewayHttps implements PaymentGateway {

	async savePayment (payment: any) {
		console.log(payment);
	}
}
