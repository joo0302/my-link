import { MyLinkData, LinkItem, ApiResponse } from "@/types/link";
import rawData from "@/data/links.json";

export const MOCK_MYLINK_DATA: MyLinkData = rawData as MyLinkData;

export const MOCK_LINKS: LinkItem[] = MOCK_MYLINK_DATA.links;

export const LOCAL_STORAGE_KEY = "mylink_profile_data";

/**
 * Mock API 형태의 응답을 반환하는 유틸리티 함수
 */
export function createMockApiResponse<T>(
  data: T,
  options?: {
    statusCode?: number;
    message?: string;
    total?: number;
    page?: number;
    limit?: number;
  }
): ApiResponse<T> {
  const { statusCode = 200, message = "Success", total = Array.isArray(data) ? data.length : 1, page = 1, limit = 10 } = options || {};

  return {
    success: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
    data,
    meta: {
      total,
      page,
      limit,
      hasMore: total > page * limit,
      timestamp: new Date().toISOString(),
    },
  };
}
