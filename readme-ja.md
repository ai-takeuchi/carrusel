# カルーセル関数

この JavaScript 関数は、WebサイトやWebアプリケーションで使用するためのカルーセル（スライダー）を操作するためのものです。柔軟なパラメーター設定やマウスイベントの処理など、さまざまな機能が含まれています。

## 使用法

1. HTML ファイルでスライダーをセットアップする

```html
<div id="carrusel">
    <ul class="sliders">
        <li>Slide 1</li>
        <li>Slide 2</li>
        <li>Slide 3</li>
        <!-- 追加のスライド -->
    </ul>

    <div class="btn-container">
        <button class="prevBtn">前へ</button>
        <button class="nextBtn">次へ</button>
    </div>

    <div class="indicators"></div>
</div>
```

2. JavaScript ファイルで関数を呼び出す

```javascript
// パラメーターオブジェクトを設定する
const params = {
    id: 'carrusel',  // カルーセルのID
    waitDuration: 3000,  // 待機時間（ミリ秒）
    animationDuration: 300,  // アニメーションの時間（ミリ秒）
    showIndicator: true,  // インジケーターを表示するかどうか
    enableIndicatorEvent: true,  // インジケーターのイベントを有効にするかどうか
    indicatorEventTypeQuick: false,  // インジケーターのイベントの種類を Quick にするかどうか
    showChangeContentButton: true,  // コンテンツ変更ボタンを表示するかどうか
};

// 関数を呼び出す
carrusel(params);
```

## パラメーター

- id: カルーセルのHTML要素のID
- waitDuration: スライドの自動切り替えまでの待機時間（ミリ秒）
- animationDuration: スライドのアニメーション時間（ミリ秒）
- showIndicator: インジケーターを表示するかどうか
- enableIndicatorEvent: インジケーターのクリックイベントを有効にするかどうか
- indicatorEventTypeQuick: インジケーターのイベントの種類を Quick にするかどうか
- showChangeContentButton: コンテンツ変更ボタンを表示するかどうか

## ライセンス

MIT ライセンスの下で利用可能です。詳細については、LICENSE をご覧ください。
