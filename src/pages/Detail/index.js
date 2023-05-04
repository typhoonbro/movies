import { useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';

const imgURL = 'https://image.tmdb.org/t/p';
const imgWidth = '/original'; 

function Detail(){
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '74048dfa0c3d514d9d355d41d3c9aea5',
                    language: 'pt-BR'
                }
            }).then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate('/', {replace: true})
            })
        }
        loadFilme();
        
    },[id, navigate]);
    function salvarFilme() {
        const list = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(list) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id );

        if(hasFilme){
            toast.warn('Esse filme já está na sua lista de favoritos!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo na sua lista!');
    };

    if(loading){
        return(
            <div>
                <h4 className='loading'>Carregando detalhes...</h4>
            </div>
        )
    }
    return(
        <div className='movie-holder'>
            <div className='movie-backdrop-title' style={{backgroundImage: `url(${imgURL}${imgWidth}${filme.backdrop_path})`}}>
                <div className='backdrop' >
                    <h1>{filme.title}</h1>
                </div>
            </div>
            <div className='sinopse-holder'>
                <h3 className='sinopse-title'>Sinopse</h3>
                <span className='sinopse-text'>{filme.overview}</span>
                <strong className='rating'>Avaliação: {filme.vote_average}/10</strong>
                <span className='genres'> 
                    Gênero(s):
                    {filme.genres.map((filme) => {
                        return(
                            <span key={filme.id}>
                                {" "+filme.name+';'}
                            </span>
                        )
                    })}
                </span>
                
                <div className='button-holder'>
                    <a className='btn btn-primary' href='#' onClick={salvarFilme}>
                        Favoritar
                    </a>
                    <a className='btn btn-primary' href={`https://youtube.com./results?search_query=${filme.title}`} target='blank'>Trailer</a>
                </div>
            </div>
        </div>
    )
}
export default Detail;