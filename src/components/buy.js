import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements } from '@stripe/react-stripe-js';
import React, { Component, useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useStripe, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Stripe from 'stripe';
import { supabase } from '../supabase/client';
import $ from 'jquery';

const cookie = new Cookies();
const idStripe = cookie.get('idpay');
const stripeTestPromise = loadStripe(idStripe);

function PaymentForm(props) {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe()
    const Elements = useElements()

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#33FE00",
                color: "#FFF",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans serif",
                fontSize: "16px",
                fontSmooting: "antialiased",
                ":-webkit-autofill": {color: "#FFF"},
            },
            invalid:{
                iconColor: "#FFC020",
                color: "#33E33"
            }
        } 
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: Elements.getElement(CardElement),
          });
      
          if (!error) {
            // console.log(paymentMethod)
            const { id } = paymentMethod;
            try {
              const { data } = await axios.post(
                "https://vercel-green-eta.vercel.app/api/checkout",
                {
                  id,
                  amount: props.props.price*100,
                  name: props.props.title,
                  description: props.props.description,
                  api_secret: cookie.get('api_secret'),
                }
              );
              console.log(data);
      
              Elements.getElement(CardElement).clear();
            } catch (error) {
              console.log(error);
            }
        }
    }
    return(
        <>
        {!success ? 
        <form onSubmit={handleSubmit}>
            <fieldset className='FormGroup'>
                <div className="formRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>:
        <h2>Error</h2>
        }
        </>
    )
}
class Buy extends Component {
    componentDidMount(){
        this.style();
    }
    render() {
        return (
            <Elements stripe={stripeTestPromise}>
                <PaymentForm props={this.props} />
            </Elements>
        );
    }
    style = () => {
        $(".pay").dblclick(function(){
            $(".pay").remove();
        })
    }
}

export default Buy;