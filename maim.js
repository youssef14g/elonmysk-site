'use strict';
let totalMoneyElement = document.querySelector('#totalMoney');
let percentageElement = document.querySelector('#percentageLeft');
let buyButtons = document.querySelectorAll('#buy');
let sellButtons = document.querySelectorAll('#sell');
const appContainer = document.querySelector('.app-container');

let elonFortune = 217000000000;
let totalPercentage = 100;

let elements = [];

appContainer.addEventListener('click', (e) => {
  let element = e.target.parentElement;

  if (e.target.classList.contains('btn-buy')) {
    buyItem(element);
    
  } else if (e.target.classList.contains('btn-sell')) {
    sellItem(element);
  }
});

function buyItem(element) {
  // change default data to new data
  if (elonFortune - Number(element.dataset.price) >= 0) {
    elonFortune -= Number(element.dataset.price);
    totalPercentage = (elonFortune * 100) / 217000000000;
    
    // اسم المنتج
    let itemName = element.parentElement.querySelector('#name').textContent;
    if(itemName == "maghs"){
      if (confirm("هل تريد الدهاب الى موقع اللعبه")){
        window.location.assign("https://oneix.itch.io/maghs");
      }
    }
    if(itemName == "Aymen from ohayo"){
      confirm("متأكد !! تراه قيي و الوان كمان و سيمب");
      
    }


    
    let amountOfItems = element.querySelector('#amount');
    amountOfItems.textContent = `${Number(amountOfItems.textContent) + 1}`;

    // يرج زر البيع شغال لما يكون مشتري
    let button = element.querySelector('#sell');
    if (Number(amountOfItems.textContent) > 0) {
      button.disabled = false;
    }

    updateTotalAndPercentage();

    // انجليزيتي بيض المهم دا فنكشن يتاكد ادا اول مرا بيشتري او اشترى اصلا(ادا هو موجود )
    createReciptItem(
      itemName,
      Number(amountOfItems.textContent),
      formatMoney(
        Number(element.dataset.price) * Number(amountOfItems.textContent)
      )
    );

    updateReceipt();
  } else {
    cantAffordAlert();
  }
}
//دول هما كيف تصنع الاشياء الي تنباع
function cantAffordAlert() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">فلوسك يا غبي </p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">براه انت فقير</p>`;
}

function createReciptItem(name, amount, total) {
  let receiptItem = new ReceiptItem();
  receiptItem.name = name;
  receiptItem.amount = amount;
  receiptItem.total = total;

  if (!checkReceiptItemExists(receiptItem)) {
    receiptItemsArr.push(receiptItem);
  } else {
    updateReceiptItem(receiptItem);
  }
}

// نضام البع 
function sellItem(element) {
  

  elonFortune += Number(element.dataset.price);
  totalPercentage = (elonFortune * 100) / 217000000000;

  // متغير فيه اسم المنتج
  let itemName = element.parentElement.querySelector('p').textContent;

  // ادا اشترى ينزاد +1 في المشتريات 
  let amountOfItems = element.querySelector('span');
  amountOfItems.textContent = `${Number(amountOfItems.textContent) - 1}`;

  // ادا كان مو مشتري خليت الزر حق البيع ما يشتغل لانه اصلا مو مشتري :))
  let button = element.querySelector('#sell');

  if (Number(amountOfItems.textContent) === 0) {
    button.disabled = true;
  }
  updateTotalAndPercentage();

  createReciptItem(
    itemName,
    Number(amountOfItems.textContent),
    formatMoney(
      Number(element.dataset.price) * Number(amountOfItems.textContent)
    )
  );

  updateReceipt();
}

function updateTotalAndPercentage() {
  totalMoneyElement.innerHTML = `<p class="totalMoney">المبلغ: ${formatMoney(
    elonFortune
  )} درهم</p>`;
  percentageElement.innerHTML = `<p class ="percentageLeft">You only spent ${(
    100 - totalPercentage
  ).toFixed(6)} % of the total!</p>`;
}

    function formatMoney(number) {
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}

//هون شرح لكيف تسوي شي للبيع عشان ما اضيف كتير كودات
class ReceiptItem {
  constructor() {
    this.name;
    this.amount;
    this.total;
  }
}

let receiptItemsArr = [];

// عشان يعرف ادا الشي الي ينباع موجود ولا لا 
function checkReceiptItemExists(receiptItem) {
  let i = 0;
  let exists = false;

  while (!exists && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];
    if (itemX.name === receiptItem.name) {
      exists = true;
    }
    i++;
  }

  return exists;
}

function updateReceiptItem(receiptItem) {
  let i = 0;
  
  let itemInArr = null;

  while (itemInArr === null && i < receiptItemsArr.length) {
    let itemX = receiptItemsArr[i];

    if (itemX.name === receiptItem.name) {
      itemInArr = itemX;
    }
    i++;
  }

  if (itemInArr) {
    itemInArr.name = receiptItem.name;
    itemInArr.amount = receiptItem.amount;
    itemInArr.total = receiptItem.total;
  }
}

// هون كيف تنحسب المبيعات و مشتريات ختفو عليك
function updateReceipt() {
  let title = `<h1>Receipt</h1>`;
  let receipt = '';
  let total = formatMoney(217000000000 - elonFortune);

  for (let i = 0; i < receiptItemsArr.length; i++) {
    let itemX = receiptItemsArr[i];

    if (itemX.amount !== 0) {
      receipt += `<p>${itemX.name} x <strong> ${itemX.amount}</strong>..............$ ${itemX.total}</p>`;
    }
  }

  document.querySelector('#receipt-container').innerHTML =
    title + receipt + `<p class="totalRecipt">Total is: $ ${total}</p>`;
}

// دا شي بس عشان اتأكدت الكود صحيح مالك صلاح به 
function printSection(el) {
  let printsection = document.getElementById(el).innerHTML;
  document.body.innerHTML = printsection;

  window.print();
}

class Element {
  static nro = 1;
  constructor(name, price, image) {
    this.id = Element.nro++;
    this.name = name;
    this.price = price;
    this.amount = 0;
    this.image = image;
    

  }
}
// دول اشياء مالازم تسويعا لما بتحط شي ينباع 
function createAndSaveElement(elementName, price, image) {
  if (elementName !== '' &&   image !== '') {
    
    let newElement = new Element(elementName, price, image);
    elements.push(newElement);
    
  }
}

preLoad();
//هون تقدر تحط ايش تريد تبيع الخانه الاولى اسم المنتج التانيه سعرو و راجع الفنكشن الي فوق ثالتا رابط الصوره
function preLoad() {
 
  createAndSaveElement(
    'Iphone 14 Pro Max ',
    1599,
    'https://istyle.ma/media/catalog/product/cache/image/700x700/e9c3970ab036de70892d86c6d221abfe/i/p/iphone_14_pro_max_deep_purple_pdp_image_position-1a_en_1.jpg'
  );
  createAndSaveElement(
    'Aymen from ohayo',
    100000,
    'aymen kawaii.png'
  );
  createAndSaveElement(
    "Oneix Youtube ",
    99999999,
    'WSWSWS.png'
  );

  createAndSaveElement(
    'mohanad',
    "1000 " ,
    'سشيص.png'
  );

  createAndSaveElement(
    'بوغاتي اندرو تيت',
    99999,
    'Fa3EeqzWIAAM7uj (3).png'
  );
  createAndSaveElement(
    'بطاطا القاتله',
    2799,
    'IMG_1276.png'
  );
  createAndSaveElement(
    'maghs',
    1250,
    '  https://img.itch.zone/aW1nLzk4MTIwNzEucG5n/347x500/vcHjoi.png'
  );
}

// دا شي الي يخلي نضام شغال ختفو ما ابي اشح
elements.forEach((element) => {
  let newElement = document.createElement('div');
  
  newElement.classList.add('element');

  newElement.innerHTML = `<img src="${element.image}" alt="${element.name}" />
  <p id="name">${element.name}</p>
  <span id="price">درهم ${formatMoney(element.price)}</span>
  <div class="buyAndSellContainer" data-price="${element.price}">
    <button class="btn-sell" id="sell" disabled>Sell</button>
    <span id="amount">${element.amount}</span>
    <button class="btn-buy" id="buy" >Buy</button>
  </div>`;

  appContainer.appendChild(newElement);
});
