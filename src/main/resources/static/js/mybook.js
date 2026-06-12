loadBooks();

async function loadBooks(){

    const userId =
        localStorage.getItem("userId");

    const res =
    await fetch(
        `http://localhost:8080/book/my?sellerId=${userId}`
    );

    const data =
        await res.json();

    const bookList =
        document.getElementById("bookList");

    bookList.innerHTML="";

    data.data.forEach(book=>{

        const div =
        document.createElement("div");

        div.innerHTML=`
        <hr>

        <h3>${book.bookName}</h3>

        ISBN:${book.isbn}<br>

        价格:${book.price}<br>

        联系方式:${book.contact}<br>

        成色:${book.conditionLevel}<br>

        状态:${book.status}<br>

        <button onclick="offBook(${book.id})">
            下架
        </button>

        <button onclick="onBook(${book.id})">
            上架
        </button>

        <button onclick="deleteBook(${book.id})">
            删除
        </button>
        `;

        bookList.appendChild(div);

    });

}

async function offBook(id){

    await fetch(
        `http://localhost:8080/book/off?id=${id}`,
        {
            method:"PUT"
        }
    );

    loadBooks();
}

async function onBook(id){

    await fetch(
        `http://localhost:8080/book/on?id=${id}`,
        {
            method:"PUT"
        }
    );

    loadBooks();
}

async function deleteBook(id){

    await fetch(
        `http://localhost:8080/book/delete?id=${id}`,
        {
            method:"PUT"
        }
    );

    loadBooks();
}