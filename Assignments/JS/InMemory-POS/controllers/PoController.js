let fullTotal = 0;
let orderID='O00-001';
let selectCusIds = $('#customerIds');
let selectItemIds = $('#itemIds');
let customerListElement;

let selectedCusID="";
let selectedItemID="";

function nextOrderID(){
    let number =parseInt(orderID.slice(4), 10);
    number++;
    orderID = "O00-" + number.toString().padStart(3, "0");
    console.log(orderID);
}

$('#currentOrderID').val(orderID);


function loadCustomerOptionIds(){
    selectCusIds.empty();
    selectCusIds.append($('<option selected>Select_ID</option>'));

    for (let index in customerList) {
        let option = $('<option value="'+index+'"> '+customerList[index].cid+' </option>');
        selectCusIds.append(option);
    }
}

function loadItemOptionIds(){
    selectItemIds.empty();
    selectItemIds.append($('<option selected>Select_ID</option>'));

    for (let index in itemList) {
        let option = $('<option value="'+index+'"> '+itemList[index].iId+' </option>');
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

function clearPoFields(){
    $('#itemIds option:contains("Select_ID")').prop('selected', true);
    $('#poItemDesc').val("");
    $('#poItemQtyOnHand').val("");
    $('#poItemUP').val("");
}

selectCusIds.click(function (){
    selectedCusID = $("#customerIds :selected").text();
    if (selectedCusID.length > 0){
        $("#customerIds").css("border-color",'white');
        let index = $("#customerIds").val();
        if (selectedCusID!=='Select_ID'){
            console.log(selectedCusID+" "+index);

            customerListElement = customerList[Number(index)];
            console.log(Number(index));
            $('#poCustomerName').val(customerListElement.name);
        }
    }
});

selectItemIds.click(function (){
    selectedItemID = $("#itemIds :selected").text();
    if (selectedItemID.length > 0 ){
        $("#itemIds").css("border-color",'white');
        let index = $("#itemIds").val();
        if (selectedItemID!=='Select_ID'){
            console.log(selectedItemID+" "+index);

            let itemListElement = itemList[Number(index)];

            $('#poItemDesc').val(itemListElement.desc);
            $('#poItemQtyOnHand').val(itemListElement.unitP);
            $('#poItemUP').val(itemListElement.qty);

        }else {

        }
    }
});

function qtyValidate(){

    if (/^\d+$/.test($('#poItemQty').val())){
        let qtyOnHand = $('#poItemQtyOnHand').val();
        $('#poItemQty').css("border-color",'white');

        if (qtyOnHand>Number($('#poItemQty').val())){
            $('#poItemQty').css("border-color",'white');
            return true;
        }else {
            $('#poItemQty').css("border-color",'red');
            return true;
        }

    }else {
        $('#poItemQty').css("border-color",'red');
        return false;
    }
}

$('#poItemQty').keyup(function (){
    if (/^\d+$/.test($('#poItemQty').val())){
        let qtyOnHand = $('#poItemQtyOnHand').val();
        $('#poItemQty').css("border-color",'white');

        if (qtyOnHand>Number($('#poItemQty').val())){
            $('#poItemQty').css("border-color",'white');
        }else {
            $('#poItemQty').css("border-color",'red');
        }

    }else {
        $('#poItemQty').css("border-color",'red');
    }
});


$('#btnAddToCart').click(function (){

    if (selectedCusID.length > 0 && selectedItemID.length > 0 && selectedItemID!=='Select_ID' && selectedCusID!=='Select_ID'){
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


        if (qtyValidate() ){
            $('#poItemQty').css("border-color",'white');
                $('#poItemQty').css("border-color",'white');
                //making the total for the table row
                let total = eval(unitPrice+'*'+buyingQty);

                fullTotal+=total;

                cartItem.push({id: itemId ,desc: desc, Up: unitPrice,qty: qtyOnHand,bQty: buyingQty,tot:total});

                //making and adding the row to the table
                let tr = $('<tr> <td>'+ itemId +'</td> <td>'+ desc +'</td> <td>'+ buyingQty +'</td> <td>'+ unitPrice +'</td> <td>'+ total +'</td> </tr>');
                $("#pOTBody").append(tr);


                $('#maxTot').val(total);

                clearPoFields()

        }else {
            $('#poItemQty').css("border-color",'red');
        }
    }else {
        $("#customerIds").css("border-color",'red');
        $("#itemIds").css("border-color",'red');
    }
});

$('#discount').keydown(function (event){

    if (event.key==='Enter'){
        if ($('#discount').val()!=="0"){
            let subTotal = fullTotal-Number($('#discount').val());

            $('#subTot').val(subTotal);
        }
    }

});

//clearing fields
function clearAllFields() {
    cartItem=[];

}


//purchase Order
$('#purchaseOrder').click(function (){

    if (selectedCusID.length > 0 && selectedItemID.length > 0 && selectedItemID!=='Select_ID' && selectedCusID!=='Select_ID'){
        let orders = new Orders(orderID,customerListElement,date,cartItem);
        console.log(orders);

        //clearing fields
        $('#customerIds option:contains("Select_ID")').prop('selected', true);
        $('#poCustomerName').val("");



        //incrementing next order id
        nextOrderID();
        $('#currentOrderID').val(orderID);
    }else {
        $("#customerIds").css("border-color",'red');
        $("#itemIds").css("border-color",'red');
    }

});