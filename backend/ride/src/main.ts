
import { PgPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter, HapiAdapter } from "./infra/http/HttpServer";
import Registry from "./infra/di/Registry";
import RideRepositoryDatabase from "./infra/repository/RideRepositoryDatabase";
import AccountGatewayHttp from "./infra/gateway/AccountGatewayHttps";
import { AxiosAdapter } from "./infra/http/HttpClient";
import RequestRide from "./application/usecase/ride/RequestRide";
import PositionRepositoryDatabase from "./infra/repository/PositionRepositoryDatabase";
import GetRide from "./application/usecase/ride/GetRide";
import RideController from "./infra/controller/RideController";

(async () => {
  const connection = new PgPromiseAdapter();
  const httpServer = new ExpressAdapter();
  const httpClient = new AxiosAdapter()
  const rideRepository = new RideRepositoryDatabase(connection)
  const accountGateway = new AccountGatewayHttp(httpClient)
  const requestRide = new RequestRide(rideRepository, accountGateway)
  const positionRepository = new PositionRepositoryDatabase(connection)
  const getRide = new GetRide(rideRepository, accountGateway, positionRepository)
  //   const queue = new RabbitMQAdapter()
  //  await queue.connection()
  //  await queue.setup("rideCompleted", "rideCompleted")

  new RideController(httpServer, requestRide, getRide,)

  httpServer.listen(3001);
})()
