let selectedItemRow;
let itemList=[];
let itemIndex;
let itemId;
let lastITr;


function incrementItemId(currentID) {
    if (currentID==='no'){
        itemId='I001';
    }else {
        let number =parseInt(currentID.slice(1), 10);
        number++;
        itemId = "I" + number.toString().padStart(3, "0");
        itemId.log(itemId);
    }
}

incrementItemId('no');
$('#Iid').val(itemId);

function clearItemFields() {
    $('#Iid').val("");
    $('#ItemDesc').val("");
    $('#UPrice').val("");
    $('#Qty').val("");

}

let btnItemAdd = $("#btnItemAdd");
let tblItems = $("#tblItemBody");
let btnItemUpdate = $("#btnItemUpdate");
let btnItemDelete = $("#btnItemDelete");
let btnItemClear = $("#btnItemClear");


btnItemUpdate.prop('disabled',true);
btnItemDelete.prop('disabled',true);


//Button Add function
btnItemAdd.click(function (){

    let iID = $('#Iid').val();
    let itemDesc = $('#ItemDesc').val();
    let itemPrice = $('#UPrice').val();
    let itemQty = $('#Qty').val();

    lastITr=$('<tr> <td>'+ iID +'</td> <td>'+ itemDesc +'</td> <td>'+ itemPrice +'</td> <td>'+ itemQty +'</td> </tr>');
    $('#tblItemBody').append(lastITr);

    //adding the customer to the list
    itemList.push({id: iID ,desc: itemDesc, Up: itemPrice,qty: itemQty});

    console.log(itemList);
    loadItemOptionIds();

    clearItemFields();

    incrementItemId(lastITr.find('td:first').text());
    $('#Iid').val(itemId);

    btnItemUpdate.prop('disabled',false);
    btnItemDelete.prop('disabled',false);

});

tblItems.dblclick(function (event){

    btnItemUpdate.prop('disabled',false);
    btnItemDelete.prop('disabled',false);
    btnItemAdd.prop('disabled',true);

    selectedItemRow = event.target.closest("tr");
    //getting the index of the selected customer
    itemIndex = itemList.findIndex(itemList => itemList.id === selectedItemRow.cells[0].textContent);
    console.log(itemIndex)

    $('#Iid').val(selectedItemRow.cells[0].textContent);
    $('#ItemDesc').val(selectedItemRow.cells[1].textContent);
    $('#UPrice').val(selectedItemRow.cells[2].textContent);
    $('#Qty').val(selectedItemRow.cells[3].textContent);

});
//Button delete function
btnItemUpdate.click(function (){

    let iID = $('#Iid').val();
    let itemDesc = $('#ItemDesc').val();
    let itemPrice = $('#UPrice').val();
    let itemQty = $('#Qty').val();

    selectedItemRow.cells[0].textContent=iID;
    selectedItemRow.cells[1].textContent=itemDesc;
    selectedItemRow.cells[2].textContent=itemPrice;
    selectedItemRow.cells[3].textContent=itemQty;

    clearItemFields();

    incrementItemId(lastITr.find('td:first').text());
    $('#Iid').val(itemId);

    //updating the selected customer from the list
    itemList[itemIndex].id=iID;
    itemList[itemIndex].desc=itemDesc;
    itemList[itemIndex].Up=itemPrice;
    itemList[itemIndex].qty=itemQty;

    console.log(itemList);

    btnItemUpdate.prop('disabled',true);
    btnItemDelete.prop('disabled',true);
    btnItemAdd.prop('disabled',false);
});

btnItemDelete.click(function (){
    selectedItemRow.remove();

    //removing the selected customer from the list
    itemList.splice(itemIndex,1);
    console.log(itemList);

    clearItemFields();

    incrementItemId(lastITr.find('td:first').text());
    $('#Iid').val(itemId);

    btnItemUpdate.prop('disabled',true);
    btnItemDelete.prop('disabled',true);
    btnItemAdd.prop('disabled',false);

});

btnItemClear.click(function (){
    clearItemFields();
})