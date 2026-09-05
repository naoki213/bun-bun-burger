'use client';

import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const burgers = [
  {
    name: 'CLASSIC BUN BUN',
    jp: 'クラシック バンバン',
    price: '¥1,380',
    color: '#f6c844',
    ingredients:
      'ビーフ / チェダー / レタス / トマト / オニオン / BUN BUNソース',
    note: '迷ったら、まずはこれ。肉も野菜もソースも、全部しっかり。',
  },
  {
    name: 'DOUBLE CHEESE',
    jp: 'ダブルチーズ',
    price: '¥1,680',
    color: '#ef4438',
    ingredients:
      'ダブルビーフ / ダブルチェダー / ピクルス / オニオン / マスタード',
    note: '肉を食べたぞ、の満足感。チーズは遠慮なく2枚。',
  },
  {
    name: 'BACON EGG',
    jp: 'ベーコンエッグ',
    price: '¥1,580',
    color: '#68b8d8',
    ingredients: 'ビーフ / ベーコン / 目玉焼き / レタス / スモーキーソース',
    note: 'とろっと黄身に、カリッとベーコン。お腹が空いた日の正解。',
  },
  {
    name: 'HOT CHILI',
    jp: 'ホットチリ',
    price: '¥1,480',
    color: '#4f8a55',
    ingredients: 'ビーフ / チェダー / ハラペーニョ / チリミート / サルサ',
    note: 'しっかり辛い。でも、もう一口いきたくなる。',
  },
  {
    name: 'AVOCADO',
    jp: 'アボカド',
    price: '¥1,520',
    color: '#fff3d6',
    ingredients: 'ビーフ / アボカド / トマト / オニオン / ライムマヨ',
    note: 'まろやか、さっぱり、肉汁たっぷり。欲張りな一個。',
  },
];

const buildSteps = [
  [
    '01',
    'BOTTOM BUN',
    '焼きたてバンズ',
    '毎朝届くふわもちバンズを、鉄板で香ばしく。',
  ],
  ['02', 'BEEF', '100%ビーフ', 'つなぎなし。注文が入ってから、ぎゅっと焼く。'],
  [
    '03',
    'CHEESE',
    'チェダーチーズ',
    '熱々のパティにのせて、角がとろけるまで。',
  ],
  [
    '04',
    'VEGETABLE',
    'シャキシャキ野菜',
    'レタス、トマト、オニオン。山盛りがうちの普通。',
  ],
  [
    '05',
    'SAUCE',
    'オリジナルソース',
    'ピクルスとスパイスをきかせた、秘密の自家製ソース。',
  ],
  ['06', 'TOP BUN', '仕上げのバンズ', 'ぎゅっと重ねて、包んだら完成。'],
];

const sides = [
  ['FRIES', '揚げたて塩ポテト', '¥420'],
  ['ONION RINGS', 'ざくざくオニオンリング', '¥480'],
  ['CHICKEN', 'スパイスチキン', '¥580'],
  ['COLESLAW', 'さっぱりコールスロー', '¥380'],
  ['MILKSHAKE', 'バニラ / チョコ', '¥650'],
  ['LEMONADE', '自家製レモネード', '¥480'],
];

function BrandHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="BUN BUN BURGER ホーム">
        <span className="brand-mark">BB</span>
        <span>
          BUN BUN
          <br />
          BURGER
        </span>
      </a>
      <nav aria-label="メインナビゲーション">
        <a href={`${BASE}/menu/`}>メニュー</a>
        <a href={`${BASE}/about/`}>こだわり</a>
        <a href={`${BASE}/shop/`}>お店</a>
        <a className="nav-pill" href="#access">
          アクセス
        </a>
      </nav>
    </header>
  );
}

