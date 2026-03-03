export default function AdminOrders() {
  return (
    <>
      <div className="container p-0 my-3">
        <div className="row mt-5 ">
          <div className="col">
            <h2 className="text-black"> 管理訂單頁面 </h2>
            <br />
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>付款狀況</th>
                    <th>訂單編號</th>
                    <th>客戶名</th>
                    <th>客戶地址</th>
                    <th>客戶信箱</th>
                    <th>客戶電話</th>
                    <th>備註留言</th>
                    <th>編輯</th>
                  </tr>
                </thead>
                <tr>
                  <td>已付款</td>
                  <td scope="row">1523539519</td>
                  <td>testName</td>
                  <td>春日部春日市春日路123號</td>
                  <td>test@gmail.com</td>
                  <td>0912346768</td>
                  <td>我要A款</td>
                  <td>
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Small button group"
                    >
                      <button type="button" className="btn btn-outline-info">
                        編輯
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
