import { Fragment } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../util/cookie"

function Footer(){

    const cookies=getAll()
    console.log(cookies.food)
    const key=Object.keys(cookies)
    const value=Object.values(cookies)
    const timages=[]
    const tkeys=[]
    const fimages=[]
    const fkeys=[]
    let j=0;
    let k=0;
    for(let i=key.length-1;i>=0;i--)
    {
        if(key[i].startsWith('travel') && j<4)
        {
            //console.log(value[i])
            timages.push(value[i])
            tkeys.push(key[i])
            j++;
        }
        
    }
    for(let i=key.length-1;i>=0;i--)
    {
        if(key[i].startsWith('food') && k<4)
        {
            fimages.push(value[i])
            fkeys.push(key[i])
            k++;
        }
        
    }

    return(
        <Fragment>
            <footer className="footer py-4">
                <div className="container">
                    <table style={{"float":"left","width":"600px"}}>
                        <tbody>
                            <tr>
                                <td style={{"fontSize":"20px","fontWeight":"bold"}}>최신 방문 여행지</td>
                            </tr>
                            <tr>
                                <td>
                                    {
                                        timages && 
                                        timages.map((img,index)=>
                                        <Link to={"/travel/detail/"+tkeys[index].replace('travel','')}>
                                            <img src={img} style={{"width":"130px","height":"100px","marginRight":"5px"}}/>
                                        </Link>
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{"width":"600px","marginLeft":"700px"}}>
                        <tbody>
                            <tr>
                                <td style={{"fontSize":"20px","fontWeight":"bold"}}>최신 방문 맛집</td>
                            </tr>
                            <tr>
                                <td>
                                    {
                                        fimages && 
                                        fimages.map((img,index)=>
                                        <Link to={"/food/detail/"+fkeys[index].replace('food','')}>
                                            <img src={img} style={{"width":"130px","height":"100px","marginRight":"5px"}}/>
                                        </Link>
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
<div style={{"height":"20px"}}></div>
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-start">Copyright &copy; 임현서</div>
                        <div className="col-lg-4 my-3 my-lg-0"></div>
                        <div class="col-lg-4 text-lg-end">
                            <Link class="link-dark text-decoration-none" to="#!">ReactQueryProject</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
export default Footer