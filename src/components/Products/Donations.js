import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import DonationCard from './DonationCard'

const containerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
}

class Donations extends Component {
  state = {
    stripe: null,
  }

  // Initialise Stripe.js with your publishable key.
  // You can find your key in the Dashboard:
  // https://dashboard.stripe.com/account/apikeys
  componentDidMount() {
    const stripe = window.Stripe('pk_test_86PRNmvFzBl74FSwWhOfL8J5000mohXvYl')
    console.log('setting stripe:', { stripe })
    this.setState({ stripe })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query Donations {
            products: allStripeSku (
              # filter: { product: { id: { eq: "prod_FGldrKJSq8XOWj" } } }
              sort: { fields: [price] }
            ) {
              edges {
                node {
                  productData: product {
                    name
                  }
                  price
                  currency
                  active
                }
              }
            }
          }
        `}
        render={({ products }) => (
          <div style={containerStyles}>
            {products.edges.map(({ node: product }) => (
              <DonationCard key={product.id} product={product} stripe={this.state.stripe} />
            ))}
          </div>
        )}
      />
    )
  }
}

export default Donations
