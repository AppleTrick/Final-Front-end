import React, { useState } from "react";
import PaymentService from "/src/services/paymentService";


export const PaymentButton = ({ name, info, pg, pay_method = "card", closeModal, setPremium }) => {
  
const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth()+1 > 10) ? today.getMonth()+1 : "0"+(today.getMonth()+1);
const date = (today.getDate() > 10) ? today.getDate() : "0"+today.getDate();

const callback = async (response) => {
  const {
    success,
    error_msg,
    imp_uid, // 고유 주문번호
    paid_amount, // 결제 금액
    name, // 주문명
    buyer_email,
    pg_provider, // pg사
    pay_method, // 결제수단
    status, // 상태(성공, 실패, 환불 등등)
  } = response;

  const paymentInfo = {
    paymentid: imp_uid,
    memberemail: buyer_email,
    paymentprice: paid_amount,
    paymentdate: `${year}-${month}-${date}`,
    paymentcontent: name,
    paymentkinds: `${pg_provider}-${pay_method}`,
  };
  console.log(paymentInfo.paymentdate)

  if (success) {
    const res = await PaymentService.insert(paymentInfo);
    window.localStorage.setItem("premium","true");
    alert("결제 성공");
    closeModal();
    setPremium("true");
  } else {
    alert(`결제 실패 : ${error_msg}`);
  }
};
const onClickPayment = ({info}) => {
  const { IMP } = window;
  IMP.init(process.env.IAMPORT_IDENTIFICATION_CODE); // 가맹점 식별코드
  let pg = "";
  let pay_method = "";
  if (info.payMethod === "신용카드") {
    pg = "html5_inicis";
    pay_method = "card";
  } else if (info.payMethod === "계좌이체") {
    pg = "html5_inicis";
    pay_method = "trans";
  } else if (info.payMethod === "무통장입금") {
    pg = "html5_inicis";
    pay_method = "vbank";
  } else if (info.payMethod === "카카오페이") {
    pg = "kakaopay";
  } else if (info.payMethod === "페이코") {
    pg = "payco";
  }

  // 결제 데이터 정의
  const data = {
    pg: pg, // PG사 (선택항목)
    pay_method: pay_method, // 결제수단 (필수항목)
    merchant_uid: `mid_${new Date().getTime()}`, // 결제구분번호 (필수항목)
    name: info.name, // 주문명 (필수항목)
    amount: info.price, // 금액 (필수항목)
    buyer_tel: info.phone, // 구매자 전화번호 (필수항목)
    buyer_email: info.email, // 구매자 이메일
  };

  IMP.request_pay(data, callback);
};

return (
<button
    onClick={() => {
      onClickPayment({ info, pg, pay_method, closeModal, setPremium })
    }
  }
    className="px-4 bg-blue-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400"
  >
    {name}
  </button>
)

}
  


