import React from "react";
import Image from "next/image";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo: string;
  imageUrl: string;
};
interface CheckListProps {
  todoList: TodoItem[];
  handleToggle: (item: TodoItem) => void;
}

const CheckList: React.FC<CheckListProps> = ({ todoList, handleToggle }) => {
  const doList = todoList.filter((item) => !item.isCompleted);
  const doneList = todoList.filter((item) => item.isCompleted);
  return (
    <div className="flex flex-row gap-4 mt-10 w-[1176px]">
      {/* TO DO 목록 */}
      <div className="flex-col w-1/2">
        <div className="mb-4">
          <Image
            src="/assets/btns/todo.png" // TO DO 이미지
            alt="todo image"
            width={101}
            height={36}
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          {doList.length == 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/assets/icons/todoLarge.png" // TO DO 이미지
                alt="todo image"
                width={240}
                height={240}
                className="block"
              />
              <span className="block text-center text-base text-slate-400">
                할 일이 없어요.
                <br />
                TODO를 새롭게 추가해주세요!
              </span>
            </div>
          ) : (
            doList.map((item) => (
              <div
                key={item.id}
                className="h-[50px] rounded-[27px] border-2 border-slate-900 flex items-center px-3 py-2 gap-4"
              >
                <Image
                  src="/assets/icons/checkbox.png" // 체크박스 이미지
                  alt="checkbox"
                  width={32} // 이미지 크기 설정
                  height={32} // 이미지 크기 설정
                  onClick={() => handleToggle(item)}
                />

                <span>{item.name}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* DONE 목록 */}
      <div className="flex-col w-1/2">
        <div className="mb-4">
          <Image
            src="/assets/btns/done.png" // DONE 이미지
            alt="done image"
            width={101}
            height={36}
          />
        </div>

        <div className="flex flex-col gap-4">
          {doneList.length == 0 ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/assets/icons/doneLarge.png" // TO DO 이미지
                alt="done image"
                width={240}
                height={240}
                className="block"
              />
              <span className="block text-center text-base text-slate-400">
                아직 다 한 일이 없어요.
                <br />
                해야 할 일을 체크해보세요!
              </span>
            </div>
          ) : (
            doneList.map((item) => (
              <div
                key={item.id}
                className="h-[50px] rounded-[27px] border-2 bg-violet-100 border-slate-900 flex items-center px-3 py-2 gap-4"
              >
                {/* 체크박스 이미지를 입력 필드 위에 올리기 */}
                <Image
                  src="/assets/icons/checkboxActive.png" // 체크박스 활성화 이미지
                  alt="checkbox active"
                  width={32} // 이미지 크기 설정
                  height={32} // 이미지 크기 설정
                  onClick={() => handleToggle(item)}
                />

                <span className="line-through">{item.name}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckList;
