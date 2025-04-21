import React, { useState, useEffect } from "react";
import { getTodoList } from "../api/todoApi"; // API 호출
import CheckList from "@/components/CheckList";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Image from "next/image";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

const MainPage = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  useEffect(() => {
    const loadTodoList = async () => {
      try {
        const response = await getTodoList();
        if (response && response.data) {
          console.log("할 일 목록:", response);
          setTodoList(response.data);
        }
        // 올바른 형식으로 데이터 설정
      } catch (error) {
        console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
      }
    };
    loadTodoList();
  }, []);

  const handleTodo = () => {};
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full items-center">
        <Header />
        <div className="flex w-full h-full mb-4 gap-1 justify-center mt-6">
          <Search />
          <Image
            src="/assets/btns/addbtn.png"
            alt="add button"
            width={168}
            height={56}
          />
        </div>
        <div className="flex gap-4">
          <CheckList todoList={todoList} handleToggle={handleTodo} />{" "}
          {/* CheckList에 상태 전달 */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
