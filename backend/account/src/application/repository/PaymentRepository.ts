import Payment from "../../domain/entity/Payment";
 
export default interface RideRepository {
	savePayment (payment: Payment): Promise<void>;
 
}
