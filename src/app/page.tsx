import Image from "next/image";
import ImgHome from "./assets/homeImg.png";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">
        Atendimentos, Clientes
      </h1>
      <Image
        src={ImgHome}
        alt="icons"
        width={600}
        quality={100}
        priority={true}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
