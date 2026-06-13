let isLoading = false;

loadFavorite();

async function loadFavorite() {
    if (isLoading) return;
    isLoading = true;

    const userId = localStorage.getItem("userId");
    const favoriteList = document.getElementById("favoriteList");
    favoriteList.innerHTML = '<div class="empty-message">加载中...</div>';

    try {
        const res = await fetch(`/favorite/list?userId=${userId}`);
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            favoriteList.innerHTML = '<div class="empty-message">暂无收藏，去首页看看喜欢的书吧 ❤️</div>';
            return;
        }

        favoriteList.innerHTML = "";

        data.data.forEach(book => {
            const div = document.createElement("div");
            div.className = "bookCard";
            div.innerHTML = `
                <div class="book-cover">❤️</div>
                <h4>${escapeHtml(book.bookName)}</h4>
                <p>ISBN：${escapeHtml(book.isbn)}</p>
                <p>价格：<span class="price">￥${escapeHtml(String(book.price))}</span></p>
                <p>联系方式：${escapeHtml(book.contact || '暂无')}</p>
                <p>状态：${escapeHtml(book.status)}</p>
                <button data-bookid="${book.id}" class="remove-fav-btn">取消收藏</button>
            `;
            favoriteList.appendChild(div);
        });

        // 绑定取消收藏事件
        document.querySelectorAll(".remove-fav-btn").forEach(btn => {
            btn.addEventListener("click", async function(e) {
                const bookId = this.getAttribute("data-bookid");
                if (confirm("确定要取消收藏这本书吗？")) {
                    await removeFavorite(bookId, this);
                }
            });
        });

    } catch (err) {
        console.error(err);
        favoriteList.innerHTML = '<div class="empty-message">加载失败，请刷新重试 ⚠️</div>';
    } finally {
        isLoading = false;
    }
}

async function removeFavorite(bookId, btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "处理中...";

    const userId = localStorage.getItem("userId");

    try {
        await fetch(`/favorite/remove?userId=${userId}&bookId=${bookId}`, {
            method: "DELETE"
        });
        alert("已取消收藏");
        await loadFavorite(); // 重新加载列表
    } catch (err) {
        console.error(err);
        alert("操作失败，请稍后重试");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}s