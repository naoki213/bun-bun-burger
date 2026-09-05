const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export default function Shop() {
  return (
    <main className="simple-page">
      <a className="back-link" href={`${BASE}/`}>
        ← ホームにもどる
      </a>
      <p className="eyebrow">OUR SHOP / OSAKA</p>
      <h1>
        鉄板の音が、
        <br />
        聞こえる店。
      </h1>
      <div className="simple-page-grid">
        <div
          style={{
            minHeight: 480,
            border: '3px solid #20201d',
            boxShadow: '8px 8px 0 #20201d',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${BASE}/images/shop-people.webp`}
            alt="BUN BUN BURGERの店内イメージ"
          />
        </div>
        <article
          className="simple-card"
          style={{ background: '#ef4438', color: 'white' }}
        >
          <p className="eyebrow">OPEN 11:00—22:00</p>
          <h2>
            大阪市北区
            <br />
            バンバン町 8-8
          </h2>
          <p>
            地下鉄「バンバン駅」2番出口から徒歩5分。カウンター8席、テーブル12席。テイクアウトできます。
          </p>
          <p style={{ marginTop: 40, fontSize: 13 }}>
            ※
            ポートフォリオ制作のための架空店舗です。実在の店舗・住所ではありません。
          </p>
        </article>
      </div>
    </main>
  );
}
