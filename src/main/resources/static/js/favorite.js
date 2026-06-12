loadFavorite();

async function loadFavorite(){

    const userId =
        localStorage.getItem("userId");

    const res =
    await fetch(
        `/favorite/list?userId=${userId}`
    );

    const data =
        await res.json();

    const favoriteList =
        document.getElementById("favoriteList");

    favoriteList.innerHTML="";

    data.data.forEach(book=>{

        let color="black";

        if(
            book.status==="下架不可售" ||
            book.status==="已删除"
        ){
            color="gray";
        }

        const div =
        document.createElement("div");

        div.innerHTML=`
        <hr>

        <div style="color:${color}">

        <h3>${book.bookName}</h3>

        ISBN:${book.isbn}<br>

        价格:${book.price}<br>

        状态:${book.status}<br>

        </div>

        <button onclick="removeFavorite(${book.id})">
            取消收藏
        </button>
        `;

        favoriteList.appendChild(div);

    });

}

async function removeFavorite(bookId){

    const userId =
        localStorage.getItem("userId");

    await fetch(
        `/favorite/remove?userId=${userId}&bookId=${bookId}`,
        {
            method:"DELETE"
        }
    );

    loadFavorite();
}