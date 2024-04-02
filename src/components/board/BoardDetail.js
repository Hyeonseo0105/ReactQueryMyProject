import { useQuery } from "react-query";
import apiClient from '../../http-commons'
import { useParams,Link } from "react-router-dom";
import { useEffect } from "react";

function BoardDetail(){
   const {no}=useParams()
   const {isLoading,isError,error,data,refetch:boardDetail}=useQuery(['board-detail',no],
     async () => {
        return await apiClient.get(`/board/detail/${no}`)
     }
   )

   useEffect(()=>{
      boardDetail()
   },[isLoading])

   if(isLoading) return <h1 className="text-center">Loading...</h1>
   if(isError) return <h1 className="text-center">{error}</h1>
   console.log(data)

   return (
    <section className="page-section bg-light" id="portfolio">
    <div className="container">
        <div className="row" style={{"marginLeft":"5%"}}>
            <div className={"row"}>
                <h3 className={"text-center"}>{data.data.subject}</h3>
<div style={{"height": "50px"}}></div>
                <table className={"table"}>
                    <tbody>
                    <tr style={{"borderTopWidth": "thick"}}>
                        <td className={"text-center success"} width={"20%"} style={{"backgroundColor":"#dee2e6"}}>번호</td>
                        <td className={"text-center"} width={"30%"}>{data.data.no}</td>
                        <td className={"text-center success"} width={"20%"} style={{"backgroundColor":"#dee2e6"}}>작성일</td>
                        <td className={"text-center"} width={"30%"}>{data.data.regdate}</td>
                    </tr>
                    <tr>
                        <td className={"text-center success"} width={"20%"} style={{"backgroundColor":"#dee2e6"}}>이름</td>
                        <td className={"text-center"} width={"30%"}>{data.data.name}</td>
                        <td className={"text-center success"} width={"20%"} style={{"backgroundColor":"#dee2e6"}}>조회수</td>
                        <td className={"text-center"} width={"30%"}>{data.data.hit}</td>
                    </tr>
                    <tr>
                        <td className={"text-left"} height={"200"} colSpan={"4"} valign={"top"}>
                            <pre style={{"whiteSpace": "pre-wrap", "border": "none"}}>{data.data.content}</pre>
                        </td>
                    </tr>
                    <tr>
                        <td className={"text-center"} colSpan={"4"} style={{"borderBottomWidth": "0px"}}>
                            <Link to={"/board/update/" + no} className={"btn btn-dark btn-social mx-2"}>수정</Link>
                            <Link to={"/board/delete/" + no} className={"btn btn-dark btn-social mx-2"}>삭제</Link>
                            <Link to={"/board/list"} className={"btn btn-dark btn-social mx-2"}>목록</Link>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>
   )
}

export default BoardDetail