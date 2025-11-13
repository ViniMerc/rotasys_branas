export default interface PaymentGateway {
	savePayment (payment: any): Promise<any>;

}