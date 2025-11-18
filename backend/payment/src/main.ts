
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { HapiAdapter } from "./infra/http/HttpServer";
import Registry from "./infra/di/Registry";
import ProcessPayment from "./application/usecase/payment/ProcessPayment";
import PaymentController from "./infra/controller/PaymentController";
import PaymentRepositoryDatabase from "./infra/repository/PaymentRepositoryDatabase";

const connection = new PgPromiseAdapter();
const paymentRepository = new PaymentRepositoryDatabase(connection);

const process = new ProcessPayment(paymentRepository);
const httpServer = new HapiAdapter();
Registry.getInstance().provide("httpServer", httpServer);
Registry.getInstance().provide("process", process);

new PaymentController()
httpServer.listen(3002);