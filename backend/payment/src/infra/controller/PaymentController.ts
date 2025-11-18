 
import HttpServer from "../http/HttpServer";
import Registry, { inject } from "../di/Registry";
import ProcessPayment from "../../application/usecase/payment/ProcessPayment";

export default class PaymentController {
	@inject("httpServer")
	httpServer!: HttpServer;
	@inject("process")
	process!: ProcessPayment;
	 

	constructor () {
		this.httpServer.register("post", "/process", async (params: any, body: any) => {
			const input = body;
			const output = await this.process.execute(input);
			return output;
		});
		
	}
	
}
