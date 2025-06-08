"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100">
      <Button
        className="text-xl px-10 py-6 rounded-full bg-pink-500 hover:bg-pink-600 text-white"
        onClick={() => router.push("/surpresa")}
      >
        Clique aqui 💌
      </Button>
    </div>
  );
}
