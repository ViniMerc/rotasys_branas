"use client";

import RideRequest from "@/app/components/RideRequest";
import { useRouter } from "next/router";
import { useState } from "react";

function App() {
  const [ride, setRide] = useState(new RideRequest());
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
        <div>Progresso {0}%</div>
        <br />

        <div>
          <label>Email</label>
          <input type="text" title="Email" value={ride.email} />
        </div>
        <div>
          <label>Senha</label>
          <input type="text" title="Password" value={ride.password} />
        </div>
        <button>Login</button>
        {ride.accountId && (
          <>
            <div>
              <label>From Lat </label>
              <input type="text" title="Cpf" value={-27.584905257808835} />{" "}
              <label>From Long</label>
              <input type="text" title="Cpf" value={-48.545022195325124} />
            </div>
            <div>
              <div>
                <label>To Lat</label>
                <input title="Senha" value={-27.496887588317275} />
                <label>To Long</label>
                <input title="Senha" value={-48.522234807851476} />
              </div>
              <div>
                <label>Motorista</label>
                <input title="Confirmar" />
              </div>
            </div>
            <button>Próximo</button>
            <button>Confirmar</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
