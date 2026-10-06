import type { Dict } from "./en";

// Japanese copy. Mirrors en.ts key for key.
// Terms follow the app's ja catalog (Localizable.xcstrings), the Japanese App Store listing
// (app-store/Version 6/listing-ja.md), the Japanese Help (docs/help/ja) and
// docs/localization/glossary-ja.md. "Pops" is "Pop" in Japanese (no plural).
export const ja: Dict = {
  lang: "ja",
  // The page's <title> and search/social description.
  meta: {
    title: "DockPops：MacのDockにカスタムフォルダを",
    description:
      "Dockのための美しいカスタムフォルダ。アプリ、ファイル、リンクをPopにまとめて、テーマ、動くPopFX背景、それに合わせたDockアイコンで一つひとつを自分好みに。サブスクリプションなし。",
  },
  // Names for screen readers (not shown).
  a11y: {
    site: "サイト",
    dock: "Dock",
    footer: "フッタ",
    facts: "DockPopsの概要",
  },
  menu: {
    features: "機能",
    pricing: "価格",
    faq: "FAQ",
    support: "サポート",
    download: "ダウンロード",
  },
  hero: {
    title: "Dockに\u200Bカスタム\u200Bフォルダを。",
    body:
      "DockPopsのアイコンをクリックすると、アプリ、ファイル、フォルダ、リンクを並べたグリッドが、思いどおりの場所にさっと現れます。あとは一つひとつを自分好みに。",
    free: "無料でダウンロードできます。Premiumは買い切りで、サブスクリプションはありません。",
    hint: "DockのPopをクリックして開いてみてください。",
    hintTouch: "DockのPopをタップして開いてみてください。",
    // A Dock tile's accessible name: {name} the Pop's, {theme} its theme's.
    tile: "{name}、{theme}テーマのPop",
  },
  // A Dock tile's tooltip: the Pop's look in the inspector's own words.
  look: {
    line: "{theme}、{view}表示、塗りつぶし：{fill}、ラベル：{labels}",
    views: { grid: "グリッド", list: "リスト", tiles: "タイル" },
    fills: { glass: "ガラス", color: "カラー", gradient: "グラデーション", popfx: "PopFX" },
    fonts: { system: "システム", rounded: "丸ゴシック", serif: "セリフ", mono: "等幅", papyrus: "Papyrus" },
  },
  trust: [
    "無料でダウンロード",
    "買い切り、サブスクリプションなし",
    "トラッキングも広告もなし",
    "macOS 14以降に対応したネイティブのMacアプリ",
  ],
  files: {
    title: "アプリ、\u200Bファイル、\u200Bフォルダ。",
    body:
      "1つのPopに最大25個のアプリ、ファイル、フォルダをまとめられます。Macのどこからでもドラッグして追加でき、フォルダの中身もPopの中でそのまま閲覧できます。スペースバーを押せば、クイックルックでプレビューできます。",
    drill: "Popを離れずにフォルダの中身を表示",
    quickLook: "スペースバーでどのファイルもクイックルック",
  },
  themes: {
    title: "どこまでも\u200Bカスタマイズ。",
    body:
      "23種類の内蔵テーマから選ぶことも、自分で作ったテーマを保存してほかのPopで使い回すこともできます。Popごとにカラー、グラデーション、自分の写真、PopFXから背景を選び、枠線を追加し、ラベルのフォントを設定して、グリッド、リスト、タイルのいずれかで表示できます。Dockアイコンもそれに合わせて変わります。",
    view: "表示",
    theme: "テーマ",
  },
  popfx: {
    title: "生きてるぞ！",
    body:
      "PopFX背景はポインタに反応して動きます。アーク、カーテン、ウェーブ、マーブル、スノー、残り火、降り注ぐコードなどを用意しました。",
    count: "内蔵テーマは23種類。そのうち11種類がPopFXです。",
  },
  assistant: {
    title: "頼むだけ。",
    body:
      "アシスタントに「Pagesを追加」「リスト表示に切り替える」「ゴールデンアワーのような雰囲気にしてください」のように頼むだけで、目の前でPopが変わります。削除以外の変更はすべて取り消せます。",
    note: "Apple Intelligenceを活用。アシスタントにはmacOS 27とDockPops Premiumが必要です。",
    panel: "アシスタント",
    // The Assistant's own replies (DockPops 6.0, on-device), each with what it changed.
    exchanges: [
      {
        ask: "Pagesを追加",
        reply: "Pagesは仕事効率化アプリで、ご依頼の内容にも合うため、Popに追加しました。",
        changed: "変更：項目",
      },
      {
        ask: "リスト表示に切り替える",
        reply: "リスト形式をご希望でしたので、Popの表示方法をリストに設定しました。",
        changed: "変更：レイアウト",
      },
      {
        ask: "ゴールデンアワーのような雰囲気にしてください",
        reply: "ゴールデンアワーの雰囲気をご希望でしたので、それに合うGold LeafにPopのテーマを変更しました。",
        changed: "変更：テーマ",
      },
    ],
    undo: "この変更を取り消す",
    placeholder: "変更を依頼…",
    replay: "もう一度再生",
  },
  everyday: {
    title: "1日の\u200Bどんな場面にも、\u200BPopを。",
    body: "仕事、ローンチ、旅行、週末。それぞれに必要なものが、Dockからワンクリックで。",
  },
  pricing: {
    title: "ダウンロードは\u200B無料。\u200B購入は\u200B一度だけ。",
    free: "無料版",
    freeLine: "ずっと無料",
    premium: "Premium",
    premiumLine: "買い切り、サブスクリプションなし",
    once: "買い切り",
    freeItems: [
      "2個のPop（各Popに最大6個のアプリまたはリンク）",
      "ライブ表示のDockアイコンと、Popごとの専用のDockアイコン",
      "Pop間のスワイプと、フォルダの中身の表示",
      "グリッド表示、ラベル、間隔、ホバー時のハイライト",
      "どのアプリの共有メニューからでもリンクを保存",
      "メニューバーモード",
    ],
    premiumItems: [
      "最大100個のPop（各Popに最大25項目）",
      "Popにファイルとフォルダを追加",
      "23種類のテーマ、PopFX背景、独自の塗りつぶしと枠線",
      "リスト表示とタイル表示",
      "Popごとのキーボードショートカット",
      "各Dockアイコンに表示するPopを選択",
      "Popの固定、「すべて開く」、さらに多くの並べ替え順序",
      "アシスタント（macOS 27）とApple Intelligenceによる提案（macOS 26）",
    ],
  },
  faq: {
    title: "よくある質問。",
    items: [
      {
        q: "Dockだけでも同じことができるのでは？",
        a: "似ていますが、違います。Dockのフォルダ（スタック）は、ディスク上の1つのフォルダの中身を、名前、日付、種類の順に並べて表示するものです。Popは自分で選んだ項目のセットです。アプリ、ファイル、フォルダ、リンクを自由に組み合わせて好きな順に並べ、Popごとに名前、テーマ、Dockアイコンを設定できます。複数のPopを1つのDockアイコンにまとめてスワイプで切り替えたり、Popごとのキーボードショートカットで開いたり、Popの中でフォルダの中身を見たり、スペースバーでファイルをクイックルックしたりできます。",
      },
      {
        q: "複数のDockアイコンを使うには、DockPops Companionが必要ですか？",
        a: "必要なのはMac App Store版だけです。macOSでは、サンドボックス化されたアプリはDockアイコンを1つしか追加できません。そのため、無料のDockPops CompanionがPopごとに小さなランチャアプリを作成し、そのアイコンを同期し続けます。DockPops Companionが通信する相手は、Mac上のDockPopsだけです。直接ダウンロード版はサンドボックス化されていないため、DockPops自体がDockアイコンを追加します。",
      },
      {
        q: "macOS TahoeでLaunchpadがなくなりました。DockPopsはその代わりになりますか？",
        a: "Dockから開くアプリのグリッドという点で、似た役割を果たします。違いは、Popを一つひとつ自分で作れることです。仕事用、プロジェクト用、週末用のPopをそれぞれ用意して、どれもワンクリックで開けます。",
      },
      {
        q: "PopFXとは何ですか？",
        a: "ポインタに反応して動く背景の種類です。アーク、カーテン、ウェーブ、マーブル、スノー、残り火、降り注ぐコードなどがあります。23種類の内蔵テーマのうち11種類がPopFXを使用しています。PopFXはPopを閉じている間は一時停止し、「視差効果を減らす」や低電力モードがオンのときは動きません。",
      },
      {
        q: "アシスタントは、リクエストに応じて何をしますか？",
        a: "選択中のPopを変更します。テーマ、塗りつぶし、枠線、ラベル、表示方法、Dockアイコン、名前、項目を変更できます。アシスタントはApple Intelligenceを使用するため、macOS 27とApple Intelligenceに対応したMac、そしてDockPops Premiumが必要です。Mac App Store版では、Apple IntelligenceがAppleのプライベートクラウドコンピューティングを使用して応答する場合があります。",
      },
      {
        q: "DockPopsはAlfred、Raycast、Spotlightとどう違いますか？",
        a: "これらは、キーボードショートカットで画面に呼び出して使う検索ツールです。DockPopsはDockにあり、Popはすでに整理された状態で、いつでもワンクリックで開けます。両方を併用している人もたくさんいます。",
      },
      {
        q: "Premiumの料金は？",
        a: "Premiumは買い切りで、サブスクリプションではありません。最大100個のPop（各Popに25項目まで）、ファイルとフォルダ、テーマとPopFX、リスト表示とタイル表示、Popごとのキーボードショートカット、アシスタントなどのロックが解除されます。無料版のDockPopsでも2個のPop（各Popに6項目まで）を使えるので、じっくり試せます。",
      },
      {
        q: "DockPopsはユーザのデータを収集しますか？",
        a: "いいえ。分析もトラッキングも広告もありません。PopはMac上にとどまります。アプリの提案もMac上で実行されます。アシスタントはApple Intelligenceを使用し、Mac App Store版ではAppleのプライベートクラウドコンピューティングを通じて応答する場合があります。",
      },
      {
        q: "DockPopsはどのMacで使えますか？",
        a: "macOS Sonoma（14）以降を搭載したMacで使えます。Apple Intelligenceによる提案にはmacOS 26が、アシスタントにはmacOS 27とDockPops Premiumが必要です。",
      },
    ],
  },
  support: {
    title: "お困りですか？",
    body: "メールでお問い合わせください。通常、2日以内に返信いたします。",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC. All rights reserved.",
    privacy: "プライバシーポリシー",
    support: "サポート",
    language: "言語",
  },
  download: {
    appStore: "Mac App Storeからダウンロード",
    direct: "直接ダウンロード",
  },
};
