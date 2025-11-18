import PaymentRepository from "../../application/repository/PaymentRepository";
import Payment from "../../domain/entity/Payment";
import DatabaseConnection from "../database/DatabaseConnection";

export default class PaymentRepositoryDatabase implements PaymentRepository {

	constructor(readonly connection: DatabaseConnection) {
	}

	async savePayment(payment: Payment): Promise<void> {
		await this.connection.query("insert into cccat17.transaction (transaction_id, ride_id, status, date, amount) values ($1, $2, $3, $4, $5)", [payment.transactionId, payment.rideId, payment.status, payment.date, payment.amount]);
	}

	async getPaymentById(paymentId: string): Promise<Payment> {
		const [paymentData] = await this.connection.query("select * from cccat17.transaction where transaction_id = $1", [paymentId]);
		if (!paymentData) throw new Error();
		return new Payment(paymentData.transaction_id, paymentData.ride_id, paymentData.amount, paymentData.date, paymentData.status);
	}




}
