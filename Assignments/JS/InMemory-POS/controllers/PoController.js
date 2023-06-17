let fullTotal = 0;
let orderID;
let selectCusIds = $('#customerIds');
let selectItemIds = $('#itemIds');

function loadCustomerOptionIds(){
    selectCusIds.empty();
    selectCusIds.append($('<option selected>Select_ID</option>'));

    for (let index in customerList) {
        let option = $('<option value="'+index+'"> '+customerList[index].id+' </option>');
        selectCusIds.append(option);
    }
}

function incrementOrderId(currentID) {
    if (currentID==='no'){
        orderID='O00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        orderID = "O00-" + number.toString().padStart(3, "0");
    }
}

function loadItemOptionIds(){
    selectItemIds.empty();
    selectItemIds.append($('<option selected>Select_ID</option>'));

    for (let index in itemList) {
        let option = $('<option value="'+index+'"> '+itemList[index].id+' </option>');
        selectItemIds.append(option);
    }
}

//Date formatter

let date=new Date();

let fullDay = date.getDay();
let fullMonth = date.getMonth()+1;
let fullYear = date.getFullYear();

let dateFormatter=`${fullDay}-${fullMonth}-${fullYear}`;
$('#dtf').val(dateFormatter);

selectCusIds.click(function (){
    let text = $("#customerIds :selected").text();
    let index = $("#customerIds").val();
    if (text!=='Select_ID'){
        console.log(text+" "+index);

        let customerListElement = customerList[Number(index)];
        console.log(Number(index));
        $('#poCustomerName').val(customerListElement.name);
    }
});

selectItemIds.click(function (){
    let text = $("#itemIds :selected").text();
    let index = $("#itemIds").val();
    if (text!=='Select_ID'){
        console.log(text+" "+index);

        let itemListElement = itemList[Number(index)];

        $('#poItemDesc').val(itemListElement.desc);
        $('#poItemQtyOnHand').val(itemListElement.qty);
        $('#poItemUP').val(itemListElement.Up);

    }
});


function getCartDetails(){
}

$('#btnAddToCart').click(function (){
    let itemId;
    let desc;
    let unitPrice;
    let qtyOnHand;
    let buyingQty;

    itemId = $("#itemIds :selected").text();
    desc = $('#poItemDesc').val();
    qtyOnHand = $('#poItemQtyOnHand').val();
    unitPrice = $('#poItemUP').val();
    buyingQty = $('#poItemQty').val();

    //making the total for the table row
    let total = eval(unitPrice+'*'+buyingQty);

    fullTotal+=total;

    cartItem.push({id: itemId ,desc: desc, Up: unitPrice,qty: qtyOnHand,bQty: buyingQty,tot:total});

    //making and adding the row to the table
    let tr = $('<tr> <td>'+ itemId +'</td> <td>'+ desc +'</td> <td>'+ buyingQty +'</td> <td>'+ unitPrice +'</td> <td>'+ total +'</td> </tr>');
    $("#pOTBody").append(tr);


    $('#maxTot').val(total);
});

$('#discount').keydown(function (event){

    if (event.key==='Enter'){
        if ($('#discount').val()!=="0"){
            let subTotal = fullTotal-Number($('#discount').val());

            $('#subTot').val(subTotal);
        }
    }

});