
import { Link } from "react-router-dom";

export default function NotFound() {
    return (<>
        <main className="nf">
            <section className="nf__hero">
                <div className="nf__overlay" />

                <div className="nf__content container">
                    <p className="nf__code">404</p>
                    <h1 className="nf__title">這一頁走丟了</h1>
                    <p className="nf__desc">
                        我們把自然留在生活裡，但這個連結沒有留下來。
                    </p>

                    <div className="nf__actions">
                        <Link to="/" className="nf__btn nf__btn--primary">
                            回到 Home
                        </Link>
                        <Link to="/products" className="nf__btn nf__btn--ghost">
                            前往商品列表
                        </Link>
                    </div>

                    <div className="nf__hint">
                        或者回到上一頁，再試一次你剛剛的路徑。
                    </div>
                </div>
            </section>
        </main>

    </>)
};