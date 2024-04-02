import { Fragment,useEffect,useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import apiClient from '../../http-commons'
import Pagination from "react-js-pagination";

function BoardList(){
   const [curpage,setCurpage]=useState(1)
   const {isLoading,isError,error,data,refetch:hitIncrement}=useQuery(['board-list',curpage],
      async () => {
        return await apiClient.get(`/board/list/${curpage}`)
      }
   )

   const pageChange=(page)=>{
    setCurpage(page)
   }

   useEffect(()=>{
    hitIncrement()
   },[isLoading])
   if(isLoading) return <h1 className="text-center">Loading</h1>
   if(isError) return <h1 className="text-center">{error}</h1>
   console.log(data)
   
   return (
     <Fragment>
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className={"row"}>
                    <h3 className={"text-center"}>커뮤니티</h3>
<div style={{"height":"20px"}}></div>
                    <table className={"table"}>
                        <tbody>
                        <tr>
                            <td style={{"borderBottomWidth":"0px"}}>
                                <Link to={"/board/insert"} className={"btn btn-dark btn-social mx-2"}>새글</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className={"table"}>
                        <thead>
                        <tr className={"success"}>
                            <th className={"text-center"} width={"10%"} style={{"borderTopWidth":"thick"}}>번호</th>
                            <th className={"text-center"} width={"45%"} style={{"borderTopWidth":"thick"}}>제목</th>
                            <th className={"text-center"} width={"15%"} style={{"borderTopWidth":"thick"}}>이름</th>
                            <th className={"text-center"} width={"20%"} style={{"borderTopWidth":"thick"}}>작성일</th>
                            <th className={"text-center"} width={"10%"} style={{"borderTopWidth":"thick"}}>조회수</th>
                        </tr>
                        </thead>
                        <tbody>
                            {data.data.bList &&
                                data.data.bList.map((board)=>
                                <tr>
                                <td className={"text-center"} width={"10%"}>{board.no}</td>
                                <td width={"45%"}>
                                    <Link to={"/board/detail/"+board.no} style={{"textDecoration":"none","color":"black","fontWeight":"bold"}}>{board.subject}</Link>
                                </td>
                                <td className={"text-center"} width={"15%"}>{board.name}</td>
                                <td className={"text-center"} width={"20%"}>{board.regdate}</td>
                                <td className={"text-center"} width={"10%"}>{board.hit}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ul className={"pagination"} style={{"marginLeft": "47%", "marginTop": "70px","color":"black"}}>
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

export default BoardList