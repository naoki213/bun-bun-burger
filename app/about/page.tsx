const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export default function About() {
  return (
    <main className="simple-page">
      <a className="back-link" href={`${BASE}/`}>
        ← ホームにもどる
      </a>
      <p className="eyebrow">ABOUT BUN BUN</p>
      <h1>
        ちょっと陽気。
        <br />
        バーガーには本気。
      </h1>
      <div className="simple-page-grid">
        <article className="simple-card">
          <p className="eyebrow">01 / BEEF</p>
          <h2>肉は、100%。</h2>
          <p>
            つなぎなしのビーフパティを、注文ごとに鉄板で。香ばしい焼き目と肉汁を大切にしています。
          </p>
        </article>
        <article
          className="simple-card"
          style={{ background: '#ef4438', color: 'white' }}
        >
          <p className="eyebrow">02 / BUNS</p>
          <h2>毎朝、焼きたて。</h2>
          <p>
            ふわっとして、肉汁を受け止める。近所のベーカリーと作ったオリジナルバンズです。
          </p>
        </article>
        <article className="simple-card" style={{ background: '#68b8d8' }}>
          <p className="eyebrow">03 / VEGGIES</p>
          <h2>野菜は、山盛り。</h2>
          <p>
            シャキシャキのレタス、厚切りトマト、オニオン。豪快だけど、最後までおいしいバランスに。
          </p>
        </article>
        <article className="simple-card">
          <p className="eyebrow">04 / SAUCE</p>
          <h2>最後は、ソース。</h2>
          <p>
            ピクルスとスパイスをきかせた自家製ソース。具材をひとつの「うまい」にまとめます。
          </p>
        </article>
      </div>
    </main>
  );
}
