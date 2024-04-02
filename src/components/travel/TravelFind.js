import { Fragment,useState } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

function TravelFind(){
    const [curpage,setCurpage]=useState(1)
    const [address,setAddress]=useState('통영')

    const {isLoading,isError,error,data,refetch:travelFindData}=useQuery(['travel-find',curpage],
        async () => {
             return await apiClient.get(`/travel/find/${curpage}/${address}`)
        }
    ) 
   
    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    const pageChange=(page)=>{
       setCurpage(page)
   }
   const find=(e)=>{
       setAddress(e.target.value)
   }
   const findBtn=()=>{
      travelFindData()
   }
   return (
    <Fragment>
    <section className="page-section bg-light" id="portfolio">
    <div className="container">
        <div className="row">
        <input type={"text"} value={address} onChange={find} style={{"width":"417px","marginLeft":"1%"}}/>
        <input type={"button"} className={"btn btn-dark btn-social mx-2"} value={"검색"} onClick={findBtn}/>
<div style={{"height":"50px"}}></div>
        {data.data.tfList && 
            data.data.tfList.map((travel) =>
                <div className="col-lg-4 col-sm-6 mb-4">
                    <div className="portfolio-item">
                        <Link to={"/travel/detail/" + travel.no} style={{"textDecoration":"none","color":"black"}}>
                            <img className="img-fluid" src={travel.poster1} style={{"width": "416px", "height": "267px"}}/>
                        </Link>
                        <Link to={"/travel/detail/" + travel.no} style={{"textDecoration":"none","color":"black"}}>
                            <div className="portfolio-caption">
                                <div className="portfolio-caption-heading" style={{"fontSize":"17px"}}>{travel.title}</div>
                            </div>
                        </Link>
                    </div>
                </div>
                )
            }     
        
<div style={{"height":"10px"}}></div>

        <div className={"text-center"}>
            <ul className={"pagination"} style={{"marginLeft": "46%", "marginTop": "70px"}}>
            <Pagination
               activePage={curpage}
                   itemsCountPerPage={12}
                   totalItemsCount={data.data.count}
                   pageRangeDisplayed={10}
                   prevPageText={""}
                   nextPageText={""}
                   onChange={pageChange}
                   style={{"width":"100%"}}
               />
            </ul>
        </div>
        </div>
    </div>
</section>
   </Fragment>

   )
}
export default TravelFind