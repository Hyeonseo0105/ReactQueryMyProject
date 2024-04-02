import { Fragment } from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>Travel&Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link className="nav-link" to={"/travel/list"}>여행지</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/food/list"}>대표음식</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/travel/find"}>여행지검색</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/food/find"}>음식검색</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/board/list"}>커뮤니티</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead">
                <div className="container">
                    <div className="masthead-heading">경남관광</div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header