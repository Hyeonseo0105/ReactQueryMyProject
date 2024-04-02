import { useState,useRef } from "react";
import { useMutation } from "react-query";
import apiClient from '../../http-commons'
import { useNavigate } from "react-router-dom";

function BoardInsert(){
   const nameRef=useRef(null)
   const subjectRef=useRef(null)
   const contentRef=useRef(null)
   const pwdRef=useRef(null)

   const [name,setName]=useState('')
   const [subject,setSubject]=useState('')
   const [content,setContent]=useState('')
   const [pwd,setPwd]=useState('')

   const [result,setResult]=useState(null)

   const nav=useNavigate()

   const {isLoading,mutate:freeboardInsert}=useMutation(
      async () => {
        return await apiClient.post(`/board/insert`,{
            name:name,
            subject:subject,
            content:content,
            pwd:pwd 
        })
      },
      {
        onSuccess:(res)=>{
            const resData={
               status:res.status,
               headers:res.headers,
               data:res.data
            }
            setResult(resData)
            if(res.data.msg==="yes")
            {
                window.location.href="/board/list"
            } 
            else
            {
                alert("게시물 추가에 오류가 발생하였습니다")
            }
        }
      },
      {
         onError:(err)=>{
            setResult(err.response)
         }
      }
   )

   const boardInsert=()=>{
     if(name.trim()==="")
     {
        nameRef.current.focus()
        return 
     }
     else if(subject.trim()==="")
     {
        subjectRef.current.focus()
        return 
     }
     else if(content.trim()==="")
     {
        contentRef.current.focus()
        return 
     }
     else if(pwd.trim()==="")
     {
        pwdRef.current.focus()
        return 
     }
     freeboardInsert()
   }

   return (
      <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className={"row"}>
            <h3 className={"text-center"}>글쓰기</h3>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td width={"15%"} className={"text-center"}>이름</td>
                    <td width={"85%"}>
                        <input type={"text"} size={"15"} className={"input-sm"}
                               onChange={(e)=>setName(e.target.value)} value={name} ref={nameRef}
                        />
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>제목</td>
                    <td width={"85%"}>
                        <input type={"text"} size={"50"} className={"input-sm"}
                               onChange={(e)=>setSubject(e.target.value)} value={subject} ref={subjectRef}
                        />
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>내용</td>
                    <td width={"85%"}>
                        <textarea rows={"10"} cols={"52"} onChange={(e)=>setContent(e.target.value)} ref={contentRef}>{content}</textarea>
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>비밀번호</td>
                    <td width={"85%"}>
                        <input type={"password"} size={"15"} className={"input-sm"}
                               onChange={(e)=>setPwd(e.target.value)} value={pwd} ref={pwdRef} 
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={"2"} className={"text-center"}>
                        <input type={"button"} className={"btn btn-dark btn-social mx-2"} value={"작성"} onClick={boardInsert}/>
                        <input type={"button"} className={"btn btn-dark btn-social mx-2"} value={"취소"} onClick={()=>nav(-1)}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
            </div>
      </section>
   )
}
export default BoardInsert
