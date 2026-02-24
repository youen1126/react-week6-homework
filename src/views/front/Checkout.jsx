
import axios from "axios";
import { useEffect, useState } from "react";
import { curryency } from "../../utils/filter";
import { useForm } from "react-hook-form";
import { emailValidation } from "@/utils/emailValidation";


const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Checkout() {

    const [cart, setCart] = useState([]); //購物車資料
    const [total, setTotal] = useState(); //訂單總金額

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange"
    });


    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
                setCart(res.data.data.carts)
                setTotal(res.data.data.final_total)
            } catch (error) {
                console.error(error.respones);
            }
        }
        getCart();
    }, [])

    //更改數量
    const updataCart = async (cartId, productId, qty = 1) => {
        try {
            const data = {
                product_id: productId,
                qty,
            }

            const res = await axios.put(`${API_BASE}/api/${API_PATH}/cart/${cartId}`, { data });
            console.warn(res.data)
            //alert(res.data.message);
            const res2 = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(res2.data.data.carts)
            setTotal(res2.data.data.final_total)
        } catch (error) {
            console.error(error.respones);
        }

    }

    //刪除單一產品
    const deleteItem = async (cartId) => {
        try {
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${cartId}`);
            alert(res.data.message);
            const getCartRes = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(getCartRes.data.data.carts)
            setTotal(getCartRes.data.data.final_total)
        } catch (error) {
            console.error(error.respones);
        }

    }
    //刪除All產品
    const deleteAll = async () => {
        try {
            const res = await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
            alert(res.data.message);
            const getCartRes = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(getCartRes.data.data.carts)
            setTotal(getCartRes.data.data.final_total)
        } catch (error) {
            console.error(error.respones);
        }

    }

    const onSubmit = async (formData) => {
        try {
            const data = {
                user: formData,
                message: formData.message,
            };
            const url = `${API_BASE}/api/${API_PATH}/order`;
            const submitRes = await axios.post(url, {
                data
            });
            console.warn(submitRes.data);
            reset();
            const getCartRes = await axios.get(`${API_BASE}/api/${API_PATH}/cart`)
            setCart(getCartRes.data.data.carts)
            setTotal(getCartRes.data.data.final_total)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="un-container">
            <h2 className="text-center p-5">購物車列表</h2>
            <div className="text-end mt-2">
                <button type="button" className="btn btn-outline-danger"
                    onClick={deleteAll}
                >
                    清空購物車
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">縮圖</th>
                        <th scope="col">品名</th>
                        <th scope="col">數量/單位</th>
                        <th scope="col">小計</th>
                    </tr>
                </thead>
                <tbody>

                    {cart.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <button type="button" className="btn btn-outline-danger btn-sm"
                                        onClick={() => deleteItem(item.id)}>刪除</button>
                                </td>
                                <td><img src={item.product.imageUrl} style={{ height: '60px' }} alt={item.product.title} /></td>
                                <td>{item.product.title}</td>
                                <td>
                                    <div className="input-group input-group-sm mb-1">
                                        <input type="number"
                                            className="form-control"
                                            aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                                            defaultValue={item.qty}
                                            onChange={(e) =>
                                                updataCart(
                                                    item.id,
                                                    item.product_id,
                                                    Number(e.target.value),
                                                )
                                            }
                                        />
                                        <span className="input-group-text"
                                            id="inputGroup-sizing-sm">
                                            {item.product.unit}</span>
                                    </div>
                                </td>
                                <td>{curryency(item.total)}</td>
                                <th scope="row"></th>

                                <td className="text-end"></td>
                            </tr>)
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <td className="text-end" colSpan="3">
                            總計
                        </td>
                        <td className="text-end">
                            {curryency(total)}
                        </td>
                        <td className="text-end"></td>
                    </tr>
                </tfoot>
            </table>
            {/* 資料填寫 */}
            <div className="my-5 row justify-content-center p-2">
                <h2 className="text-center p-5">填寫收件資料</h2>
                <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="請輸入 Email"
                            defaultValue="test01@gmail.com"
                            {...register("email", emailValidation)}
                        />
                        {
                            errors.email && (
                                <p className="text-danger">{errors.email.message}</p>
                            )
                        }
                    </div>

                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">收件人姓名</label>
                        <input
                            id="name"
                            name="姓名"
                            type="text"
                            className="form-control"
                            placeholder="請輸入姓名"
                            defaultValue="王小明"
                            {...register("name", {
                                required: "請輸入姓名",
                                minLength: {
                                    value: 2,
                                    message: "姓名最少兩個字"
                                },
                            })}
                        />
                        {
                            errors.name && (
                                <p className="text-danger">{errors.name.message}</p>
                            )
                        }
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">收件人電話</label>
                        <input
                            id="tel"
                            name="電話"
                            type="tel"
                            className="form-control"
                            placeholder="請輸入電話"
                            defaultValue="0987887788"
                            {...register("tel", {
                                required: "請輸入收件人電話",
                                minLength: {
                                    value: 8,
                                    message: "電話至少8碼，格式範例：0988788777"
                                },
                                pattern: {
                                    value: /^\d+$/,
                                    message: "電話僅能輸入數字，格式範例：0988788777",
                                },
                            })}
                        />
                        {
                            errors.tel && (
                                <p className="text-danger">{errors.tel.message}</p>
                            )
                        }
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">收件人地址</label>
                        <input
                            id="address"
                            name="地址"
                            type="text"
                            className="form-control"
                            placeholder="請輸入地址"
                            defaultValue="春日市春日部春日路78號"
                            {...register("address", {
                                required: "請輸入收件人地址，僅台灣地區可填，目前無海外服務",
                            })}
                        />
                    </div>
                    {
                        errors.address && (
                            <p className="text-danger">{errors.address.message}</p>
                        )
                    }

                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">留言(可空白)</label>
                        <textarea
                            id="message"
                            className="form-control"
                            cols="30"
                            rows="10"
                            {...register("message")}
                        ></textarea>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-danger" disabled={!isValid}>送出訂單</button>
                    </div>
                </form>
            </div>
        </div>)
};