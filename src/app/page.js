import RentinaBanner from "@/components/RentinaBanner";
import Footer from "@/components/shared/Footer";
import WhyChooseRentina from "@/components/WhyChooseRentina";
import HowItWorks from "@/components/HowItworks";

export default function Home() {
  return (
    <main className="">
      <RentinaBanner></RentinaBanner>
      <WhyChooseRentina></WhyChooseRentina>
        <HowItWorks></HowItWorks>
        <Footer></Footer>
    </main>
  );
}