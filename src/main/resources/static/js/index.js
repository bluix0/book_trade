document.getElementById("username").innerText =
    localStorage.getItem("username") || "游客";

async function loadBooks(keyword="") {

    let url = "/book/list";

    if(keyword)
        url = `/book/search?keyword=${encodeURIComponent(keyword)}`;

    const res = await fetch(url);

    const data = await res.json();

    const bookList =
        document.getElementById("bookList");

    bookList.innerHTML = "";

    data.data.forEach(book => {

        const div =
            document.createElement("div");

        div.className = "bookCard";

        div.innerHTML = `
            <h4>${book.bookName}</h4>
            <p>ISBN: ${book.isbn}</p>
            <p>价格: ${book.price} 元</p>
            <p>联系方式: ${book.contact}</p>
            <p>成色: ${book.conditionLevel}</p>
            <button data-bookid="${book.id}">收藏</button>
        `;

        bookList.appendChild(div);

    });

    document.querySelectorAll(".bookCard button")
        .forEach(btn => {

            btn.addEventListener("click",
                async function() {

                const bookId =
                    this.getAttribute("data-bookid");

                await addFavorite(bookId);

            });

        });

}

document.getElementById("searchForm")
    .addEventListener("submit", function(e){

    e.preventDefault();

    const keyword =
        document.getElementById("keyword").value;

    loadBooks(keyword);

});

async function addFavorite(bookId){

    const userId =
        localStorage.getItem("userId");

    if(!userId){
        alert("请先登录");
        return;
    }

    try {

        const res =
            await fetch(
                `/favorite/add?userId=${userId}&bookId=${bookId}`,
                {
                    method: "POST"
                }
            );

        const data =
            await res.json();

        if(data.code === 200){

            alert("收藏成功");

        } else {

            alert(
                data.msg ||
                "收藏失败，此书已收藏或由自己发布"
            );

        }

    } catch (err) {

        console.error(err);

        alert("收藏失败，请稍后重试");

    }

}

loadBooks();