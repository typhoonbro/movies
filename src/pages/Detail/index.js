import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const imgURL = 'https://image.tmdb.org/t/p';
const imgWidth = '/original'; 

function Detail(){
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
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
                return;
            })
        }
        loadFilme();
        
    },[])


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
                    <h1>{filme.original_title}</h1>
                </div>
            </div>
            <div className='sinopse-holder'>
                <h3 className='sinopse-title'>Sinopse</h3>
                <span className='sinopse-text'>{filme.overview}</span>
                <strong className='rating'>Avaliação: {filme.vote_average}/10</strong>
            </div>
        </div>
    )
}
export default Detail;