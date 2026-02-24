import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { emailValidation } from "@/utils/emailValidation";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: "youen1126@gmail.com",
            password: "",
        }
    })
    const [authData, setAuthData] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE}/admin/signin`, data);
            const { token, expired } = response.data;
            setAuthData({ token, expired });
        } catch (err) {
            alert(`登入失敗：${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false); // 關 spinner
        }
    };

    useEffect(() => {
        const existingToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

        if (existingToken) {
            axios.defaults.headers.common.Authorization = existingToken;
            setLoading(true);

            setTimeout(() => {
                navigate("/back");
            }, 300);
            return;
        }

        if (authData) {
            const { token, expired } = authData;

            document.cookie = `myToken=${token};expires=${new Date(expired).toUTCString()}; path=/`;
            axios.defaults.headers.common.Authorization = token;

            alert("登入成功！");
            setLoading(true);

            setTimeout(() => {
                navigate("/back");
            }, 300);
        }
    }, [authData, navigate]);


    return (<>
        {loading && (
            <div className="login-loading p-2">
                <Oval
                    height={50}
                    width={50}
                    color="#fa7007ff"
                    secondaryColor="#ccc"
                    strokeWidth={4}
                />
            </div>
        )}
        <div className="container login">
            <h2>🌿 請先登入 🌿</h2>
            <br />
            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        id="username"
                        className="form-control"
                        placeholder="name@example.com"
                        {...register("username", emailValidation)
                        }
                    />
                    <label htmlFor="username">Email address</label>
                    {errors.username && (
                        <p className="text-danger">{errors.username.message}</p>)
                    }
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        {...register("password", {
                            required: "請輸入密碼",
                            minLength: {
                                value: 6,
                                message: "密碼長度至少需 6 碼",
                            },
                        })
                        }
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && (
                        <p className="text-danger">{errors.password.message}</p>)
                    }
                </div>
                <button
                    type="submit"
                    className="btn btn-un w-100 mt-3"
                    disabled={!isValid}
                >登入</button>
            </form>

        </div>
    </>)
}