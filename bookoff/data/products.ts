export interface Product {
  id: number;
  image_url: string;
  product_name: string;
  price: number;
  category: string;
  author: string;
  release_date: string;
  jan_code: string;
  description: string;
  average_rating: number;
  discount_percent: number;
}

export const products = [
  {
    id: 1,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F002002%2F0020021517LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "成瀬は天才を取りにいく",
    price: 1595,
    category_id: "書籍",
    subcategory_id: "小説・文芸",
    author: "成瀬 正人",
    publisher: "新潮社",
    release_date: "2023/03/17",
    description:
      "この本は、成瀬が天才を目指す物語で、彼の成長と挑戦を描いています。友情や努力、成功の喜びを伝える感動的なストーリーです。",
    average_rating: 3.5,
    discount_percent: 10,
  },
  {
    id: 2,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001988%2F0019884136LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "傲慢と善良 朝日文庫",
    price: 825,
    category: "書籍",
    subcategory_id: "小説・文芸",
    author: "辻村 深月",
    publisher: "朝日新聞出版",
    release_date: "2023/05/01",
    description:
      "傲慢と善良 朝日文庫は、日常の中で生まれる善意や悪意に対して深く考察し、人生の本質に迫る作品です。",
    average_rating: 4.2,
    discount_percent: 15,
  },
  {
    id: 3,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001960%2F0019605277LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "かがみの孤城(上) ポプラ文庫",
    price: 605,
    category: "書籍",
    author: "辻村 深月",
    release_date: "2023/04/05",
    jan_code: "9784591156123",
    description:
      "かがみの孤城は、ひとりぼっちの少女が不思議な城で新しい仲間と出会う物語。友情と成長を描いた感動的なファンタジー。",
    average_rating: 4.0,
    discount_percent: 5,
  },
  {
    id: 4,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001893%2F0018939598LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "砂漠 実業之日本社文庫",
    price: 220,
    category: "書籍",
    author: "伊坂 幸太郎",
    release_date: "2023/06/10",
    jan_code: "9784408556609",
    description:
      "砂漠は、広大な砂漠を舞台に、無限の可能性と挑戦を描いた伊坂幸太郎の冒険小説です。",
    average_rating: 3.8,
    discount_percent: 20,
  },
  {
    id: 5,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001970%2F0019705426LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "青空と逃げる 中公文庫",
    price: 350,
    category: "小説",
    author: "辻村深月",
    release_date: "2023/01/01",
    jan_code: "9781234567890",
    description:
      "青空と逃げるは、人生の新たなスタートを切るために過去と向き合う物語です。",
    average_rating: 4.0,
    discount_percent: 0,
  },
  {
    id: 6,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001678%2F0016789038LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "何もかも憂鬱な夜に 集英社文庫",
    price: 605,
    category: "小説",
    author: "中村文則",
    release_date: "2023/01/01",
    jan_code: "9781234567891",
    description:
      "何もかも憂鬱な夜には、暗闇の中で見つける希望を描いた物語です。",
    average_rating: 4.5,
    discount_percent: 0,
  },
  {
    id: 7,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001884/0018843653LL.jpg",
    product_name: "君の膵臓をたべたい 双葉文庫",
    price: 1595,
    category: "小説",
    author: "住野よる",
    release_date: "2023/01/01",
    jan_code: "9781234567892",
    description:
      "君の膵臓をたべたいは、特別な友情と愛を描いた感動的な物語です。",
    average_rating: 5.0,
    discount_percent: 0,
  },
  {
    id: 8,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001935%2F0019358979LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "やめるときも、すこやかなるときも 集英社文庫",
    price: 605,
    category: "小説",
    author: "窪美澄",
    release_date: "2023/01/01",
    jan_code: "9781234567893",
    description:
      "やめるときも、すこやかなるときもは、恋愛の儚さと強さを描いた作品です。",
    average_rating: 4.2,
    discount_percent: 0,
  },
  {
    id: 9,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001976%2F0019768056LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "わたしの美しい庭 ポプラ文庫",
    price: 715,
    category: "小説",
    author: "凪良ゆう",
    release_date: "2023/01/01",
    jan_code: "9781234567894",
    description: "わたしの美しい庭は、心の癒しと再生を描いた心温まる物語です。",
    average_rating: 3.8,
    discount_percent: 0,
  },
  {
    id: 10,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002006/0020066260LL.jpg",
    product_name: "未来の年表",
    price: 1200,
    category: "書籍",
    author: "河合雅司",
    release_date: "2023/07/01",
    jan_code: "9781234567895",
    description:
      "未来の年表は、未来の日本を予測し、様々な社会問題を考察する書籍です。",
    average_rating: 4.5,
    discount_percent: 5,
  },
  {
    id: 11,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001548/0015486544LL.jpg",
    product_name: "コンビニ人間",
    price: 800,
    category: "書籍",
    author: "村田沙耶香",
    release_date: "2023/08/15",
    jan_code: "9781234567896",
    description:
      "コンビニ人間は、現代社会における人間関係や生き方を描いた小説です。",
    average_rating: 4.0,
    discount_percent: 10,
  },
  {
    id: 12,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001558/0015580274LL.jpg",
    product_name: "ノルウェイの森",
    price: 950,
    category: "書籍",
    author: "村上春樹",
    release_date: "2023/09/10",
    jan_code: "9781234567897",
    description: "ノルウェイの森は、愛と喪失をテーマにした村上春樹の名作です。",
    average_rating: 4.8,
    discount_percent: 15,
  },
  {
    id: 13,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001541%2F0015415980LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "君の名は。",
    price: 1300,
    category: "書籍",
    author: "新海誠",
    release_date: "2023/10/05",
    jan_code: "9781234567898",
    description: "君の名は。は、運命的な出会いを描いた感動的な物語です。",
    average_rating: 4.7,
    discount_percent: 20,
  },
  {
    id: 14,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001950/0019509973LL.jpg",
    product_name: "さよならの儀式",
    price: 1100,
    category: "書籍",
    author: "小川洋子",
    release_date: "2023/11/20",
    jan_code: "9781234567899",
    description: "さよならの儀式は、別れと再生をテーマにした感動的な小説です。",
    average_rating: 4.3,
    discount_percent: 0,
  },
  {
    id: 15,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002022/0020228886LL.jpg",
    product_name: "沈黙のパレード",
    price: 1200,
    category: "書籍",
    author: "東野圭吾",
    release_date: "2023/12/15",
    jan_code: "9781234567905",
    description:
      "沈黙のパレードは、ミステリーの巨匠が贈る衝撃的なサスペンスです。",
    average_rating: 4.7,
    discount_percent: 10,
  },
  {
    id: 16,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002004/0020043431LL.jpg",
    product_name: "そして誰もいなくなった",
    price: 950,
    category: "書籍",
    author: "アガサ・クリスティ",
    release_date: "2024/01/05",
    jan_code: "9781234567912",
    description:
      "アガサ・クリスティの傑作ミステリー、名探偵も魅了する事件が展開。",
    average_rating: 4.5,
    discount_percent: 5,
  },
  {
    id: 17,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001558/0015580882LL.jpg",
    product_name: "ノルウェイの森",
    price: 1300,
    category: "書籍",
    author: "村上春樹",
    release_date: "2024/02/10",
    jan_code: "9781234567929",
    description: "村上春樹が描く青春と恋愛の深み、ノルウェイの森が再登場。",
    average_rating: 4.8,
    discount_percent: 15,
  },
  {
    id: 18,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002016/0020165754LL.jpg",
    product_name: "人間失格",
    price: 850,
    category: "書籍",
    author: "太宰治",
    release_date: "2024/03/15",
    jan_code: "9781234567936",
    description: "太宰治の名作、絶望と救済の物語が鮮烈に語られる。",
    average_rating: 4.6,
    discount_percent: 20,
  },
  {
    id: 19,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001890/0018908772LL.jpg",
    product_name: "かもめ食堂",
    price: 1000,
    category: "書籍",
    author: "群ようこ",
    release_date: "2024/04/20",
    jan_code: "9781234567943",
    description: "フィンランドの小さな食堂が舞台、心温まる日常が描かれる物語。",
    average_rating: 4.4,
    discount_percent: 0,
  },
  {
    id: 20,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F001259%2F0012598285LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "夜のピクニック",
    price: 1150,
    category: "書籍",
    author: "恩田陸",
    release_date: "2024/05/25",
    jan_code: "9781234567950",
    description: "青春の一夜、歩くことで心の距離が近づく感動作。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 21,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002017/0020172614LL.jpg",
    product_name: "夜のピクニック",
    price: 1150,
    category: "書籍",
    author: "恩田陸",
    release_date: "2024/05/25",
    jan_code: "9781234567950",
    description: "青春の一夜、歩くことで心の距離が近づく感動作。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 22,
    image_url:
      "https://production-image-proxy.reproio.com/0/insecure/plain/https%3A%2F%2Fcontent.bookoff.co.jp%2Fgoodsimages%2FLL%2F000083%2F0000838307LL.jpg@avif?p=v3&a=86400000&o=https%3A%2F%2Fshopping.bookoff.co.jp&t=cf2cb530-63a1-430a-99f5-9ff5520e63b9",
    product_name: "OH MY LOVE",
    price: 110,
    category_id: "CD",
    subcategory_id: "Ｊ‐ポップ",
    author: "ZARD",
    release_date: "2024/05/25",
    publisher: "ビーイング",
    description:
      "出すシングルすべてがヒット、ある種の貫禄さえ漂うZARDの5thアルバム。耳ざわりのいいウェットなメロディ・ラインに乗せた、歌姫・坂井泉水のはかなげなヴォーカルが、恋に揺れる微妙な女心を見事に表現している。彼女が手がける飾らない詞もいい。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 23,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001923/0019233298LL.jpg",
    product_name:
      "苦しかったときの話をしようか ビジネスマンの父が我が子のために書きためた「働くことの本質」",
    price: 110,
    category_id: "書籍",
    subcategory_id: "ビジネス・経済",
    author: "ダイヤモンド社",
    release_date: "2024/05/25",
    publisher: "森岡毅",
    description:
      "出すシングルすべてがヒット、ある種の貫禄さえ漂うZARDの5thアルバム。耳ざわりのいいウェットなメロディ・ラインに乗せた、歌姫・坂井泉水のはかなげなヴォーカルが、恋に揺れる微妙な女心を見事に表現している。彼女が手がける飾らない詞もいい。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 24,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001737/0017376215LL.jpg",
    product_name: "バリ ベトナム やすらぎ雑貨 Yu mook",
    price: 110,
    category_id: "書籍",
    subcategory_id: "実用書",
    author: "雄出版",
    release_date: "	2005/06/01",
    publisher: "雄出版",
    description:
      "出すシングルすべてがヒット、ある種の貫禄さえ漂うZARDの5thアルバム。耳ざわりのいいウェットなメロディ・ラインに乗せた、歌姫・坂井泉水のはかなげなヴォーカルが、恋に揺れる微妙な女心を見事に表現している。彼女が手がける飾らない詞もいい。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 25,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001228/0012283705LL.jpg",
    product_name: "伏流水日本美",
    price: 110,
    category_id: "書籍",
    subcategory_id: "アート・エンタメ",
    author: "	スカイドア",
    release_date: "	1994/07/31",
    publisher: "雄出版",
    description:
      "出すシングルすべてがヒット、ある種の貫禄さえ漂うZARDの5thアルバム。耳ざわりのいいウェットなメロディ・ラインに乗せた、歌姫・坂井泉水のはかなげなヴォーカルが、恋に揺れる微妙な女心を見事に表現している。彼女が手がける飾らない詞もいい。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 26,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001893/0018933362LL.jpg",
    product_name:
      "発達障害の子どもの「できる」を増やす提案・交渉型アプローチ 叱らないけど譲らない支援 学研のヒューマンケアブックス",
    price: 110,
    category_id: "書籍",
    subcategory_id: "教育・語学",
    author: "	武田鉄郎",
    release_date: "		2017/09/01",
    publisher: "学研プラス",
    description:
      "出すシングルすべてがヒット、ある種の貫禄さえ漂うZARDの5thアルバム。耳ざわりのいいウェットなメロディ・ラインに乗せた、歌姫・坂井泉水のはかなげなヴォーカルが、恋に揺れる微妙な女心を見事に表現している。彼女が手がける飾らない詞もいい。",
    average_rating: 4.2,
    discount_percent: 5,
  },
  {
    id: 27,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/002010/0020107360LL.jpg",
    product_name: "新版・Sleep,Sleep,Sleep 熟睡者",
    category_id: "書籍",
    subcategory_id: "健康・医学",
    author: "クリスティアン・ベネディクト",
  },
  {
    id: 28,
    image_url:
      "https://content.bookoff.co.jp/goodsimages/LL/001947/0019473115LL.jpg",
    product_name: "ビジュアルマップ大図鑑 世界史",
    category_id: "書籍",
    subcategory_id: "歴史・思想",
    author: "スミソニアン協会",
  },
];
