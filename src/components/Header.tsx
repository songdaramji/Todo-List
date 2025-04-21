import React from "react";
import Image from "next/image"; // next/image 컴포넌트 import

// Header 컴포넌트
const Header = () => {
  return (
    <header className="w-full h-[60px] flex items-center justify-center border-b-1 border-b-slate-200">
      <div className="w-[1188px] h-full flex">
        <Image
          src="/assets/logos/logoText.png" // public/assets/logos/logoText.png 경로로 이미지 설정
          alt="Logo"
          width={151} // 이미지의 width 설정
          height={40} // 이미지의 height 설정
          className="object-contain" // 비율을 유지하면서 크기에 맞게 이미지 표시
        />
      </div>
    </header>
  );
};

export default Header;
