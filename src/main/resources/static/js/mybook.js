let isLoading = false;

loadBooks();

async function loadBooks() {
    if (isLoading) return;
    isLoading = true;
    
    const userId = localStorage.getItem("userId");
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = '<div class="empty-message">加载中...</div>';
    
    try {
        const res = await fetch(`/book/my?sellerId=${userId}`);
        const data = await res.json();
        
        if (!data.data || data.data.length === 0) {
            bookList.innerHTML = '<div class="empty-message">暂未发布任何书籍，去“我要卖书”发布吧 📖</div>';
            return;
        }
        
        bookList.innerHTML = "";
        
        data.data.forEach(book => {
            const div = document.createElement("div");
            div.className = "bookCard";
            div.innerHTML = `
                <div class="book-cover">📚</div>
                <h4>${escapeHtml(book.bookName)}</h4>
                <p>ISBN：${escapeHtml(book.isbn)}</p>
                <p>价格：<span class="price">￥${escapeHtml(String(book.price))}</span></p>
                <p>联系方式：${escapeHtml(book.contact)}</p>
                <p>成色：${escapeHtml(book.conditionLevel)}</p>
                <p>状态：${escapeHtml(book.status)}</p>
                <button data-bookid="${book.id}" data-action="off" class="action-btn">下架</button>
                <button data-bookid="${book.id}" data-action="on" class="action-btn">上架</button>
                <button data-bookid="${book.id}" data-action="delete" class="action-btn delete-btn">删除</button>
            `;
            bookList.appendChild(div);
        });
        
        // 绑定操作按钮事件
        document.querySelectorAll(".action-btn").forEach(btn => {
            btn.addEventListener("click", async function(e) {
                const bookId = this.getAttribute("data-bookid");
                const action = this.getAttribute("data-action");
                
                if (action === "delete") {
                    if (confirm("确定要删除这本书吗？此操作不可恢复！")) {
                        await deleteBook(bookId, this);
                    }
                } else if (action === "off") {
                    if (confirm("确定要下架这本书吗？")) {
                        await offBook(bookId, this);
                    }
                } else if (action === "on") {
                    if (confirm("确定要上架这本书吗？")) {
                        await onBook(bookId, this);
                    }
                }
            });
        });
        
    } catch (err) {
        console.error(err);
        bookList.innerHTML = '<div class="empty-message">加载失败，请刷新重试 ⚠️</div>';
    } finally {
        isLoading = false;
    }
}

async function offBook(id, btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "处理中...";
    
    try {
        await fetch(`/book/off?id=${id}`, { method: "PUT" });
        alert("下架成功");
        await loadBooks();
    } catch (err) {
        console.error(err);
        alert("操作失败，请稍后重试");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function onBook(id, btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "处理中...";
    
    try {
        await fetch(`/book/on?id=${id}`, { method: "PUT" });
        alert("上架成功");
        await loadBooks();
    } catch (err) {
        console.error(err);
        alert("操作失败，请稍后重试");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}

async function deleteBook(id, btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    const originalText = btn.innerText;
    btn.innerText = "删除中...";
    
    try {
        await fetch(`/book/delete?id=${id}`, { method: "PUT" });
        alert("删除成功");
        await loadBooks();
    } catch (err) {
        console.error(err);
        alert("操作失败，请稍后重试");
        btn.innerText = originalText;
        btn.disabled = false;
    }
}