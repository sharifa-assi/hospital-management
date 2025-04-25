import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Form from '../components/form/Form';
import './register.css';

function Register() {
const navigate = useNavigate();

const [error, setError] = useState('');

const [values, setValues] = useState({
name: '',
email: '',
password: '',
confirmPassword: '',
role: 'patient',
date_of_birth: '',
});

const inputs = [
{
id: 1,
name: 'name',
type: 'text',
placeholder: 'Name',
errorMessage: "Name should be 3-16 characters and shouldn't include special characters!",
label: 'Name',
pattern: '^[A-Za-z0-9]{3,16}$',
required: true,
},
{
id: 2,
name: 'email',
type: 'email',
placeholder: 'Email',
errorMessage: 'It should be a valid email address!',
label: 'Email',
required: true,
},
{
id: 3,
name: 'password',
type: 'password',
placeholder: 'Password',
errorMessage:
'Password should be at least 7 characters and include at least 1 capital letter, 1 number and 1 special character!',
label: 'Password',
pattern: `^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{7,}$`,
required: true,
},
{
id: 4,
name: 'confirmPassword',
type: 'password',
placeholder: 'Confirm Password',
errorMessage: "Passwords don't match!",
label: 'Confirm Password',
pattern: values.password,
required: true,
},
{
id: 5,
name: 'date_of_birth',
type: 'date',
placeholder: 'Date of Birth',
label: 'Date of Birth',
required: true,
}
];

const handleSubmit = async (e) => {
e.preventDefault();
if (values.password !== values.confirmPassword) {
setError("Passwords don't match!");
return;
}

try {
const response = await axios.post('/register', {
name: values.name,
email: values.email,
password: values.password,
password_confirmation: values.confirmPassword,
role: 'patient',
date_of_birth: values.date_of_birth,
});

localStorage.setItem('token', response.data.token);

const { id, name, email, role } = response.data.user;
localStorage.setItem('user', JSON.stringify({ id, name, email, role }));

setError('');
window.location.reload();
} catch (err) {
const msg = err.response?.data?.message || 'Registration failed';
setError(msg);
}
};


const onChange = (e) => {
setValues({ ...values, [e.target.name]: e.target.value });
};

return (
<div className="register-page">
    <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
        <Form key={input.id} {...input} value={values[input.name]} onChange={onChange} />
        ))}
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
    </form>
</div>
);
}

export default Register;
