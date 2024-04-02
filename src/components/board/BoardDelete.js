import { useMutation } from "react-query";
import { useNavigate,useParams } from "react-router-dom";
import apiClient from '../../http-commons'
import { useState,useRef } from "react";
import { Link } from "react-router-dom";

function BoardDelete(){

    const {no} = useParams()
    const nav = useNavigate()
    const pwdRef=useRef(null)
    const [pwd,setPwd]=useState('')
    const {isLoading,mutate:boardDelete}=useMutation(
       async () => {
           return await apiClient.delete(`/board/delete/${no}/${pwd}`)
       },
       {
          onSuccess:(res)=>{
              if(res.data.msg==='yes')
              {
                  window.location.href='/board/list'
              }
              else
              {
                 alert("비밀번호가 틀립니다")
                 setPwd('')
                 pwdRef.current.focus()
              }
          }
       },
       {
          onError:(err)=>{
             console.log(err.response)
          }
       }
    )
    const boardDeleteOk=()=>{
       if(pwd.trim()==="")
       {
          pwdRef.current.focus()
          return 
       }
       boardDelete()
    }
    return (
        <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className="row" style={{"marginLeft":"5%"}}>
                    <div className={"row"}>
<div style={{"height": "50px"}}></div>
                        <table className={"table"}>
                            <tbody>
                            <tr style={{"borderTopWidth": "thick"}}>
                                <td className="text-center">
                                    비밀번호&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" className="input-sm" size="15"
                                        ref={pwdRef} value={pwd}
                                        onChange={(e)=>setPwd(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={"text-center"} colSpan={"4"} style={{"borderBottomWidth": "0px"}}>
                                    <Link onClick={boardDeleteOk} className={"btn btn-dark btn-social mx-2"}>삭제</Link>
                                    <Link onClick={()=>nav(-1)} className={"btn btn-dark btn-social mx-2"}>목록</Link>
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

export default BoardDelete