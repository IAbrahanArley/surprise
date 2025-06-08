"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Olá, meu Amor! <span className="text-pink-600">🌸</span>
        Preparada? <span className="text-pink-600">💖</span>
      </h1>
      <h3 className="text-2xl mb-6 text-center">
        Hoje é o nosso dia, e eu preparei minha cartinha para você do meu
        jeitinho! <span className="text-pink-600">🎉</span>
      </h3>
      <p className="text-lg mb-8 text-center">Lembra de aumentar o volume</p>
      <Button
        className="text-xl px-10 py-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white"
        onClick={() => router.push("/surpresa")}
      >
        Clique aqui 💌
      </Button>
    </div>
  );
}
