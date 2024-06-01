/**
 * カルーセルを操作する関数
 * Function to control the carousel
 * @param {object} params パラメーターオブジェクト // Parameters object
 */
function carrusel(params) {
    params = {
        ...{
            id: 'carrusel',  // カルーセルのID // ID of the carousel
            waitDuration: 3000,  // 待機時間（ミリ秒） // Wait duration (milliseconds)
            animationDuration: 300,  // アニメーションの時間（ミリ秒） // Animation duration (milliseconds)
            showIndicator: true,  // インジケーターを表示するかどうか // Whether to show indicators
            enableIndicatorEvent: true,  // インジケーターのイベントを有効にするかどうか // Whether to enable indicator events
            indicatorEventTypeQuick: false,  // インジケーターのイベントの種類を Quick にするかどうか // Whether to enable indicator events type is quick motion
            showChangeContentButton: true,  // コンテンツ変更ボタンを表示するかどうか // Whether to show content change buttons
        }, ...params
    };

    const list = document.querySelector('#' + params.id + ' .sliders');
    const lis = list.querySelectorAll('li');
    const countLi = lis.length;
    const centerIndex = parseInt(countLi / 2);
    const isEven = countLi % 2 == 0;

    let firstLi, lastLi, cloneHeadLi, cloneEndLi;
    let width, maxWidth;
    let animating = false;

    const btnContainerStyleDisplay = document.querySelector('#' + params.id + ' .btn-container').style.display;
    const indicatorsStyleDisplay = document.querySelector('#' + params.id + ' .indicators').style.display;

    if (isEven) {
        // 最後の li を複製して先頭に追加して奇数個にする
        // Duplicate the last li and add it to the beginning to make it odd
        const lastLi = list.querySelector('li:last-child');
        const cloneLastLi = lastLi.cloneNode(true); // 複製を作成 // Create a clone
        list.insertBefore(cloneLastLi, list.firstElementChild); // 先頭に複製を追加 // Add clone to the beginning
    }

    function showChangeContentButton(b) {
        let v = btnContainerStyleDisplay;
        if (!b) { v = 'none'; }
        document.querySelector('#' + params.id + ' .btn-container').style.display = v;
    }

    showChangeContentButton(params.showChangeContentButton);

    function showIndicator(b) {
        let v = indicatorsStyleDisplay;
        if (!b) { v = 'none'; }
        document.querySelector('#' + params.id + ' .indicators').style.display = v;
    }

    showIndicator(params.showIndicator);

    let startTimer;
    // 開始を一時停止するためのフラグ
    // Flag to temporarily pause the start
    let animationPaused = false;

    // マウスが要素に入ったときの処理
    // Processing when the mouse enters the element
    list.addEventListener('mouseenter', () => {
        clearTimeout(startTimer);
        animationPaused = true;
    });

    // マウスが要素から離れたときの処理
    // Processing when the mouse leaves the element
    list.addEventListener('mouseleave', () => {
        animationPaused = false;
        start();
    });

    // 前へボタン
    // Previous button
    document.querySelector('#' + params.id + ' .prevBtn').addEventListener('click', () => {
        if (animating) return;

        animationPaused = true;
        clearTimeout(startTimer);
        // 逆方向のアニメーションを開始 // Start animation in reverse direction
        animateReverseMargin();
    });

    // 次へボタン
    // Next button
    document.querySelector('#' + params.id + ' .nextBtn').addEventListener('click', () => {
        if (animating) return;

        animationPaused = true;
        clearTimeout(startTimer);
        animateMargin();
    });

    const indicatorsContainer = document.querySelector('#' + params.id + ' .indicators');

    // ドットインジケーターを生成する関数
    // Function to create dot indicators
    function createIndicators() {
        for (let i = 0; i < countLi; i++) {
            lis[i].setAttribute('index', i);

            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            indicator.setAttribute('data-index', i);
            indicatorsContainer.appendChild(indicator);
        }
    }

    // アクティブなインジケーターを更新する関数
    // Function to update active indicators
    function updateIndicators() {
        const lis = list.querySelectorAll('li');
        const activeIndex = lis[centerIndex].getAttribute('index');
        const indicators = document.querySelectorAll('#' + params.id + ' .indicator');
        indicators.forEach((indicator, index) => {
            if (index == activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // インジケーターをクリックしたときのイベントリスナー 1
    // Event listener 1 for clicking on indicators
    if (params.enableIndicatorEvent && params.indicatorEventTypeQuick) {
        indicatorsContainer.addEventListener('click', (event) => {
            if (animating) return;

            if (event.target.classList.contains('indicator')) {
                animationPaused = true;
                const index = parseInt(event.target.getAttribute('data-index'));
                for (let i = 0; i < countLi; i++) {
                    // 先頭のli要素を取得 // Get the first li element
                    if (isEven) {
                        firstLi = list.querySelector('li:nth-child(2)');
                    } else {
                        firstLi = list.querySelector('li:first-child');
                    }
                    lastLi = list.removeChild(firstLi);
                    list.appendChild(lastLi);
                    let lis = list.querySelectorAll('li');
                    let activeIndex = lis[centerIndex].getAttribute('index');
                    if (index == activeIndex) { break; }
                }
                updateIndicators();
            }
        });
    }

    // インジケーターをクリックしたときのイベントリスナー 2
    // Event listener 2 for clicking on indicators
    if (params.enableIndicatorEvent && !params.indicatorEventTypeQuick) {
        indicatorsContainer.addEventListener('click', (event) => {
            if (animating) return;

            if (event.target.classList.contains('indicator')) {
                clearTimeout(startTimer);
                animationPaused = true;
                const index = parseInt(event.target.getAttribute('data-index'));
                const lis = list.querySelectorAll('li');
                const activeIndex = lis[centerIndex].getAttribute('index');
                let l = index - activeIndex;
                if (l == 0) { return; }
                if (l < 0) {
                    l = countLi + l;
                }
                async function moveNext() {
                    if (animating) {
                        return;
                    }
                    await animateMargin();
                    await delay(params.animationDuration * 2);
                    l--;
                    if (l) {
                        moveNext();
                    }
                }
                moveNext();
            }
        });
    }

    // .sliders 内の最初と最後の <li> 要素がはみ出すことなく収まっているかどうかを確認する関数
    // Check if the first and last <li> elements in .sliders fit together without overflowing
    function isCarouselInViewport() {
        const carousel = document.getElementById(params.id);
        if (!carousel) {
            console.error('Carousel element not found.');
            return false;
        }

        const sliders = carousel.querySelector('.sliders');
        if (!sliders) {
            console.error('Sliders element not found within the carousel.');
            return false;
        }

        const firstLi = sliders.querySelector('li:first-child');
        const lastLi = sliders.querySelector('li:last-child');

        const rect = sliders.getBoundingClientRect();
        const firstLiRect = firstLi.getBoundingClientRect();
        const lastLiRect = lastLi.getBoundingClientRect();

        if (firstLiRect.left < rect.left || lastLiRect.right > rect.right) {
            return false;
        }

        return true;
    }

    // margin を変更してアニメーション
    // Animate by changing the margin
    async function animateMargin() {
        if (isCarouselInViewport()) {
            start();
            return;
        }

        animating = true;
        clearTimeout(startTimer);

        // 先頭のli要素を取得 // Get the first li element
        if (isEven) {
            firstLi = list.querySelector('li:nth-child(2)');
        } else {
            firstLi = list.querySelector('li:first-child');
        }

        // 要素の幅を取得 // Get the width of the element
        width = firstLi.offsetWidth; // 要素の幅（border と padding を含む）
        maxWidth = width * -2;

        // 先頭のli要素のクローンを作成 // Create a clone of the first li element
        // アニメーションの設定 // Animation settings
        cloneEndLi = firstLi.cloneNode(true);

        cloneHeadLi = cloneEndLi.cloneNode(true); // 複製を作成 // Create a clone
        cloneHeadLi.style.marginLeft = 0;

        list.appendChild(cloneEndLi); // 末尾に追加 // Add to the end
        list.insertBefore(cloneHeadLi, list.firstElementChild); // 先頭に追加 // Add to the beginning

        // 先頭のli要素のアニメーション // Animation of the first li element
        requestAnimationFrame(cloneHeadLiAnimation);
    }

    // 逆方向のアニメーションを開始 // Start animation in reverse direction
    function animateReverseMargin() {
        if (isCarouselInViewport()) {
            start();
            return;
        }

        animating = true;
        clearTimeout(startTimer);

        // 最後のli要素を取得 // Get the last li element
        lastLi = list.querySelector('li:last-child');
        // 要素の幅を取得 // Get the width of the element
        width = lastLi.offsetWidth; // 要素の幅（border と padding を含む）
        maxWidth = width * -2;

        // 最後のli要素のクローンを作成 // Create a clone of the last li element
        // アニメーションの設定 // Animation settings
        cloneEndLi = lastLi.cloneNode(true);
        cloneEndLi.style.marginRight = 0;

        cloneHeadLi = cloneEndLi.cloneNode(true); // 複製を作成 // Create a clone

        list.appendChild(cloneEndLi); // 末尾に追加 // Add to the end
        if (isEven) {
            // 2つ目に挿入 // Insert as the second element
            const secondChild = list.children[1]; // インデックス1の子要素を取得 // Get the child element at index 1
            list.insertBefore(cloneHeadLi, secondChild);
        } else {
            list.insertBefore(cloneHeadLi, list.firstElementChild); // 先頭に追加 // Add to the beginning
        }

        // 最後のli要素のアニメーション // Animation of the last li element
        requestAnimationFrame(reverseCloneEndLiAnimation);
    }

    let animationStartTime = 0;
    function calc(timestamp) {
        if (animationStartTime == 0) {
            animationStartTime = timestamp;
        }
        const elapsed = timestamp - animationStartTime;

        const pxPerMs = maxWidth / params.animationDuration; // rate
        let l = pxPerMs * elapsed;
        // console.log('elapsed', elapsed, 'pxPerMs', pxPerMs, 'l', l + 'px > ', max);

        if (l < maxWidth) {
            l = maxWidth;
        }
        return l;
    }

    // 最後のli要素のアニメーション // Animation of the last li element
    async function cloneHeadLiAnimation(timestamp) {
        const l = calc(timestamp);
        cloneHeadLi.style.marginLeft = l + 'px';

        if (l > maxWidth) {
            requestAnimationFrame(cloneHeadLiAnimation);
        } else {
            animationStartTime = 0;
            list.removeChild(cloneHeadLi);
            list.removeChild(firstLi);
            animating = false;
            start();
        }
    }

    // 最後のli要素の逆方向のアニメーション // Reverse animation of the last li element
    async function reverseCloneEndLiAnimation(timestamp) {
        const l = calc(timestamp);
        cloneEndLi.style.marginRight = l + 'px';

        if (l > maxWidth) {
            requestAnimationFrame(reverseCloneEndLiAnimation);
        } else {
            animationStartTime = 0;
            list.removeChild(cloneEndLi);
            list.removeChild(lastLi);
            animating = false;
            start();
        }
    }

    // アニメーションループ // Animation loop
    function start() {
        if (animating) return;

        // インジケーターを更新 // Update the indicators
        updateIndicators();

        if (isCarouselInViewport()) {
            showChangeContentButton(false);
            showIndicator(false);
        } else {
            showChangeContentButton(true);
            showIndicator(true);
        }

        // アニメーションが一時停止していたら何もしない // If animation is paused, do nothing
        if (animationPaused) return;

        startTimer = setTimeout(() => {
            animateMargin();
        }, params.waitDuration);
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 開始 // Start
    // ドットインジケーターを生成 // Create dot indicators
    createIndicators();
    start();
}
