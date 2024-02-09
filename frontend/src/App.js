import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Sidebar from './components/menu.js' 
import Timesheet from './components/timesheet.js';
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
       
       <BrowserRouter>
       <Sidebar/>
<Routes>
  <Route path="/timesheet" element={<Timesheet/>}/>
</Routes>
       
       </BrowserRouter>

     
    </>
  );
}

export default App;
