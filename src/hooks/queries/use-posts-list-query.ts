import { useQuery } from "react-query";
import { BASE_URL, DefaultResponse } from "../utils/fetcher";
import { markdownToPlainText } from "@/utils/markdown-to-plain-text";
import { generateMockData } from "@/mocks/data/list";
import { getBlogsFromIndexedDB } from "@/utils/indexed-db";
import { BlogPost } from "../mutations/use-blog-post-mutation";

export interface ProcessedBlog {
  postId?: number | string;
  title: string;
  src: string;
  des: string;
}

export interface Blog {
  postId: number;
  title: string;
  ogText: string;
  aiGenText: string;
  password: string;
  rgstDtm: string;
  chngDtm: null;
  thumbHash: {
    thumbGeoLong: string;
    thumbImgPath: string;
    thumbImgId: string;
    thumbGeoLat: string;
  };
}

const usePostsListQuery = () => {
  console.log("usePostsListQuery");
  return useQuery<BlogPost[] | []>({
    queryKey: ["blog-list"],
    queryFn: async () => {
      // 1. IndexedDB에서 데이터 가져오기
      const localBlogs = await getBlogsFromIndexedDB();
      if (localBlogs.length > 0) {
        console.log("Loaded blogs from IndexedDB");
        return localBlogs;
      }
      return [];

      // try {
      //   const response = await fetch(`${BASE_URL}/posts/list`);
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch blog list");
      //   }
      //   return response.json();
      // } catch (error) {
      //   console.error("Fetching failed, using fallback data:", error);
      //   // 기본 데이터 반환
      //   return generateMockData();
      // }
    },
  });
};

// Google Maps LatLngLiteral 타입 변환 함수
const mapToLatLng = (blogs?: BlogPost[]): google.maps.LatLngLiteral[] => {
  console.log("data123: ", blogs);
  // return (
  //   blogs?.map((blog) => ({
  //     lat: parseFloat(blog.thumbHash.thumbGeoLat),
  //     lng: parseFloat(blog.thumbHash.thumbGeoLong),
  //   })) || []
  // );
  return (
    blogs?.map((blog) => ({
      lat: parseFloat(blog.imgSaveList[0].geoLat),
      lng: parseFloat(blog.imgSaveList[0].geoLong),
    })) || []
  );
};

const processBlogs = async (blogs?: BlogPost[]): Promise<ProcessedBlog[]> => {
  if (!blogs) return [];

  console.log("data: ", blogs);

  const processedBlogs = await Promise.all(
    blogs.map(async (blog) => ({
      postId: blog.postId,
      title: blog.title,
      src: blog.imgSaveList[0].imgStream || "",
      des: await markdownToPlainText(blog.aiGenText),
    })),
  );

  return processedBlogs;
};

export { usePostsListQuery, mapToLatLng, processBlogs };
