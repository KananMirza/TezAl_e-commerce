var Products = {
    image: [1, 2, 3, 4, 5, 6],
    title: ['MUSTELA GENTLE təmizləyici gel 500ML', 'Dar boyunlu butulkalar hədiyyə dəsti', 'Şüşə butulka dəsti Dr.Browns "Options+ W-N"', 'MUSTELA MATERNİTE bədən möhkəmləndirici gel 200ML', 'MUSTELA Stelatopia Temizleme Yağı 500ML', 'Geniş boyunlu propilen butulkalar çeşidli rənglər'],
    price: [38.13, 132.05, 179.55, 50.16, 43.51, 64.60],
    priceAddDiscount: [50, 150, 200, 60, 55, 80],
    count: []

}

function CheckUser() {
    if (localStorage.getItem('userId') === null) {
        localStorage.setItem('userId', Unique());

    }

    console.log(localStorage.getItem('usercard'))
    if (localStorage.getItem('usercard') === null) {
        var Card = {
            userId: localStorage.getItem('userId'),
            image: [],
            title: [],
            price: [],
            priceAddDiscount: [],
            count: [],
            total: 0
        };
        localStorage.setItem('usercard', JSON.stringify(Card));
    }
}


function Unique() {
    return '_' + Math.random().toString(35).substr(2, 9);
}

onload = () => {
    CheckUser();
    ViewProduct();
    ViewCount();
}


function ViewProduct() {

    let list = document.getElementsByClassName('product-list')[0];
    item = ''
   
    for (let i = 0; i < Products.image.length; i++) {
        item += `<div class="card" style="width: 18rem;">
        <img src="img/${Products.image[i]}.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${Products.title[i]}
            </p>
            <div class="price">
                <del style="font-size: 20px;">${Products.priceAddDiscount[i]} Azn</del>
                <p class="btn btn-success">${Products.price[i]} Azn</p>
            </div>
        </div>
        <div class="card-button">
            <div class="addproduct">
                <i class="fas fa-minus" onclick='minusCount(${i})'></i>
                <input type="text" class="number" value="0" id="${i}">
                <i class="fas fa-plus" onclick='plusCount(${i})'"></i>
            </div>
            <button href="#"  class="btn btn-primary addButton" onclick='addProduct(${i})'>Add Basket</button>
        </div>
    </div>`

    }
    list.innerHTML = item;
}

let number = [0, 0, 0, 0, 0, 0];

function plusCount(id) {
    number[id]++;
    document.getElementsByTagName('input')[id].value = number[id];

}

function minusCount(id) {
    number[id]--;
    document.getElementsByTagName('input')[id].value = number[id];
    if (document.getElementsByTagName('input')[id].value < 0) {
        document.getElementsByTagName('input')[id].value = 0
    }
}

function addProduct(id) {
    let Card = JSON.parse(localStorage.usercard);
        let image = Products.image[id];
        let title = Products.title[id];
        let price = Products.price[id];
        let priceAddDiscount = Products.priceAddDiscount[id];
       
    let count = document.getElementsByTagName('input')[id].value;
    
    if (document.getElementsByTagName('input')[id].value == 0) {
        swal("Minimum 1 order");
    } else {          
    if (image == Card.image[0] || image == Card.image[1] ||image == Card.image[2]||image == Card.image[3]||image == Card.image[4]||image == Card.image[5]) {
                swal("This item is already in your basket!", "Please check your basket");
                
            } else {
                if($.isNumeric($(`#${id}`).val()) == false){
                    swal("This value is not number!!!!");
                }else{
               
                Card.image.push(image);
                Card.title.push(title);
                Card.price.push(price);
                Card.priceAddDiscount.push(priceAddDiscount);
                Card.count.push(count);
                Card.total += price * count
                localStorage.usercard = JSON.stringify(Card);
                ViewCount()
                swal({
                    title: "Product Added!",
                    icon: "success",
                    button: "Okay",
                });
                number = [0, 0, 0, 0, 0, 0];
                ViewProduct();
            }
        }
    }
    console.log(image)
}

