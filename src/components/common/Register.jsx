import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { authenticateUser } from '../../redux/reducers/authSlice';
import { Link } from 'react-router-dom';

const registerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

function Register({role,loginLink}) {
    const dispatch = useDispatch();
    const auth = useSelector(state=>state?.auth)

    const handleSubmit = (values) => {
        dispatch(authenticateUser({endpoint:role=="admin" ? "/api/admin/register" : "/auth/register",data:values}));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6"> <span className='capitalize'>{role || "User"}</span> Register</h2>

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                           
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-600">username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className='my-3 text-center'>
                           {loginLink && <Link to={loginLink} className=' text-blue-600 underline'>Already have an account? Login</Link>} 
                            </div>

                            <button
                                type="submit"
                                disabled={auth?.loading}
                                className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {auth?.loading ? 'Registering ...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Register;
