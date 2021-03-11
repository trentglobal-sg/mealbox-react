import React from "react"

export default class Footer extends React.Component {
    state = {

    }


    render() {
        return (
            <React.Fragment>
                <footer className="container-fluid footer-wrapper mt-2">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-10 mx-auto my-auto footer-des">
                            <div> <strong>FOOTER</strong>
                            </div>
                        </div>
                        <div className="space"></div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }


}