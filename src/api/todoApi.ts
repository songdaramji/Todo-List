import axios, { AxiosResponse } from "axios"; // axios 임포트

const tenantId = "songjihyun";
const API_ROUTE = `https://assignment-todolist-api.vercel.app/api/${tenantId}`;

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
  memo: string;
  imageUrl: string;
  image: string;
};

type TodoListResponse = TodoItem[];

// 할 일 목록 조회
export const getTodoList = async (
  page: number = 1,
  pageSize: number = 10
): Promise<AxiosResponse<TodoListResponse> | undefined> => {
  try {
    const response = await axios.get<TodoListResponse>(`${API_ROUTE}/items`);
    return response; // AxiosResponse 타입으로 반환
  } catch (error) {
    console.error("할 일 목록을 불러오는 데 실패했습니다.", error);
    return undefined;
  }
};

// 할 일 수정
export const patchTodoList = async (
  itemId: number,
  name: string,
  memo: string,
  imageUrl: string,
  isCompleted: boolean
) => {
  try {
    const response = await axios.patch<TodoListResponse>(
      `${API_ROUTE}/items/${itemId}`, // URL 경로
      {
        name, // request body에 name
        memo, // request body에 memo
        imageUrl, // request body에 imageUrl
        isCompleted, // request body에 isCompleted
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("할 일을 수정하는 데 실패했습니다.", error);
    return undefined;
  }
};

// 할 일 추가
export const postTodoList = async (name: string) => {
  try {
    const response = await axios.post<TodoListResponse>(
      `${API_ROUTE}/items`, // URL 경로
      {
        name, // request body에 name
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("할 일을 추가하는 데 실패했습니다.", error);
    return undefined;
  }
};

// 할 일 상세
export const getTodoDetail = async (
  itemId: number
): Promise<AxiosResponse<TodoItem> | undefined> => {
  try {
    const response = await axios.get<TodoItem>(`${API_ROUTE}/items/${itemId}`);
    return response; // AxiosResponse 타입으로 반환
  } catch (error) {
    console.error("할 일 상세를 불러오는 데 실패했습니다.", error);
    return undefined;
  }
};

// 이미지 업로드
export const postImage = async (formData: FormData) => {
  try {
    const response = await axios.post<{ url: string }>(
      `${API_ROUTE}/images/upload`, // 엔드포인트
      formData, // FormData를 request body에 포함
      {
        headers: {
          "Content-Type": "multipart/form-data", // multipart/form-data로 전송
        },
      }
    );
    return response.data.url; // 응답에서 URL만 반환
  } catch (error) {
    console.error("이미지를 업로드하는 데 실패했습니다.", error);
    return null;
  }
};

export const deleteTodo = async (itemId: number) => {
  try {
    const res = await axios.delete(`${API_ROUTE}/items/${itemId}`);
    return res;
  } catch (error) {
    console.error("할 일을 삭제하는 데 실패했습니다.", error);
    return null;
  }
};
