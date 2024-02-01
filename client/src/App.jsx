import { stations } from './assets/stations';
import StationsSelection from './components/StationSelection';

function App() {
  return (
    <div className='pt-6 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen'>
      <h1 className="w-screen text-3xl flex items-center justify-center font-bold">Ticket booking System</h1>
      <div className='mt-6 flex items-center justify-center'>
        <StationsSelection stations={stations} />
      </div>
    </div>
  )
}

export default App
