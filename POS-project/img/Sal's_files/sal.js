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
      var $eachBrandButton = $('<button>', {id:index, class:'brand-name'}).text(brand.name + " $" + brand.price + " size:" + brand.size)
      ulBrands.append($('<li>').append($eachBrandButton));
    });
    $('.'+wine.type+"-li").append(ulBrands);
  }); // end of wines.forEach()

//Show inventory by category in DOM
  $('.red').click(function(){
    $('#red-brands').toggle();
  });

  $('.white').click(function(){
    $('#white-brands').toggle();
  });

  $('.champagne').click(function(){
    $('#champagne-brands').toggle();
  });

  // Calucuating Discount
  function calculateDiscount(){
  var discount = ($('#discount-rate2').val())*0.01;
  var totalWithDiscount = totalbeforeTax2 * (1 - discount);
  console.log(totalbeforeTax2);
  var discountedTotal = $("#discountedTotal").val(totalWithDiscount.toFixed(2));
  console.log(discountedTotal);

  // Calculating grandtotal
  var grandTotal = totalWithDiscount+(totalWithDiscount*0.08875);
  $('#grand-total2').val(grandTotal.toFixed(2));
  };

  // Calling discount function when a input is present;
  $('#discount-rate2').on('keypress',function(){
    calculateDiscount();});

