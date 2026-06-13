let isSubmitting = false;

document.getElementById("sellForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    if (isSubmitting) return;
    isSubmitting = true;
    
    const sellBtn = document.getElementById("sellBtn");
    const originalText = sellBtn.innerText;
    sellBtn.innerText = "发布中...";
    sellBtn.disabled = true;
    
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("请先登录");
        location.href = "login.html";
        return;
    }
    
    const isbn = document.getElementById("isbn").value.trim();
    const bookName = document.getElementById("bookName").value.trim();
    const price = document.getElementById("price").value;
    const contact = document.getElementById("contact").value.trim();
    const conditionLevel = document.getElementById("conditionLevel").value;
    
    if (!isbn || !bookName || !price || !contact) {
        alert("请填写所有必填项");
        sellBtn.innerText = originalText;
        sellBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    if (price <= 0) {
        alert("价格必须大于0");
        sellBtn.innerText = originalText;
        sellBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    // 简单联系方式验证
    if (contact.length < 5) {
        alert("请填写有效的联系方式");
        sellBtn.innerText = originalText;
        sellBtn.disabled = false;
        isSubmitting = false;
        return;
    }
    
    const book = {
        isbn: isbn,
        bookName: bookName,
        price: parseFloat(price),
        contact: contact,
        conditionLevel: conditionLevel,
        sellerId: userId
    };
    
    try {
        const res = await fetch("/book/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        
        const data = await res.json();
        
        if (data.code === 200) {
            alert("发布成功！");
            // 清空表单
            document.getElementById("sellForm").reset();
        } else {
            alert(data.msg || "发布失败");
        }
    } catch (err) {
        console.error(err);
        alert("网络错误，请稍后重试");
    } finally {
        sellBtn.innerText = originalText;
        sellBtn.disabled = false;
        isSubmitting = false;
    }
});