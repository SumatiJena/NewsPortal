import React from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
// import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



const App=()=>{
 const Apikey=process.env.REACT_APP_NEWS_API;
 console.log(Apikey)
    return(
      <BrowserRouter>
      <div>
      {/* <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      /> */}
      <NavBar/>
      <Routes>
        <Route exact path="/"  element={<News key='general' apikey={Apikey} category={'general'}/>}/>
        <Route exact path="/business"   element={<News key='business' apikey={Apikey} category={'business'}/>}/>
        <Route exact path="/entertainment"  element={<News key='entertainment' apikey={Apikey} category={'entertainment'}/>}/>
        <Route exact path="/health"  element={<News key='health'apikey={Apikey}  category={'health'}/>}/>
        <Route exact path="/technology"  element={<News key='technology' apikey={Apikey} category={'technology'}/>}/>
        <Route exact path="/science"  element={<News key='science' apikey={Apikey} category={'science'}/>}/>
        <Route exact path="/sports"  element={<News key='sports' apikey={Apikey} category={'sports'}/>}/>
      </Routes>
      </div>
      </BrowserRouter>
    )
}

export default App;