import { NextRequest, NextResponse } from "next/server";
import { MOCK_MYLINK_DATA, createMockApiResponse } from "@/lib/mockData";
import { LinkItem } from "@/types/link";

/**
 * GET /api/links
 * 
 * 쿼리 파라미터 지원:
 * - category: 특정 카테고리만 필터링 (featured, project, career, content, contact)
 * - highlight: 강조 링크만 필터링 (true/false)
 * - activeOnly: 활성화된 링크만 필터링 (기본값 true)
 * - keyword: 제목 및 설명 검색어
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const highlight = searchParams.get("highlight");
  const activeOnly = searchParams.get("activeOnly") !== "false";
  const keyword = searchParams.get("keyword")?.toLowerCase();

  let filteredLinks: LinkItem[] = [...MOCK_MYLINK_DATA.links];

  // 활성 상태 필터링
  if (activeOnly) {
    filteredLinks = filteredLinks.filter((item) => item.isActive !== false);
  }

  // 카테고리 필터링
  if (category) {
    filteredLinks = filteredLinks.filter(
      (item) => item.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // 하이라이트 여부 필터링
  if (highlight !== null && highlight !== undefined) {
    const isHighlight = highlight === "true";
    filteredLinks = filteredLinks.filter(
      (item) => Boolean(item.highlight) === isHighlight
    );
  }

  // 키워드 검색
  if (keyword) {
    filteredLinks = filteredLinks.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.subtitle.toLowerCase().includes(keyword) ||
        item.tag?.toLowerCase().includes(keyword)
    );
  }

  // 순서(order) 기준 정렬
  filteredLinks.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const response = createMockApiResponse(filteredLinks, {
    statusCode: 200,
    message: "링크 목록을 성공적으로 조회했습니다.",
    total: filteredLinks.length,
  });

  return NextResponse.json(response, { status: 200 });
}

/**
 * POST /api/links (새 링크 등록 Mock API)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.url) {
      return NextResponse.json(
        createMockApiResponse(null, {
          statusCode: 400,
          message: "title과 url은 필수 입력 항목입니다.",
        }),
        { status: 400 }
      );
    }

    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || "",
      url: body.url,
      icon: body.icon || "Globe",
      tag: body.tag,
      category: body.category || "project",
      highlight: body.highlight ?? false,
      isExternal: body.isExternal ?? true,
      isActive: true,
      clicks: 0,
      order: MOCK_MYLINK_DATA.links.length + 1,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      createMockApiResponse(newLink, {
        statusCode: 201,
        message: "링크가 성공적으로 등록되었습니다.",
      }),
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      createMockApiResponse(null, {
        statusCode: 500,
        message: "요청을 처리하는 중 오류가 발생했습니다.",
      }),
      { status: 500 }
    );
  }
}
