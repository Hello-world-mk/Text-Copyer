// JSONファイルからテキストデータを読み込む
async function loadTextData() {
    try {
        const response = await fetch('./data/texts.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('JSONファイルの読み込みに失敗しました:', error);
        return null;
    }
}

// ボタンをHTMLに生成する
function createButtons(data) {
    const container = document.getElementById('text-buttons');
    
    if (!data || !data.texts || data.texts.length === 0) {
        container.innerHTML = '<p>テキストデータが見つかりません</p>';
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
    const data = await loadTextData();
    createButtons(data);
});
