import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InjectableComponent } from '../../../../../../../dynamic/interfaces/injectable-component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PubSubService } from '../../../../../../../core/services/pub-sub/pub-sub.service';
import { ShoppingCart } from '../cart-item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements InjectableComponent, OnInit {
  @Input()
  data: any;
  index: number;
  form: FormGroup;
  isValid: boolean;
  shoppingCart: ShoppingCart;

  constructor(private fb: FormBuilder, private pubSub: PubSubService) {}

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['1234 Main St.'],
      city: ['Any Town'],
      state: ['CA'],
      zip: ['90029']
    });
  }

  onBlur(e: any) {
    this.pubSub.publishCustomerForm(this.form.valid);

    this.shoppingCart.customerFormIsValid = this.form.valid;
    this.pubSub.publishViewCart(this.shoppingCart);
  }

}
