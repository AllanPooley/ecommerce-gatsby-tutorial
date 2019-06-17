import React, { Component } from 'react'
import { graphql, StaticQuery } from 'gatsby'
import PlanCard from './PlanCard'

const conatinerStyles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  padding: '1rem 0 1rem 0',
}

class Plans extends Component {
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
          query PlansForProduct {
            plans: allStripePlan(
              # filter: { product: { id: { eq: "prod_FGldrKJSq8XOWj" } } }
              sort: { fields: [amount] }
            ) {
              edges {
                node {
                  id
                  currency
                  amount
                  product
                  active
                  nickname
                }
              }
            }
          }
        `}
        render={({ plans }) => (
          <div style={conatinerStyles}>
            {plans.edges.map(({ node: plan }) => (
              <PlanCard key={plan.id} plan={plan} stripe={this.state.stripe} />
            ))}
          </div>
        )}
      />
    )
  }
}

export default Plans