export default function Home() {
  const [burger, setBurger] = useState(0);
  const [build, setBuild] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      ...document.querySelectorAll<HTMLElement>('[data-build-step]'),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible)
          setBuild(Number((visible.target as HTMLElement).dataset.buildStep));
      },
      { rootMargin: '-32% 0px -38% 0px', threshold: [0, 0.5, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || !heroRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    heroRef.current.style.setProperty(
      '--rx',
      `${((e.clientY - r.top) / r.height - 0.5) * -7}deg`,
    );
    heroRef.current.style.setProperty(
      '--ry',
      `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`,
    );
  };

  return (
    <main>
      <BrandHeader />
      <section
        className="hero"
        id="top"
        onPointerMove={tilt}
        onPointerLeave={() => heroRef.current?.removeAttribute('style')}
      >
        <div className="hero-copy">
          <p className="eyebrow">OSAKA · FRESH BUNS · SINCE 2026</p>
          <h1>
            腹いっぱいって、
            <br />
            <em>しあわせだ。</em>
          </h1>
          <p className="hero-lead">
            焼きたてバンズに、肉汁たっぷりの100%ビーフ。
            <br />
            今日も豪快に、かぶりつこう。
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#menu">
              メニューを見る <span>↘</span>
            </a>
            <a className="button button-paper" href="#access">
              お店に行く <span>→</span>
            </a>
          </div>
        </div>
        <div
          className="hero-visual"
          ref={heroRef}
          onClick={() => heroRef.current?.classList.toggle('is-bouncing')}
        >
          <div className="photo-frame">
            <img
              src={`${BASE}/images/hero-burger.webp`}
              alt="トレーにのったボリュームたっぷりのチーズバーガー"
              fetchPriority="high"
            />
          </div>
          <span className="sticker sticker-beef">
            100%
            <br />
            BEEF
          </span>
          <span className="sticker sticker-osaka">OSAKA!</span>
          <span className="scribble" aria-hidden="true">
            うまっ
          </span>
        </div>
        <div className="hero-bottom">
          <span>OPEN 11:00—22:00</span>
          <span className="scroll-note">SCROLL TO EAT ↓</span>
          <span>TAKE OUT OK!</span>
        </div>
      </section>

      <div className="marquee" aria-label="ブランドメッセージ">
        <div>
          FRESH BUNS ★ 100% BEEF ★ BIG BITE ★ GOOD DAY ★ FRESH BUNS ★ 100% BEEF
          ★ BIG BITE ★ GOOD DAY ★
        </div>
      </div>

      <section
        className="burger-showcase"
        id="menu"
        style={{ '--menu-bg': burgers[burger].color } as CSSProperties}
      >
        <div className="section-title">
          <p className="eyebrow">TODAY&apos;S BURGER / 01—05</p>
          <h2>今日、何食べる？</h2>
        </div>
        <div className="burger-stage">
          <button
            className="round-arrow"
            aria-label="前のバーガー"
            onClick={() =>
              setBurger((burger + burgers.length - 1) % burgers.length)
            }
          >
            ←
          </button>
          <div className="menu-photo">
            <span className="menu-index">0{burger + 1}</span>
            <img
              src={`${BASE}/images/hero-burger.webp`}
              alt="クラフトバーガー"
              loading="lazy"
            />
          </div>
          <button
            className="round-arrow"
            aria-label="次のバーガー"
            onClick={() => setBurger((burger + 1) % burgers.length)}
          >
            →
          </button>
        </div>
        <div className="burger-info" aria-live="polite">
          <div>
            <p className="burger-en">{burgers[burger].name}</p>
            <h3>{burgers[burger].jp}</h3>
          </div>
          <p className="burger-note">
            {burgers[burger].note}
            <small>{burgers[burger].ingredients}</small>
          </p>
          <strong>{burgers[burger].price}</strong>
        </div>
        <div className="menu-dots">
          {burgers.map((item, i) => (
            <button
              key={item.name}
              aria-label={`${item.jp}を表示`}
              className={i === burger ? 'active' : ''}
              onClick={() => setBurger(i)}
            >
              {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </section>

      <section className="build-section" id="build">
        <div className="build-heading">
          <p className="eyebrow">BUILD YOUR BURGER</p>
          <h2>
            うまいバーガーは、
            <br />
            ちゃんと重ねる。
          </h2>
          <p>スクロールすると、今日の一個ができあがります。</p>
        </div>
        <div className="build-grid">
          <div className="build-visual">
            <div className="recipe-ticket">
              <p>ORDER #088</p>
              <strong>いま、{build + 1}つ目。</strong>
              <span>
                {build === 5 ? 'いただきます。' : buildSteps[build][2]}
              </span>
            </div>
            <div
              className="ingredient-stack"
              aria-label={`${buildSteps[build][2]}まで重なったバーガー`}
            >
              {buildSteps.map((step, i) => (
                <div
                  key={step[1]}
                  className={`ingredient ingredient-${i} ${i <= build ? 'is-on' : ''}`}
                >
                  <span>{step[1]}</span>
                </div>
              ))}
              <div className={`done-badge ${build === 5 ? 'is-on' : ''}`}>
                DONE!
              </div>
            </div>
          </div>
          <div className="build-steps">
            {buildSteps.map((step, i) => (
              <article
                key={step[1]}
                data-build-step={i}
                className={i === build ? 'current' : ''}
              >
                <span>{step[0]}</span>
                <p>{step[1]}</p>
                <h3>{step[2]}</h3>
                <small>{step[3]}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="beef-section">
        <div className="beef-photo">
          <img
            src={`${BASE}/images/hero-burger.webp`}
            alt="焼き目のついた100%ビーフパティ"
            loading="lazy"
          />
          <span className="flash-label">
            GRILLED
            <br />
            TO ORDER
          </span>
        </div>
        <div className="beef-copy">
          <p className="eyebrow">THE BEEF / OUR RULE</p>
          <h2>
            肉は、ちゃんと
            <br />
            肉らしく。
          </h2>
          <p>
            つなぎを使わない100%ビーフ。注文をもらってから鉄板にのせ、表面は香ばしく、中は肉汁を閉じ込めて焼き上げます。
          </p>
          <div className="mini-labels">
            <span>BEEF 100%</span>
            <span>HAND PRESSED</span>
            <span>HOT &amp; JUICY</span>
          </div>
        </div>
      </section>

      <section className="side-section">
        <div className="fries-rain" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ '--i': i } as CSSProperties} />
          ))}
        </div>
        <div className="section-title">
          <p className="eyebrow">SIDE MENU</p>
          <h2>
            バーガーだけじゃ、
            <br />
            終われない。
          </h2>
        </div>
        <div className="menu-board">
          {sides.map((side, i) => (
            <article key={side[0]}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{side[0]}</h3>
                <p>{side[1]}</p>
              </div>
              <strong>{side[2]}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="set-section">
        <p className="eyebrow">SET MENU</p>
        <h2>お腹に合わせて、どうぞ。</h2>
        <div className="set-equation">
          <span>
            BURGER<small>好きなバーガー</small>
          </span>
          <b>＋</b>
          <span>
            FRIES<small>揚げたてポテト</small>
          </span>
          <b>＋</b>
          <span>
            DRINK<small>選べるドリンク</small>
          </span>
          <b>＝</b>
          <em>+¥550</em>
        </div>
        <div className="set-sizes">
          <span>
            ちょい足し <b>SMALL</b>
          </span>
          <span className="popular">
            ちょうど満腹 <b>REGULAR</b>
          </span>
          <span>
            今日は本気 <b>BIG</b>
          </span>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="shop-copy">
          <p className="eyebrow">OUR SHOP / OSAKA</p>
          <h2>
            ふらっと来て、
            <br />
            がっつり食べて。
          </h2>
          <p>
            赤い椅子と、鉄板の音。カウンター越しに「いつもの」が飛び交う、大阪の小さな路面店です。
          </p>
          <a className="text-link" href={`${BASE}/shop/`}>
            お店のこと →
          </a>
        </div>
        <div className="shop-photo">
          <img
            src={`${BASE}/images/shop-people.webp`}
            alt="バーガーを食べながら過ごす二人とオープンキッチン"
            loading="lazy"
          />
          <span className="tape">GOOD FOOD, GOOD MOOD</span>
        </div>
      </section>

      <section className="people-section">
        <p className="eyebrow">PEOPLE AT BUN BUN</p>
        <h2>
          うまいもの食べると、
          <br />
          だいたい笑ってる。
        </h2>
        <div className="snapshot-wall">
          <figure className="snap snap-a">
            <img
              src={`${BASE}/images/shop-people.webp`}
              alt="バーガーを片手に話す友人たち"
              loading="lazy"
            />
            <figcaption>放課後の、腹ぺこ会議。</figcaption>
          </figure>
          <figure className="snap snap-b">
            <img
              src={`${BASE}/images/hero-burger.webp`}
              alt="食べかけのバーガー"
              loading="lazy"
            />
            <figcaption>一口目から、無言。</figcaption>
          </figure>
          <figure className="snap snap-c">
            <img
              src={`${BASE}/images/shop-people.webp`}
              alt="店内のオープンキッチン"
              loading="lazy"
            />
            <figcaption>今日も鉄板はフル回転。</figcaption>
          </figure>
        </div>
      </section>

      <section className="takeout-section">
        <div className="takeout-photo">
          <img
            src={`${BASE}/images/takeout.webp`}
            alt="バーガーボックス、紙袋、ポテト、レモネードのテイクアウト一式"
            loading="lazy"
          />
          <span className="takeout-sticker">
            TAKE
            <br />
            ME!
          </span>
        </div>
        <div className="takeout-copy">
          <p className="eyebrow">TAKE OUT</p>
          <h2>
            店でも。家でも。
            <br />
            公園でも。
          </h2>
          <p>
            できたてを、ひとまとめ。バーガーもポテトもレモネードも、BUN
            BUNカラーで連れて帰れます。
          </p>
          <div className="package-list">
            <span>BURGER BOX</span>
            <span>PAPER BAG</span>
            <span>DRINK CUP</span>
            <span>WRAPPING PAPER</span>
          </div>
        </div>
      </section>

      <section className="access-section" id="access">
        <div className="access-copy">
          <p className="eyebrow">ACCESS / FICTIONAL SHOP</p>
          <h2>
            駅から5分。
            <br />
            お腹を空かせてどうぞ。
          </h2>
          <p>
            大阪市北区バンバン町 8-8
            <br />
            地下鉄「バンバン駅」2番出口から徒歩5分
          </p>
          <small>
            ※ BUN BUN
            BURGERはポートフォリオ制作のための架空店舗です。実在の店舗・住所ではありません。
          </small>
        </div>
        <div className="map" role="img" aria-label="駅から店舗までの簡略地図">
          <div className="rail">BUN BUN STATION</div>
          <div className="road road-h" />
          <div className="road road-v" />
          <div className="crosswalk">|||||</div>
          <span className="spot convenience">コンビニ</span>
          <span className="spot park">ちいさな公園</span>
          <span className="route-dot d1" />
          <span className="route-dot d2" />
          <span className="route-dot d3" />
          <span className="shop-pin">
            BUN
            <br />
            BUN
          </span>
        </div>
      </section>

      <section className="final-section">
        <p className="eyebrow">READY TO EAT?</p>
        <h2>
          今日、バーガーに
          <br />
          <em>しない？</em>
        </h2>
        <div className="final-photo">
          <img
            src={`${BASE}/images/hero-burger.webp`}
            alt="BUN BUN BURGERのクラシックバーガー"
            loading="lazy"
          />
        </div>
        <div className="final-actions">
          <a className="button button-dark" href={`${BASE}/menu/`}>
            MENU <span>↗</span>
          </a>
          <a className="button button-paper" href="#access">
            ACCESS <span>↗</span>
          </a>
        </div>
        <footer>
          <div className="brand big">
            <span className="brand-mark">BB</span>
            <span>BUN BUN BURGER</span>
          </div>
          <p>OPEN 11:00—22:00 · OSAKA · TAKE OUT OK!</p>
          <small>© 2026 BUN BUN BURGER — FICTIONAL PORTFOLIO PROJECT</small>
        </footer>
      </section>
    </main>
  );
}
