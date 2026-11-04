# 國小數學學習單產生器開發手冊

## 一、專案技術

- Next.js 14，使用 App Router
- React 18
- TypeScript，`tsconfig.json` 啟用 `strict`
- Tailwind CSS 3
- `@dnd-kit` 負責拖曳排序
- Framer Motion 負責動畫

## 二、專案結構

```text
math-worksheet/
├── README.md
├── package.json                  # 專案資訊
├── package-lock.json             # npm 相依套件鎖定檔
├── next.config.mjs               # Next.js 設定（目前使用預設設定）
├── postcss.config.js             # Tailwind CSS、Autoprefixer
├── tailwind.config.ts            # Tailwind 掃描範圍、色彩、陰影、字型
├── tsconfig.json                 # TypeScript strict 設定與 @/* alias
├── global.d.ts                   # CSS 模組型別宣告
├── next-env.d.ts                 # Next.js 型別參照
├── public/
│   └── fonts/
│       └── BpmfZihiKaiStd-Regular.ttf  #暫時使用字嗨標楷注音，未來可能會加入更多字體(芫荽之類的)
└── src/
    ├── app/
    │   ├── globals.css           # 全域、注音及列印樣式
    │   ├── layout.tsx            # 根版面、網站語系、字型、metadata
    │   └── page.tsx              # 表單狀態、出題、排序、分頁、列印串接
    ├── components/
    │   ├── ui/
    │   │   ├── NeuButton.tsx     # 共用按鈕
    │   │   ├── NeuCard.tsx       # 共用卡片容器
    │   │   ├── NeuSelect.tsx     # 共用選單
    │   │   └── NeuToggle.tsx     # 共用開關按鈕
    │   └── worksheet/
    │       ├── AnswerPaper.tsx           # 答案頁
    │       ├── MathProblemRenderer.tsx   # 題型呈現、編輯、換題、注音、渲染
    │       ├── SortableItem.tsx          # 拖曳排序包裝元件
    │       ├── WorksheetForm.tsx         # 學習單參數設定面板
    │       └── WorksheetPaper.tsx        # 題目卷頁面
    ├── lib/
    │   ├── bopomofo/
    │   │   ├── converter.ts      # IVS 編譯表
    │   │   └── dictionary.ts     # 多音字及讀音選項
    │   └── math-engine/
    │       ├── index.ts          # MathRegistry 與出題公開 API
    │       ├── types.ts          # Problem、GeneratorOptions、ProblemGenerator
    │       ├── utils.ts          # 隨機數、ID、GCD、LCM、分數約分
    │       ├── grade1/           # 一年級出題模組及 index.ts
    │       ├── grade2/           # 二年級出題模組及 index.ts
    │       ├── grade3/           # 三年級出題模組及 index.ts
    │       ├── grade4/           # 四年級出題模組及 index.ts
    │       ├── grade5/           # 五年級出題模組及 index.ts
    │       └── grade6/           # 六年級出題模組及 index.ts
    └── utils/
        ├── layoutCalculator.ts   # 每頁題數演算邏輯
        └── worksheetHelpers.ts   # 分頁、年級標籤、應用題判斷(年級轉換與應用題判定)
```

