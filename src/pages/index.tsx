import { Inter } from "next/font/google";
import Modal from "@/components/Modal";
import CryptoList from "@/components/CryptoList";
import Header from "@/components/Header";
import { useEffect } from "react";
import Table from "@/components/Table";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const modal_id = "my_modal"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/pollingUpdates');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error server polling data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col ${inter.className}`}
    >
      <Header />
      <Table />
      <Modal id={modal_id} innerChild={CryptoList} />
    </main>
  );
}
