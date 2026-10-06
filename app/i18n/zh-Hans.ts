import type { Dict } from "./en";

// Simplified Chinese copy. Mirrors en.ts key for key, except that it promotes no AI
// feature (Apple 智能 isn't offered in mainland China; owner, 2026-10-06, as the zh-Hans
// App Store listing does): the Assistant section is hidden (locales.ts `ai: false`) and
// the Premium list and FAQ leave the Assistant and Apple 智能 out.
export const zhHans: Dict = {
  lang: "zh-Hans",
  // The page's <title> and search/social description.
  meta: {
    title: "DockPops——为 Mac 程序坞打造自定义文件夹",
    description:
      "为程序坞打造精美的自定义文件夹。将 App、文件和链接归入 Pop，再用主题、PopFX 动态背景和相匹配的程序坞图标，为每个 Pop 换上自己的风格。无需订阅。",
  },
  // Names for screen readers (not shown).
  a11y: {
    site: "网站",
    dock: "程序坞",
    footer: "页脚",
    facts: "DockPops 概览",
  },
  menu: {
    features: "功能",
    pricing: "价格",
    faq: "常见问题",
    support: "支持",
    download: "下载",
  },
  hero: {
    title: "为程序坞\u200B打造\u200B专属文件夹。",
    body:
      "点按 DockPops 图标，由 App、文件、文件夹和链接组成的网格就会在你期待的位置弹出。再为每个 Pop 换上自己的风格。",
    free: "免费下载。Premium（高级版）一次购买，无需订阅。",
    hint: "点按程序坞中的 Pop 即可打开。",
    hintTouch: "轻点程序坞中的 Pop 即可打开。",
    // A Dock tile's accessible name: {name} the Pop's, {theme} its theme's.
    tile: "{name}，{theme} 主题的 Pop",
  },
  // A Dock tile's tooltip: the Pop's look in the inspector's own words.
  // Each value is labelled so a Latin value ("PopFX Arc", "Papyrus") never butts against Chinese.
  look: {
    line: "{theme}，视图：{view}，填充：{fill}，标签：{labels}",
    views: { grid: "网格", list: "列表", tiles: "卡片" },
    fills: { glass: "玻璃效果", color: "颜色", gradient: "渐变", popfx: "PopFX" },
    fonts: { system: "系统", rounded: "圆体", serif: "衬线", mono: "等宽", papyrus: "Papyrus" },
  },
  trust: [
    "免费下载",
    "一次购买，无需订阅",
    "无跟踪，无广告",
    "原生 Mac App，适用于 macOS 14 或更高版本",
  ],
  files: {
    title: "App、文件和文件夹。",
    body:
      "每个 Pop 最多可放 25 个 App、文件或文件夹。从 Mac 上的任意位置拖入，在 Pop 中直接浏览文件夹，按下空格键即可“快速查看”。",
    drill: "无需离开 Pop 即可浏览文件夹",
    quickLook: "按下空格键，快速查看任意文件",
  },
  themes: {
    title: "随心定制，\u200B百变由你。",
    body:
      "23 款内置主题，也可以存储自定主题，在多个 Pop 中重复使用。为每个 Pop 选择颜色、渐变、自己的照片或 PopFX 背景，添加边框，设置标签字体，并以网格、列表或卡片显示。它的程序坞图标也会随之匹配。",
    view: "视图",
    theme: "主题",
  },
  popfx: {
    title: "它活了！",
    body:
      "PopFX 背景会动，还会随指针变化：弧光、帷幕、波浪、大理石、雪、余烬、字符雨等。",
    count: "23 款内置主题，其中 11 款为 PopFX 主题。",
  },
  assistant: {
    title: "想改什么，\u200B说一声。",
    body:
      "告诉助理你想要什么，例如“添加 Pages”、“切换到列表视图”或“营造黄金时刻的感觉”，它就会在你眼前更改 Pop。除了删除，每项更改都可以撤销。",
    note: "支持 Apple 智能。助理需要 macOS 27 和 DockPops Premium。",
    panel: "助理",
    // The Assistant's own replies (DockPops 6.0, on-device), each with what it changed.
    exchanges: [
      {
        ask: "添加 Pages",
        reply: "我已将 Pages 添加到 Pop 中，因为它是一款效率 App，正是你要求添加的内容。",
        changed: "已更改：项目",
      },
      {
        ask: "切换到列表视图",
        reply: "我已将 Pop 的视图设为列表，因为你想要列表形式。",
        changed: "已更改：布局",
      },
      {
        ask: "营造黄金时刻的感觉",
        reply: "我已将 Pop 的主题更改为 Gold Leaf，因为你想要黄金时刻的感觉，而 Gold Leaf 主题正好契合这种氛围。",
        changed: "已更改：主题",
      },
    ],
    undo: "撤销此更改",
    placeholder: "请求更改…",
    replay: "重新播放",
  },
  everyday: {
    title: "每段日常，\u200B都有一个 Pop。",
    body: "工作、新品发布、旅行、周末。每件事所需的一切，都在程序坞中，一点即开。",
  },
  pricing: {
    title: "免费下载，\u200B升级只需一次。",
    free: "免费版",
    freeLine: "永久免费",
    premium: "Premium",
    premiumLine: "一次购买，无需订阅",
    once: "一次性",
    freeItems: [
      "2 个 Pop，每个 Pop 最多 6 个 App 或链接",
      "实时程序坞图标，以及每个 Pop 单独的程序坞图标",
      "在 Pop 之间轻扫切换，并浏览文件夹",
      "网格视图、标签、间距和悬停高亮",
      "从任意 App 的“共享”菜单存储链接",
      "菜单栏模式",
    ],
    premiumItems: [
      "最多 100 个 Pop，每个 Pop 最多 25 个项目",
      "在 Pop 中放入文件和文件夹",
      "23 款主题、PopFX 背景，以及你自己的填充和边框",
      "“列表”和“卡片”视图",
      "每个 Pop 的键盘快捷键",
      "选取每个程序坞图标显示哪些 Pop",
      "固定 Pop、“全部打开”及更多排序方式",
    ],
  },
  faq: {
    title: "有问必答。",
    items: [
      {
        q: "程序坞本身不就能做到吗？",
        a: "不完全是。程序坞文件夹（叠放）显示的是磁盘上某个文件夹里的内容，按名称、日期或种类排序。Pop 则是你自己挑选的一组项目：App、文件、文件夹和链接可任意组合，按你的顺序排列，并有自己的名称、主题和程序坞图标。你可以将多个 Pop 归到同一个程序坞图标下并在它们之间轻扫切换，用各自的键盘快捷键打开任意 Pop，在 Pop 中浏览文件夹，还能按下空格键“快速查看”文件。",
      },
      {
        q: "要使用多个程序坞图标，需要 DockPops Companion 吗？",
        a: "只有 Mac App Store 版本需要。macOS 不允许沙盒化的 App 添加多个程序坞图标，因此免费的 DockPops Companion 会为每个 Pop 创建一个小型启动器，并让其图标保持同步。它只与你 Mac 上的 DockPops 通信。直接下载版本未采用沙盒，因此会自行添加程序坞图标。",
      },
      {
        q: "macOS Tahoe 移除了启动台。DockPops 能取代它吗？",
        a: "它满足的是类似的需求：从程序坞打开一个由 App 组成的网格。不同之处在于，每个 Pop 都由你亲手打造，因此你可以为工作、项目和周末各建一个 Pop，每个都一点即开。",
      },
      {
        q: "PopFX 是什么？",
        a: "一种会动、还会随指针变化的背景类型：弧光、帷幕、波浪、大理石、雪、余烬、字符雨等。23 款内置主题中有 11 款采用 PopFX。Pop 关闭时 PopFX 会暂停；开启“减弱动态效果”或“低电量模式”时，它会保持静止。",
      },
      {
        q: "DockPops 与 Alfred、Raycast 或“聚焦”有什么不同？",
        a: "它们是用快捷键唤出的搜索浮层。DockPops 则常驻程序坞：Pop 早已整理就绪，一点即开。很多人两者都用。",
      },
      {
        q: "Premium 如何收费？",
        a: "Premium 只需购买一次，绝不采用订阅制。它可解锁最多 100 个 Pop（每个 Pop 25 个项目）、文件和文件夹、主题和 PopFX、“列表”和“卡片”视图、每个 Pop 的键盘快捷键等功能。免费版 DockPops 提供 2 个 Pop，每个 Pop 6 个项目，足以好好试用。",
      },
      {
        q: "DockPops 会收集我的数据吗？",
        a: "不会。没有分析，没有跟踪，没有广告。你的 Pop 只保存在你的 Mac 上。",
      },
      {
        q: "DockPops 可以在哪些 Mac 上运行？",
        a: "任何装有 macOS Sonoma（14）或更高版本的 Mac。",
      },
    ],
  },
  support: {
    title: "需要帮助？",
    body: "发邮件给我们，我们通常会在两天内回复。",
    email: "dockpops@pixleygrowth.com",
  },
  footer: {
    rights: "Pixley Growth LLC 保留所有权利。",
    privacy: "隐私政策",
    support: "支持",
    language: "语言",
  },
  download: {
    appStore: "在 Mac App Store 下载",
    direct: "直接下载",
  },
  // The analytics consent banner (shown in Europe) and the footer link that reopens it.
  consent: {
    text: "dockpops.com 使用 Google Analytics 统计访问量并了解哪些页面被阅读。允许使用分析 Cookie 吗？",
    allow: "允许",
    decline: "拒绝",
    settings: "Cookie 设置",
  },
};
