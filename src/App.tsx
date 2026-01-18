import { useState, useEffect, useRef } from 'react';
  // Thông báo gợi ý (toast)
  
import { supabase } from './supabaseClient';

// --- CẤU HÌNH DATA (GIỮ NGUYÊN) ---
const RAW_DATA = [
  { q: "Vì sao Hồ Chí Minh coi đạo đức là gốc của người cách mạng?", a: "Vì không có đạo đức thì dù tài giỏi cũng không lãnh đạo được nhân dân." },
  { q: "Điều gì làm nên uy tín của một Đảng cầm quyền?", a: "Sự gương mẫu, đạo đức và niềm tin của nhân dân." },
  { q: "Đảng mất niềm tin của nhân dân khi nào?", a: "Khi cán bộ suy thoái đạo đức và xa rời thực tiễn." },
  { q: "Quan liêu gây ra hậu quả gì đối với Đảng?", a: "Làm Đảng xa dân và suy yếu vai trò lãnh đạo." },
  { q: "Người lãnh đạo khác người cai trị ở điểm nào?", a: "Người lãnh đạo phục vụ nhân dân, không đứng trên nhân dân." },
  { q: "Vì sao Hồ Chí Minh yêu cầu cán bộ phải gần dân?", a: "Để hiểu dân, học dân và phục vụ dân tốt hơn." },
  { q: "Niềm tin của nhân dân được tạo dựng bằng cách nào?", a: "Bằng hành động thực tế chứ không chỉ bằng lời nói." },
  { q: "Nêu gương có vai trò gì trong xây dựng Đảng?", a: "Giúp thuyết phục và lan tỏa giá trị đạo đức." },
  { q: "Cán bộ được Hồ Chí Minh ví như ai?", a: "Là công bộc của nhân dân." },
  { q: "Vì sao quyền lực cần được kiểm soát?", a: "Vì quyền lực không kiểm soát dễ dẫn đến tha hóa." },
  { q: "Sự tha hóa của cán bộ bắt nguồn từ đâu?", a: "Từ việc buông lỏng đạo đức và kỷ luật." },
  { q: "Phê bình và tự phê bình có ý nghĩa gì?", a: "Giúp sửa chữa sai lầm và làm Đảng trong sạch hơn." },
  { q: "Phê bình đúng đắn cần dựa trên nguyên tắc nào?", a: "Trung thực, xây dựng và vì lợi ích chung." },
  { q: "Dân chủ có vai trò gì trong tư tưởng Hồ Chí Minh?", a: "Giúp nhân dân tham gia và giám sát quyền lực." },
  { q: "Dân chủ được thể hiện rõ nhất ở đâu?", a: "Ở việc nhân dân được biết, bàn, làm và kiểm tra." },
  { q: "Vì sao Hồ Chí Minh coi nhân dân là gốc?", a: "Vì nhân dân quyết định sức mạnh của cách mạng." },
  { q: "Sức mạnh của Đảng đến từ đâu?", a: "Từ sự ủng hộ và tin tưởng của nhân dân." },
  { q: "Thanh niên giữ vai trò gì trong sự nghiệp cách mạng?", a: "Là lực lượng xung kích và tương lai của đất nước." },
  { q: "Thanh niên dễ dao động trong hoàn cảnh nào?", a: "Khi tiếp cận nhiều thông tin nhưng thiếu định hướng." },
  { q: "Điều gì giúp thanh niên giữ vững niềm tin?", a: "Lý tưởng đúng đắn gắn với thực tiễn." },
  { q: "Giáo dục lý tưởng cách mạng nhằm mục đích gì?", a: "Giúp thế hệ trẻ có bản lĩnh và trách nhiệm xã hội." },
  { q: "Hội nhập quốc tế cần đi đôi với điều gì?", a: "Giữ vững độc lập và bản sắc dân tộc." },
  { q: "Văn minh theo tư tưởng Hồ Chí Minh là gì?", a: "Là sự tiến bộ về đạo đức, tư tưởng và tổ chức xã hội." },
  { q: "Một Đảng văn minh thể hiện ở điểm nào?", a: "Ở mục tiêu vì con người và phương pháp lãnh đạo khoa học." },
  { q: "Vì sao phải gắn lý luận với thực tiễn?", a: "Vì thực tiễn là thước đo của chân lý." },
  { q: "Lý luận xa rời thực tiễn sẽ dẫn đến điều gì?", a: "Dẫn đến sai lầm trong lãnh đạo và quản lý." },
  { q: "Tham nhũng tác động thế nào đến Đảng?", a: "Làm suy yếu Đảng và mất lòng tin của nhân dân." },
  { q: "Chống tham nhũng cần bắt đầu từ đâu?", a: "Từ việc rèn luyện đạo đức của cán bộ." },
  { q: "Đảng mạnh hay yếu phụ thuộc vào yếu tố nào?", a: "Phụ thuộc vào phẩm chất của đội ngũ cán bộ." },
  { q: "Cán bộ vừa cần đức vừa cần gì?", a: "Cần có năng lực và tinh thần trách nhiệm." },
  { q: "Khoảng cách giữa Đảng và dân xuất hiện khi nào?", a: "Khi cán bộ thiếu trách nhiệm và không lắng nghe dân." },
  { q: "Lắng nghe nhân dân mang lại lợi ích gì?", a: "Giúp Đảng điều chỉnh chính sách đúng thực tiễn." },
  { q: "Vì sao nói hành động quan trọng hơn lời nói?", a: "Vì hành động tạo ra niềm tin thực chất." },
  { q: "Xây dựng Đảng trước hết phải chú trọng điều gì?", a: "Chú trọng xây dựng đạo đức cách mạng." },
  { q: "Giữ vững bản chất cách mạng có ý nghĩa gì?", a: "Giúp Đảng thích ứng với thời đại mà không đánh mất mục tiêu." },
  { q: "Niềm tin của nhân dân có vai trò ra sao?", a: "Là nền tảng cho sự lãnh đạo bền vững của Đảng." },
  { q: "Mục tiêu cao nhất của Đảng theo tư tưởng Hồ Chí Minh là gì?", a: "Mang lại độc lập, tự do và hạnh phúc cho nhân dân." },
  { q: "Khoảng cách giữa Đảng và thanh niên thường hình thành từ nguyên nhân nào?", a: "Từ việc thiếu đối thoại, thiếu minh bạch và ít hành động thực tiễn." },
  { q: "Sự gương mẫu của cán bộ có tác động gì đến xã hội?", a: "Tạo hiệu ứng lan tỏa tích cực và củng cố niềm tin của nhân dân." },
  { q: "Giữ vững bản chất cách mạng trong thời đại số đòi hỏi điều gì?", a: "Đòi hỏi kiên định mục tiêu, đồng thời linh hoạt trong phương thức hành động." }
];

