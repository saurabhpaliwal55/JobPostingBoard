import React from 'react'
import HomePage from './components/HomePage.jsx'
import SignUp from './components/SignUp.jsx'
import { Route,Routes } from 'react-router-dom'
import MainComponent from './components/MainComponent.jsx'
import Verify from './components/Verify.jsx'
import CreateInreviw from './components/CreateInreviw.jsx'
import ShowInterviews from './components/ShowInterviews.jsx'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element = {<SignUp/>}/>
        <Route path = 'verify' element = {<Verify/>}></Route>
        <Route path='app' element ={<MainComponent/>}>
          <Route path = 'home' element = {<HomePage/>}></Route>
          <Route path = 'createInterView' element = {<CreateInreviw/>}></Route>
          <Route path = 'showInterviews' element = {<ShowInterviews/>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App