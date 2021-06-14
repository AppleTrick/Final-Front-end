import React, { Component } from 'react';

class Kakao extends Component {
    componentDidMount(){
        // kakao head에 스크립트 작성 방법
        const kakaoScript = document.createElement("script");
        kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
        document.head.appendChild(kakaoScript);

        // kakao sdk 스크립트 로드 이후에..

        kakaoScript.onload = () => {
            window.Kakao.init("5254f778c0d41f19460e5400739f2189") // 카카오 api 키
            window.Kakao.Auth.createLoginButton({
                container : "#kakao-login-btn",
                success : (auth) => {
                    console.log("kakao 로그인 완료", auth);
                    // kakao 로그인 성공시 사용자 API 호출
                    window.Kakao.API.request({
                        url : "/v2/user/me",
                        success : (res) => {
                            console.log("kakao사용자 정보",res);
                        },
                        fail : (err) =>{
                            console.log(err);
                        },
                    });
                },
                fail: (err) => {
                    console.log(err);
                }
            })
        }
    }

    render(){
        return <button type="button" id="kakao-login-btn"></button>
    }
}

export default Kakao;