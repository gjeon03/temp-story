import { useQuery } from "react-query";
import { BASE_URL, DefaultResponse } from "../utils/fetcher";
import { getBlogPostById } from "@/utils/indexed-db";

interface Image {
  imgId: number;
  postId: number;
  geoLat: string;
  geoLong: string;
  imgPath: string;
  imgDtm: string;
  rgstDtm: string;
  thumbYn: string;
  imgStream?: string;
}

export interface BlogDetail {
  postId: number;
  title: string;
  ogText: string;
  aiGenText: string;
  password: string;
  rgstDtm: string;
  chngDtm: null;
  imgSaveList: Image[];
}

const usePostsDetailQuery = (id?: string) => {
  return useQuery<BlogDetail | null>({
    queryKey: ["blog-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("ID is required");

      // IndexedDB에서 데이터 검색
      const localData = await getBlogPostById(Number(id));

      console.log("Data fetched from IndexedDB:", localData);
      return Promise.resolve(localData); // 로컬 데이터 반환

      // IndexedDB에 데이터가 없으면 네트워크 요청
      // const response = await fetch(`${BASE_URL}/posts/${id}`);
      // if (!response.ok) {
      //   throw new Error("Failed to fetch post from server");
      // }

      // const data = await response.json();
      // console.log("Data fetched from network:", data);
      // return data;
    },
    enabled: !!id,
  });
};

export default usePostsDetailQuery;
