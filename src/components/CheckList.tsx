import React from "react";
import Image from "next/image";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

interface CheckListProps {
  todoList: TodoItem[];
  handleToggle: (id: number) => void;
}

const CheckList: React.FC<CheckListProps> = ({ todoList, handleToggle }) => {
  return (
    <div className="flex flex-row gap-4 mt-10">
      {/* TO DO 목록 */}
      <div className="flex-1">
        <div className="mb-4">
          <Image
            src="/assets/btns/todo.png" // TO DO 이미지
            alt="todo image"
            width={101}
            height={36}
          />
        </div>
        <div className="flex flex-col gap-4">
          {todoList
            .filter((item) => !item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className="w-[588px] h-[50px] rounded-[27px] border-2 border-slate-900 flex items-center px-3 py-2 gap-4"
              >
                <Image
                  src="/assets/icons/checkbox.png" // 체크박스 이미지
                  alt="checkbox"
                  width={32} // 이미지 크기 설정
                  height={32} // 이미지 크기 설정
                />

                <span>{item.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* DONE 목록 */}
      <div className="flex-1">
        <div className="mb-4">
          <Image
            src="/assets/btns/done.png" // DONE 이미지
            alt="done image"
            width={101}
            height={36}
          />
        </div>

        <div className="flex flex-col gap-4">
          {todoList
            .filter((item) => item.isCompleted)
            .map((item) => (
              <div
                key={item.id}
                className="w-[588px] h-[50px] rounded-[27px] border-2 bg-violet-100 border-slate-900 flex items-center px-3 py-2 gap-4"
              >
                {/* 체크박스 이미지를 입력 필드 위에 올리기 */}
                <Image
                  src="/assets/icons/checkboxActive.png" // 체크박스 활성화 이미지
                  alt="checkbox active"
                  width={32} // 이미지 크기 설정
                  height={32} // 이미지 크기 설정
                />

                <span className="line-through">{item.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CheckList;
