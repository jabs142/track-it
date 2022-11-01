import LoginForm from "./components/LoginForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import CreateHolidayForm from "./components/CreateHolidayForm";
import Homepage from "./components/Homepage";
import CreateAccount from "./components/CreateAccount";
import Income from "./components/Income";
import IncomeList from "./components/IncomeList";
//import Dashboard from "./components/Dashboard";
import Team from "./components/Team"
import TrackIt from "./components/TrackIt";
import Edit from './components/Edit';
import Settings from './components/Settings'
import { useState } from "react";
//import LoginForm from "./components/LoginForm";

function App() {

  return (
    <>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginForm /> }/>
      <Route path='/CreateAccount' element={<CreateAccount/>}/>
      <Route path='/Homepage' element={<Homepage />}/>
      {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
      <Route path='/Homepage/Income' element={<Income/>}/>
      <Route path='/Homepage/Incomelist' element={<IncomeList/>}/>
      <Route path='/Team' element={<Team/>} />
      <Route path='/TrackIt' element={<TrackIt/>} />
      <Route path='/Edit' element={<Edit/>} />
      <Route path='/Settings' element={<Settings/>} />
      {/* <Route path="/holidays" element={<p>All Holidays</p>} />
      <Route path="/holidays/new" element={<CreateHolidayForm />} /> */}
    </Routes>
  </BrowserRouter>
    </>
    

  );
}

export default App;