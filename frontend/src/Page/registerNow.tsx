import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterPage = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    
    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>
                <form className="space-y-4" onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("firstName", { required: "This field is required" })}
                        />
                        {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("lastName", { required: "This field is required" })}
                        />
                        {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("email", { required: "This field is required" })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("password", {
                                required: "This field is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:border-blue-300"
                            {...register("confirmPassword", {
                                validate: (val) => val === watch("password") || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-3 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Create Account
                    </button>
                </form>
                <div className="mt-4 text-center text-gray-600">
                    Already registered?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Sign in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
