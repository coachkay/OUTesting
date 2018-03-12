const CONFIGURATION = {
  themeColor: '#134896',

  currency: 'INR', // shouldn't ne adjusted during funding compaing (find supported currencies at https://stripe.com/docs/currencies)

  // Checkout Form
  checkoutTitle: 'Thank you!',
  checkoutDescription: 'Ooty Ultra', // will show up in your Stripe payment dashboard too
  checkoutButtonLabel: 'Submit Form & Pay Now',
  callToAction: 'Submit Form and Pay!',
  defaultAmount: 3
};

export default CONFIGURATION;
