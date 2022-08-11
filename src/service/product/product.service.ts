import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  db: admin.firestore.Firestore;

  constructor() {
    this.db = admin.firestore();
  }

  async addProduct(product: Product) {
    if (product.id === undefined) {
      product.id = Date.now().toString();
    }

    if (product.productAddedDate === undefined) {
      product.productAddedDate = new Date(Date.now()).toUTCString();
    }
    return await this.db.collection('products').doc(product.id).set(product);
  }

  async getProductById(id: string) {
    const product = await this.db.collection('products').doc(id).get();
    return product.data();
  }

  async getProducts() {
    const products = await this.db.collection('products').get();
    return products.docs.map((doc) => doc.data());
  }

  async updateProduct(product: Product) {
    return await this.db.collection('products').doc(product.id).set(product);
  }

  async deleteProduct(id: string) {
    return await this.db.collection('products').doc(id).delete();
  }

  async searchProducts(q: string) {
    const products = await this.db.collection('products').get();
    const productList = products.docs.map((doc) => doc.data());
    const filterProducts: FirebaseFirestore.DocumentData[] = [];
    for (const product of productList) {
      if (
        product['name'] !== undefined &&
        product['description'] !== undefined
      ) {
        if (
          product['name'].toLowerCase().includes(q.toLowerCase()) ||
          product['description'].toLowerCase().includes(q.toLowerCase())
        ) {
          filterProducts.push(product);
        }
      } else {
        if (product['name'] !== undefined) {
          if (product['name'].toLowerCase().includes(q.toLowerCase())) {
            filterProducts.push(product);
          }
        } else if (product['description'] !== undefined) {
          if (product['description'].toLowerCase().includes(q.toLowerCase())) {
            filterProducts.push(product);
          }
        }
      }
    }
    return filterProducts;
  }

  async searchProductsById(id: string) {
    const products = await this.db
      .collection('products')
      .where('id', '==', id)
      .get();
    return products.docs.map((doc) => doc.data());
  }
}
