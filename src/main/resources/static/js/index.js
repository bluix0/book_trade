document.getElementById("username").innerText = localStorage.getItem("username") || "游客";

// 防重复请求标记
let isLoading = false;

async function loadBooks(keyword = "") {
    if (isLoading) return;
    isLoading = true;
    
    let url = "/book/list";
    if (keyword) {
        url = `/book/search?keyword=${encodeURIComponent(keyword)}`;
    }
    
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = '<div class="empty-message">加载中...</div>';
    
    try {
        const res = await fetch(url);
        const data = await res.json();
        
        if (!data.data || data.data.length === 0) {
            bookList.innerHTML = '<div class="empty-message">暂无图书，试试搜索其他关键词吧 📚</div>';
            return;
        }
        
        bookList.innerHTML = "";
        
        data.data.forEach(book => {
            const div = document.createElement("div");
            div.className = "bookCard";
            div.innerHTML = `
                <div class="book-cover">📚</div>
                <h4>${escapeHtml(book.bookName)}</h4>
                <p>ISBN: ${escapeHtml(book.isbn)}</p>
                <p>价格：<span class="price">￥${escapeHtml(String(book.price))}</span></p>
                <p>联系方式：${escapeHtml(book.contact)}</p>
                <p>成色：${escapeHtml(book.conditionLevel)}</p>
                <button data-bookid="${book.id}" class="fav-btn">收藏</button>
            `;
            bookList.appendChild(div);
        });
        
        // 绑定收藏按钮事件
        document.querySelectorAll(".fav-btn").forEach(btn => {
            btn.addEventListener("click", async function(e) {
                e.preventDefault();
                const bookId = this.getAttribute("data-bookid");
                await addFavorite(bookId, this);
            });
        });
        
    } catch (err) {
        console.error(err);
        bookList.innerHTML = '<div class="empty-message">加载失败，请刷新重试 ⚠️</div>';
    } finally {
        isLoading = false;
    }
}

document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const keyword = document.getElementById("keyword").value.trim();
    loadBooks(keyword);
});

async function addFavorite(bookId, btn) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("请先登录");
        location.href = "login.html";
        return;
    }
    
    // 防止重复点击
    if (btn.disabled) return;
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "收藏中...";
    
    try {
        const res = await fetch(`/favorite/add?userId=${userId}&bookId=${bookId}`, {
            method: "POST"
        });
        const data = await res.json();
        
        if (data.code === 200) {
            alert("收藏成功");
            btn.innerText = "已收藏";
            btn.disabled = true;
        } else {
            alert(data.msg || "收藏失败，此书已收藏或由自己发布");
            btn.innerText = originalText;
            btn.disabled = false;
        }
    } catch (err) {
        console.error(err);
        alert("收藏失败，请稍后重试");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

// 初始加载
loadBooks();