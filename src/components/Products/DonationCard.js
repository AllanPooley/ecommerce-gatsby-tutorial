import React from 'react'

const cardStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '5px 5px 25px 0 rgba(46,61,73,.2)',
  backgroundColor: '#fff',
  borderRadius: '6px',
  maxWidth: '300px',
}
const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  padding: '12px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const formatPrice = (amount, currency) => {
  const price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })

  return `$${price}`
}

const DonationCard = class extends React.Component {
  async redirectToCheckout(event, sku, quantity = 100) {
    event.preventDefault()
    console.log('Redirecting to Checkout:');
    console.log('----------------------------');
    console.log({ sku });
    console.log({ quantity });
    console.log('----------------------------');
    const { error } = await this.props.stripe.redirectToCheckout({
      items: [
        { sku, quantity },
      ],
      successUrl: `${window.location.origin}/success/`,
      cancelUrl: `${window.location.origin}/`,
      // customerEmail: 'jiggaboo@littleandbig.com.au',
      // billingAddressCollection: 'required',
    })

    if (error) {
      console.warn('Error:', error)
    }
  }

  render() {
    const { product } = this.props;
    const {
      id,
      price,
      currency,
      productData
    } = product;
    const {
      name
    } = productData;
    return (
      <div style={cardStyles}>
        <h4>{name}</h4>
        <button
          style={buttonStyles}
          onClick={event => this.redirectToCheckout(event, id)}
        >
          {formatPrice(price, currency)}
        </button>
      </div>
    )
  }
}

export default DonationCard
