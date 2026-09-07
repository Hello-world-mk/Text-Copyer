// キャッシュされたデータ
let cachedData = {};
let currentCategory = '';
let allButtonsData = [];

// カテゴリ一覧を取得
async function loadCategories() {
    try {
        const response = await fetch('./data/categories.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        return data.categories || [];
    } catch (error) {
        console.error('カテゴリリストの読み込みに失敗しました:', error);
        return [];
    }
}

// 特定のカテゴリのテキストデータを読み込む（キャッシュ対応）
async function loadCategoryData(category) {
    if (cachedData[category]) {
        return cachedData[category];
    }

    try {
        const response = await fetch(`./data/${category}/texts.json`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        cachedData[category] = data;
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
            toggleSearch(false);
        }
    });
}

// 検索機能のトグル
function toggleSearch(show) {
    const searchContainer = document.getElementById('search-container');
    if (show) {
        searchContainer.classList.add('active');
        document.getElementById('search-input').focus();
    } else {
        searchContainer.classList.remove('active');
        document.getElementById('search-input').value = '';
    }
}

// 検索実行
function performSearch(query) {
    if (!query.trim()) {
        displayButtons(allButtonsData);
        return;
    }

    const filtered = allButtonsData.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.text.includes(query)
    );

    displayButtons(filtered);
}

// ボタンを表示
function displayButtons(items) {
    const container = document.getElementById('text-buttons');
    container.innerHTML = '';
    container.classList.remove('empty');

    if (!items || items.length === 0) {
        container.classList.add('empty');
        container.textContent = 'マッチする記号がありません';
        return;
    }

    items.forEach((item) => {
        const button = document.createElement('button');
        button.className = 'text-button';
        button.title = item.label;

        // 特殊記号用に表示を最適化
        if (item.text.length > 3) {
            // 長めのテキスト
            button.innerHTML = `<span class="button-symbol">${escapeHtml(item.text)}</span>`;
        } else {
            // 短い特殊記号
            button.innerHTML = `
                <span class="button-symbol">${escapeHtml(item.text)}</span>
                ${item.label ? `<span class="button-label">${escapeHtml(item.label)}</span>` : ''}
            `;
        }

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
    allButtonsData = [];
}

// カテゴリを選択して表示
async function loadAndDisplayCategory(category) {
    currentCategory = category;
    const data = await loadCategoryData(category);

    if (data && data.texts) {
        allButtonsData = data.texts;
        displayButtons(allButtonsData);
        toggleSearch(true);
    } else {
        clearButtons();
        toggleSearch(false);
    }
}

// クリップボードにコピー
async function copyToClipboard(text, label) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification(`✓ コピーしました`, 'success');
    } catch (error) {
        console.error('コピーに失敗しました:', error);
        showNotification('✗ コピーに失敗', 'error');
    }
}

// 通知表示
function showNotification(message, type = 'success') {
    const notification = document.getElementById('copy-notification');
    notification.textContent = message;
    notification.className = `copy-notification ${type} show`;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2800);
}

// HTML エスケープ
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ページロード時に実行
document.addEventListener('DOMContentLoaded', async () => {
    await initializeCategorySelect();

    // 検索機能のイベントリスナー
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
    }
});
