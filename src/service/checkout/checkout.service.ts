import { Injectable } from '@nestjs/common';
import { ShoppingCard } from 'src/models/shoppingcard.model';
import * as admin from 'firebase-admin';
import { ProductService } from '../product/product.service';

@Injectable()
export class CheckoutService {
  db: admin.firestore.Firestore;

  constructor(private product: ProductService) {
    this.db = admin.firestore();
  }

  async addCheckOut(shoppingCard: ShoppingCard) {
    if (shoppingCard.customerID === undefined) {
      shoppingCard.customerID = Date.now().toString();
    }
    if (shoppingCard.customer === undefined) {
      shoppingCard.customer = 'Anonymous';
    }

    await this.db
      .collection('checkout')
      .doc(shoppingCard.customerID)
      .set(shoppingCard);
  }

  async getCheckOut(customerID: string) {
    const checkOut = await this.db.collection('checkout').doc(customerID).get();
    return checkOut.data();
  }

  async getCheckOuts() {
    const checkOuts = await this.db.collection('checkout').get();
    return checkOuts.docs.map((doc) => doc.data());
  }

  async deleteCheckOut(customerID: string) {
    return await this.db.collection('checkout').doc(customerID).delete();
  }

  async updateCheckOut(shoppingCard: ShoppingCard) {
    return await this.db
      .collection('checkout')
      .doc(shoppingCard.customerID)
      .set(shoppingCard);
  }
}
