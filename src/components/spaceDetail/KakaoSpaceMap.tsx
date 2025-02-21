'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface KakaoSpaceMapProps {
  lat: number;
  lng: number;
}

const KakaoSpaceMap = ({ lat, lng }: KakaoSpaceMapProps) => {
  const kakaoMapRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('static_map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        kakaoMapRef.current = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="static_map" className="w-full h-[300px]" />;
};

export default KakaoSpaceMap;
