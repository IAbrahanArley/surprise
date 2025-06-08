// app/surpresa/page.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import MusicPlayer from "@/components/music-player";
import "keen-slider/keen-slider.min.css";

const images = [
  "/foto1.jpg",
  "/foto2.jpg",
  "/foto3.jpg",
  "/foto4.jpg",
  "/foto5.jpg",
  "/foto6.jpg",
  "/foto7.jpg",
];

const mensagens = [
  "Meu amor, hoje é um dia muito especial...",
  "Um dia que celebramos o nosso amor, a nossa história e tudo o que construímos juntos.",
  "Agradeço por cada momento que passamos juntos, por cada risada, cada abraço e cada troca de olhar apaixonado.",
  "Agradeço a Deus por ter colocado uma mulher tão incrível na minha vida, que me apoia, que me cuida e que está sempre ao meu lado mesmo nos dias difíceis.",
  "Cada dia ao seu lado meu amor por você cresce mais e mais assim como a minha admiração.",
  "Você é uma mulher forte, determinada e cheia de sonhos, e eu quero ter a sorte de estar ao seu lado quando você realizar todos eles.",
  "Que possamos continuar construindo nossa história juntos, com muito amor, carinho e respeito. ",
  "E que Deus nos permita viver muitos e muitos dias dos namorados juntos, sempre compartilhando nossos momentos.",
  "Prometo ser sempre o melhor namorado que eu puder ser, te apoiar em tudo que você fizer e te amar incondicionalmente.",
  "Te amo mil milhões 💖",
];

export default function SurpresaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    drag: true,
    created(slider) {
      setInterval(() => slider.next(), 5000);
    },
  });

  const [mensagemSliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    slides: { perView: 1 },
    drag: true,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });
  const [showTitle, setShowTitle] = useState(false);
  useEffect(() => setShowTitle(true), []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start"
      style={{ backgroundImage: `url('/preview.jpg')` }}
    >
      <div className="relative w-full max-w-md h-[600px] overflow-hidden">
        <div ref={sliderRef} className="keen-slider h-full">
          {images.map((src, i) => (
            <div className="keen-slider__slide relative w-full h-full" key={i}>
              <Image
                src={src}
                alt={`Foto ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 z-10 w-full">
        <Card
          className="w-full max-w-md mt-4  backdrop-blur-sm rounded-t-2xl shadow-lg overflow-hidden rounded-b-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url('/preview.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <CardContent className="p-4 space-y-4">
            {showTitle && (
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center text-xl font-bold text-purple-900"
              >
                Feliz Dia dos Namorados ❤️
              </motion.h2>
            )}

            <MusicPlayer />

            <div className="relative w-full max-w-md h-48 overflow-hidden">
              <div
                ref={mensagemSliderRef}
                className="keen-slider h-full bg-white/90 rounded-md text-xl text-gray-800 leading-relaxed "
              >
                {mensagens.map((texto, index) => (
                  <div
                    className="keen-slider__slide flex items-center justify-center text-center px-4"
                    key={index}
                  >
                    {texto}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-2 space-x-2">
              {mensagens.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full ${
                    idx === currentSlide ? "bg-pink-600" : "bg-gray-300"
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
