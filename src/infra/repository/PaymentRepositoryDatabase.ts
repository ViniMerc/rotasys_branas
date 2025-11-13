import PaymentRepository from "../../application/repository/PaymentRepository";
import Payment from "../../domain/entity/Payment";
 import DatabaseConnection from "../database/DatabaseConnection";

export default class PaymentRepositoryDatabase implements PaymentRepository {

	constructor (readonly connection: DatabaseConnection) {
	}

	async savePayment(payment: Payment): Promise<void> {
		await this.connection.query("insert into cccat17.payment (ride_id, status, date, amount) values ($1, $2, $3, $4)", [payment.rideId, payment.status, payment.date   , payment.amount]);
	}
	
 

}
