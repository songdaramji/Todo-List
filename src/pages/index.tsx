import React, { useState, useEffect } from "react";
import { getTodoList, patchTodoList, postTodoList } from "../api/todoApi"; // API 호출
import CheckList from "@/components/CheckList";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Image from "next/image";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo: string;
  imageUrl: string;
};

const MainPage = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [refresh, setRefresh] = useState<Boolean>(true);
  const [name, setName] = useState<string>("");

  // 할 일 리스트업
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
  }, [refresh]);

  // 할 일 상태 변경
  const handleTodo = async (item: TodoItem) => {
    const res = await patchTodoList(
      item.id,
      item.name,
      item.memo,
      item.imageUrl,
      !item.isCompleted
    );
    setRefresh((prev) => !prev);
  };

  // 할 일 추가
  const handlePost = async () => {
    if (name.trim() === "") {
      console.error("할 일을 입력하세요.");
      return;
    }
    const res = await postTodoList(name);
    setName(""); // 추가 후 이름 비우기
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full items-center">
        <Header />
        <div className="flex w-full h-full mb-4 gap-1 justify-center mt-6">
          <Search name={name} editName={setName} />
          {name == "" ? (
            <Image
              src="/assets/btns/addbtn.png"
              alt="add button"
              width={168}
              height={56}
            />
          ) : (
            <Image
              src="/assets/btns/addLargeActive.png"
              alt="add button"
              width={168}
              height={56}
              onClick={handlePost}
            />
          )}
        </div>
        <div className="flex gap-4">
          <CheckList todoList={todoList} handleToggle={handleTodo} />{" "}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
