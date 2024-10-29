import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        console.log(response)
        const authToken = response.data.token.token;
        const refreshToken = response.data.token.refreshToken;
        const user = response.data.user;

        setAuth({ user, authToken, refreshToken });

        navigate("/");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      console.log(err);
      setError("root.random", {
        type: "random",
        message: `Error: ${err.response?.data?.message}`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            !!errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>

      {!!errors.root?.random && (
        <div role="alert" className="text-red-600">
          {errors.root.random.message}
        </div>
      )}

      <Field>
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
