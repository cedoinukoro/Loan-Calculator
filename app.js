// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  // hide at the start to avoid error
document.getElementById('results').style.display = "none";

// show loader
document.getElementById('loading').style.display = "block";

setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// create the function
function calculateResults(e){
// grab the values from UI
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');

// calculations
// we want decimals (float)
const principal = parseFloat(amount.value);
const calculatedInterest = parseFloat(interest.value) / 100 / 12 ;
const calculatedPayments = parseFloat(years.value) * 12;

// compute the monthly payment

const x = Math.pow(1 + calculatedInterest, calculatedPayments);
const monthly = (principal*x*calculatedInterest)/(x-1);

// check if monthly is a finite number
if(isFinite(monthly)){
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly*calculatedPayments).toFixed(2);
  totalInterest.value = ((monthly* calculatedPayments)- principal).toFixed(2);

// show results (opposite to initation)
  document.getElementById('results').style.display = "block";
// hide loader (opposite to initiation)
  document.getElementById('loading').style.display = "none";
} else {

  // build an html element to show error
  showError('Please check your numbers');

  // hide results
  document.getElementById('results').style.display = "none";
// hide loader
  document.getElementById('loading').style.display = "none";

}




}

// create Function error
function showError(error){


// create a div
const  errorDiv = document.createElement('div');

// select elements parents of our error message 
const card = document.querySelector('.card');
const heading = document.querySelector('.heading');
// add class to div
errorDiv.className = 'alert alert-danger';
// add id to div


// add text to div
errorDiv.appendChild(document.createTextNode(error));

// insert error aboveheading. card is parent and errorDiv BEFORE heading

card.insertBefore(errorDiv, heading);


// clear error after 3 sec
setTimeout(clearError, 3000);
} 



function clearError(){
  document.querySelector('.alert').remove();
}
