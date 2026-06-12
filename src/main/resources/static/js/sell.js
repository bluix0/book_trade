document
.getElementById("sellForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const userId =
        localStorage.getItem("userId");

    const book = {

        isbn:
        document.getElementById("isbn").value,

        bookName:
        document.getElementById("bookName").value,

        price:
        document.getElementById("price").value,

        contact:
        document.getElementById("contact").value,

        conditionLevel:
        document.getElementById("conditionLevel").value,

        sellerId:
        userId
    };

    const res =
    await fetch(
        "http://localhost:8080/book/add",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(book)
        }
    );

    const data =
        await res.json();

    alert(data.msg);

});