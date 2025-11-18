"use client";

import { useRouter } from "next/router";

function App() {
  const router = useRouter();

  return (
    <div>
      <div>RotaSys</div>
      <button
        onClick={() => {
          router.push("/ride");
        }}
      >
        Solicitar Corrida
      </button>
      <button
        onClick={() => {
          router.push("/account");
        }}
      >
        Cadastro de Contas
      </button>
    </div>
  );
}

export default App;
