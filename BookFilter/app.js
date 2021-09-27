function app(){
     this.name = document.querySelector('#name');
     this.select = document.querySelector('select');
     this.checkbox = document.querySelectorAll('input[type=checkbox]');
     this.books = [{
        name: "Origin: A Novel: 5 (Robert Langdon) Hardcover  Illustrated",
        date:"3 October 2017",
        author:"Dan Brown",
        price:600,
        image:"origin.jpg"
    },{
        name: "The Immortals of Meluha (Shiva Trilogy)",
        date:"24 July 2017",
        author:"Amish",
        price:300,
        image:"mehula.jpeg"
    }];
    this.filter = {};
    this.filterResult = this.books;
    
}

app.prototype.render = function(){
    document.querySelector('.book-list').innerHTML = "";
    this.filterResult.forEach((book)=>{
        const {name,date,author,price, image} = book;
        const template = `<div class="row">
                    <div class="book-image">
                        <img src="images/${image}"/>
                    </div>
                <div class="book-content">
                    <p>
                        <span class="bold">${name}</span> 
                        <span>${date}</span> 
                        <span>by ${author} (Author)</span>
                    </p>
                    <p>
                        INR ${price}
                    </p>
                </div>`
        const div = document.createElement('div')
        div.innerHTML  = template;
        document.querySelector('.book-list').appendChild(div);
    })
}   
app.prototype.bindEvents = function(){
    this.name.addEventListener('input',(event) => {
        this.filter.name = event.target.value;
        this.filterResults();
    })
    this.select.addEventListener('change',(event) =>{
        this.filter.author = event.target.value;
        this.filterResults();
    })
    this.checkbox.forEach((checkbox)=>{
        checkbox.addEventListener('click',(event) =>{
            if(!this.filter.price){
                this.filter.price = []                
            }
            this.filter.price.push(event.target.value)
            this.filterResults();
        })
    })
}
app.prototype.filterResults = function(){
    const range = {
        '0':{
            min:0,
            max:500
        },
        '1':{
            min:500,
            max:1000
        },
        '2':{
            min:1000,
            max :Number.MAX_SAFE_INTEGER
        }
    }
    this.filterResult = this.books.filter((book) =>{
        let filter = true;
        if(this.filter.name && !book.name.toLowerCase().includes(this.filter.name.toLowerCase())){
            filter = false;
        }
        if(filter && this.filter.author && !book.author.toLowerCase().includes(this.filter.author.toLowerCase())){
            filter = false;
        }
        if(filter && this.filter.price && this.filter.price.length >0){
            const result = this.filter.price.map((price) =>{
                return range[price];
            });
            const filteredPrice = result.filter((eachItem) =>{
                console.log(book.price > eachItem.min && book.price < eachItem.max);
                return book.price > eachItem.min && book.price < eachItem.max;
            })
            console.log(filteredPrice);
            if(filteredPrice == 0){
                filter = false;
            }
        }
        console.log(filter);
        return filter;
    })
    this.render();
    console.log(this.filterResult);
    
}

const instance = new app();
instance.render();
instance.bindEvents();
