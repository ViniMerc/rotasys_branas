import GetPayment from "../../src/application/usecase/payment/GetPayment";
import ProcessPayment from "../../src/application/usecase/payment/ProcessPayment"
import Payment from "../../src/domain/entity/Payment"
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import PaymentGatewayFake from "../../src/infra/gateway/PaymentGatewayFake"
import PaymentRepositoryDatabase from "../../src/infra/repository/PaymentRepositoryDatabase";

let processPayment: ProcessPayment
let getPayment: GetPayment


beforeEach(() => {
    const connection = new PgPromiseAdapter();
    const paymentRepository = new PaymentRepositoryDatabase(connection);
    processPayment = new ProcessPayment(paymentRepository);
    getPayment = new GetPayment(paymentRepository)
});

test("Deve testar o processamento de pagamentos", async function () {
    const input = {
        rideId: crypto.randomUUID(),
        amount: 10,
        date: new Date(),
        status: "Success"
    }
    const processedPayment = await processPayment.execute(input)
    const processedPaymentOnBank = await getPayment.execute(processedPayment.transactionId)
    expect(processedPaymentOnBank.transactionId).toBe(processedPayment.transactionId)
})