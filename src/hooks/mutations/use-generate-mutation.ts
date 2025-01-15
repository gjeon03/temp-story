import { useMutation, UseMutationOptions } from "react-query";
import { BASE_URL, DefaultResponse } from "../utils/fetcher";
import { AiContentInfo } from "@/context/form-context";
import { generateParagraph } from "@/mocks/data/generate";

export interface GenerateResponseItem {
  title: string;
  content: string;
}

export interface GenerateResponse {
  genRes1: GenerateResponseItem;
  genRes2: GenerateResponseItem;
  genRes3: GenerateResponseItem;
}

export interface GenerateImageInfo {
  geoLat: string;
  geoLong: string;
  imgDtm: string;
}

interface GenerateMutation {
  imgInfo: GenerateImageInfo[];
  ogText: string;
}

const useGenerateMutation = (
  options: UseMutationOptions<GenerateResponse, Error, unknown>,
) => {
  return useMutation({
    mutationKey: "generate",
    mutationFn: async (data: GenerateMutation) => {
      try {
        const response = await fetch(`/api/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log("response", response);

        if (!response.ok) {
          throw new Error("Request failed");
        }

        return response.json();
      } catch (error) {
        console.error("Request failed, loading mock data:", error);
        // Return mock data on failure
        return {
          genRes1: generateParagraph(),
          genRes2: generateParagraph(),
          genRes3: generateParagraph(),
        };
      }
    },
    ...options,
  });
};

const transformToAiContentInfo = (
  data: { [key: string]: string }[],
): AiContentInfo[] => {
  return data.map((item) => {
    const [title, content] = Object.entries(item)[0]; // 첫 번째 key-value 추출
    return { title, content };
  });
};

export { useGenerateMutation, transformToAiContentInfo };