//Setting up the shoping cart
  //Identifing Ordered Item
  var ulCart = $('#order-list').append($('<ul class="shopping-cart" >'));
  $('.brand-name').click(function(event){
    var clickedBrand = $(event.currentTarget);
    var parentID = clickedBrand.parent().parent().attr('id');
    var clickedID = clickedBrand.attr('id');

  //Adding items to cart
    if(parentID=='white-brands'){
      var OrderedItem = wines[1].brands[clickedID];

      var WineName = $('<span class="ordered-item">').text(OrderedItem.name + " $ ");
      var WinePrice =$('<span class="ordered-item-price">').text(OrderedItem.price);
      var WineSize =$('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      ulCart.append(WineName).append(WinePrice).append(WineSize);
    }else if(parentID=='red-brands'){
      var OrderedItem = wines[0].brands[clickedID];
      var WineName = $('<span class="ordered-item">').text(OrderedItem.name + " $ ");
      var WinePrice = $('<span class="ordered-item-price">').text(OrderedItem.price);
      var WineSize = $('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      ulCart.append(WineName).append(WinePrice).append(WineSize);
    }else if(parentID=='champagne-brands'){
      var OrderedItem = wines[2].brands[clickedID];
      var WineName = $('<span class="ordered-item">').text(OrderedItem.name + " $ ");
      var WinePrice = $('<span class="ordered-item-price">').text(OrderedItem.price);
      var WineSize = $('<span class="ordered-item-size">').html(" " + OrderedItem.size + "<br>");
      ulCart.append(WineName).append(WinePrice).append(WineSize);
    };
    //End of shopping cart

    //Calculating subtotal at each click
    var subtotalArray=[];
    var OrderedPrices = $('span.ordered-item-price');
    for(var i=0; i<OrderedPrices.length; i++){
    subtotalArray.push(parseFloat(OrderedPrices[i].textContent));
    };
    // console.log(subtotalArray);

    // Subtotal of selected items
    totalbeforeTax = 0;
    console.log(subtotalArray);
    subtotalArray.forEach(function(eachPrice){
      totalbeforeTax += eachPrice;
      totalbeforeTax2 = (totalbeforeTax).toFixed(2);
      $('#subtotal2').val(totalbeforeTax2);
      return totalbeforeTax2;
    });

    calculateDiscount();

  });//End of click order function


}); // end of jQuery Closure



  //Red Wines
  // var red_array=[
  //     ['Shiraz',
  //     {name:'Bogle Pititeh', price: 13.99, size: '750ml'},
  //     {name:'Rosemount Dim Shiraz', price: 9.99, size: '750ml'}
  //     ],
  //
  //   ['Merlot',
  //     {name:'Coppola', price: 19.99, size: '750ml'},
  //     {name:'Simi Sonoma', price: 21.99, size: '750ml'},
  //     {name:'Wild Horse', price: 18.99, size: '750ml'},
  //     {name:'Rutherfold Hill', price: 19.99, size: '1.5l'},
  //     {name:'Kendall Jackson Reserve', price: 19.99, size: '1.5l'},
  //     {name:'Woodbridge', price: 12.99, size: '1.5l'},
  //     {name:'Woodbridge', price: 9.99, size: '750ml'}
  // //   ],
  //   ['Cabernet Sauvignon',
  //     {name:'Coppola', price: 16.99, size: '750ml'},
  //     {name:'Simi Sonoma', price: 21.99, size: '750ml'},
  //     {name:'Wild Horse', price: 19.99, size: '750ml'},
  //     {name:'Sterling Napa', price: 19.99, size: '750ml'},
  //     {name:'Kendall Jackson Reserve', price: 22.99, size: '750ml'},
  //     {name:'Clos Du Bois', price: 15.99, size: '750ml'}
  //   ],
  //   ['Melbec',
  //     {name:'Haut Theron', price: 9.99, size: '750ml'},
  //     {name:'Agua dePiedra', price: 9.99, size: '750ml'},
  //     {name:'Graffigna', price: 12.99, size: '750ml'}
  //   ],
  //   ['Pinot Noir',
  //     {name:'Coppola', price: 16.99, size: '750ml'},
  //     {name:'Cavit', price: 9.99, size: '750ml'},
  //     {name:'La Forture', price: 9.99, size: '750ml'},
  //     {name:'Cavit', price: 12.99, size: '1.5l'},
  //     {name:'Mark West', price: 10.99, size: '750ml'},
  //     {name:'string', price: 9.99, size: '1.5l'}
  //   ]
  // ];
  //
  // //White Wines
  // var white_array=[
  // ["Pinot Grigio",
  //     {name:'Tomaiolo', price: 9.99, size: '750ml'},
  //     {name:'Cavit', price: 12.99, size: '750ml'},
  //     {name:'Cesari', price: 9.99, size: '750ml'},
  //     {name:'Cavit', price: 10.99, size: '1.5l'},
  //     {name:'Ruffino', price: 9.99, size: '1.5l'},
  //     {name:'Zaccagnini', price: 15.99, size: '1.5l'}
  //   ],
  //   ['Chardonnay',
  //     {name:'Kendall Jackson', price: 16.99, size: '750ml'},
  //     {name:'Clos Du Bois', price: 13.99, size: '750ml'},
  //     {name:'Salmon Run', price: 12.99, size: '750ml'},
  //     {name:'Woodbridge', price: 12.99, size: '750ml'},
  //     {name:'Woodbridge', price: 16.99, size: '1.5l'},
  //   ],
  //   ['Riesling',
      // {name:'Relax', price: 9.99, size:'750ml'},
      // {name:'Blue Fish', price: 8.99, size:'750ml'},
      // {name:'Dr.Loosen', price: 12.99, size:'750ml'},
      // {name:'Blue Fish', price:12.99, size:'1.5l'},
      // {name:'Salmon Run', price:12.99, size:'1.5l'}
  //   ],
  //   ['Sauvignon Blanc',
  //     {name:'Kendall Jackson', price: 15.99, size: '750ml'},
  //     {name:'Frey', price: 13.99, size: '750ml'},
  //     {name:'Bogle', price: 12.99, size: '750ml'},
  //     {name:'Ferrarde', price: 10.99, size: '1.5l'}
  //   ],
  //   ['Moscato',
  //     {name:'Gabrieie', price: 9.99, size: '750ml'},
  //     {name:'Bartenura', price:10.99, size: '750ml'},
  //     {name:'Sutter Home', price: 12.99, size: '1.5l'},
  //     {name:'Sutter Home', price: 9.99, size: '1.5l'},
  //     {name:'Barefoot Spumante', price: 10.99, size: '750ml'}
  //   ]
  // ];
  //   //champagnes
    // var champagne_array=
    //   ['champagne',
    //     {name:'Andre', price:9.99, size:'750mL'},
    //     {name:'Moet Imperial', price: 49.99, size: '750ml'},
    //     {name:'Moet Nectar', price: 55.99, size: '750ml'},
    //     {name:'Veuve Clicquot', price: 53.99, size: '750ml'},
    //     {name:'Martin & Rossi Asti', price: 53.99, size: '750ml'}
    // ]
  // ;
  //
  // var wines = ['Red Wine', 'White Wines', 'Champagnes']
  // var inventory = [wines];

  //Adds a menuBar

