import React from 'react';


import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import {SignUpContainer, SignUpTitle, SubDescriptionContainer, TermsLink} from './sign-up.styles';

// import {signUpStart} from '../../redux/user/user.actions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            await createUserProfileDocument(user, {displayName});

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    };


    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle>Регистрация</SignUpTitle>
                <span>Присойденитесь используя почту и пароль</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        handleChange={this.handleChange}
                        label='Ваше имя'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        handleChange={this.handleChange}
                        label='Эл. почта'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        handleChange={this.handleChange}
                        label='Придумайте пароль'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label='Подтвердите пароль'
                        required
                    />
                    <SubDescriptionContainer>Регистрируясь, вы соглашаетесь с
                        <TermsLink to='/terms'> пользовательским соглашением</TermsLink>
                    </SubDescriptionContainer>
                    <CustomButton type='submit'>зарегистрироваться</CustomButton>
                </form>
            </SignUpContainer>
        );
    }
}

export default SignUp;
