import { Fragment } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
import { Link } from "react-router-dom";

function Home(){
    const {isLoading,isError,error,data}=useQuery("main-data",
        async () => {
            return await apiClient.get(`/main`)
        }
    )
    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    
    return (
        <Fragment>
            <section className="page-section bg-light" id="portfolio">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">추천 여행지</h2>
                        <h3 className="section-subheading text-muted"></h3>
                    </div>
                    <div className="row">
                    {
                                data.data.list &&
                                data.data.list.map((vo)=>
                                <div className="col-lg-4 col-sm-6 mb-4">
                        <div className="portfolio-item">
                            
                            <Link className="portfolio-link" data-bs-toggle="modal" to="#portfolioModal1">
                                <div className="portfolio-hover">
                                    <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x"></i>
                                    </div>
                                </div>
                            </Link>
                            <Link to={"/travel/detail/" + vo.no} style={{"textDecoration":"none","color":"black"}}>
                                <img className="img-fluid" src={vo.poster1} style={{"width":"416px","height":"267px"}}/>
                            </Link>
                            <div className="portfolio-caption">
                                <div className="portfolio-caption-heading">{vo.title}</div>
                            </div>
                        </div>
                    </div>
                                )
                            }    
                    
                    </div>
                </div>
            </section>
            <section className="page-section" id="about">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">추천 루트</h2>
                    </div>
                    <div style={{"height": "30px"}}></div>
                    <ul className={"timeline"}>
                            {
                                data.data.tlist &&
                                data.data.tlist.map((tvo)=>
                                <li>
                                <div className="timeline-image">
                                    <Link to={"/travel/detail/" + tvo.no}><img className="rounded-circle img-fluid" src={tvo.poster1}
                                          style={{"width": "170px", "height": "170px"}}/></Link>
                                    </div>
                                <div className="timeline-panel">
                                    <div className="timeline-heading" style={{"marginTop":"6%"}}>
                                        <h4>산청</h4>
                                        <h4 className="subheading">{tvo.title}</h4>
                                    </div>
                                    <div className="timeline-body"><p className="text-muted"></p></div>
                                </div>
                            </li>
                                )
                            }
                            {
                                data.data.flist &&
                                data.data.flist.map((fvo)=>
                                <li className="timeline-inverted">
                                    <div className="timeline-image">
                                        <Link to={"/food/detail/" + fvo.no}><img className="rounded-circle img-fluid" src={fvo.poster}
                                            style={{"width": "170px", "height": "170px"}}/></Link>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-heading">
                                            <h4>{fvo.local}</h4>
                                            <h4 className="subheading">{fvo.name}</h4>
                                        </div>
                                        <div className="timeline-body"><p className="text-muted">{fvo.title}</p>
                                        </div>
                                    </div>
                                </li>
                                )
                            }
                    </ul>
                </div>
            </section>
        </Fragment>
    )
}
export default Home