//   var menu =function(){
//     wines.forEach(function(wine){
//       var menuButton=$('<button>').addClass(wine).text(wine);
//       $('.menuList').append(menuButton);
//     });
//   };
//   menu();
//
//   $('button.Red').click(RedMenu);
//   $('button.White').click(WhiteMenu);
//   $('button.Champagnes').click(function(){
//     console.log('clicked Champagne');
//     champagneName();
//   });
// $('button.Shiraz').click(CallEachShiraz);
//   // $('button')
//   // $('.pinot').click(pinotBrands);
//
//   // Adds Red Wine Types
//   function RedMenu(){
//     red_array.forEach(function(red){
//     var typesOfRedWine=$('<button>');
//     typesOfRedWine.addClass('redTypes').addClass(red[0]).text(red[0]);
//     typesOfRedWine.click(function(event) {
//       $(event.currentTarget).
//     });
//
//     // if(red[0] == "Shiraz") {
//     //   typesOfRedWine.click(CallEachShiraz);
//     // } else if(red[1] == "Melot") {
//     //   typesOfRedWine.click(CallEachMelot);
//     // }
//     $('.red').append(typesOfRedWine);
//
//     // $('.button.Shiraz').click(CallEachShiraz);
//     });
//   };
//   // RedMenu();
//
//   // Adds White Wine Types
//   function WhiteMenu(){
//     white_array.forEach(function(white){
//     var typesOfWhite=$('<button>').addClass('WhiteTypes').addClass(white[0]).text(white[0]);
//     $('.white').append(typesOfWhite);
//     });
//   };
//   // WhiteMenu();
//
//   //Getting the Champagne Names
//   function champagneName(){
//     for(var i=1;i<champagne_array.length;i++){
//      var champagneList=$('<button>').addClass('champagnes').text(champagne_array[i].name);
//      $('.champagne').append(champagneList);
//     };
//   };
//   // champagneName();
//
//   function CallEachShiraz(){
//     console.log('CallEachShiraz');
//     $('ul.shirazBrands').remove();
//     var shirazBrandsUL= $('<ul>').addClass('shirazBrands');
//     $('.Shiraz').append(shirazBrandsUL);
//     for(var i=1;i<red_array[0].length;i++){
//     var ShirazBrands=$('<button>').text(red_array[0][i].name + '\n $' + red_array[0][i].price + '\n' + red_array[0][i].size);
//     shirazBrandsUL.append(ShirazBrands);
//     console.log(red_array[0][i].name);};
//   };
//
//   function CallEachMelot(){
//     console.log("CallEachMelot is being called");
//     $('ul.melotBrands').remove();
//     var melotBrandsUL= $('<ul>').addClass('melotBrands')
//     $('.Melot').append(melotBrandsUL);
//     for(var i=1;i<red_array[1].length;i++){
//     var MelotBrands=$('<button>').text(red_array[1][i].name + '\n$' + red_array[1][i].price + '\n' + red_array[1][i].size);
//     melotBrandsUL.append(MelotBrands);
//     console.log(red_array[1][i].name + '\n$' + red_array[1][i].price + '\n' + red_array[1][i].size);};
//   };
// });
