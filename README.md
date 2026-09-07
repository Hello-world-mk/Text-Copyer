# Text Copyer

文字フォルダのJSONに保存された文字とデータから、コピペ可能なボタンを生成するWebページです。

## 機能

- 📋 JSONファイルからテキストデータを自動読み込み
- 🔘 ワンクリックでテキストをコピー
- 📂 カテゴリ選択機能（データフォルダ内のサブフォルダがカテゴリになります）
- 📱 レスポンシブデザイン
- ✨ コピー完了の通知表示
- 🎨 グラデーション付きのモダンUI

## ファイル構成

```
Text-Copyer/
├── index.html
├── styles.css
├── script.js
├── data/
│   ├── categories.json          # カテゴリ一覧
│   ├── 連絡先/
│   │   └── texts.json          # 連絡先カテゴリのテキスト
│   ├── テンプレート/
│   │   └── texts.json          # テンプレートカテゴリのテキスト
│   └── 設定コード/
│       └── texts.json          # 設定コードカテゴリのテキスト
└── README.md
```

## 使い方

### 1. ローカルサーバーで実行

```bash
# Python 3
python -m http.server 8000

# または Node.js（http-server）
npx http-server
```

### 2. ブラウザでアクセス

`http://localhost:8000` にアクセス

### 3. カテゴリを選択してテキストをコピー

1. セレクトボックスからカテゴリを選択
2. 表示されたボタンをクリック
3. テキストが自動的にコピーされて通知が表示されます

## カスタマイズ

### カテゴリの追加

1. `data/` フォルダ内に新しいフォルダを作成（例：`data/新カテゴリ/`）
2. フォルダ内に `texts.json` を作成
3. `data/categories.json` に新しいカテゴリ名を追加

### JSONファイルの構造

```json
{
  "texts": [
    {
      "label": "表示ラベル",
      "text": "実際のテキスト"
    },
    {
      "label": "別のラベル",
      "text": "別のテキスト"
    }
  ]
}
```

### カテゴリ一覧の編集

`data/categories.json`:
```json
{
  "categories": [
    "カテゴリ1",
    "カテゴリ2",
    "カテゴリ3"
  ]
}
```

## 対応ブラウザ

- Chrome/Edge（推奨）
- Firefox
- Safari
- その他Clipboard APIに対応するモダンブラウザ

## ライセンス

MITライセンス