function ViewCount() {

    let Card = JSON.parse(localStorage.usercard);
    count = Card.title.length
    if (Card.total < 10) {
        Card.total = 0;
    }
    localStorage.usercard = JSON.stringify(Card);
    document.getElementsByClassName('count')[0].innerHTML = count;

}

function ViewFavourite() {


    let Card = JSON.parse(localStorage.usercard);


    let image = Card.image;
    let title = Card.title;
    let price = Card.price;
    let count = Card.count
    let priceAddDiscount = Card.priceAddDiscount;
    
    let list = document.getElementsByClassName('product-list')[0];

    item = ''
    for (let i = 0; i < Card.image.length; i++) {
        number = [count[0], count[1], count[2], count[3], count[4], count[5]]
        item += `<div class="card" style="width: 18rem;">
        <img src="img/${image[i]}.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${title[i]}
            </p>
            <div class="price">
                <del style="font-size: 20px;">${priceAddDiscount[i]} Azn</del>
                <p class="btn btn-success">${price[i]} Azn</p>
            </div>
        </div>
        <div class="card-button">
            <div class="addproduct">
                <i class="fas fa-minus" onclick='minusCount(${i})'></i>
                <input type="text" class="number" value="${number[i]}">
                <i class="fas fa-plus" onclick='plusCount(${i})'"></i>
            </div>
            <button class='btn btn-warning' onclick='updateProduct(${i})'>Update</button>
            <button href="#"  class="btn btn-danger" onclick='deleteProduct(${i})'>Delete</button>
        </div>
    </div>`


    }
    $('h1').text('Shopping Cart')
    Total = Card.total.toFixed(2)
    $('h2').text(`Total: ${Total} Azn`)
    list.innerHTML = item;
    $('.menu').slideUp('slow')
}

function deleteProduct(id) {

    
    
        let Card = JSON.parse(localStorage.usercard);
        let price = Card.price[id];
        let count = Card.count[id]



        Card.image.splice(id, 1);
        Card.title.splice(id, 1);
        Card.price.splice(id, 1);
        Card.priceAddDiscount.splice(id, 1);
        Card.count.splice(id, 1);
        Card.total -= price * count

        localStorage.usercard = JSON.stringify(Card);
        ViewCount()
        swal({
            title: "Product Deleted!",
            icon: "success",
            button: "Okay",
        });
   
    ViewFavourite();
}

function updateProduct(id) {
    let number = document.getElementsByClassName('number')[id].value;
    let Card = JSON.parse(localStorage.usercard);
    

    let price = Card.price[id];

    if (number >= Card.count[id]) {
        Card.total += (number - Card.count[id]) * price

    } else {
        Card.total -= (Card.count[id] - number) * price
    }


    Card.count[id] = number;
    if (Card.count[id] == 0) {
        Card.image.splice(id, 1);
        Card.title.splice(id, 1);
        Card.price.splice(id, 1);
        Card.priceAddDiscount.splice(id, 1);
        Card.count.splice(id, 1);
    }
    localStorage.usercard = JSON.stringify(Card);
    swal({
        title: "Product Updated!",
        icon: "success",
        button: "Okay",
    });
    console.log(number)
    ViewCount();
    ViewFavourite();
}

var x = window.matchMedia("(max-width: 850px)")
function myFunction(x) {
    if (x.matches) { 
    document.getElementsByClassName('category')[0].innerHTML = `See Category <i id='arrow' class="fas "></i>`
    $('#arrow').toggleClass('fa-chevron-down')
      $('.category').click(()=>{
        $('#arrow').toggleClass('fa-chevron-up')
          $('.allcategory').slideToggle()
      })
      

    } else {
        
    }
  }

  
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes