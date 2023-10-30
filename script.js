function detectCardType(number) {
    if (number.match(/^4/)) {
        return 'Visa';
    } else if (number.match(/^5[1-5]/)) {
        return 'MasterCard';
    } else if (number.match(/^2[2-7]/) && number.length === 16) {
        return 'MasterCard'; // New MasterCard range
    } else if (number.match(/^3[47]/)) {
        return 'American Express';
    }
    // Add other card types if needed
    return 'Unknown';
}




document.getElementById('cardForm').addEventListener('submit', function(event) {

    var cardType = detectCardType(cardNumber);
    document.getElementById('card-type').textContent = 'Card Type: ' + cardType;
    
    event.preventDefault();
    
    var cardNumber = document.getElementById('cardNumber').value;
    var expiryDate = document.getElementById('expiryDate').value;
    var cvc = document.getElementById('cvc').value;

    var errorMessage = '';

    // Validate card number using Luhn algorithm
    if (!isValidCardNumber(cardNumber)) {
        errorMessage += 'Card number is invalid. ';
    }

    // Validate expiration date
    if (!isValidExpiryDate(expiryDate)) {
        errorMessage += 'Expiry date is invalid. ';
    }

    // Check CVC
    if (cvc.length < 3 || cvc.length > 4) {
        errorMessage += 'CVC is invalid.';
    }

    // Display error message or continue to payment
    if (errorMessage) {
        document.getElementById('error-message').textContent = errorMessage;
    } else {
        // Link to your payment processing functionality here.
        console.log('Proceed with payment processing');
    }
});

function isValidCardNumber(number) {
    var nCheck = 0, nDigit = 0, bEven = false;
    number = number.replace(/\D/g, "");
    
    for (var n = number.length - 1; n >= 0; n--) {
        var cDigit = number.charAt(n),
              nDigit = parseInt(cDigit, 10);
        
        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }
        
        nCheck += nDigit;
        bEven = !bEven;
    }
    
    return (nCheck % 10) === 0;
}

function isValidExpiryDate(date) {
    var currentDate = new Date(),
        currentMonth = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear().toString().slice(-2),
        [expMonth, expYear] = date.split('/');

    if (!expMonth || !expYear || expMonth > 12 || expMonth < 1) {
        return false;
    }

    if (expYear < currentYear || (expYear == currentYear && expMonth < currentMonth)) {
        return false;
    }

    return true;
}

// navabra script

document.getElementById("logoButton").onclick = function() {
    toggleNav();
};

function toggleNav() {
    var nav = document.getElementById("mySidenav");
    if (nav.style.width === "0px" || nav.style.width === "") {
        nav.style.width = "250px";
    } else {
        nav.style.width = "0px";
    }
}
