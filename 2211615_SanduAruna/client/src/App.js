import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App(){


    return(
        <div> 
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/Register" element={<Register/>} />
                        <Route path="/Login" element={<Login />}/>
                    </Routes>
                   
            </BrowserRouter>
            
        </div> 
    );
}
export default App;