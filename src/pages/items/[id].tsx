import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import {
  getTodoDetail,
  postImage,
  patchTodoList,
  deleteTodo,
} from "@/api/todoApi"; // API 호출
import Image from "next/image";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo: string;
  imageUrl: string;
};

const DetailPage = () => {
  const [todoDetail, setTodoDetail] = useState<TodoItem>({
    id: 0,
    name: "",
    isCompleted: false,
    memo: "",
    imageUrl: "",
  });
  const [prevTodo, setPrevTodo] = useState<TodoItem>({
    id: 0,
    name: "",
    isCompleted: false,
    memo: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력창 ref

  // 모든 필드를 비교하여 isEditable을 계산
  const isEditable = Object.keys(prevTodo).some(
    (key) =>
      prevTodo[key as keyof TodoItem] !== todoDetail[key as keyof TodoItem]
  );

  const router = useRouter(); // useRouter 훅을 사용하여 라우터 정보를 가져옵니다.

  const { id } = router.query; // URL에서 id 파라미터 추출
  const todoId = id ? Number(id) : null;

  // 할 일 데이터 불러오기
  useEffect(() => {
    const loadTodoList = async () => {
      if (todoId === null) {
        return;
      }
      try {
        const response = await getTodoDetail(todoId);
        if (response && response.data) {
          console.log("할 일 목록:", response);
          setPrevTodo(response.data);
          setTodoDetail(response.data);
        }
        // 올바른 형식으로 데이터 설정
      } catch (error) {
        console.error("할 일 상세를 불러오는 데 실패했습니다.", error);
      }
    };
    loadTodoList();
  }, [todoId]);

  // 이미지 파일 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 첫 번째 파일을 가져옵니다.

    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기가 너무 큽니다. 5MB 이하의 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 형식 검사 (예: 이미지 파일만 허용)
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // FormData 객체를 만들어서 파일을 추가
      const formData = new FormData();
      formData.append("image", file); // 'image' 키로 파일을 추가

      // 이미지 업로드 요청
      const imageUrl = await postImage(formData); // tenantId와 FormData를 전달
      if (imageUrl) {
        handleEdit("imageUrl", imageUrl); // 업로드 후 받은 URL을 상태에 반영
      }
    }
  };

  // 값 변경
  const handleEdit = (selected: string, value: string) => {
    switch (selected) {
      case "check":
        // isCompleted만 업데이트하려면 객체를 복사하고 해당 속성만 업데이트
        setTodoDetail((prev) => ({
          ...prev, // 이전 상태를 복사
          isCompleted: value === "true", // isCompleted 값만 변경
        }));
        break;
      case "name":
        setTodoDetail((prev) => ({
          ...prev, // 이전 상태를 복사
          name: value, // isCompleted 값만 변경
        }));
        break;
      case "imageUrl":
        setTodoDetail((prev) => ({
          ...prev,
          imageUrl: value, // 이미지 URL 업데이트
        }));
        break;
      case "memo":
        setTodoDetail((prev) => ({
          ...prev, // 이전 상태를 복사
          memo: value, // isCompleted 값만 변경
        }));
        break;
    }
  };

  // 파일 선택창 열기
  const handleFileClick = () => {
    fileInputRef.current?.click(); // 파일 입력창 클릭
  };

  // 수정 버튼 클릭
  const handleEditClick = async () => {
    if (todoId === null) {
      return;
    }
    try {
      const res = await patchTodoList(
        todoDetail.id,
        todoDetail.name,
        todoDetail.memo || "",
        todoDetail.imageUrl || "",
        todoDetail.isCompleted
      );

      router.push("/"); // 루트 경로로 이동
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (todoId === null) {
      return;
    }
    try {
      const res = await deleteTodo(todoId);
      router.push("/"); // 루트 경로로 이동
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col w-full h-screen bg-slate-100 items-center">
      <Header />
      <div className="flex flex-col items-center w-7xl h-full bg-white pt-6 gap-6 px-36">
        <div
          className={`w-[996px] h-[64px] rounded-[27px] border-2  ${
            todoDetail.isCompleted && "bg-violet-100"
          } border-slate-900 flex items-center py-2 gap-4 justify-center`}
        >
          {/* 체크박스 이미지를 입력 필드 위에 올리기 */}
          <Image
            src={
              todoDetail.isCompleted
                ? "/assets/icons/checkboxActive.png"
                : "/assets/icons/checkbox.png"
            } // 체크박스 활성화 이미지
            alt="checkbox active"
            width={32} // 이미지 크기 설정
            height={32} // 이미지 크기 설정
            onClick={() => {
              if (todoDetail.isCompleted) {
                handleEdit("check", "false");
              } else {
                handleEdit("check", "true");
              }
            }}
          />
          <input
            value={todoDetail.name}
            className="underline"
            onChange={(e) => handleEdit("name", e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-6">
          {/* 이미지추가 */}
          <div
            className={
              "relative w-96 h-[311px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl"
            }
          >
            {todoDetail.imageUrl && todoDetail.imageUrl !== "" ? (
              <Image
                src={todoDetail.imageUrl}
                alt="image"
                className="rounded-3xl absolute top-0 left-0"
                layout="fill"
              />
            ) : (
              <Image
                src={"/assets/icons/img.png"} // 사진이 없으면 기본 이미지
                alt="image"
                className="rounded-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" // 크기를 맞추기 위해 object-cover 사용
                width={64}
                height={64}
              />
            )}

            {/* 사진 추가 버튼 */}
            <Image
              src={
                todoDetail.imageUrl && todoDetail.imageUrl !== ""
                  ? "/assets/btns/editSmall.png"
                  : "/assets/btns/plusSmall.png"
              } // 사진추가 버튼
              alt="add image"
              className="rounded-3xl absolute bottom-4 right-4 cursor-pointer" // 클릭 가능한 이미지
              width={64}
              height={64}
              onClick={handleFileClick} // 파일 선택창 열기
            />
            {/* 숨겨진 파일 입력창 */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange} // 파일 선택 시 호출
            />
          </div>
          {/* 메모지 */}
          <div className="w-[588px] h-[311px]">
            <div className="relative w-[588px] h-[311px]">
              <Image
                src="/assets/icons/memo.png" // DONE 이미지
                alt="done image"
                layout="fill" // 부모 컨테이너에 맞게 이미지 크기 설정
                className="object-cover rounded-3xl" // 크기를 맞추기 위해 object-cover 사용
              />
              <span className="text-amber-800 font-extrabold absolute top-6 left-1/2 transform -translate-x-1/2 text-center">
                Memo
              </span>
              <textarea
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full p-4 text-slate-800 text-center resize-none min-h-6 max-h-96"
                value={todoDetail.memo}
                onChange={(e) => handleEdit("memo", e.target.value)}
                style={{ height: "auto" }}
              />
            </div>
          </div>
        </div>
        {/* 수정삭제버튼 */}
        <div className="flex w-full justify-end gap-4">
          <Image
            src={
              isEditable
                ? "/assets/btns/editLargeActive.png"
                : "/assets/btns/editLargeDefault.png"
            } // DONE 이미지
            alt="edit"
            width={168}
            height={56}
            onClick={() => {
              if (isEditable) {
                handleEditClick();
              }
            }}
          />
          <Image
            src="/assets/btns/deleteLargeDefault.png" // DONE 이미지
            alt="dlete"
            width={168}
            height={56}
            onClick={() => handleDelete()}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
