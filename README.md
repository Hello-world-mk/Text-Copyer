# Text Copyer

文字フォルダのJSONに保存された文字とデータから、コピペ可能なボタンを生成するWebページです。

## 機能

- 📋 JSONファイルからテキストデータを自動読み込み
- 🔘 ワンクリックでテキストをコピー
- 📱 レスポンシブデザイン
- ✨ コピー完了の通知表示
- 🎨 グラデーション付きのモダンUI

## 使い方

### 1. ファイル構成

```
Text-Copyer/
├── index.html
├── styles.css
├── script.js
└── data/
    └── texts.json
```

### 2. JSONファイルの構造

`data/texts.json` に以下の形式でテキストを保存します：

```json
{
  "texts": [
    {
      "label": "表示ラベル",
      "text": "コピーするテキスト"
    },
    {
      "label": "別のラベル",
      "text": "別のテキスト"
    }
  ]
}
```

### 3. 使用方法

1. ローカルサーバーで実行（CORSエラー防止）
   ```bash
   # Python 3
   python -m http.server 8000
   
   # または Node.js（http-server）
   npx http-server
   ```

2. ブラウザで `http://localhost:8000` にアクセス

3. ボタンをクリックするとテキストがコピーされます

## カスタマイズ

### テキストの追加・編集

`data/texts.json` を編集してテキストを追加・変更できます。

### スタイルの変更

`styles.css` を編集して色やレイアウトをカスタマイズできます。

## 対応ブラウザ

- Chrome/Edge（推奨）
- Firefox
- Safari
- その他Clipboard APIに対応するモダンブラウザ

## ライセンス

MITライセンス
