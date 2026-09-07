// カテゴリ一覧を取得
async function loadCategories() {
    try {
        const response = await fetch('./data/categories.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('カテゴリリストの読み込みに失敗しました:', error);
        return [];
    }
}

// 特定のカテゴリのテキストデータを読み込む
async function loadCategoryData(category) {
    try {
        const response = await fetch(`./data/${category}/texts.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`カテゴリ「${category}」のデータ読み込みに失敗しました:`, error);
        return null;
    }
}

// カテゴリセレクトボックスを初期化
async function initializeCategorySelect() {
    const select = document.getElementById('category-select');
    const categories = await loadCategories();

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory) {
            loadAndDisplayCategory(selectedCategory);
        } else {
            clearButtons();
        }
    });
}

// ボタンをHTMLに生成する
function createButtons(data) {
    const container = document.getElementById('text-buttons');
    container.innerHTML = '';
    container.classList.remove('empty');

    if (!data || !data.texts || data.texts.length === 0) {
        container.classList.add('empty');
        container.textContent = 'テキストデータが見つかりません';
        return;
    }

    data.texts.forEach((item) => {
        const button = document.createElement('button');
        button.className = 'text-button';
        button.innerHTML = `
            <span class="button-label">${item.label || 'テキスト'}</span>
            <span class="button-text">${item.text}</span>
        `;

        button.addEventListener('click', () => {
            copyToClipboard(item.text, item.label);
        });

        container.appendChild(button);
    });
}

// ボタンをクリア
function clearButtons() {
    const container = document.getElementById('text-buttons');
    container.innerHTML = '';
    container.classList.remove('empty');
}

// カテゴリを選択して表示
async function loadAndDisplayCategory(category) {
    const data = await loadCategoryData(category);
    createButtons(data);
}

// クリップボードにコピー
async function copyToClipboard(text, label) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(`「${label || 'テキスト'}」をコピーしました！`);
    } catch (error) {
        console.error('コピーに失敗しました:', error);
        showNotification('コピーに失敗しました', 'error');
    }
}

// コピー完了の通知を表示
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = message;

    if (type === 'error') {
        notification.style.background = '#f44336';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ページロード時に実行
document.addEventListener('DOMContentLoaded', async () => {
    await initializeCategorySelect();
});
