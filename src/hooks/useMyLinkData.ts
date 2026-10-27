"use client";

import { useState, useEffect, useCallback } from "react";
import { MyLinkData, LinkItem } from "@/types/link";
import { MOCK_MYLINK_DATA, LOCAL_STORAGE_KEY } from "@/lib/mockData";

export function useMyLinkData() {
  const [data, setData] = useState<MyLinkData>(MOCK_MYLINK_DATA);
  const [isLoaded, setIsLoaded] = useState(false);

  // 로컬스토리지 초기 시딩 및 동기화
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) {
        // 최초 방문 시 mockData 기반으로 로컬스토리지 자동 시딩
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_MYLINK_DATA));
        setData(MOCK_MYLINK_DATA);
      } else {
        const parsed = JSON.parse(stored);
        setData(parsed);
      }
    } catch (e) {
      console.warn("로컬스토리지 데이터를 불러오는 중 오류가 발생했습니다:", e);
      setData(MOCK_MYLINK_DATA);
    } finally {
      setIsLoaded(true);
    }

    // 다른 탭이나 개발자 도구의 Storage 수정 이벤트 실시간 감지
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
        try {
          setData(JSON.parse(event.newValue));
        } catch (e) {
          console.warn("스토리지 동기화 파싱 오류:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 링크 클릭 수 카운트 증가 및 로컬스토리지 동기화
  const recordClick = useCallback((linkId: string) => {
    setData((prev) => {
      const updatedLinks = prev.links.map((link) =>
        link.id === linkId ? { ...link, clicks: (link.clicks ?? 0) + 1 } : link
      );
      const nextData: MyLinkData = { ...prev, links: updatedLinks };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
      } catch (e) {
        console.warn("클릭 수 저장 실패:", e);
      }
      return nextData;
    });
  }, []);

  // 새 링크 추가 및 로컬스토리지 동기화
  const addLink = useCallback((newLink: Omit<LinkItem, "id" | "createdAt" | "clicks" | "order">) => {
    setData((prev) => {
      const maxOrder = prev.links.reduce((max, l) => Math.max(max, l.order ?? 0), 0);
      const link: LinkItem = {
        ...newLink,
        id: `link-${Date.now()}`,
        clicks: 0,
        order: maxOrder + 1,
        createdAt: new Date().toISOString(),
        isActive: true,
      };
      const nextData: MyLinkData = { ...prev, links: [...prev.links, link] };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextData));
      } catch (e) {
        console.warn("링크 저장 실패:", e);
      }
      return nextData;
    });
  }, []);

  return {
    data,
    profile: data.profile,
    socials: data.socials,
    links: data.links,
    isLoaded,
    recordClick,
    addLink,
  };
}
