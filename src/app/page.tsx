export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-neutral-900 shadow-md border border-gray-100 dark:border-neutral-800 p-8 text-center flex flex-col items-center">
        {/* 프로필 아바타 */}
        <div className="w-24 h-24 mb-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
          민주
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          양민주
        </h1>

        {/* 소개 태그/상태 */}
        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950/50 rounded-full">
          Junior Developer · Problem Solver
        </span>

        {/* 소개글 */}
        <p className="text-gray-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 break-keep">
          사용자 중심의 가치를 코드로 구현하고 성장을 즐기는 개발자입니다. 새로운 기술을 탐구하며 더 나은 사용자 경험과 견고한 서비스를 만들어가고 있습니다.
        </p>

        {/* 심플 링크/버튼 영역 */}
        <div className="w-full pt-4 border-t border-gray-100 dark:border-neutral-800 flex justify-center gap-3 text-xs text-gray-500 dark:text-neutral-400">
          <span>🌱 Learning</span>
          <span>•</span>
          <span>💻 Building</span>
          <span>•</span>
          <span>✨ Connecting</span>
        </div>
      </div>
    </main>
  );
}
