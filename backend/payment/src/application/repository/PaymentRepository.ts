import Payment from "../../domain/entity/Payment";
 
export default interface PaymentRepository {
	savePayment (payment: Payment): Promise<void>;
	getPaymentById (paymentId: string) : Promise<any>
 
}
