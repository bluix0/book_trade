// 公共工具函数

// HTML转义，防止XSS攻击
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// 显示提示消息
function showMessage(msg, isError = false) {
    alert(msg);
}

// 显示加载状态（简单实现，可根据需要扩展）
function showLoading(element, show = true) {
    if (!element) return;
    if (show) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    } else {
        element.style.opacity = '';
        element.style.pointerEvents = '';
    }
}

// 通用fetch封装（可选，保留原有fetch方式但增加错误处理）
async function request(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (data.code === 401) {
            localStorage.clear();
            alert('登录已过期，请重新登录');
            location.href = 'login.html';
            throw new Error('Unauthorized');
        }
        return data;
    } catch (err) {
        if (err.message !== 'Unauthorized') {
            console.error('请求失败:', err);
            showMessage('网络错误，请稍后重试', true);
        }
        throw err;
    }
}