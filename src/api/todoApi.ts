import axios, { AxiosResponse } from "axios"; // axios 임포트

const API_ROUTE = "https://assignment-todolist-api.vercel.app/api";

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type TodoListResponse = TodoItem[];
// 할 일 목록 조회 (GET 요청) 함수
export const getTodoList = async (
  page: number = 1,
  pageSize: number = 10
): Promise<AxiosResponse<TodoListResponse> | undefined> => {
  try {
    const response = await axios.get<TodoListResponse>(
      `${API_ROUTE}/tenantId/items`
    );
    return response; // AxiosResponse 타입으로 반환
  } catch (error) {
    console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
    return undefined;
  }
};

export const patchTodoList = async (
  tenantId: string,
  itemId: number,
  name: string,
  memo: string,
  imageUrl: string,
  isCompleted: boolean
) => {
  try {
    const response = await axios.patch<TodoListResponse>(
      `${API_ROUTE}/tenantId/items/${itemId}`, // URL 경로
      {
        name, // request body에 name
        memo, // request body에 memo
        imageUrl, // request body에 imageUrl
        isCompleted, // request body에 isCompleted
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("할 일을 업데이트하는 데 실패했습니다.", error);
    return undefined;
  }
};
