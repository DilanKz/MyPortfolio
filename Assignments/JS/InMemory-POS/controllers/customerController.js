let selectedCustomerRow;
let customerList=[];
let customerIndex;
let cusId;
let lastTr;


function incrementCusId(currentID) {
    if (currentID==='no'){
        cusId='C00-001';
    }else {
        let number =parseInt(currentID.slice(4), 10);
        number++;
        cusId = "C00-" + number.toString().padStart(3, "0");
        console.log(cusId);
    }
}

incrementCusId('no');
$('#cid').val(cusId);

function clearCustomerFields() {
    $('#cid').val("");
    $('#Name').val("");
    $('#Name').focus();
    $('#Address').val("");
    $('#contact').val("");

}




let btnAdd = $("#btnAdd");
let tblCustomers = $("#tblCustomers");
let btnUpdate = $("#btnUpdate");
let btnDelete = $("#btnDelete");
let btnClear = $("#btnClear");


btnUpdate.prop('disabled',true);
btnDelete.prop('disabled',true);


function addCustomer(){
    let cusID = $('#cid').val();
    let cusName = $('#Name').val();
    let cusAddress = $('#Address').val();
    let cusContact = $('#contact').val();

    lastTr=$('<tr> <td>'+ cusID +'</td> <td>'+ cusName +'</td> <td>'+ cusAddress +'</td> <td>'+ cusContact +'</td> </tr>');
    $('#tblCustomers').append(lastTr);

    //adding the customer to the list

    let customer={
        id: cusID ,
        name: cusName,
        address: cusAddress,
        contact: cusContact
    }

    customerList.push(customer);

    customerList[0].name;

    console.log(customerList);
    loadCustomerOptionIds();

    clearCustomerFields();

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);

    incrementCusId(lastTr.find('td:first').text());
    $('#cid').val(cusId);
}

//Button Add function
btnAdd.click(function (){

    if (validateFields()){
        addCustomer();
    }

});

tblCustomers.dblclick(function (event){

    btnUpdate.prop('disabled',false);
    btnDelete.prop('disabled',false);
    btnAdd.prop('disabled',true);

    selectedCustomerRow = event.target.closest("tr");
    //getting the index of the selected customer
    customerIndex = customerList.findIndex(customerList => customerList.id === selectedCustomerRow.cells[0].textContent);
    console.log(customerIndex)

    $('#cid').val(selectedCustomerRow.cells[0].textContent);
    $('#Name').val(selectedCustomerRow.cells[1].textContent);
    $('#Address').val(selectedCustomerRow.cells[2].textContent);
    $('#contact').val(selectedCustomerRow.cells[3].textContent);

});
//Button delete function
btnUpdate.click(function (){

    if (confirm("Are you sure you want to Update this Customer?")) {
        let cusID = $('#cid').val();
        let cusName = $('#Name').val();
        let cusAddress = $('#Address').val();
        let cusContact = $('#contact').val();

        selectedCustomerRow.cells[0].textContent=cusID;
        selectedCustomerRow.cells[1].textContent=cusName;
        selectedCustomerRow.cells[2].textContent=cusAddress;
        selectedCustomerRow.cells[3].textContent=cusContact;

        clearCustomerFields();



        //updating the selected customer from the list
        customerList[customerIndex].id=cusID;
        customerList[customerIndex].name=cusName;
        customerList[customerIndex].address=cusAddress;
        customerList[customerIndex].contact=cusContact;

        console.log(customerList);

        btnUpdate.prop('disabled',true);
        btnDelete.prop('disabled',true);
        btnAdd.prop('disabled',false);

        //getting the first td of the last tr and
        incrementCusId(lastTr.find('td:first').text());
        $('#cid').val(cusId);
    }
});

btnDelete.click(function (){

    if (confirm("Are you sure you want to delete this Customer?")) {
        selectedCustomerRow.remove();

        //removing the selected customer from the list
        customerList.splice(customerIndex,1);
        console.log(customerList);

        clearCustomerFields();

        btnUpdate.prop('disabled',true);
        btnDelete.prop('disabled',true);
        btnAdd.prop('disabled',false);

        incrementCusId(lastTr.find('td:first').text());
        $('#cid').val(cusId);
    }

});

btnClear.click(function (){
    clearCustomerFields();
});

$('#cid, #Name, #Address, #contact').keydown(function (event){
    console.log(event.key)

    if (event.key ==='Tab'){
        event.preventDefault();
    }
});

$('#Name').keydown(function (event){


    if (/^[A-Za-z]+$/.test($('#Name').val())){

        $('#Name').css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            $('#Address').focus();
        }

    }else {
        $('#Name').css('border-color', 'red');
    }

});

$('#Address').keydown(function (event){
    if (/^[A-Za-z\s.'-]+$/.test($('#Address').val())){
        $('#Address').css('border-color', '#dee2e6');
        if (event.key ==='Enter'){

            $('#contact').focus();
        }
    }else {
        $('#Address').css('border-color', 'red');
    }

});

$('#contact').keydown(function (event){

    console.log(/^(?:\+94|0)(?:\d{9}|\d{2}-\d{7})$/.test($('#contact').val()));

    if (/^(?:\+94|0)(?:\d{9}|\d{2}-\d{7})$/.test($('#contact').val())){
        $('#contact').css('border-color', '#dee2e6');

        if (event.key ==='Enter'){
            addCustomer();
        }
    }else {
        $('#contact').css('border-color', 'red');
    }
});

function validateFields(){
    if (!/^[A-Za-z]+$/.test($('#Name').val())){
        $('#Name').focus();
        $('#Name').css('border-color', 'red');
        return false;
    }
    if (!/^[A-Za-z\s.'-]+$/.test($('#Address').val())){
        $('#Address').focus();
        $('#Address').css('border-color', 'red');
        return false;
    }
    if (!/^(?:\+94|0)(?:\d{9}|\d{2}-\d{7})$/.test($('#contact').val())){
        $('#contact').focus();
        $('#contact').css('border-color', 'red');
        return false;
    }

    $('#Name').css('border-color', '#dee2e6');
    $('#Address').css('border-color', '#dee2e6');
    $('#contact').css('border-color', '#dee2e6');
    return true;
}