import { Component, OnInit, Input } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';
import { ShoppingCart } from '../cart-item';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements InjectableComponent, OnInit {
  @Input() data: any;
  index: number;
  form: FormGroup;
  shoppingCart: ShoppingCart;

  constructor(private fb: FormBuilder, private pubSub: PubSubService) { }

  ngOnInit() {
    this.index = this.data.index;
    this.initForm();
    this.pubSub.getViewCart()
    .subscribe(cart => {
      this.shoppingCart = cart;
    });
  }

  initForm() {
    this.form = this.fb.group({
      nameOnCard: ['John Smith', Validators.required],
      cardNumber: ['4111111111111111', Validators.required],
      securityCode: ['', Validators.required],
      expMonth: ['Feb'],
      expYear: ['2024']
    });
  }

  onBlur(e: any) {
    this.pubSub.publishPaymentForm(this.form.valid);

    this.shoppingCart.paymentFormIsValid = this.form.valid;
    this.pubSub.publishViewCart(this.shoppingCart);
  }

}
