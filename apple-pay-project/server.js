if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
  document.getElementById('applePayButton').style.display = 'block';
  document.getElementById('applePayButton').addEventListener('click', function () {
    startApplePaySession();
  });
}

function startApplePaySession() {
  const paymentRequest = {
    countryCode: 'US',
    currencyCode: 'USD',
    supportedNetworks: ['visa', 'mastercard', 'amex'],
    merchantCapabilities: ['supports3DS'],
    total: {
      label: 'Total',
      amount: '10.00',
    },
  };

  const applePaySession = new ApplePaySession(3, paymentRequest);

  applePaySession.onvalidatemerchant = function (event) {
    fetch('/validate-merchant', {
      method: 'POST',
      body: JSON.stringify({
        validationURL: event.validationURL,
      }),
    })
      .then(response => response.json())
      .then(merchantSession => {
        applePaySession.completeMerchantValidation(merchantSession);
      });
  };

  applePaySession.onpaymentauthorized = function (event) {
    fetch('/process-payment', {
      method: 'POST',
      body: JSON.stringify({
        token: event.payment.token,
      }),
    })
      .then(response => response.json())
      .then(result => {
        applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS);
      });
  };

  applePaySession.begin();
}
