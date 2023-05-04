import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

const imgURL = 'https://image.tmdb.org/t/p';
const imgSizeWidth = '/w200'; 

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: '74048dfa0c3d514d9d355d41d3c9aea5',
                    language: 'pt-BR',
                    page: 1       
                }
            })
            setFilmes(response.data.results.slice(0,10));
            setLoading(false);
        }
        loadFilmes();
    },[])

    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando...</h2>
            </div>
        )
    }
    return(
        <div className='home-container'>
            <h1>Home</h1>
            <div className='container'>
                <div className='lista-filmes'>
                    {filmes.map((filme) => {
                        return(
                            <article className='filme' key={filme.id}>
                                <h4 className='filme-title'>{filme.title}</h4>
                                <img src={imgURL + imgSizeWidth + filme.poster_path} alt={filme.title}/>
                                <Link className='btn btn-primary' to={'/Filme/'+ filme.id }>Detalhes</Link>
                            </article>
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}
export default Home;