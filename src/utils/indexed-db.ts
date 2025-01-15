import { BlogPost } from "@/hooks/mutations/use-blog-post-mutation";
import { BlogDetail } from "@/hooks/queries/use-posts-detail-query";
import { Blog } from "@/hooks/queries/use-posts-list-query";
import { openDB } from "idb";

const DB_NAME = "blogDB";
const STORE_NAME = "blogPosts";

// IndexedDB 초기화
export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// IndexedDB에서 블로그 리스트 가져오기
export const getBlogsFromIndexedDB = async (): Promise<BlogPost[]> => {
  const db = await initDB();
  const [data, keys] = await Promise.all([
    db.getAll(STORE_NAME),
    db.getAllKeys(STORE_NAME),
  ]);

  // 데이터와 키를 매핑하여 반환
  return data.map((item, index) => ({
    ...item,
    postId: keys[index] as number, // 각 데이터에 id 추가
  }));
};

// 데이터 저장
export const saveBlogPost = async (blogPost: BlogPost): Promise<number> => {
  const db = await initDB();
  //   const id = await db.add(STORE_NAME, blogPost);

  const updatedImgSaveList = blogPost.imgSaveList.map((imgInfo, index) => {
    const file = blogPost.files?.[index]; // files가 undefined일 때를 방지
    if (file) {
      return {
        ...imgInfo,
        imgPath: URL.createObjectURL(file), // 파일 경로 생성
      };
    }
    console.warn(`File missing for image at index ${index}`);
    return imgInfo; // 파일이 없는 경우 경로 없이 반환
  });

  // 업데이트된 데이터로 저장
  const updatedBlogPost = {
    ...blogPost,
    imgSaveList: updatedImgSaveList,
    files: undefined, // files는 저장하지 않음
  };

  const id = await db.add(STORE_NAME, updatedBlogPost);

  return id as number;
};

// 특정 ID로 데이터 가져오기
export const getBlogPostById = async (
  id: number,
): Promise<BlogDetail | null> => {
  const db = await initDB();
  const post = await db.get(STORE_NAME, id);
  return post || null;
};

// 데이터 불러오기
export const getBlogPosts = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

// 특정 데이터 삭제
export const deleteBlogPost = async (id: number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};

// 전체 데이터 삭제
export const clearBlogPosts = async () => {
  const db = await initDB();
  return db.clear(STORE_NAME);
};
