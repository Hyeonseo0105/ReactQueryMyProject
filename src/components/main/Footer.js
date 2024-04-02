import { Fragment } from "react";
import { Link } from "react-router-dom";
function Footer(){
    return(
        <Fragment>
            <footer className="footer py-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 text-lg-start">Copyright &copy; 임현서</div>
                        <div className="col-lg-4 my-3 my-lg-0">
                        </div>
                        <div class="col-lg-4 text-lg-end">
                            <Link class="link-dark text-decoration-none" to="#!">ReactQueryProject</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    )
}
export default Footer