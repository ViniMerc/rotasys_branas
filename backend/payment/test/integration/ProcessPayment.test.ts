import ProcessPayment from "../../src/application/usecase/payment/ProcessPayment"
import Payment from "../../src/domain/entity/Payment"
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import PaymentGatewayFake from "../../src/infra/gateway/PaymentGatewayFake"
import PaymentRepositoryDatabase from "../../src/infra/repository/PaymentRepositoryDatabase";

let processPayment: ProcessPayment


beforeEach(() => {
    const connection = new PgPromiseAdapter();
    const paymentRepository = new PaymentRepositoryDatabase(connection);

    processPayment = new ProcessPayment(paymentRepository);

});

test("Deve testar o processamento de pagamentos", async function () {

    const payment = new Payment(`""`, `${Math.random()}`, Math.random(), new Date(), "success")

    const newProcessPayment = await processPayment.execute(payment)

    console.log(newProcessPayment)

//    expect(newProcessPayment).toBe("success")

})