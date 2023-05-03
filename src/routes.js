import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';



import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './pages/Error';


function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={ <Home /> } />
                <Route path='/Filme/:id' element={ <Detail /> } />

                <Route path='*' element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;