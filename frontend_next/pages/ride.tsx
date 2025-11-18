"use client";

import RideRequest from "@/app/components/RideRequest";
import { useRouter } from "next/router";
import { useState } from "react";

function RidePage() {
  const [ride, setRide] = useState(new RideRequest());
  const router = useRouter();

  async function reload(fn: any) {
    if (fn) {
      await fn();
    }
    const cloneData = clone(ride);
    setRide(cloneData);
  }

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
        {!ride.accountId && (
          <>
            <div>
              <label>Email</label>
              <input
                type="text"
                title="Email"
                value={ride.email}
                onChange={(e) => {
                  reload(() => (ride.email = e.target.value));
                }}
              />
            </div>
            <div>
              <label>Senha</label>
              <input
                type="text"
                title="Password"
                value={ride.password}
                onChange={(e) => {
                  reload(() => (ride.password = e.target.value));
                }}
              />
            </div>
            <button
              onClick={() =>
                reload(() => {
                  ride.login();
                  ride.updateId();
                })
              }
            >
              Login
            </button>
          </>
        )}

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

            <button
              onClick={() =>
                reload(() => {
                  ride.requestRide();
                })
              }
            >
              Solicitar Corrida
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function clone(obj: any) {
  var copy = new obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

export default RidePage;
