let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;
let a =0;

//gettotal
function getTotal(){
  if(price.value != ""){
    ruselt = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = ruselt;
    total.style.background= '#040';
  }else{
    total.innerHTML = "";
    total.style.background= '#7a0909';
  }
}
// creat product
let datapro;
if(localStorage.product != null){
  datapro = JSON.parse(localStorage.product);
}else{
  datapro = [];
}  
submit.onclick = function() {
  let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if(title.value != ''){
    if(mood==='create'){
      if(newPro.count > 1){
        for(let i = 0; i < newPro.count; i++){
            datapro.push(newPro);
        }
        }else{
            datapro.push(newPro);
        }
    }else{
      datapro[temp] = newPro;
      mood = "create";
      submit.innerHTML = 'create';
      count.style.display = 'block';
    }
  }
  localStorage.setItem('product',      JSON.stringify(datapro)   )
  clearData()
  showData()
}
// cleardata
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// showData
function showData(){
  getTotal()
  table = '';
  for(let i = 0; i<datapro.length; i++){
    table += `
        <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updatData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
    `
  }
  document.getElementById('tbody').innerHTML = table;
  let btnAllDelete = document.getElementById('deleteAll');
  if(datapro.length > 0){
    btnAllDelete.innerHTML=`
    <button onclick="deleteAll()" id="delete">Delete All (${datapro.length})</button> 
    `
  }else{
    btnAllDelete.innerHTML= "";
  } 
} 
showData()

function deleteData(i){
  datapro.splice(i ,1);
  localStorage.product = JSON.stringify(datapro);
  showData()
}

function deleteAll(){
  localStorage.clear;
  datapro.splice(0);
  showData()
}

function updatData(i){
  title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update'
    mood = 'update';
    temp = i;
    scroll({
        top:0,
        behavior:"smooth",
    })
}

let searchMood = 'title';
function getSearchMood(id){
  let search = document.getElementById('search'); 
  if(id == 'searchTitle'){
    searchMood = 'title'
    search.placeholder = 'Search By Title ';
  }else{
    searchMood = 'category'
    search.placeholder = 'Search By Category';
  }
  search.focus()
  search.value = "";
  showData()
}


function searchData(value){
  let table = '';
  if (searchMood = 'title'){
    for(let i = 0; i < datapro.length; i++){
      if(datapro[i].title.includes(value.toLowerCase())){
        table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`
                    a++
      }
     
    }
  }else{
    if(datapro[i].category.includes(value.toLowerCase())){
      table += `
      <tr>
          <td>${i}</td>
          <td>${datapro[i].title}</td>
          <td>${datapro[i].price}</td>
          <td>${datapro[i].taxes}</td>
          <td>${datapro[i].ads}</td>
          <td>${datapro[i].discount}</td>
          <td>${datapro[i].total}</td>
          <td>${datapro[i].category}</td>
          <td><button onclick="updatData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`
    }
  }
  document.getElementById('tbody').innerHTML = table;
  console.log(a)
}
