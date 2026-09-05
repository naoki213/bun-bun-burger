const burgers = [
  {
    name: 'CLASSIC BUN BUN',
    jp: 'クラシック バンバン',
    price: '¥1,380',
    color: '#f6c844',
    image: 'hero-burger.webp',
    ingredients:
      'ビーフ / チェダー / レタス / トマト / オニオン / BUN BUNソース',
    note: '迷ったら、まずはこれ。肉も野菜もソースも、全部しっかり。',
  },
  {
    name: 'DOUBLE CHEESE',
    jp: 'ダブルチーズ',
    price: '¥1,680',
    color: '#ef4438',
    image: 'double-cheese.webp',
    ingredients:
      'ダブルビーフ / ダブルチェダー / ピクルス / オニオン / マスタード',
    note: '肉を食べたぞ、の満足感。チーズは遠慮なく2枚。',
  },
  {
    name: 'BACON EGG',
    jp: 'ベーコンエッグ',
    price: '¥1,580',
    color: '#68b8d8',
    image: 'bacon-egg.webp',
    ingredients: 'ビーフ / ベーコン / 目玉焼き / レタス / スモーキーソース',
    note: 'とろっと黄身に、カリッとベーコン。お腹が空いた日の正解。',
  },
  {
    name: 'HOT CHILI',
    jp: 'ホットチリ',
    price: '¥1,480',
    color: '#4f8a55',
    image: 'hot-chili.webp',
    ingredients: 'ビーフ / チェダー / ハラペーニョ / チリミート / サルサ',
    note: 'しっかり辛い。でも、もう一口いきたくなる。',
  },
  {
    name: 'AVOCADO',
    jp: 'アボカド',
    price: '¥1,520',
    color: '#fff3d6',
    image: 'avocado.webp',
    ingredients: 'ビーフ / アボカド / トマト / オニオン / ライムマヨ',
    note: 'まろやか、さっぱり、肉汁たっぷり。欲張りな一個。',
  },
];
burgers.slice(1).forEach((b) => {
  const image = new Image();
  image.src = `public/images/${b.image}`;
});
let current = 0;
const show = document.querySelector('.burger-showcase'),
  info = document.querySelector('.burger-info'),
  idx = document.querySelector('.menu-index'),
  dots = document.querySelector('.menu-dots');
burgers.forEach((b, i) => {
  const x = document.createElement('button');
  x.textContent = String(i + 1).padStart(2, '0');
  x.setAttribute('aria-label', `${b.jp}を表示`);
  x.onclick = () => render(i);
  dots.append(x);
});
function render(i) {
  current = (i + burgers.length) % burgers.length;
  const b = burgers[current];
  show.style.setProperty('--menu-bg', b.color);
  idx.textContent = String(current + 1).padStart(2, '0');
  info.querySelector('.burger-en').textContent = b.name;
  info.querySelector('h3').textContent = b.jp;
  info.querySelector('.burger-note').innerHTML =
    `${b.note}<small>${b.ingredients}</small>`;
  info.querySelector('strong').textContent = b.price;
  const photo = document.querySelector('.menu-photo img');
  photo.src = `public/images/${b.image}`;
  photo.alt = `${b.jp}のクラフトバーガー`;
  [...dots.children].forEach((x, n) =>
    x.classList.toggle('active', n === current),
  );
}
render(0);
document.querySelector('.prev').onclick = () => render(current - 1);
document.querySelector('.next').onclick = () => render(current + 1);
const hero = document.querySelector('.hero-visual');
document.querySelector('.hero').addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  const r = hero.getBoundingClientRect();
  hero.style.setProperty(
    '--rx',
    `${((e.clientY - r.top) / r.height - 0.5) * -7}deg`,
  );
  hero.style.setProperty(
    '--ry',
    `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`,
  );
});
document
  .querySelector('.hero')
  .addEventListener('pointerleave', () => hero.removeAttribute('style'));
hero.addEventListener('click', () => hero.classList.toggle('is-bouncing'));
const steps = [...document.querySelectorAll('[data-build-step]')],
  layers = [...document.querySelectorAll('.ingredient')],
  ticket = document.querySelector('.recipe-ticket'),
  labels = [
    '焼きたてバンズ',
    '100%ビーフ',
    'チェダーチーズ',
    'シャキシャキ野菜',
    'オリジナルソース',
    'いただきます。',
  ];
const observer = new IntersectionObserver(
  (entries) => {
    const x = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!x) return;
    const n = Number(x.target.dataset.buildStep);
    steps.forEach((s, i) => s.classList.toggle('current', i === n));
    layers.forEach((l, i) => l.classList.toggle('is-on', i <= n));
    ticket.querySelector('strong').textContent = `いま、${n + 1}つ目。`;
    ticket.querySelector('span').textContent = labels[n];
    document.querySelector('.done-badge').classList.toggle('is-on', n === 5);
  },
  { rootMargin: '-32% 0px -38% 0px', threshold: [0, 0.5, 1] },
);
steps.forEach((x) => observer.observe(x));
