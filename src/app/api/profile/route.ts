import { NextResponse } from "next/server";
import { MOCK_MYLINK_DATA, createMockApiResponse } from "@/lib/mockData";

/**
 * GET /api/profile
 * 전체 마이링크 프로필 및 링크 정보 조회 Mock API
 */
export async function GET() {
  const response = createMockApiResponse(MOCK_MYLINK_DATA, {
    statusCode: 200,
    message: "프로필 및 링크 정보를 성공적으로 조회했습니다.",
  });

  return NextResponse.json(response, { status: 200 });
}
