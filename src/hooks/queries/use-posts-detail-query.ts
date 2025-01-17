import { useQuery } from "react-query";
import { DefaultResponse } from "../utils/fetcher";

interface Image {
  imgId: number;
  postId: number;
  geoLat: string;
  geoLong: string;
  imgPath: string;
  imgDtm: string;
  rgstDtm: string;
  thumbYn: string;
  fileName: string;
}

interface BlogDetail {
  postId: number;
  title: string;
  ogText: string;
  aiGenText: string;
  password: string;
  rgstDtm: string;
  chngDtm: null;
  blogImgList: Image[];
}

const usePostsDetailQuery = (id?: string) => {
  return useQuery<BlogDetail>({
    queryKey: ["blog-detail", id],
    queryFn: () => fetch(`${process.env.BASE_URL}/posts/${id}`).then((res) => res.json()),
    enabled: !!id,
  });
};

export default usePostsDetailQuery;
