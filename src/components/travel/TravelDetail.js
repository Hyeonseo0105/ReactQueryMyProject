import { Fragment,useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate,useParams } from "react-router-dom";
import apiClient from '../../http-commons'
import { setCookie } from "../util/cookie";

function TravelDetail(){
    const {no}=useParams()
    const nav=useNavigate()
    
    const {isLoading,isError,error,data}=useQuery(['travel-detail',no],
       async () => {
         return await apiClient.get(`/travel/detail/${no}`,

         )
       }
    )

    const {kakao} = window;

    useEffect(()=>{
        if (!data) return;

        const script=document.createElement("script")
        // <script src=""></script>
        script.async=true
        script.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=670578b4696a6fd3733ec8b701528348&autoload=false&libraries=services"
        document.head.appendChild(script)
        /*
            <head>
             <script src=""></script>
            </head>
         */
        script.onload=()=>{
            kakao.maps.load(()=>{
                const mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다
                const map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                const geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(data.data.manage, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+data.data.title+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        }

    },[data])
    
    if(isLoading) return <h1 className="text-center">Loading...</h1>
    if(isError) return <h1 className="text-center">{error}</h1>
    console.log(data)

    setCookie("travel"+no,data.data.poster1)

    return (
        <Fragment>
    <section className="page-section bg-light" id="portfolio">
        <div className="container">
            <div className="row" style={{"marginLeft": "6%"}}>
                <h5 style={{"marginLeft": "7%"}}>{data.data.genre}관광</h5>
                <h3 className={"text-center"}>{data.data.title}</h3>
                <table>
                    <tr>
                        <td width={"33.333%"} align={"center"}>
                            <img src={data.data.poster1} style={{"width":"400px","height":"300px"}}/>
                        </td>
                        <td width={"33.333%"} align={"center"}>
                            <img src={data.data.poster2} style={{"width":"400px","height":"300px"}}/>
                        </td>
                        <td width={"33.333%"} align={"center"}>
                            <img src={data.data.poster3} style={{"width":"400px","height":"300px"}}/>
                        </td>
                    </tr>
                </table>
<div style={{"height": "50px"}}></div>
                <h3 style={{"marginLeft": "7%"}}>기본정보</h3>
                <table className={"table"} style={{"width": "1000px", "marginLeft": "7.5%"}}>
                    <tr style={{"borderTopWidth": "thick"}}>
                        <td width={"15%"} className={"text-center"} style={{"fontWeight": "bold"}}>관리기관</td>
                        <td width={"55%"}>{data.data.address}</td>
                    </tr>
                    <tr>
                        <td width={"15%"} className={"text-center"} style={{"fontWeight": "bold"}}>전화</td>
                        <td width={"55%"}>{data.data.phone}</td>
                    </tr>
                    <tr>
                        <td width={"15%"} className={"text-center"} style={{"fontWeight": "bold"}}>주소</td>
                        <td width={"55%"}>{data.data.manage}</td>
                    </tr>
                </table>
                <div style={{"height": "100px"}}></div>
                <table className={"table"} style={{"marginLeft": "7%", "width": "1000px"}}>
                    <tr><h3>소개</h3></tr>
                    <tr style={{"borderTopWidth": "thick"}}>&nbsp;&nbsp;&nbsp;{data.data.content}</tr>
                </table>
                <div style={{"height": "100px"}}></div>
                <table className={"table"} style={{"marginLeft": "7%"}}>
                    <tr>
                        <td>
                            <div id="map" style={{"width": "1000px", "height": "350px"}}></div>
                        </td>
                    </tr>
                </table>
<div style={{"height": "100px"}}></div>
                <div style={{"marginLeft": "44%"}}>
                    <input type="button" onClick={() => nav(-1)} className={"btn btn-dark btn-social mx-2"} value={"목록"}/>
                </div>
            </div>
        </div>
    </section>
        </Fragment>
    )
}
export default TravelDetail