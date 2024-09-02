 

  // fetch('https://script.google.com/macros/s/AKfycbyO9LcesIpSoSnkBAKunpuhYEbzDi0eYaRqQTdXYGcMEfGyfUmCJX8JSLurnyXLfZo0zg/exec?id=akshay')
  //   .then(response => response.json())
  //   .then(response => {let loginlist=response.data;
  //     console.log(loginlist);
  //   })
  //   .catch(err => console.error(err));


   // Get the snackbar DIV
   var x = document.getElementById("snackbar");
   
  
function verifyUser() {
  const IDD = document.getElementById('id').value;
  const P = document.getElementById('pass').value;
  if (IDD == "" || P == "") {
    alert("One of the fields is empty... fill it and then click on login");c
    
  } else {
    fetch('https://script.google.com/macros/s/AKfycbyO9LcesIpSoSnkBAKunpuhYEbzDi0eYaRqQTdXYGcMEfGyfUmCJX8JSLurnyXLfZo0zg/exec?id='+IDD)
    .then(response => response.json())
    // .then(res => {const data = res.data;
    //   console.log(data);
    // })
    .then(response => {
    const users= response.data;
      console.log(users);
                           const userId = document.getElementById('id').value;
    const userPass = document.getElementById('pass').value;
    const result = document.getElementById('result');

    const user = users.find(user => user.id === userId && user.pass == userPass);

    if (user) {
        x.textContent = 'Login successful!';
  // Add the "show" class to DIV
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  document.getElementById("body").style.display = "none";
  document.getElementById("subtitle").textContent = "Leave Application Portal";
  document.getElementById("mainpage").style.display = "block";
  document.getElementById("applicationlist").style.display = "block";
  document.getElementById("formpage").style.display = "none";
  document.getElementById("welcome").textContent = "Welcome "+String(IDD);
 showList(IDD);
 
    } else {
        // result.textContent = 'Invalid ID or Password.';
        x.textContent = 'Invalid ID or Password!';
        // Add the "show" class to DIV
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    })
    .catch(err => console.error(err));
  }
}

 function showList(IDD){

  fetch('https://script.google.com/macros/s/AKfycbzwgiiZhoDa1vkn3upT8kr7s-zJURvrIlqSKR617B5O5uw_8JfJRokmRuz72BdsptHA7A/exec?id='+IDD)
  .then(response => response.json())
  .then(response => {
  const leavedata= response.data;
   
    const tableBody = document.querySelector('#dataTable tbody');

    leavedata.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.ai}</td>
            <td>${item.lp}</td>
            <td>${item.lr}</td>
            <td>${item.s}</td>
        `;
        tableBody.appendChild(row);
    });

  }
  )
  .catch(err => console.error(err));
}
 
const fromDate = document.getElementById('multiple1');
const toDate = document.getElementById('multiple2');

fromDate.addEventListener('change', function() {
    toDate.min = fromDate.value;
});
function OpenNewForm() {
  var add = document.getElementById("addbutton").textContent;
 
   if(add == '+ Apply for Leave'){
     document.getElementById("useridinput").value = document.getElementById('id').value ;
     document.getElementById("employeeid").value = document.getElementById('id').value ;
   document.getElementById("applicationlist").style.display = "none";
   document.getElementById("formpage").style.display = "flex";
   document.getElementById("addbutton").textContent = "Close X";
   } else {
     document.getElementById("applicationlist").style.display = "block";
     document.getElementById("formpage").style.display = "none";
     document.getElementById("addbutton").textContent = "+ Apply for Leave";
   
   }
  }

  const today = new Date().toISOString().split('T')[0];
  document.getElementById('single1').setAttribute('min', today);
  document.getElementById('multiple1').setAttribute('min', today);

  function changeinleavetype() {
    const leaveType = document.getElementById('leaveType').value;
    const s1 = document.getElementById("single1");
    const m1 = document.getElementById("multiple1");
    const m2 = document.getElementById("multiple2");
    const s1l =document.getElementById("s1l");
    const m1l =document.getElementById("m1l");
    const m2l =document.getElementById("m2l");
    if (leaveType === 'single') {
      m1.style.display = "none";
      m2.style.display = "none";
      s1.style.display = "block";
      m1l.style.display = "none";
      m2l.style.display = "none";
      s1l.style.display = "block";
      window.LT= "single";

    } else {
      s1.style.display = "none";
      m1.style.display = "block";
      m2.style.display = "block";
      s1l.style.display = "none";
      m1l.style.display = "block";
      m2l.style.display = "block";
      window.LT= "multiple";
      
    }
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbzwgiiZhoDa1vkn3upT8kr7s-zJURvrIlqSKR617B5O5uw_8JfJRokmRuz72BdsptHA7A/exec';


const form = document.getElementById('myForm');

form.addEventListener('submit', e => {
    e.preventDefault();
if(window.LT=="single"){
    document.getElementById("periodleave").value = String(document.getElementById('single1').value)  ; 
}
else{
  document.getElementById("periodleave").value = String(document.getElementById('multiple1').value)+ " To " +String(document.getElementById('multiple2').value) ; 
}

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDateTime = `${day}${month}${year}${hours}${minutes}${seconds}`;
  document.getElementById("appid").value = String(formattedDateTime) ; 

    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => alert('Success!'))
        .catch(error => console.error('Error!', error.message));
});


