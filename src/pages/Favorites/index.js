import {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
    const [filmes, setFilmes] = useState([]);
    const [emptyList, setEmptyList] = useState(true);
    useEffect(() => {
        function getFilmes() {
            const minhaLista = JSON.parse(localStorage.getItem('filmes'));
            
            setFilmes(minhaLista);
            if(minhaLista == ''){
                
                    setEmptyList(true)
                
            }else {
                setEmptyList(false)
            }
                    

            
        };
        
        getFilmes();
        
    },[useState]);
    function getFilmes() {
        const minhaLista = JSON.parse(localStorage.getItem('filmes'));
        
        setFilmes(minhaLista);
        if(minhaLista == ''){
            
                setEmptyList(true)
            
        }else {
            setEmptyList(false)
        }
                

        
    };
    function excluirFilme(id) {
        let newLista = filmes.filter( (item) => {
            return(
                item.id !== id
            )
        })
        setFilmes(newLista);
        localStorage.setItem('filmes', JSON.stringify(newLista));
        getFilmes();

       
    };

    return(
        <div className='favorites'>
            <h1>Meus Favoritos</h1>
            <div className='favorites-holder'>
                <ul className='list-group'>
                    
                    {emptyList ? <div><h4 className='empty-list'>Ops! Parece que a sua lista está vazia!</h4></div>  : 
                    filmes.map((filme) => {
                        return(
                            <li key={filme.id} className='favorite-item list-group-item'>
                                <div className='details'>
                                    <h4 className='title'>
                                        {filme.title}
                                    </h4>
                                    <div className='button-holder'>
                                        <a className='btn btn-danger' href="#" onClick={() => {excluirFilme(filme.id)}}>Excluir</a>
                                        <Link className='btn btn-primary' to={`/filme/${filme.id}`}>Ver detalhes</Link>
                                    </div>
                                    
                                </div>
                                <div className='movie-img'>
                                    <img src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`} alt={filme.title}/>
                                </div>
                            </li>
                        )
                    }) }
                </ul>
            </div>
        </div>
    )
}
export default Favorites;