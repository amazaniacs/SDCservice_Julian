import React from 'react';
import axios from 'axios';
import Carousel from './Carousel/Carousel.jsx';
import app from './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relationship: 'Related items',
      products: [],
      pageNumber: 1,
      pages: null,
      productsPerPage: null,
    };
    this.updateWidth = this.updateWidth.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    this.fetchProducts();
  }

  updateWidth() {
    const width = Math.max(window.innerWidth, 1000);
    const productsPerPage = Math.floor((width - 120) / 190);
    this.setState(({ pageNumber, products }) => {
      const pages = Math.ceil(products.length / productsPerPage);
      if (pageNumber > pages) {
        return {
          productsPerPage,
          pages,
          pageNumber: pages,
        };
      }
      return {
        productsPerPage,
        pages,
      };
    });
  }

  fetchProducts() {
    const id = 1;
    axios.get(`/products/${id}`)
      .then(({ data }) => {
        this.setState({ products: data });
        this.updateWidth();
        window.addEventListener('resize', this.updateWidth.bind(this));
      })
      .catch(() => {
        this.setState({ products: [] });
      });
  }

  handleScroll(direction) {
    this.setState(({ pages, pageNumber }) => {
      if (direction === 'right') {
        if (pageNumber === pages) {
          return { pageNumber: 1 };
        }
        return { pageNumber: pageNumber + 1 };
      }
      if (pageNumber === 1) {
        return { pageNumber: pages };
      }
      return { pageNumber: pageNumber - 1 };
    });
  }

  render() {
    const { products, relationship, pageNumber, pages, productsPerPage } = this.state;
    const firstIndex = productsPerPage * (pageNumber - 1);
    const lastIndex = productsPerPage * pageNumber;
    return (
      <section className={app.section}>
        <header className={app.header}>
          <h4 className={app.title}>
            {relationship}
          </h4>
          <h4 className={app.pages}>
            {`Page ${pageNumber} of ${pages}`}
          </h4>
        </header>
        <Carousel products={products ? products.slice(firstIndex, lastIndex) : []} scroll={this.handleScroll} />
      </section>
    );
  }
}

export default App;
