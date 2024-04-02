import { Fragment,useState } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

function FoodFind(){
    const [curpage,setCurpage]=useState(1)
    const [search,setSearch]=useState('거제')

    const {isLoading,isError,error,data,refetch:foodFindData}=useQuery(['food-find',curpage],
        async () => {
             return await apiClient.get(`/food/find/${curpage}/${search}`)
        }
    ) 
   
    if(isLoading) return <h1 className="text-center">Loading</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    const pageChange=(page)=>{
       setCurpage(page)
   }
   const find=(e)=>{
       setSearch(e.target.value)
   }
   const findBtn=()=>{
      foodFindData()
   }

   return (
    <Fragment>
    <section className="page-section bg-light" id="portfolio">
    <div className="container">
        <div className="row">
        <input type={"text"} value={search} onChange={find} style={{"width":"417px","marginLeft":"1%"}}/>
        <input type={"button"} className={"btn btn-dark btn-social mx-2"} value={"검색"} onClick={findBtn}/>
<div style={{"height":"50px"}}></div>
        {data.data.ffList && 
            data.data.ffList.map((food) =>
                <div className="col-lg-4 col-sm-6 mb-4">
                    <div className="portfolio-item">
                        <Link to={"/food/detail/" + food.no} style={{"textDecoration":"none","color":"black"}}>
                            <img className="img-fluid" src={food.poster} style={{"width": "416px", "height": "267px"}}/>
                        </Link>
                        <div className="portfolio-caption">
                            <div className="portfolio-caption-heading">{food.name}</div>
                            <div className="portfolio-caption-subheading text-muted">{food.local}</div>
                        </div>
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
export default FoodFind