根目錄與全域設定
 package.json 定義 Next.js 開發、建置、啟動與 lint 指令，以及 React、TypeScript、Tailwind、@dnd-kit、Framer Motion 等相依套件。
 package-lock.json 鎖定 npm 相依套件版本；它是依賴管理資料，不是出題或畫面邏輯。
 tsconfig.json 啟用 TypeScript strict，並設定 @/* 指向 src/*。
 next.config.mjs 目前使用 Next.js 預設設定。
 postcss.config.js 串接 Tailwind CSS 與 Autoprefixer。
 tailwind.config.ts 定義 Tailwind 掃描範圍，並擴充新擬態主題色、陰影及字型。
 global.d.ts 宣告 CSS 模組型別；next-env.d.ts 是 Next.js 型別參照檔。
 public/fonts/ 提供注音用字型，供全域 CSS 和低年級題目使用。

## 三、各層職責

1. 路由、頁面及全域樣式：src/app/
  layout.tsx 是根版面，設定網站語系、metadata、字型及全站 CSS。
  page.tsx 是主要控制層：保存表單與學習單狀態、呼叫出題器、處理換題與修改、拖曳排序、切頁，以及啟動列印。
  globals.css 設定全域底色、注音字型及 OpenType 樣式，以及 A4 列印共用規則。
  整體責任邊界是：出題器產生資料，元件呈現資料，頁面管理流程與互動。

2. 通用 UI：src/components/ui/
  NeuButton.tsx：通用按鈕。
  NeuCard.tsx：通用卡片容器。
  NeuSelect.tsx：附標籤的選單。
  NeuToggle.tsx：受控式切換控制項。
  這層不應放入特定年級的數學規則；外觀與操作透過 props 由呼叫端決定。

3. 學習單 UI：src/components/worksheet/
  WorksheetForm.tsx：單元、題數、橫式／直式、間距、解答頁、注音與產生／列印控制。
  WorksheetPaper.tsx：題目紙張、頁首、題號、每頁題目格線與頁尾，並以可排序清單呈現題目。
  MathProblemRenderer.tsx：辨識應用題、分數及一般算式，渲染題目；支援直式算式、答案顯示、單題換題、編輯及注音讀音切換。
  SortableItem.tsx：包裝 @dnd-kit 的排序互動與拖曳動畫。
  AnswerPaper.tsx：產生答案紙，依題目 ID 回查題號；答案每頁切成最多 60 題。
4. 數學出題核心：src/lib/math-engine/
  index.ts：登錄各單元 ID、標題與出題器，提供可用單元清單、整份出題和單題出題 API。
  types.ts：定義題目、出題選項及出題器函式契約。
  utils.ts：共用隨機整數、ID、最大公因數、最小公倍數及分數約分工具。
  gradeN/：依年級分隔數學領域出題規則；各年級 index.ts 匯出該年級模組。
5. 注音與排版工具
  dictionary.ts：列出可手動切換讀音的字及對應注音選項。
  converter.ts：將 [1]、[2] 標記轉成表意文字異體選擇符；目前在 src 內未查到呼叫它的程式。
  worksheetHelpers.ts：陣列分頁、年級顯示名稱及應用題判斷。
  layoutCalculator.ts：根據題型、版面及題目間距估算每頁題數。

## 四、命名與格式慣例

- React 元件與元件檔名採 PascalCase，例如 WorksheetPaper、NeuToggle。
- 函式、變數與 props 採 camelCase，例如 generateWorksheet、questionCount。
- 型別、介面採 PascalCase，例如 Problem、GeneratorOptions。
- 出題檔以年級分目錄，主題檔名採小寫或 kebab-case，例如 addition.ts、two-digit.ts。
- 單元 ID 大致使用 G{年級}-{類別}-{流水號}，例如 G1-ADD-01、G5-FRAC-01。
- 專案內部匯入可使用 @/ alias，現有頁面與元件大多採此寫法。


目前出題器的函式風格尚未完全統一：部分使用具名函式宣告，部分使用 `ProblemGenerator` 型別標註的箭頭函式。新程式宜選擇一種固定風格並持續採用；不需要為此一次性大幅改寫既有模組。

## 五、出題至列印的流程

1.頁面從 getAvailableUnits() 取得登錄單元，提供表單選擇。
2.使用者送出時，頁面以選定的單元 ID 和題數呼叫 generateWorksheet(unitId, count)。
3.math-engine/index.ts 從 MathRegistry 找出 generator，產生 Problem[]；無效單元會丟出錯誤。
4.頁面記錄題目及當次的單元標題、試卷標題和單元 ID。
5.worksheetHelpers.ts 判斷應用題；layoutCalculator.ts 依題型、版面與間距估算每頁題數。
6.chunkArray 將題目切成頁面資料；每頁交由 WorksheetPaper 呈現。
7.MathProblemRenderer 根據題目資料選擇應用題、分數或一般算式的顯示方式。
8.拖曳由 SortableItem 配合 @dnd-kit 實作；手動修改可更新 expression、answer；單題重抽透過 generateSingleProblem() 再產生一題。
9.啟用答案頁時，題目以每頁最多 60 題分頁交給 AnswerPaper。
10.列印按鈕呼叫瀏覽器 window.print()，並設定文件標題；目前是透過瀏覽器列印／另存 PDF，而非程式直接產生 PDF 文件。

## 六、擴增題型及單元模組注意事項

1. 數學條件需保證題目符合單元要求，例如範圍、進退位、有無餘數與分數約分規則。
2. `count` 應決定輸出題數；不要在出題器中悄悄忽略呼叫端的數量設定。
3. 每題 `id` 必須唯一，因為介面使用它辨識、排序與更新題目。
4. 在年級 `index.ts` 匯出出題器。
5. 在 `src/lib/math-engine/index.ts` 註冊 ID、標題與出題器。
6. 確認 `MathProblemRenderer` 能正確判斷並呈現題型。
7. 確認分頁、拖曳、單題重抽、編輯、答案頁與列印版面均能處理該題型。

## 七、擴增題型及單元模組步驟
出題模組應只負責題目生成，不引入 React 或 UI 元件。大致遵循以下結構：

import type { Problem, ProblemGenerator } from '../types';
import { generateId, getRandomInt } from '../utils';
export const generateExample: ProblemGenerator = ({ count }) => {
  const problems: Problem[] = [];

  for (let i = 0; i < count; i++) {
    const operand1 = getRandomInt(1, 9);
    const operand2 = getRandomInt(1, 9);

    problems.push({
      id: generateId(),
      expression: `${operand1} + ${operand2} =`,
      answer: String(operand1 + operand2),
      operator: '+',
    });
  }
  return problems;
};

- 此範本只示意介面和模組分工；真正加入單元時，需依年級定義範圍、進退位、餘數、單位或其他教學限制，不能直接沿用示意數值。
- 新增模組步驟如下:
  1.先定義出題條件：明確規定數值範圍、題數、運算限制、答案格式及允許的邊界情況。
  2.建立年級模組：在 src/lib/math-engine/gradeN/ 依既有主題命名新增 .ts 檔案。
  3.實作出題器：接受 { count } 並回傳 Problem[]；每一題至少包含 ID、題幹、答案及運算／題型標記。
  4.使用共用工具：優先使用 utils.ts 的隨機數、ID、GCD、LCM 或約分功能；不必在新模組重複造出相同 helper。
  5.更新年級匯出：在對應的 gradeN/index.ts 匯出新出題器。
  6.更新全域登錄表：在 math-engine/index.ts 匯入並登錄唯一單元 ID、顯示標題及 generator。表單選項會由登錄表產生，通常無須另改單元選單。
  7.確認題目分類規則：決定使用 operator、meta.type 或應用題旗標等明確契約，並讓輔助函式及渲染器能辨識它。
  8.確認排版限制：檢查直式支援、每頁題數計算及分頁行為，必要時更新 layoutCalculator.ts 和頁面／表單的題型限制。
  9.驗證整個使用流程：檢查輸出題數、答案正確、ID 不重複、單題重抽、修改、拖曳、答案頁、不同版面及列印結果。
- 注意以下細節
  1.直式算式仰賴題幹格式：MathProblemRenderer 使用正規表示式辨認一般加減乘算式和除法；題幹格式若不符合預期，可能退回一般橫式／填答線樣式。分數則以 meta.type === 'fraction' 識別，且渲染器會解析 expression 中的分數片段。
  2.應用題判定有多個依據：目前可依單元 ID 中的 WORD／NUM、operator、meta.isWordProblem 或 meta.layout 判定。新題型應採明確且一致的標記，不要只依賴 ID 子字串。
  3.版面計算會檢查 ID 子字串：layoutCalculator.ts 透過 FRAC、MUL／MULT、DIV 區分分數、乘法和除法。新單元 ID 命名會影響版面題數估算。
  4.應用題與一般算式的答案都必須是字串：答案頁直接呈現 answer，應先決定答案是否包含單位、餘數或其他格式。
  5.generator 的題數應遵守 count：除了 UI 的題數範圍外，核心出題器仍應依傳入 count 產生對應題數，不要在內部忽略呼叫端設定。
  6.ID 實作目前不完全一致(作者懶得更新了...)：一年級多數題目使用含單元前綴的隨機 ID；部分高年級使用共用隨機 ID；六年級速率題使用時間戳及題目序號。新增題目時應確保同一張學習單內 ID 唯一，並注意重抽後需維持原題的 ID。

## 八、出題模組共用工具

跨年級或跨題型重複使用的數學工具放在 `src/lib/math-engine/utils.ts`。目前包含隨機整數、ID、最大公因數、最小公倍數與分數約分。

新增共用能力前，先檢查這裡是否已有相同用途的 helper。新出題器應優先使用共用工具；部分舊的一年級模組仍自行實作隨機整數及 ID，後續可在整理該模組時逐步遷移，不需為此做無關的大型改寫。

## 九、樣式與列印

- 一般介面主要使用 Tailwind CSS utility classes。
- 主題色、陰影與字型等共用設計值定義於 `tailwind.config.ts`，例如 `neu-primary`、`shadow-neu-inset`、`font-body`。
- 全域基礎樣式與全域列印規則放在 `src/app/globals.css`。
- 頁面目前也有 A4 列印專用樣式，以及 `print:` Tailwind classes 和固定紙張尺寸。
- 調整列印樣式時，需同時檢查全域 CSS、頁面內列印 CSS、Tailwind print classes、分頁和答案頁，避免相同規則在多處互相覆蓋。
- 根版面、網站語言、字型與 metadata 集中在 `src/app/layout.tsx`。

## 十、匯入、型別與錯誤處理

- 專案內部匯入優先使用 `@/` alias。
- TypeScript 已啟用 strict；新增程式應提供明確型別，避免以 `any` 或不必要的型別斷言略過檢查。
- 純型別匯入可使用 `import type`，以清楚區分型別與執行期匯入。
- 錯誤處理需同時考量開發除錯與使用者回饋。頁面目前在批次出題失敗時會記錄錯誤並顯示提示；新增流程不應只靜默失敗或只輸出 console。

## 十一、UI 元件詳細責任

| 元件 | 職責 |
| `WorksheetForm` | 收集單元、題數、橫式／直式、間距、是否附答案、注音設定；將操作透過 props 回報頁面。 |
| `WorksheetPaper` | 呈現 A4 題目頁首、學習單標題、班級姓名欄、題目格線及頁碼；使用 `SortableItem` 包裝題目。 |
| `MathProblemRenderer` | 依 `operator`、`meta`、題目 ID 與 expression 格式判斷題型；呈現應用題、分數、一般橫式或直式算式；提供編輯與單題重抽操作。 |
| `SortableItem` | 使用 `@dnd-kit/sortable` 提供拖曳事件和排序動畫。 |
| `AnswerPaper` | 顯示答案與題號；題號由題目 ID 回查整份學習單的位置。 |
| `NeuButton`、`NeuCard`、`NeuSelect`、`NeuToggle` | 提供與學習單題型無關的通用控制項和容器。 |

`page.tsx` 不是數學規則的存放處；新增題型時，應盡量由 math engine 產生資料，再由 worksheet 元件呈現。


## 十二、擴增出題核心的格式與相容性

出題模組應只負責數學規則及 `Problem[]` 資料，不依賴 React 或 UI 元件。實作前先定義範圍、進退位／餘數等限制、答案格式及邊界情況，接著按快速流程建立模組、年級匯出及 registry 登錄。

目前呈現層對資料格式有下列實際依賴，新增題型時需一併檢查：

- **一般直式算式：**`MathProblemRenderer` 使用正規表示式解析「數字、運算符號、數字、等號」格式；除法另有 pattern。expression 不符合格式時，可能退回一般文字加答題線，不會自動推導運算欄位。
- **分數：**透過 `meta.type === 'fraction'` 識別；expression 以空白分割，含 `/` 的片段會被呈現為上下分數。
- **應用題：**目前依單元 ID 是否含 `WORD`／`NUM`、`operator` 是否為 `word`／`word-problem`，或 `meta.isWordProblem`／`meta.layout` 判定。新增題型須同步檢查 `checkIsWordProblem()` 及 renderer 的分類方式。
- **每頁題數：**`layoutCalculator.ts` 會依 `FRAC`、`MUL`／`MULT`、`DIV` 等 ID 子字串及應用題狀態選擇規則。更改 ID 類別縮寫時要確認頁面容量仍符合新題型。
- **直式支援：**表單頁面會依題型限制直式選項，並在不支援時切回橫式；新題型需讓表單限制與 renderer 能力一致。
- **答案：**答案頁不重算算式，直接輸出 `problem.answer`；單位、餘數及分數格式都由 generator 負責。
- **題目 ID：**供 React key、排序、修改、重抽及答案題號回查使用；同一份學習單內必須唯一。單題重抽會沿用原 ID。
- **注音：**低年級應用題可使用注音字型及字元讀音切換；新增文字題後應確認畫面行高及列印字型。

新增單元 ID 需沿用 `G{年級}-{類別}-{流水號}`，例如 `G3-DIV-01`。目前部分 UI helper 直接依 ID 子字串判斷類型，因此 ID 不只是顯示用識別碼；長期擴充應優先考慮明確、有型別的題型欄位，避免持續增加對 ID 命名細節的依賴。
