import {Component} from 'react'
import Cookies from 'js-cookie'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
  }

  componentDidMount() {
    this.productsApiCall()
  }

  productsApiCall = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/products'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiurl, options)
    if (response.ok === true) {
      const data = await response.json()

      const fetchedData = data.products.map(item => ({
        title: item.title,
        brand: item.brand,
        id: item.id,
        price: item.price,
        imageUrl: item.image_url,
        rating: item.rating,
      }))
      this.setState({productsList: fetchedData})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state

    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return <>{this.renderProductsList()}</>
  }
}

export default AllProductsSection
