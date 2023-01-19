import './styles/global.css';
import { Header } from "./components/header";
import { SummaryTable } from "./components/summaryTable";


//css sendo aplicado pelo tailwind. Lembrar: na escrita do tailwind tudo é multiplicado por 4, ou seja gap-16 não é um gap de 16px, e sim de 64px
export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}

