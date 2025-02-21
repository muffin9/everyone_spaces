export default function RefundPolicy() {
  return (
    <section className="flex flex-col my-8">
      <div className="my-4">
        <h2 className="text-3xl font-bold mb-2">환불규정</h2>
        <span className="font-bold">공통</span>
      </div>
      <ul>
        <li>천재지변 등 불가항력적 사유로 인한 취소 시 : 100% 환불</li>
        <li>호스트의 사유로 인한 취소 시 : 100% 환불</li>
        <li>
          결제 후, 3시간 이내 취소 시, 100% 환불됩니다.
          <br /> (단, 이용시작 시간 16시간 이내에 취소 시에는 환불 불가입니다.)
        </li>
        <li>
          견적상품은 예약접수 이후 대관계약서를 통해 환불 규정을 확인하실 수
          있습니다.
        </li>
        <br />
        <li>이용일 기준 10일 전까지 취소 시 : 100% 환불</li>
        <li>이용일 기준 9일 ~ 7일 전까지 취소 시 : 90% 환불</li>
        <li>이용일 기준 6일 ~ 4일 전까지 취소 시 : 50% 환불</li>
        <li>이용일 기준 3일 ~ 당일 취소 시 : 환불 불가</li>
      </ul>
    </section>
  );
}
