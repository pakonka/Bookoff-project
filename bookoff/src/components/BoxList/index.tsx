import Box from "../Box";

const boxData = [
  {
    imageUrl:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fassets%2Fimages%2F282x216%2Fcomic%2Ffavorite.png@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    title: "お気に入りマンガ",
    description: "絶対に手放したくない！お気に入りマンガ",
  },
  {
    imageUrl:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fassets%2Fimages%2F282x216%2Fall%2Fheisei.png@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    title: "平成を振り返る",
    description: "「平成」を振り返る〜あのとき流行した本・音楽・映画・ゲーム〜",
  },
  {
    imageUrl:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fassets%2Fimages%2F282x216%2Fall%2Fdrama.png@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    title: "ドラマ化情報まとめ",
    description: "ドラマ化情報まとめ | 小説・漫画原作",
  },
  {
    imageUrl:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fassets%2Fimages%2F282x216%2Fgame%2Fpokemon.png@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    title: "ポケットモンスター特集",
    description:
      "ポケットモンスター（ポケモン）特集 歴代ゲームを一覧でご紹介！",
  },
];

const BoxList: React.FC = () => {
  return (
    <div className="mx-[10%] py-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {boxData.map((box, index) => (
        <Box
          key={index}
          imageUrl={box.imageUrl}
          description={box.description}
        />
      ))}
    </div>
  );
};

export default BoxList;
