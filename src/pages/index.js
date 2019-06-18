import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

import Plans from '../components/Products/Plans'
import Donations from '../components/Products/Donations'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby e-commerce site.</p>
    <p>
      Follow{' '}
      <a href="https://www.gatsbyjs.org/docs/ecommerce-tutorial/">
        this tutorial
      </a>{' '}
      to build your own.
    </p>
    <h2>Recurring Donations</h2>
    <Plans />
    <h2>Once-off Donations</h2>
    <Donations />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
