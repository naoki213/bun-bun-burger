const items = [
  [
    'CLASSIC BUN BUN',
    'クラシック バンバン',
    'ビーフ / チェダー / 野菜 / BUN BUNソース',
    '¥1,380',
  ],
  [
    'DOUBLE CHEESE',
    'ダブルチーズ',
    'ダブルビーフ / ダブルチェダー / ピクルス',
    '¥1,680',
  ],
  [
    'BACON EGG',
    'ベーコンエッグ',
    'ビーフ / ベーコン / 目玉焼き / スモーキーソース',
    '¥1,580',
  ],
  [
    'HOT CHILI',
    'ホットチリ',
    'ビーフ / ハラペーニョ / チリミート / サルサ',
    '¥1,480',
  ],
  ['AVOCADO', 'アボカド', 'ビーフ / アボカド / トマト / ライムマヨ', '¥1,520'],
  [
    'KIDS BURGER',
    'キッズバーガー',
    '小さめビーフ / チェダー / ケチャップ / ポテト付き',
    '¥980',
  ],
];
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export default function Menu() {
  return (
    <main className="simple-page">
      <a className="back-link" href={`${BASE}/`}>
        ← ホームにもどる
      </a>
      <p className="eyebrow">FULL MENU</p>
      <h1>なに食べる？</h1>
      <div className="simple-page-grid">
        {items.map((x, i) => (
          <article
            className="simple-card"
            key={x[0]}
            style={{
              background:
                i % 3 === 1 ? '#ef4438' : i % 3 === 2 ? '#68b8d8' : '#f6c844',
              color: i % 3 === 1 ? 'white' : 'inherit',
            }}
          >
            <p className="eyebrow">{x[0]}</p>
            <h2>{x[1]}</h2>
            <p>{x[2]}</p>
            <strong>{x[3]}</strong>
          </article>
        ))}
      </div>
      <p style={{ marginTop: 50, fontWeight: 800 }}>
        すべてのバーガーは、注文後に焼き上げます。テイクアウトOK。表示価格は税込です。
      </p>
    </main>
  );
}
