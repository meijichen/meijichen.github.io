$(function() {
  var wines = [
    {
      type: 'red',
      brands: [
        {name: 'Bogle Pititeh', price: 13.99, size: '750ml'},
        {name:'Rosemount Dim Shiraz', price: 9.99, size: '750ml'},
        {name:'Wild Horse', price: 18.99, size: '750ml'},
        {name:'Rutherfold Hill', price: 19.99, size: '1.5l'},
        {name:'Kendall Jackson Reserve', price: 19.99, size: '1.5l'},
        {name:'Woodbridge', price: 12.99, size: '1.5l'},
        {name:'Woodbridge', price: 9.99, size: '750ml'}
      ]
    },
    {
      type:'white',
      brands: [
        {name:'Tomaiolo', price: 9.99, size: '750ml'},
        {name:'Cavit', price: 12.99, size: '750ml'},
        {name:'Cesari', price: 9.99, size: '750ml'},
        {name:'Cavit', price: 10.99, size: '1.5l'},
        {name:'Ruffino', price: 9.99, size: '1.5l'},
        {name:'Relax', price: 9.99, size:'750ml'},
        {name:'Blue Fish', price: 8.99, size:'750ml'},
        {name:'Dr.Loosen', price: 12.99, size:'750ml'},
        {name:'Blue Fish', price:12.99, size:'1.5l'},
        {name:'Salmon Run', price:12.99, size:'1.5l'}
      ]
    },
    {
        type: 'champagne',
        brands: [
          {name:'Andre', price:9.99, size:'750mL'},
          {name:'Moet Imperial', price: 49.99, size: '750ml'},
          {name:'Moet Nectar', price: 55.99, size: '750ml'},
          {name:'Veuve Clicquot', price: 53.99, size: '750ml'},
          {name:'Martin & Rossi Asti', price: 53.99, size: '750ml'}
      ]
    },
  ];

//Variables

var totalbeforeTax;
var totalbeforeTax2;
var ulCart;
var orderNumber;
var OrderedItem;
var WineName;
var WinePrice;
var WineSize;
var orderedItemArray = [];
var $orderedItemLi;
var $purchaseLi;
var grandTotal;
var orderButtonID;
var $OrderedItems;
var submittedOrdersArray = [];

//Function function....

//Calculating subtotal at each click
function subtotalOfEach(){
  var subtotalArray=[];
  var OrderedPrices = $('span.ordered-item-price');
  for(var i=0; i<OrderedPrices.length; i++){
  subtotalArray.push(parseFloat(OrderedPrices[i].textContent));
  };
  totalbeforeTax = 0;
  console.log(subtotalArray);
  subtotalArray.forEach(function(eachPrice){
    totalbeforeTax += eachPrice;
    totalbeforeTax2 = (totalbeforeTax).toFixed(2);
    $('#subtotal2').val(totalbeforeTax2);
    return totalbeforeTax2;
    });
  };//End of Subtotal function


// Calculating total
function calculateTotal(){
var discount = ($('#discount-rate2').val())*0.01;
var totalWithDiscount = totalbeforeTax2 * (1 - discount);
console.log(totalbeforeTax2);
var discountedTotal = $("#discountedTotal").val(totalWithDiscount.toFixed(2));
console.log(discountedTotal);
grandTotal = (totalWithDiscount+(totalWithDiscount*0.08875)).toFixed(2);
$('#grand-total2').val(grandTotal);
}; // End of calculateTotal

// Calling discount function when a input is present;
$('#discount-rate2').on('keypress',function(){
  calculateTotal();
});

  // Saving sales orders
function saveOrder(){
  $OrderedItems = $('.ordered-item');
  for(var i=0; i<$OrderedItems.length; i++){
  orderedItemArray.push(($OrderedItems[i]));
  };
  console.log(orderedItemArray);
  $('#submit-order').on('click', function(){
    submittedOrdersArray.push([orderedItemArray]);
    orderNumber=submittedOrdersArray.length;
    console.log('submittedOrdersArray')
    console.log(submittedOrdersArray);
    console.log(orderNumber);
    $purchaseLi = $('<li>', {class:'purchase', id:orderNumber+'-li'});
    var $orderbutton = $('<button>',{class:'order-num-button', id:'button'+orderNumber}).text('Order#: '+orderNumber);
    $purchaseLi.append($orderbutton);
    $('#sales-list').append($purchaseLi);
    ulCart.empty();
    $('#subtotal2').val('0');
    $("#discountedTotal").val('0');
    $('#grand-total2').val('0');
  });//End of submit-order click function

};//End of saveOrder function

//retrieve order function ----- does not order
function retrieveOrder(){
$('.order-num-button').on('click',function(event){
var orderTextID = $(event.currentTarget).attr('id');
var orderButtonIDArray = orderButtonID.split("");
var orderID = orderButtonIDArray[orderButtonIDArray.length-1]
ulBrands.append(submittedOrdersArray[orderID]);
});
subtotalOfEach();
calculateTotal();
};

//Identifing each item in inventory
  var ulWineTypes = $('#wine-types');
  wines.forEach(function(wine){
    var $menubutton = $('<button>', {class: wine.type}).text(wine.type)
    ulWineTypes.prepend($('<li>', {class: wine.type + "-li"}).append($menubutton));
    if(wine.type == 'red') {
      var ulBrands = $('<ul id="red-brands">');
    } else if(wine.type == 'white') {
      var ulBrands = $('<ul id="white-brands">');
    } else if (wine.type == 'champagne') {
      var ulBrands = $('<ul id="champagne-brands">');
    }
    wine.brands.forEach(function(brand,index) {
      var $eachBrandButton = $('<button>', {id:index, class:'brand-name'}).html(brand.name + " $" + brand.price + " size:" + brand.size)
      ulBrands.append($('<li class="eachBrand-li">').append($eachBrandButton));
    });
    $('.'+wine.type+"-li").append(ulBrands);
  }); // end of wines.forEach()

//Toggle inventory by category in DOM
  $('.red').click(function(){
    $('#red-brands').toggle();
  });

  $('.white').click(function(){
    $('#white-brands').toggle();
  });

  $('.champagne').click(function(){
    $('#champagne-brands').toggle();
  });

//Setting up the shoping cart
  //Identifing Ordered Item
  ulCart = $('<ul class="shopping-cart" >');
  $('#order-list').append(ulCart);
  $('.brand-name').click(function(event){
    var clickedBrand = $(event.currentTarget);
    var parentID = clickedBrand.parent().parent().attr('id');
    var clickedID = clickedBrand.attr('id');

  //Adding items to cart
    if(parentID=='white-brands'){
      OrderedItem = wines[1].brands[clickedID];
      WineName = $('<span class="ordered-item-name">').text(OrderedItem.name + " $ ");
      WinePrice =$('<span class="ordered-item-price">').text(OrderedItem.price);
      WineSize =$('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      var $orderedItemLi= $('<li>',{class:'ordered-item'});
      $orderedItemLi.append(WineName).append(WinePrice).append(WineSize);
      ulCart.append($orderedItemLi);
    }else if(parentID=='red-brands'){
      OrderedItem = wines[0].brands[clickedID];
      WineName = $('<span class="ordered-item-name">').text(OrderedItem.name + " $ ");
      WinePrice = $('<span class="ordered-item-price">').text(OrderedItem.price);
      WineSize = $('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      $orderedItemLi= $('<li>',{class:'ordered-item'});
      $orderedItemLi.append(WineName).append(WinePrice).append(WineSize);
      ulCart.append($orderedItemLi);
    }else if(parentID=='champagne-brands'){
      OrderedItem = wines[2].brands[clickedID];
      WineName = $('<span class="ordered-item-name">').text(OrderedItem.name + " $ ");
      WinePrice = $('<span class="ordered-item-price">').text(OrderedItem.price);
      WineSize = $('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      $orderedItemLi= $('<li>',{class:'ordered-item'});
      $orderedItemLi.append(WineName).append(WinePrice).append(WineSize);
      ulCart.append($orderedItemLi);
    };
    //End of shopping cart

    //Beginning of order edit function
    $('.ordered-item').on('click',function(event){
      $(event.currentTarget).remove();
      console.log("remove");
      subtotalOfEach();
      calculateTotal();
    });//End of order edit click function

    subtotalOfEach();
    calculateTotal();

  });//End of click to add/remove order items function

  saveOrder();
  retrieveOrder();



}); // end of jQuery Closure
