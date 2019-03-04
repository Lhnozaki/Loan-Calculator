//alert('Test');

//// Submit Button

document.querySelector('#loan-form').addEventListener('submit',function(e){
    // Hide Results
    document.querySelector('#results').style.display = 'none';


    //Show Loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults(){
    //console.log(e.target);

    // UI Variables
    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector('#years');
    let monthlyPymt = document.querySelector("#monthly-payment");
    let totalPymnt = document.querySelector("#total-payment");
    let totalInt = document.querySelector('#total-interest');

    // Calculation
    const principal = parseFloat(amount.value);
    const calculatedInt = parseFloat(interest.value) / 100 / 12;
    const calculatedPymt = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInt, calculatedPymt);
    const monthly = (principal * x * calculatedInt)/(x-1);

    // Find Finite Number
    if(isFinite(monthly)){
        monthlyPymt.value = monthly.toFixed(2);
        totalPymnt.value = (monthly * calculatedPymt).toFixed(2);
        totalInt.value = ((monthly * calculatedPymt) - principal).toFixed(2);

        //Show Results
        document.querySelector('#results').style.display = 'block';

        //Hide Spinner
        document.querySelector('#loading').style.display = 'none';

    } else {
        showError('Please check your input');

        //Hide Spinner
        document.querySelector('#loading').style.display = 'none';

    };

    //e.preventDefault();
}

function showError(error){
    // Create New Div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector(".card");
    const heading = document.querySelector('.heading');

    // Adding a Class & Text 
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error above Heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}

