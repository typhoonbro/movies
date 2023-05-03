import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <div className="row">
                <div className="container-fluid">
                    <ul>
                        <Link className="logo" to='/'>Movies Tex</Link>
                        <Link className="favoritos" to='/favoritos'>Meus Filmes</Link>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;