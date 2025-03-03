'use client';

import {
  loadTossPayments,
  TossPaymentsWidgets,
} from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useModalStore } from '@/stores/useModalStore';
import { Modal } from '../common/Modal';
import { generateOrderId } from '@/lib/utils/order';
import { useAuth } from '@/hooks/useAuth';

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
const customerKey = process.env.NEXT_PUBLIC_TOSS_CUSTOMER_KEY;

export function TossPayment() {
  const [amount, setAmount] = useState({
    currency: 'KRW',
    value: 50_000,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const { isOpen, openModal, closeModal } = useModalStore();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      if (!clientKey || !customerKey) {
        throw new Error('clientKey or customerKey is not set');
      }
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, []);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [amount, widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className="wrapper w-[500px]">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}
        {/* <div>
          <div>
            <label htmlFor="coupon-box">
              <input
                id="coupon-box"
                type="checkbox"
                aria-checked="true"
                disabled={!ready}
                onChange={(event) => {
                  // ------  주문서의 결제 금액이 변경되었을 경우 결제 금액 업데이트 ------
                  setAmount(
                    event.target.checked ? amount - 5_000 : amount + 5_000,
                  );
                }}
              />
              <span>5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div> */}

        {/* 결제하기 버튼 */}
        <Button
          className="w-full"
          disabled={!ready}
          onClick={async () => {
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets?.requestPayment({
                orderId: generateOrderId(),
                orderName: '토스 티셔츠 외 2건',
                successUrl: window.location.origin + '/payment/success',
                failUrl: window.location.origin + '/payment/fail',
                customerEmail: user?.email,
                customerName: user?.fullName,
              });
            } catch (error) {
              // 에러 처리하기
              if (error instanceof Error) {
                openModal({
                  title: '결제 실패',
                  description: `에러: ${error.message}`,
                  type: 'error',
                });
              }
            }
          }}
        >
          결제하기
        </Button>

        <Modal
          isOpen={isOpen}
          onOpenChange={closeModal}
          titleElement="결제 에러"
        >
          <div>
            <h1>결제 실패</h1>
            <p>결제에 실패했습니다.</p>
          </div>
        </Modal>
      </div>
    </div>
  );
}