// --- LOGIC GAME & UTILS ---
const PAIRS_PER_PAGE = 8;
const TOTAL_PAGES = 5;

const generateFullData = () => {
  let data = [...RAW_DATA];
  while (data.length < 40) {
    data = [...data, ...RAW_DATA];
  }
  return data.slice(0, 40).map((item, index) => ({ ...item, id: index }));
};

interface Card {
  id: number;
  content: string;
  type: 'question' | 'answer';
}

interface Connection {
  leftId: number;
  rightId: number;
  isCorrect?: boolean;
}

function App() {
  // ────────────────────────────────────────────────
  // TẤT CẢ HOOK PHẢI NẰM Ở ĐÂY - KHÔNG ĐƯỢC ĐẶT SAU RETURN NÀO
  // ────────────────────────────────────────────────

  // Tên người chơi
  const [playerName, setPlayerName] = useState<string>("");
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  // Game State
  const [allPairs, setAllPairs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPairs, setCurrentPairs] = useState<any[]>([]);
  const [leftCards, setLeftCards] = useState<Card[]>([]);
  const [rightCards, setRightCards] = useState<Card[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<Card | null>(null);
  const [selectedRight, setSelectedRight] = useState<Card | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [checkedConnections, setCheckedConnections] = useState<Connection[]>([]);
  const [hintedIds, setHintedIds] = useState<Set<number>>(new Set());
  const [isChecked, setIsChecked] = useState(false);
  const [, setUpdateTrigger] = useState(0);
  const [score, setScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('dai_dong_score');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [pageScore, setPageScore] = useState(0);
  const [isPageFinished, setIsPageFinished] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  // const [isSubmittingScore, setIsSubmittingScore] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);

  const leftRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rightRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ── Các useEffect ──
  useEffect(() => {
    sessionStorage.setItem('dai_dong_score', score.toString());
  }, [score]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isGameFinished && isNameEntered) {
      timer = setInterval(() => setGameTime(t => t + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isGameFinished, isNameEntered]);

  useEffect(() => {
    const submitScore = async () => {
      if (!playerName || score === 0) return;
      // setIsSubmittingScore(true);
      setSubmitError(null);
      const { error } = await supabase.from('leaderboard').insert([{
        name: playerName,
        score,
        time: gameTime,
        created_at: new Date().toISOString(),
      }]);
      if (error) setSubmitError(error.message);
      // setIsSubmittingScore(false);
    };
    if (isGameFinished) {
      submitScore();
    }
  }, [isGameFinished, playerName, score, gameTime]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoadingLeaderboard(true);
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .order('time', { ascending: true });
      if (!error && data) setLeaderboard(data);
      setIsLoadingLeaderboard(false);
    };
    if (isGameFinished) {
      fetchLeaderboard();
    }
  }, [isGameFinished]);

  useEffect(() => {
    const data = generateFullData();
    setAllPairs(data);
    loadPage(0, data);

    const handleResize = () => setUpdateTrigger(prev => prev + 1);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── Các hàm logic game ──
  const loadPage = (pageIndex: number, sourceData: any[]) => {
    const start = pageIndex * PAIRS_PER_PAGE;
    const end = start + PAIRS_PER_PAGE;
    const pageData = sourceData.slice(start, end);

    setCurrentPairs(pageData);

    const questions = pageData.map(p => ({ id: p.id, content: p.q, type: 'question' as const })).sort(() => Math.random() - 0.5);
    const answers = pageData.map(p => ({ id: p.id, content: p.a, type: 'answer' as const })).sort(() => Math.random() - 0.5);

    setLeftCards(questions);
    setRightCards(answers);
    setConnections([]);
    setCheckedConnections([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setIsChecked(false);
    setIsPageFinished(false);
    setPageScore(0);
    setHintedIds(new Set());
  };

  const handleCardClick = (card: Card, side: 'left' | 'right') => {
    if (isChecked) return;

    if (side === 'left') {
      if (selectedLeft?.id === card.id) {
        setSelectedLeft(null);
      } else {
        setSelectedLeft(card);
        if (selectedRight) {
          createConnection(card.id, selectedRight.id);
          setSelectedLeft(null);
          setSelectedRight(null);
          setHintedIds(new Set());
        }
      }
    } else {
      if (selectedRight?.id === card.id) {
        setSelectedRight(null);
      } else {
        setSelectedRight(card);
        if (selectedLeft) {
          createConnection(selectedLeft.id, card.id);
          setSelectedLeft(null);
          setSelectedRight(null);
          setHintedIds(new Set());
        }
      }
    }
  };

  const createConnection = (leftId: number, rightId: number) => {
    const filtered = connections.filter(c => c.leftId !== leftId && c.rightId !== rightId);
    setConnections([...filtered, { leftId, rightId }]);
  };

  const handleCheck = () => {
    if (connections.length === 0) return;

    const checked = connections.map(conn => ({
      ...conn,
      isCorrect: conn.leftId === conn.rightId
    }));

    setCheckedConnections(checked);
    setIsChecked(true);

    let points = 0;
    checked.forEach(c => {
      if (c.isCorrect) points += 100;
    });

    setPageScore(points);
    setScore(prev => prev + points);

    const correctCount = checked.filter(c => c.isCorrect).length;
    if (correctCount === currentPairs.length) {
      setTimeout(() => setIsPageFinished(true), 800);
    }
  };

  const handleHint = () => {
    if (isChecked || !selectedLeft) {
      if (!selectedLeft) setHintMessage("Vui lòng chọn một câu hỏi (bên trái) để sử dụng gợi ý!");
      return;
    }

    setScore(prev => prev - 50);
    const newHintedIds = new Set(hintedIds);

    const wrongAnswers = rightCards
      .filter(card => card.id !== selectedLeft.id && !hasConnection(card.id, 'right'))
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    wrongAnswers.forEach(card => newHintedIds.add(card.id));
    setHintedIds(newHintedIds);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage < TOTAL_PAGES) {
      setCurrentPage(nextPage);
      loadPage(nextPage, allPairs);
    } else {
      setIsGameFinished(true);
    }
  };

  const handleRetryPage = () => {
    setScore(prev => prev - pageScore);
    loadPage(currentPage, allPairs);
  };

  // const handleRestart = () => {
  //   const newData = generateFullData();
  //   setAllPairs(newData);
  //   setCurrentPage(0);
  //   setIsGameFinished(false);
  //   loadPage(0, newData);
  //   setScore(0); // nếu muốn reset điểm khi chơi lại từ đầu
  // };

  const renderConnections = () => {
    if (!containerRef.current) return null;
    const containerRect = containerRef.current.getBoundingClientRect();
    const lines = isChecked ? checkedConnections : connections;

    return (
      <svg className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full">
        {lines.map((conn) => {
          const leftEl = leftRefs.current[conn.leftId];
          const rightEl = rightRefs.current[conn.rightId];
          if (!leftEl || !rightEl) return null;

          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          const x1 = leftRect.right - containerRect.left;
          const y1 = leftRect.top + leftRect.height / 2 - containerRect.top;
          const x2 = rightRect.left - containerRect.left;
          const y2 = rightRect.top + rightRect.height / 2 - containerRect.top;

          const distanceX = Math.abs(x2 - x1);
          const controlOffset = Math.min(distanceX * 0.6, 120);

          const color = isChecked
            ? (conn.isCorrect ? '#10b981' : '#ef4444')
            : '#f59e0b';

          return (
            <path
              key={`${conn.leftId}-${conn.rightId}`}
              d={`M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray={isChecked && !conn.isCorrect ? "8,4" : "none"}
              className="transition-all duration-300 ease-out"
              style={{ strokeLinecap: 'round', opacity: 0.9 }}
            />
          );
        })}
      </svg>
    );
  };

  const hasConnection = (cardId: number, side: 'left' | 'right') => {
    return connections.some(c =>
      side === 'left' ? c.leftId === cardId : c.rightId === cardId
    );
  };

  const getConnectionStatus = (cardId: number, side: 'left' | 'right') => {
    if (!isChecked) return null;
    const conn = checkedConnections.find(c =>
      side === 'left' ? c.leftId === cardId : c.rightId === cardId
    );
    return conn?.isCorrect;
  };

  // ────────────────────────────────────────────────
  // Bắt đầu render UI - từ đây trở đi không được dùng hook nữa
  // ────────────────────────────────────────────────

  if (!isNameEntered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 md:px-8 bg-[#fdfaf6] text-stone-800 font-sans selection:bg-amber-100">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-100 p-10 flex flex-col items-center animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-stone-800 mb-2 text-center">
            "Đảng ta là đạo đức,<span className='text-amber-600'>Là văn minh"</span>
          </h1>
          <div className="h-1 w-12 bg-amber-500 rounded-full mx-auto mt-2 mb-4"></div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-stone-700 font-extrabold drop-shadow-sm mb-8">Matching Card Game</p>
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={e => {
              e.preventDefault();
              if (playerName.trim()) setIsNameEntered(true);
            }}
          >
            <label className="text-stone-700 font-bold text-lg text-center">Nhập tên của bạn để bắt đầu</label>
            <input
              className="w-full px-5 py-3 rounded-full border-2 border-amber-200 focus:border-amber-500 outline-none text-lg text-center font-semibold transition-all shadow-sm"
              type="text"
              placeholder="Tên của bạn..."
              value={playerName}
              maxLength={32}
              autoFocus
              onChange={e => setPlayerName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn-gradient w-full py-3 rounded-full text-lg font-bold mt-2"
              disabled={!playerName.trim()}
            >
              Bắt đầu chơi
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isGameFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 md:px-8 bg-[#fdfaf6] text-stone-800 font-sans selection:bg-amber-100">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-100 p-10 flex flex-col items-center animate-fade-in-up">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-stone-800 mb-2 text-center">Bảng xếp hạng</h2>
          <div className="h-1 w-12 bg-amber-500 rounded-full mx-auto mt-2 mb-4"></div>

          {isLoadingLeaderboard ? (
            <div className="text-lg font-bold text-amber-600 mt-8">Đang tải bảng xếp hạng...</div>
          ) : (
            <table className="w-full text-center border-collapse mt-6">
              <thead>
                <tr className="bg-amber-100">
                  <th className="py-3 px-4 rounded-tl-xl">#</th>
                  <th className="py-3 px-4">Tên</th>
                  <th className="py-3 px-4">Điểm</th>
                  <th className="py-3 px-4">Thời gian</th>
                  <th className="py-3 px-4 rounded-tr-xl">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr
                    key={entry.id || idx}
                    className={entry.name === playerName ? "bg-amber-50 font-bold" : ""}
                  >
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4">{entry.name}</td>
                    <td className="py-3 px-4">{entry.score}</td>
                    <td className="py-3 px-4">{entry.time}s</td>
                    <td className="py-3 px-4">{new Date(entry.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {submitError && (
            <div className="text-red-600 font-bold mt-6">Lỗi gửi điểm: {submitError}</div>
          )}

          <div className="flex flex-col md:flex-row gap-4 w-full mt-10">
            <button
              className="btn-gradient flex-1 py-4 rounded-full text-lg font-bold"
              onClick={() => {
                setIsLoadingLeaderboard(true);
                supabase
                  .from('leaderboard')
                  .select('*')
                  .order('score', { ascending: false })
                  .order('time', { ascending: true })
                  .then(({ data, error }) => {
                    if (!error && data) setLeaderboard(data);
                    setIsLoadingLeaderboard(false);
                  });
              }}
            >
              Reload
            </button>
            <button
              className="btn-gradient flex-1 py-4 rounded-full text-lg font-bold"
              onClick={() => {
                setScore(0);
                setGameTime(0);
                setIsGameFinished(false);
                setPageScore(0);
                setCurrentPage(0);
                setConnections([]);
                setCheckedConnections([]);
                setHintedIds(new Set());
                setIsChecked(false);
                setUpdateTrigger(t => t + 1);
                setPlayerName("");
                setIsNameEntered(false);
                // Reset lại các cặp và trang đầu tiên
                const data = generateFullData();
                setAllPairs(data);
                loadPage(0, data);
                sessionStorage.removeItem('dai_dong_score');
              }}
            >
              Trang Chủ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Màn hình chơi game chính ──
  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 md:px-8 relative bg-[#fdfaf6] text-stone-800 font-sans selection:bg-amber-100 overflow-x-hidden">
      {/* Toast thông báo gợi ý */}
      {hintMessage && (
        <div className="fixed top-8 right-8 z-50 bg-amber-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg animate-fade-in">
          {hintMessage}
          <button className="ml-4 text-white font-bold" onClick={() => setHintMessage(null)}>Đóng</button>
        </div>
      )}
      
      <div className="w-full flex justify-end mb-2">
        <span className="text-lg font-bold text-amber-700 bg-amber-100 px-4 py-2 rounded-full">
          Người chơi: {playerName}
        </span>
      </div>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-105 opacity-80"
          style={{ backgroundImage: "url('/img.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdfaf6]/80 via-[#fdfaf6]/60 to-[#fdfaf6]/80" />
      </div>

      {/* HEADER */}
      <header className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mb-10 relative z-10 gap-6 mt-16 md:mt-4 px-4">
        <div className="flex items-center gap-4 order-2 md:order-1">
          <div className="bg-white px-5 py-2.5 rounded-full border border-stone-200 shadow-sm flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentPage ? 'bg-amber-500 scale-110' : i < currentPage ? 'bg-stone-300' : 'bg-stone-200'}`}
                />
              ))}
            </div>
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest pl-3 border-l border-stone-100">
              Trang {currentPage + 1}
            </span>
          </div>
        </div>

        <div className="text-center order-1 md:order-2">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-stone-800 leading-none">
            "Đảng ta là đạo đức,<span className="text-amber-600">Là văn minh"</span>
          </h1>
          <div className="h-1 w-12 bg-amber-500 rounded-full mx-auto mt-2 mb-1" />
          <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">Matching Card Game</p>
        </div>

        <div className="order-3 flex items-center gap-4">
          <div className="bg-white px-6 py-3 rounded-[2rem] border border-stone-200 shadow-sm flex flex-col items-end min-w-[120px]">
            <span className="text-[9px] uppercase text-stone-400 tracking-widest font-bold">Điểm số</span>
            <span className="text-2xl font-black text-amber-600 tracking-tighter">{score}</span>
          </div>
        </div>
      </header>

      {/* ACTION BAR */}
      <div className="w-full max-w-7xl flex flex-wrap justify-center gap-4 mb-12 relative z-20">
        <button
          onClick={handleHint}
          disabled={isChecked}
          className={`group px-6 py-3 bg-white text-indigo-600 hover:text-white font-bold rounded-full transition-all border border-indigo-100 flex items-center gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1
            ${isChecked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-indigo-500 hover:border-indigo-500'}`}
        >
          <span className="bg-indigo-50 text-indigo-600 p-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">💡</span>
          <span>AI gợi ý (-50đ)</span>
        </button>

        <button
          onClick={handleCheck}
          disabled={connections.length === 0 || isChecked}
          className={`group px-8 py-3 bg-stone-800 text-emerald-300 hover:text-white font-bold rounded-full transition-all border border-stone-700 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 scale-100
            ${connections.length === 0 || isChecked ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:bg-emerald-600 hover:border-emerald-600'}`}
        >
          <span className="bg-stone-700 text-emerald-400 p-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-colors">✓</span>
          <span>Kiểm tra kết quả</span>
        </button>
      </div>

      {/* RESULTS BAR */}
      {isChecked && (
        <div className="w-full max-w-5xl mb-12 relative z-20 animate-fade-in-down px-4">
          <div className="bg-white rounded-[2.5rem] p-6 border border-stone-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>

            <div className="flex items-center gap-8 pl-6">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-400 tracking-widest font-bold mb-1">Chính xác</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-stone-800">
                    {checkedConnections.filter(c => c.isCorrect).length}
                  </span>
                  <span className="text-sm text-stone-500 font-bold">/ {currentPairs.length}</span>
                </div>
              </div>
              <div className="h-10 w-px bg-stone-200"></div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-400 tracking-widest font-bold mb-1">Thưởng</span>
                <span className={`text-3xl font-bold ${pageScore >= 0 ? 'text-amber-600' : 'text-red-500'}`}>
                  {pageScore >= 0 ? '+' : ''}{pageScore}
                </span>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={handleRetryPage}
                className="flex-1 md:flex-none px-6 py-3 bg-stone-50 hover:bg-stone-100 text-stone-600 font-bold rounded-full border border-stone-200 transition-all flex items-center justify-center gap-2"
              >
                <span>↺</span> Làm lại
              </button>
              <button
                onClick={handleNextPage}
                className="flex-1 md:flex-none px-8 py-3 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                {currentPage + 1 === TOTAL_PAGES ? 'Tổng Kết 🏆' : 'Tiếp Theo →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GAME AREA */}
      <main className="w-full max-w-7xl flex-grow relative z-10 px-2" ref={containerRef}>

        {/* Modal hoàn thành trang */}
        {isPageFinished && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-sm animate-fade-in"></div>
            <div className="relative bg-white p-10 rounded-[3rem] border border-stone-100 shadow-2xl max-w-md w-full text-center animate-zoom-in overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <div className="text-7xl drop-shadow-xl filter hover:scale-110 transition-transform cursor-default">👏</div>
              </div>
              <h2 className="text-3xl font-black text-stone-800 uppercase mt-6 mb-2">Tuyệt Vời!</h2>
              <p className="text-stone-500 mb-8 font-medium">Trang {currentPage + 1} hoàn thành.</p>

              <div className="bg-stone-50 rounded-[2rem] p-5 mb-8 border border-stone-100">
                <p className="text-xs uppercase tracking-widest text-stone-400 mb-1">Điểm nhận được</p>
                <div className={`text-5xl font-black ${pageScore >= 0 ? 'text-amber-500' : 'text-red-500'}`}>
                  {pageScore >= 0 ? '+' : ''}{pageScore}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleRetryPage}
                  className="flex-1 py-3.5 bg-stone-100 text-stone-500 hover:text-stone-800 rounded-full font-bold transition-colors"
                >
                  Làm lại
                </button>
                <button
                  onClick={handleNextPage}
                  className="flex-1 py-3.5 bg-stone-800 hover:bg-stone-900 text-white rounded-full font-bold shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Đường nối */}
        {renderConnections()}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-48 h-full relative z-10">

          {/* Cột Câu hỏi */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
              <div className="h-px w-12 bg-stone-300"></div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">CÂU HỎI</h3>
              <div className="h-px w-12 bg-stone-300"></div>
            </div>

            {leftCards.map(card => {
              const isSelected = selectedLeft?.id === card.id;
              const isConnected = hasConnection(card.id, 'left');
              const status = getConnectionStatus(card.id, 'left');

              return (
                <div
                  key={`q-${card.id}`}
                  ref={el => { leftRefs.current[card.id] = el; }}
                  onClick={() => handleCardClick(card, 'left')}
                  className={`
                    relative p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group
                    min-h-[120px] flex items-center shadow-sm hover:shadow-lg
                    ${isSelected ? 'bg-amber-50 border-amber-400 scale-105 z-20 shadow-amber-200/50' : 'bg-white border-stone-100 hover:border-stone-300'}
                    ${isConnected && !isChecked ? 'bg-amber-50 border-amber-300' : ''}
                    ${status === true ? '!bg-emerald-50 !border-emerald-400' : ''}
                    ${status === false ? '!bg-red-50 !border-red-400 animate-shake' : ''}
                  `}
                >
                  <div className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white transition-colors duration-300 z-10
                    ${isSelected ? 'bg-amber-500 scale-125' :
                      isConnected ? 'bg-amber-400' :
                      status === true ? 'bg-emerald-500' :
                      status === false ? 'bg-red-500' :
                      'bg-stone-300 group-hover:bg-stone-400'}`}
                  />

                  <p className="text-[15px] font-bold leading-relaxed pl-2 pr-4 text-stone-700 group-hover:text-stone-900 transition-colors">
                    {card.content}
                  </p>

                  {status === true && (
                    <div className="absolute top-4 right-4">
                      <span className="text-emerald-500 bg-emerald-100 p-1 rounded-full text-xs font-bold">✓</span>
                    </div>
                  )}
                  {status === false && (
                    <div className="absolute top-4 right-4">
                      <span className="text-red-500 bg-red-100 p-1 rounded-full text-xs font-bold">✗</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cột Đáp án */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
              <div className="h-px w-12 bg-stone-300"></div>
              <h3 className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold">ĐÁP ÁN</h3>
              <div className="h-px w-12 bg-stone-300"></div>
            </div>

            {rightCards.map(card => {
              const isSelected = selectedRight?.id === card.id;
              const isConnected = hasConnection(card.id, 'right');
              const isHinted = hintedIds.has(card.id);
              const status = getConnectionStatus(card.id, 'right');

              return (
                <div
                  key={`a-${card.id}`}
                  ref={el => { rightRefs.current[card.id] = el; }}
                  onClick={() => handleCardClick(card, 'right')}
                  className={`
                    relative p-6 rounded-[2rem] border-2 cursor-pointer transition-all duration-300 group
                    min-h-[120px] flex items-center justify-end text-right shadow-sm hover:shadow-lg
                    ${isSelected ? 'bg-amber-50 border-amber-400 scale-105 z-20 shadow-amber-200/50' : 'bg-white border-stone-100 hover:border-stone-300'}
                    ${isConnected && !isChecked ? 'bg-amber-50 border-amber-300' : ''}
                    ${isHinted && !isChecked ? 'opacity-40 grayscale blur-[1px]' : ''}
                    ${status === true ? '!bg-emerald-50 !border-emerald-400' : ''}
                    ${status === false ? '!bg-red-50 !border-red-400 animate-shake' : ''}
                  `}
                >
                  <div className={`absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white transition-colors duration-300 z-10
                    ${isSelected ? 'bg-amber-500 scale-125' :
                      isConnected ? 'bg-amber-400' :
                      status === true ? 'bg-emerald-500' :
                      status === false ? 'bg-red-500' :
                      'bg-stone-300 group-hover:bg-stone-400'}`}
                  />

                  <p className="text-[15px] font-medium leading-relaxed pr-2 pl-4 text-stone-600 group-hover:text-stone-800 transition-colors">
                    {card.content}
                  </p>

                  {status === true && (
                    <div className="absolute top-4 left-4">
                      <span className="text-emerald-500 bg-emerald-100 p-1 rounded-full text-xs font-bold">✓</span>
                    </div>
                  )}
                  {status === false && (
                    <div className="absolute top-4 left-4">
                      <span className="text-red-500 bg-red-100 p-1 rounded-full text-xs font-bold">✗</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Wrong answers section */}
      {isChecked && checkedConnections.some(c => !c.isCorrect) && (
        <div className="w-full max-w-4xl mt-16 mb-10 relative z-10 animate-fade-in-up px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-red-50 blur-xl rounded-[3rem]"></div>
            <div className="relative bg-white border border-red-100 rounded-[2.5rem] p-8 shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-orange-400"></div>

              <h3 className="text-xl font-bold text-red-700 mb-8 flex items-center gap-3 uppercase tracking-wide">
                <span className="bg-red-50 p-2 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </span>
                Cần xem lại
              </h3>

              <div className="grid grid-cols-1 gap-6">
                {checkedConnections
                  .filter(c => !c.isCorrect)
                  .map((conn, idx) => {
                    const question = currentPairs.find(p => p.id === conn.leftId)?.q || '';
                    const yourAnswer = currentPairs.find(p => p.id === conn.rightId)?.a || '';
                    const correctAnswer = currentPairs.find(p => p.id === conn.leftId)?.a || '';

                    return (
                      <div key={idx} className="bg-stone-50 rounded-[2rem] p-6 border border-red-100 hover:border-red-200 transition-colors">
                        <div className="mb-4">
                          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">Câu hỏi</span>
                          <p className="text-stone-800 font-bold mt-3 text-lg">{question}</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="bg-red-50 p-5 rounded-[1.5rem] border border-red-100">
                            <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">Bạn chọn</span>
                            <p className="text-red-800 text-sm leading-relaxed font-medium">{yourAnswer}</p>
                          </div>
                          <div className="bg-emerald-50 p-5 rounded-[1.5rem] border border-emerald-100">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-2">Đáp án đúng</span>
                            <p className="text-emerald-800 text-sm leading-relaxed font-medium">{correctAnswer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-zoom-in {
          animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App;