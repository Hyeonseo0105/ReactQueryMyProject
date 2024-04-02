import { Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import apiClient from "../../http-commons";
import Pagination from "react-js-pagination";

function FoodList(){

    const [curpage,setCurpage]=useState(1)
    const {isLoading,isError,error,data}=useQuery(['food-list',curpage],
        async () => {
            return await apiClient.get(`/food/list/${curpage}`)
        }
    )

    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    const pageChange=(page)=>{
        setCurpage(page)
    }

    return (
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className="row">
                    {
                        data.data.list &&
                        data.data.list.map((vo)=>
                        <div className="col-lg-4 col-sm-6 mb-4">
                        <div className="portfolio-item">
                            <Link className="portfolio-link" data-bs-toggle="modal" to={"/food/detail/"+vo.no}>
                                <div className="portfolio-hover">
                                    <div className="portfolio-hover-content"></div>
                                </div>
                            </Link>
                            <Link to={"/food/detail/" + vo.no} style={{"textDecoration":"none","color":"black"}}>
                                <img className="img-fluid" src={vo.poster} style={{"width":"416px","height":"267px"}}/>
                            </Link>
                            <div className="portfolio-caption">
                                <div className="portfolio-caption-heading">{vo.name}</div>
                                <div className="portfolio-caption-subheading text-muted">{vo.local}</div>
                            </div>
                        </div>
                    </div>
                        )
                    }
                </div>
                <ul className={"pagination"} style={{"marginLeft": "43.5%", "marginTop": "70px","color":"black"}}>
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
    )
}
export default FoodList