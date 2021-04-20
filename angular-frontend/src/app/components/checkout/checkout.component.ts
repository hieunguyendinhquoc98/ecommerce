import { Purchase } from './../../common/purchase';
import { OrderItem } from './../../common/order-item';
import { Order } from './../../common/order';
import { Router } from '@angular/router';
import { CheckoutService } from './../../services/checkout.service';
import { Country } from './../../common/country';
import { EcommerceFormService } from './../../services/ecommerce-form.service';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from 'src/app/common/state';
import { EcommerceValidators } from 'src/app/validators/ecommerce-validators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    checkoutFormGroup: FormGroup;

    totalPrice: number = 0;
    totalQuantity: number = 0;

    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];

    countries: Country[] = [];
    shippingAddressStates: State[] = [];
    billingAddressStates: State[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ecommerceFormService: EcommerceFormService,
        private checkoutService: CheckoutService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                lastName:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                email:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
                        ])
            }),
            shippingAddress: this.formBuilder.group({
                street:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                city:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
            }),
            billingAddress: this.formBuilder.group({
                street:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                city:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
                state: new FormControl('', [Validators.required]),
                country: new FormControl('', [Validators.required]),
                zipCode:
                    new FormControl('',
                        [
                            Validators.required,
                            Validators.minLength(2),
                            EcommerceValidators.notOnlyWhiteSpace
                        ]),
            }),
            creditCard: this.formBuilder.group({
                cardType: new FormControl('', [Validators.required]),
                nameOnCard: new FormControl('',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        EcommerceValidators.notOnlyWhiteSpace
                    ]),
                cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
                securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
                expirationMonth: [''],
                expirationYear: ['']
            })
        })

        //subcribe to observable
        this.cartService.totalPrice.subscribe(
            data => this.totalPrice = data
        )
        this.cartService.totalQuantity.subscribe(
            data => this.totalQuantity = data
        )

        //then observable will distribute the value
        this.cartService.computeCartTotals();

        //For Dropdown List
        const startMonth: number = new Date().getMonth() + 1;
        this.ecommerceFormService
            .getCreditCardMonths(startMonth)
            .subscribe(data => this.creditCardMonths = data)

        this.ecommerceFormService
            .getCreditCardYears()
            .subscribe(data => this.creditCardYears = data)

        //
        this.ecommerceFormService.getCountries().subscribe(
            data => this.countries = data
        );

    }

    get firstName() { return this.checkoutFormGroup.get('customer.firstName') };
    get lastName() { return this.checkoutFormGroup.get('customer.lastName') };
    get email() { return this.checkoutFormGroup.get('customer.email') };

    get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street') };
    get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city') };
    get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state') };
    get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode') };
    get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country') };

    get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street') };
    get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city') };
    get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state') };
    get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode') };
    get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country') };


    get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType') };
    get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard') };
    get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber') };
    get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode') };


    getStates(formGroupName: string) {
        const formGroup = this.checkoutFormGroup.get(formGroupName);
        const countryCode = formGroup.value.country.code;

        this.ecommerceFormService.getStates(countryCode).subscribe(
            data => {
                if (formGroupName === 'shippingAddress') {
                    this.shippingAddressStates = data;
                } else {
                    this.billingAddressStates = data;
                }
                formGroup.get('state').setValue(data[0]);
            }
        )
    }

    handleMonthsAndYears() {
        const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

        const currentYear: number = new Date().getFullYear();
        const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

        let startMonth: number;

        if (currentYear === selectedYear) {
            startMonth = new Date().getMonth() + 1;
        } else {
            startMonth = 1;
        }
        this.ecommerceFormService.getCreditCardMonths(startMonth).subscribe(
            data => this.creditCardMonths = data
        )
    }

    onSubmit() {

        // if (this.checkoutFormGroup.invalid) {
        //   this.checkoutFormGroup.markAllAsTouched();
        // }

        // console.log(this.checkoutFormGroup.get('customer').value);
        // console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);

        // console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
        // console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);

        if (this.checkoutFormGroup.invalid) {
            this.checkoutFormGroup.markAllAsTouched();
            return;
        }

        //set up order
        let order = new Order();
        order.totalPrice = this.totalPrice;
        order.totalQuantity = this.totalQuantity;
        //get cart items
        const cartItems = this.cartService.cartItems;

        //create orderItems  form cartItems
            // let OrderItems: OrderItem[] = [];
            // for(let i=0; i < cartItems.length; i++){
            //     OrderItems[i] = new OrderItem(cartItems[i]);
            // }
        let orderItems: OrderItem[] = cartItems.map(cartItem => new OrderItem(cartItem));
        //set up purchase
        let purchase = new Purchase();

        purchase.customer = this.checkoutFormGroup.controls['customer'].value;
        //
        purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
        const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
        const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
        purchase.shippingAddress.state = shippingState.name;
        purchase.shippingAddress.country = shippingCountry.name;

        purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
        const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
        const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
        purchase.billingAddress.state = billingState.name;
        purchase.billingAddress.country = billingCountry.name;

        purchase.order = order;
        purchase.orderItems = orderItems;

        //call API
        this.checkoutService.placeOrder(purchase).subscribe(
            {
            next: response => {
                alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`)
                this.resetCart();
            },
            error: err => {
                alert(`Error!: ${err.message}`)
            }
        });
        console.log(purchase);
    }
    resetCart() {
        this.cartService.cartItems = [];
        this.cartService.totalPrice.next(0);
        this.cartService.totalQuantity.next(0);

        this.checkoutFormGroup.reset;

        this.router.navigateByUrl("/products");
    }

    copyShippingToBilling(event) {
        if (event.target.checked) {
            this.checkoutFormGroup.controls.billingAddress
                .setValue(this.checkoutFormGroup.controls.shippingAddress.value);

            //bug fix for states, in case we dont have billingaddress before clicking it!
            this.billingAddressStates = this.shippingAddressStates;
        } else {
            this.checkoutFormGroup.controls.billingAddress.reset();
            this.billingAddressStates = [];
        }
    }

}
