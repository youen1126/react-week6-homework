import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";
import { Oval } from "react-loader-spinner";
import useMessage from "@/hooks/useMessage";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const INITIAL_TEMPLATE_DATA = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [seeProduct, setSeeProduct] = useState(null);
  const [pagination, setPagination] = useState({});

  const [templeteProduct, setTempleteProduct] = useState(INITIAL_TEMPLATE_DATA);

  const [modalType, setModalType] = useState();

  const productModalRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useMessage();

  //取得遠端products data
  const getProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products?page=${page}`,
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
      showSuccess("產品data取得成功");
    } catch (error) {
      console.error("catch失敗", error);
      showError("產品data取得失敗");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const openModal = (type, product) => {
    setModalType(type);
    setTempleteProduct((pre) => ({
      ...pre,
      ...product,
    }));
    productModalRef.current.show();
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  return (
    <>
      {loading && (
        <div className="login-loading">
          <Oval
            height={50}
            width={50}
            color="#ff7a15ff"
            secondaryColor="#ccc"
            strokeWidth={4}
          />
        </div>
      )}

      <div className="container p-0 my-3">
        <div className="row mt-5 ">
          <div className="col-md-6 ">
            <h2 className="text-black">🌿 管理產品列表 🌿</h2>
            <div className="text-end md-1">
              <button
                type="button"
                className="btn btn-un"
                onClick={() => {
                  openModal("creat", INITIAL_TEMPLATE_DATA);
                }}
              >
                建立新的產品
              </button>
            </div>
            <br />
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>分類</th>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>查看細節</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.category}</td>
                      <td scope="row">{item.title}</td>
                      <td>{item.origin_price}</td>
                      <td>{item.price}</td>
                      <td>
                        {item.is_enabled ? (
                          <span className="text-success">啟用</span>
                        ) : (
                          <span>未啟用</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-un-produck btn-sm"
                          onClick={() => setSeeProduct(item)}
                        >
                          查看
                        </button>
                      </td>
                      <td>
                        <div
                          className="btn-group btn-group-sm"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button
                            type="button"
                            className="btn btn-outline-info"
                            onClick={() => openModal("edit", item)}
                          >
                            編輯
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => openModal("delete", item)}
                          >
                            刪除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* 頁碼 */}
            <div className="m-3">
              <Pagination pagination={pagination} onChangePage={getProducts} />
            </div>
          </div>
          <div className="col-md-6">
            <h2 className="text-black">🌿 單一產品細節 🌿</h2>
            {seeProduct ? (
              <div className="card m-3">
                <img
                  src={seeProduct.imageUrl}
                  className="card-img-top"
                  alt="主圖"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {seeProduct.title}
                    <span className="badge btn-un-produck ms-2">
                      {seeProduct.category}
                    </span>
                  </h5>
                  <p className="card-text">
                    商品描述：{seeProduct.description}
                  </p>
                  <p className="card-text">商品內容：{seeProduct.content}</p>
                  <div className="d-flex">
                    <p className="card-text text-secondary">
                      <del>{seeProduct.origin_price}</del>
                    </p>
                    元 / {seeProduct.price} 元
                  </div>
                  <h5 className="mt-3">更多圖片：</h5>
                  <div className="p-2">
                    {seeProduct.imagesUrl?.map((i, idx) => (
                      <div className="p-2" key={i + idx}>
                        <img
                          src={i}
                          style={{ height: "100px", borderRadius: 8 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-write">請選擇一個商品查看</p>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <ProductModal
        modalType={modalType}
        templeteProduct={templeteProduct}
        closeModal={closeModal}
        getProducts={getProducts}
      />
    </>
  );
}

export default AdminProducts;
