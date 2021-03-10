import React from "react"

export default class Footer extends React.Component {
    state = {

    }


    render() {
        return (
            <React.Fragment>
                <footer class="container-fluid footer-wrapper mt-2">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 col-10 mx-auto my-auto footer-des">
                            <div> <strong>FOOTER</strong>
                            </div>
                        </div>
                        <div class="space"></div>
                    </div>
                </footer>
            </React.Fragment>
        )
    }


}