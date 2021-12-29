import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import HeaderHome from './HeaderHome';
import Banner from './Banner';
import Container from './Container';

class Homepage extends Component {


    render() {


        return (
            <>
                <div className="home__page__container" >
                    <HeaderHome
                    />
                    <Banner />
                    <Container

                    />
                    <div style={{ height: "300px" }}></div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
