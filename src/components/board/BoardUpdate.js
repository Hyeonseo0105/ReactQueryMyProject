import { useParams,useNavigate } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import apiClient from '../../http-commons'
import { useRef,useState,useEffect } from "react";

function BoardUpdate(){
  const {no} = useParams()
  const nav = useNavigate()

  const nameRef=useRef(null)
  const subjectRef=useRef(null)
  const contentRef=useRef(null)
  const pwdRef=useRef(null)

  const [name,setName]=useState('')
  const [subject,setSubject]=useState('')
  const [content,setContent]=useState('')
  const [pwd,setPwd]=useState('')
  const [result,setResult]=useState(null)

  const {data}=useQuery(['board-update',no],
     async () => {
       return await apiClient.get(`/board/update/${no}`)
     },
     {
        onSuccess:(res)=>{
            setName(res.data.name)
            setSubject(res.data.subject)
            setContent(res.data.content)
        }
     },
     {
         onError:(err)=>{
           console.log(err.response)
         }
     }
  )

  const {mutate:boardUpdate}=useMutation(
     async () => {
       return await apiClient.put(`/board/update_ok/${no}`,{
          name:name,
          subject:subject,
          content:content,
          pwd:pwd
       })
     },
     {
        onSuccess:(res)=>{
           
           if(res.data.msg==="yes")
           {
               window.location.href='/board/detail/'+no
           }
           else
           {
               alert("비밀번호를 다시 입력해 주세요")
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
  const boardUpdateok=()=>{
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
   boardUpdate()
  }
  
  return (
    <section className="page-section bg-light" id="portfolio">
            <div className="container">
                <div className={"row"}>
                    <h3 className={"text-center"}>수정하기</h3>
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
                        <textarea rows={"10"} cols={"52"}
                          onChange={(e)=>setContent(e.target.value)}ref={contentRef} value={content}>
                          </textarea>
                    </td>
                </tr>
                <tr>
                    <td width={"15%"} className={"text-center"}>비밀번호</td>
                    <td width={"85%"}>
                        <input type={"password"} size={"15"} className={"input-sm"}
                          onChange={(e)=>setPwd(e.target.value)} ref={pwdRef} value={pwd}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={"2"} className={"text-center"}>
                        <input type={"button"} className={"btn btn-dark btn-social mx-2"} value={"수정"} onClick={boardUpdateok}/>
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
export default BoardUpdate
