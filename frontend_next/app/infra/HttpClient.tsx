import HttpClient from "./AccountGateway";


// inversão de dependência (DIP)
export default interface AccountGateway {
    signup(input: any): Promise<any>;
}

// interface adapters
export class AccountGatewayHttp implements AccountGateway {

    constructor(readonly httpClient: HttpClient) {
    }

    signup(input: any): Promise<any> {
        return this.httpClient.post("http://localhost:3000/signup", input);
    }

}

export class AccountGatewayFake implements AccountGateway {

    async signup(input: any): Promise<any> {
        return { accountId: "123456" }
    }

}