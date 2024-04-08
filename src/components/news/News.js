import { Fragment,useState,useRef } from "react";
import { useQuery } from "react-query";
import apiClient from "../../http-commons"
import { Link } from "react-router-dom";

function News(){
    const [fd,setFd]=useState('경남 여행')
    const fdRef=useRef(null)

    const {isLoading,isError,error,data,refetch:newsFind}=useQuery(['news-list'],
        async () => {
            return await apiClient.get(`/news/list/${fd}`)
        }
    )

    const find=()=>{
        if(fd.trim()==="")
        {
            fdRef.current.focus()
            return
        }
        newsFind()
    }

    if(isLoading) return <h1 className="text-center">서버에서 데이터 지연중...</h1>
    if(isError) return <h1 className="text-center">Error 발생:{error}</h1>
    console.log(data)
    
    return (
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className="row">
            <h3 className="text-center">뉴스 검색</h3>
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <input type="text" size="20" className="input-sm"
                                ref={fdRef} value={fd} onChange={(e)=>setFd(e.target.value)}
                            />&nbsp;
                            <input type={"button"} className={"btn btn-dark btn-social mx-2"} onClick={find} value={"검색"}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div style={{"height":"20px"}}></div>
            { data.data &&
                data.data.map((news)=>
                    <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <span>
                                <Link style={{"color":"#018dbf","textDecoration":"none","fontSize":"20px"}} to={news.link} target="_blacnk" dangerouslySetInnerHTML={{__html:news.title}}></Link>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td dangerouslySetInnerHTML={{__html:news.desc}}></td>
                    </tr>
                </tbody>
            </table>   
                )
            }
            
        </div>
        </div>
        </section>
    )
}

export default News