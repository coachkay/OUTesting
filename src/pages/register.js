import React from 'react'
import 'whatwg-fetch'
import getSymbolFromCurrency from 'currency-symbol-map'
import { Formik, Field, Form } from 'formik';
import { database } from '../utils/firebase'
import styled, { css } from 'react-emotion'
import CONFIGURATION from '../configuration';
import { colors } from "../utils/presets";

const Button = styled.button`
  display: inline-block;
  border: 1px solid red;
  height: 20px;
  line-height: 20px;
  color: blue;
  border-radius: 5px;
  background-clip: padding-box;
  padding: 0.5em 1.5em;
  font-weight: bold;
  transition: all 0.2s ease-out;
  background: transparent;
  box-sizing: content-box;
  cursor: pointer;

  &-small {
    height: 10px;
    line-height: 10px;
  }

  &:hover {
    transition: 0.2s ease;
    background-color: orange;
    color: #ffffff !important;
  }

  &:focus {
    outline: none;
  }
`;


const required = value => (value ? undefined : 'Required');

const validate = values => {
  // same as above, but feel free to move this into a class method now.
  let errors = {};
  if (!values.firstname) {
    errors.firstname = 'Required'
  }

  if (!values.lastname) {
    errors.lastname = 'Required'
  }

  if (!values.gender) {
    errors.gender = 'Required'
  }

  if (!values.mobilenumber) {
    errors.mobilenumber = 'Required'
  } else if (isNaN(Number(values.mobilenumber))) {
    errors.mobilenumber = 'Must be a number'
  } else if (Number(values.mobilenumber.length) < 10) {
    errors.mobilenumber = 'At least 10 digits'
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

const Error = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? <span>{errors[name]}</span> : null
    }
  />
);


const MyForm = (props) => {
  return (
  <Form>
    <ul css={`
          max-width: 700px;
          margin: 16px;
          & li {
            margin: 16px;
          }
        `}>
      <li>
        <label htmlFor="firstname">First Name</label>
        <Field type="text" name="firstname" placeholder="First Name" />
        <Error name="firstname" />
      </li>

      <li>
        <label htmlFor="lastname"> Last Name < /label>
        <Field type="text" name="lastname" placeholder="Last Name" />
        <Error name="lastname" />
      </li>

      <li>
        <label htmlFor="email"> Email < /label>
        <Field type="email" name="email" placeholder="Email" validate={required}/>
        <Error name="email" />
      </li>

      <li>
        <label htmlFor="dateofbirth"> Date Of Birth < /label>
        <Field type="date" name="dateofbirth" placeholder="" validate={required}/>
        <Error name="dateofbirth" />
      </li>

      <li>
        <label htmlFor="gender"> Gender < /label>
        <Field component="select" name="gender" placeholder="">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Field>
        <Error name="gender" />
      </li>

      <li>
        <label htmlFor="mobilenumber"> Mobile Number < /label>
        <Field type="text" name="mobilenumber" placeholder="Mobile Number" />
        <Error name="mobilenumber" />
      </li>

      <li>
        <label htmlFor="address"> Address < /label>
        <Field type="textarea" name="address" placeholder="" validate={required}/>
        <Error name="address" />
      </li>

      <li>
        <label htmlFor="state"> State < /label>
        <Field type="text" name="state" placeholder="State" />
        <Error name="state" />
      </li>

      <li>
        <label htmlFor="nationality"> Nationality < /label>
        <Field type="text" name="nationality" placeholder="Nationality" />
        <Error name="nationality" />
      </li>

      <li>
        <label htmlFor="comrades"> Are you running the Comrades? < /label>
        <Field component="select" name="comrades" placeholder="">
          <option value="yes">YES</option>
          <option value="no">NO</option>
        </Field>
        <Error name="comrades" />
      </li>

      <li>
        <label htmlFor="why"> Why do you want to participate in the Ooty Ultra 2018 < /label>
        <Field type="textarea" name="why" placeholder="" validate={required}/>
        <Error name="why" />
      </li>



      <li>
        {`Amount `} {getSymbolFromCurrency(CONFIGURATION.currency)} 3000/-
      </li>

      <li>
        <button type="submit">Submit</button>
      </li>
    </ul>
  </Form>
)};

