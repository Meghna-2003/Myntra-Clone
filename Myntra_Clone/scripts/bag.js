const CONVENIENCE_FEES=99;
let bagitemObjects;
onload();
function onload(){
  let storedbagitems = localStorage.getItem('BagItem');
  if(storedbagitems){
    bagitems=JSON.parse(storedbagitems);
  }
  loadBagItemObjects();
  displaybagitems();
  displaybagpricesummary();
}
function displaybagpricesummary(){
  let bagsummaryelement=document.querySelector('.bag-price-summary');
  let totalitems=bagitemObjects.length;
  let totalmrp=0;
  let discountmrp=0;
  bagitemObjects.forEach(bagitem => {
    totalmrp+= bagitem.original_price;
    discountmrp+=bagitem.original_price-bagitem.current_price;
  });
  let totalamount = totalmrp-discountmrp+CONVENIENCE_FEES;
  bagsummaryelement.innerHTML=`<div class="bag-details-container">
        <div class="price-details">PRICE DETAILS (${totalitems} ITEMS)</div>
        <div class="price-header">
          <span class="total-text">Total MRP</span>
          <span class="total-price">Rs ${totalmrp}</span>
        </div>
        <div class="price-header">
          <span class="total-text">Discount on MRP</span>
          <span class="total-price discount-price">-Rs ${discountmrp}</span>
        </div>
        <div class="price-header">
          <span class="total-text">Convenience Fee</span>
          <span class="total-price">Rs 99</span>
        </div>
        <hr>
        <div class="price-footer">
          <span class="total-amount-text">Total Amount</span>
          <span class="total-amount-price">Rs ${totalamount}</span>
        </div>
        <button class="place-order">PLACE ORDER</button>
      </div>`;
}
function loadBagItemObjects(){
  console.log(bagitems);
  bagitemObjects=bagitems.map(itemid => {
    for(i=0;i<items.length;i++){
       if(itemid==items[i].id){
        return items[i];
       }
    }
  });
  console.log(bagitemObjects);
}
function displaybagitems(){
  let containerelement=document.querySelector('.bag-items-container');
  let innerHTML='';
  bagitemObjects.forEach(bagitem=> {
    innerHTML+=generateSingleItemHtml(bagitem);  
  });
  containerelement.innerHTML=innerHTML;
}
function removefrombag(itemid){
  bagitems=bagitems.filter(bagItemId => bagItemId != itemid)
  localStorage.setItem('BagItem',JSON.stringify(bagitems));
  loadBagItemObjects();
  BagButtonCount();
  displaybagitems();
  displaybagpricesummary(); 
}

function generateSingleItemHtml(item){
   return ` <div class="bag-item-container">
          <div class="left-part">
            <img src="../${item.image}" width="70px" height="100px">
          </div>
          <div class="right-part">
            <p class="company-name">${item.company}</p>
            <p class="item-name">${item.item_name}</p>
            <div class="price-list">
              <span class="discountprice">${item.current_price}</span>
              <span class="originalprice">${item.original_price}</span>
              <span class="percent-discount">(${item.discount_percentage}% OFF)</span>
            </div>
            <div class="return-policy"><b>${item.return_period} days</b> return available</div>
            <div class="delivery-date">Delivery by <span class="date-style">${item.delivery_date}</span></div>
          </div>
          <button class="quit-button" onclick="removefrombag(${item.id}) ";>X</button>
        </div>`;
}