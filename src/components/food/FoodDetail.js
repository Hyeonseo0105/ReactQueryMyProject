import { Fragment } from "react";
import { useQuery } from "react-query";
import { useNavigate,useParams } from "react-router-dom";
import apiClient from '../../http-commons'
import { setCookie } from "../util/cookie";

function FoodDetail(){

   const {no}=useParams()
   const nav=useNavigate()

   const {isLoading,isError,error,data}=useQuery(['food-detail',no],
      async () => {
        return await apiClient.get(`/food/detail/${no}`)
      }
   )

   if(isLoading) return <h1 className="text-center">Loading...</h1>
   if(isError) return <h1 className="text-center">{error}</h1>
   console.log(data)
   
   setCookie("food"+no,data.data.poster)

   return (
        <Fragment>
            <section className="page-section bg-light" id="portfolio">
                <div className="container">
                    <div className="row" style={{"marginLeft":"5%"}}>
                        <h5 style={{"marginLeft": "7%"}}>{data.data.local}의 맛</h5>
                        <div style={{"height": "20px"}}></div>
                        <h3 className={"text-center"}>{data.data.name}</h3>
                        <p className={"text-center"}>"{data.data.title}"</p>
                        <table className={"table"} style={{"marginLeft": "7%", "width": "1000px"}}>
                            <tr>
                                <td align={"center"}>
                                    <img src={data.data.poster} style={{"width": "700px", "height": "500px","marginLeft":"3.5%"}}/>
                                </td>
                            </tr>
                        </table>
                        <div style={{"height": "40px"}}></div>
                        <table className={"table"} style={{"marginLeft": "7%", "width": "1000px"}}>
                            <tr><h3>소개</h3></tr>
                            <tr style={{"borderTopWidth": "thick"}}>&nbsp;&nbsp;&nbsp;{data.data.content}</tr>
                        </table>
                        <div style={{"height": "100px"}}></div>
                        <div style={{"marginLeft": "45%"}}>
                            <input type="button" onClick={()=>nav(-1)} className={"btn btn-dark btn-social mx-2"} value={"목록"}/>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
   )
}
export default FoodDetail