const ConditionalShow = styled('div')(props => ({
	display: props.display ? 'block' : 'none',
  margin: `32px`,
}))


class Checkout extends React.Component {

  constructor(props) {
    super(props)
    //this.totalamount = parseFloat(20 * (5/100 + 1)).toFixed(2);

    this.state = {
      amount: CONFIGURATION.defaultAmount,
      longUrl: null,
      isError: null
    };

    this.submitform = this.submitform.bind(this)
    this.reqPayment = this.reqPayment.bind(this)
    this.onError = this.onError.bind(this);
    this.openCheckout = this.openCheckout.bind(this)
  }

  componentDidMount() {
  }


  submitform(values, actions) {
    database.ref('fundings').push(values);
    this.reqPayment(values);
  }

  openCheckout() {
    //Instamojo.open(`https://www.instamojo.com/@jaikantck?amount=10&purpose=Ooty Ultra`)
    Instamojo.open(this.state.longUrl)
  }


  onError() {
    this.setState({ isError: true });
  }

  reqPayment(values) {
    var valuesstring = JSON.stringify(values, null, 2);
    fetch("https://sherpafeet.com/ootyultra",  {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: valuesstring,
    })
    .then(response => response.text())
    .then(text => {
      try {
          const data = JSON.parse(text);
          console.log("The data is :", data)
          if (data.success) {
            this.setState({ longUrl: data.payment_request.longurl });
          }
      } catch(err) {
         // It is text, do you text handling here
         console.log("Error in payment request. ", text);
      }
    });
  }


  render() {
    const {
      amount,
      isError,
      longUrl,
    } = this.state;

    if (isError) {
      return (
        <div>
          <p>Something went wrong! </p>
        </div>
      );
    }


    return (
      <div css={`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(31, 116, 28, 1);
          `}>

        <div style={{
                marginTop: `64px`
              }}
              className="dark"
        >
          <p><strong>Registration fee</strong></p>
            <table css={`
                    height: 23px;
                    width: 383px;
                    border: 0.5px solid;
                   `}
            >
              <tbody>
                <tr css="border: 0.5px solid;">
                  <td css="width: 61px; text-align: center;border: 0.5px solid; padding: 8px;"><strong>Category</strong></td>
                  <td css="width: 111.802px; text-align: center; border: 0.5px solid; padding: 8px;"><strong>Amount (₹)</strong></td>
                  <td css="width: 196.198px; text-align: center; border: 0.5px solid; padding: 8px;"><strong>Add-on</strong></td>
                </tr>
                <tr css="border: 0.5px solid; border: 0.5px solid;">
                  <td css="width: 61px; text-align: center; border: 0.5px solid;">60k</td>
                  <td css="width: 111.802px; text-align: center; border: 0.5px solid;">1950</td>
                  <td css="width: 196.198px; text-align: center; border: 0.5px solid;" rowspan="3">₹ 190 for the optional pre-marathon dinner</td>
                </tr>
                <tr css="border: 0.5px solid;">
                  <td css="width: 61px; text-align: center; border: 0.5px solid;">30k</td>
                  <td css="width: 111.802px; text-align: center;">1650</td>
                </tr>
                <tr css="border: 0.5px solid;">
                  <td css="width: 61px; text-align: center; border: 0.5px solid;">15k</td>
                  <td css="width: 111.802px; text-align: center;">950</td>
              </tr>
              </tbody>
            </table>
          <p><strong>* Registration amount includes all applicable fees.&nbsp; </strong><strong>Dinner will have 5% GST added.</strong></p>
          <p css="font-size: 25px;"><strong>Hurry up! avail early bird offer!</strong></p>
          <ul>
          <li><strong>Flat discount of Rs. 150/- on 60k and 30k</strong> on 14th &amp; 15th of Mar 2018</li>
          <li><strong>Flat discount of Rs. 100/- on 60k and 30k</strong> on 16th Mar 2018</li>
          </ul>
          <p>&nbsp;</p>
          <h1> Registration fee: 60k &#8377; 1950/-  </h1>
          <h1> OOTY ULTRA REGISTRATION </h1>
        </div>
        <iframe src="https://www.townscript.com/widget/ooty-ultra-2018-60k-30k-15k-302134" frameborder="0" height="900" width="80%"></iframe>
      </div>
    );
  }
}

export default Checkout;
