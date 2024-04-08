import { Fragment,useState,useRef } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import apiClient from '../../http-commons'

function Header(){
    
    const [login,setLogin]=useState(false)
    const [id,setId]=useState('')
    const [pwd,setPwd]=useState('')
    const idRef=useRef(null)
    const pwdRef=useRef(null)
    const {isLoading,data,refetch:loginOk}=useQuery(['login-ok'],
       async () => {
         return await apiClient.get(`/member/login/${id}/${pwd}`)
       },
       {
          onSuccess:(res)=>{
             if(res.data.msg==="NOID")
             {
                 alert("아이디를 다시 입력해 주세요")
                 setId('')
                 setPwd('')
                 idRef.current.focus()
             }
             else if(res.data.msg==="NOPWD")
             {
                 alert("비밀번호를 다시 입력해 주세요")
                 setPwd('')
                 pwdRef.current.focus()
             }
             else if(res.data.msg==="OK")
             {
                 window.sessionStorage.setItem("id",res.data.id)
                 window.sessionStorage.setItem("name",res.data.name)
                 setLogin(true)
             }
          }
       },
       {
          onError:(err)=>{
             console.log(err.response)
          }
       }
    )
    const memberLogin=()=>{
       if(id.trim()==="")
       {
         idRef.current.focus()
         return
       }
       else if(pwd.trim()==="")
       {
         pwdRef.current.focus()
         return 
       }

       loginOk()
    }
    const memberLogout=()=>{
       window.sessionStorage.clear();
       setId('')
       setPwd('')
       setLogin(false)
    }

    return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand" to={"/"}>Travel&Food</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars ms-1"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link className="nav-link" to={"/travel/list"}>여행지</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/food/list"}>대표음식</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/travel/find"}>여행지검색</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/food/find"}>음식검색</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/board/list"}>커뮤니티</Link></li>
                            <li className="nav-item"><Link className="nav-link" to={"/news"}>뉴스</Link></li>
                            <li className="nav-item">
                            {
                                !login &&
                                <div className="login" style={{"fontWeight":"bold"}}>
                                    ID&nbsp;&nbsp;<input type="text" size={"10"} className="input-sm"
                                        onChange={(e)=>setId(e.target.value)} 
                                        ref={idRef}
                                        value={id}
                                        style={{"borderColor":"#0a1949","borderRadius":"10px"}}
                                    />&nbsp;
                                    PWD&nbsp;&nbsp;<input type="password" size={"10"} className="input-sm"
                                        onChange={(e)=>setPwd(e.target.value)}
                                        ref={pwdRef}
                                        value={pwd}
                                        style={{"borderColor":"#0a1949","borderRadius":"10px"}}
                                    />&nbsp;
                                    <button className={"btn btn-dark btn-social mx-2"} onClick={memberLogin}>login</button>
                                </div>
                            }
                            {
                                login &&
                                <div className="login" style={{"fontWeight":"bold"}}>
                                    {window.sessionStorage.getItem("name")}님 환영합니다&nbsp;
                                    <button className={"btn btn-dark btn-social mx-2"} onClick={memberLogout} style={{"width":"2.9rem"}}>logout</button>
                                </div>
                            }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header className="masthead">
                <div className="container">
                    <div className="masthead-heading">경남관광</div>
                </div>
            </header>
        </Fragment>
    )
}

export default Header