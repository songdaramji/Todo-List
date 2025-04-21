import React, { useState } from "react";
import Image from "next/image"; // next/image 컴포넌트 import

interface SearchProps {
  name: string;
  editName: (name: string) => void;
}

// Search 컴포넌트
const Search: React.FC<SearchProps> = ({ name, editName }) => {
  return (
    <div className="relative">
      {/* 이미지 */}
      <Image
        src="/assets/icons/search.png" // public/assets/icons/search.png 경로로 이미지 설정
        alt="search"
        width={1016} // 이미지의 원본 width 설정
        height={56} // 이미지의 원본 height 설정
      />
      {/* 입력 필드 */}
      <input
        type="text"
        className="absolute top-0 left-4 p-2 w-full h-full z-10"
        placeholder="할 일을 입력해주세요"
        value={name}
        onChange={(e) => {
          editName(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
