import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";
import Pagination from "react-js-pagination";

function TravelList(){
    const [curpage,setCurpage]=useState(1)
    const {isLoading,isError,error,data}=useQuery(['travel-list',curpage],
        async () => {
            return await apiClient.get(`/travel/list/${curpage}`)
        }
    )

    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    const pageChange=(page)=>{
        setCurpage(page)
    }

    return (
        <Fragment>
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className="row">
                    {
                        data.data.list &&
                        data.data.list.map((travel)=>
                        <div className="col-lg-4 col-sm-6 mb-4">
                        <div className="portfolio-item">
                            <Link to={"/travel/detail/"+travel.no} style={{"textDecoration":"none","color":"black"}}>
                                <img className="img-fluid" src={travel.poster1} style={{"width": "416px", "height": "267px"}}/>
                            </Link>
                            <Link to={"/travel/detail/"+travel.no} style={{"textDecoration":"none","color":"black"}}>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading" style={{"fontSize":"17px"}}>{travel.title}</div>
                                 </div>
                            </Link>
                        </div>
                    </div>
                        )
                    }
                </div>
                <ul className={"pagination"} style={{"marginLeft":"38%","marginTop": "70px","color":"black"}}>
                <Pagination
                    activePage={curpage}
                    itemsCountPerPage={12}
                    totalItemsCount={data.data.totalpage}
                    pageRangeDisplayed={10}
                    prevPageText={""}
                    nextPageText={""}
                    onChange={pageChange}
                />
                </ul>
            </div>
        </section>
        </Fragment>
    )
}

export default TravelList