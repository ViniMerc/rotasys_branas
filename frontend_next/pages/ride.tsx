"use client";

import { useRouter } from "next/router";

function App() {
  const router = useRouter();

  return (
    <div>
      RotaSys
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Menu
      </button>

     <div>
         
          <div>Progresso {2}%</div>
          <br />
          <div>{" "}</div>
          <br />
           
            <div>
              <fieldset>
                <div>
                  <input
                    title="passengerOption"
                    type="radio"
                 //   checked={wizard.isPassenger}
                    // onChange={() =>
                    //   reload(() => {
                    //     wizard.isPassenger = !wizard.isPassenger;
                    //     wizard.isDriver = false;
                    //     wizard.carPlate = "";
                    //   })
                 //   }
                  />
                  <label>Passageiro</label>
                </div>

                <div>
                  <input
                    title="driverOption"
                    type="radio"
                    // checked={wizard.isDriver}
                    // onChange={() =>
                    //   reload(() => {
                    //     wizard.isDriver = !wizard.isDriver;
                    //     wizard.isPassenger = false;
                    //   })
                    // }
                  />
                  <label>Motorista</label>
                </div>
              </fieldset>
             
                <div>
                  <input
                    title="carPlate"
                  //  value={wizard.carPlate}
                    type="text"
                    // onChange={(e) =>
                    //   reload(() => (wizard.carPlate = e.target.value))
                    // }
                  />{" "}
                  Placa do carro
                </div>
              
            </div>
         
          
            <div>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  title="Nome"
                //   value={wizard.name}
             //     onChange={(e) => reload(() => (wizard.name = e.target.value))}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="text"
                  title="Email"
               //   value={wizard.email}
                //  onChange={(e) =>
                //    reload(() => (wizard.email = e.target.value))
                //  }
                />
              </div>
              <div>
                <label>Cpf</label>
                <input
                  type="text"
                  title="Cpf"
             //     value={wizard.cpf}
               //   onChange={(e) => reload(() => (wizard.cpf = e.target.value))}
                />
              </div>
            </div>
         
            <div>
              <div>
                <label>Senha</label>
                <input
                  title="Senha"
                  type="password"
           //       value={wizard.password}
                    
                />
              </div>
              <div>
                <label>Confirmação de senha</label>
                <input
                  title="Confirmar"
                  type="password"
           //       value={wizard.confirmPassword}
                 
                />
              </div>
            </div>
          
            <button  >
              Anterior
            </button>
           
           
            <button >Próximo</button>
          
            <button
             
            >
              Confirmar
            </button>
           
        </div>

    </div>
  );
}

export default App;
