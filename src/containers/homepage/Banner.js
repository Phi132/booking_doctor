import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Banner.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions'
import { languages } from '../../utils/constant'

class HeaderHome extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    render() {
        var language = this.props.language
        return (
            <React.Fragment>

                <div className="banner-area">
                    <div className="banner--overlay">
                        <div className="banner-container">
                            <ul className="banner-content">
                                <li className="banner-item-1">
                                    <div className="title-1-item-1">
                                        <span>
                                            <FormattedMessage
                                                id="header.title1"
                                            />
                                        </span>

                                    </div>
                                    <div className="title-2-item-2">
                                        <span>
                                            <FormattedMessage
                                                id="header.title2"
                                            />
                                        </span>

                                    </div>
                                </li>
                                <li className="banner-item-2">
                                    <div className="search-btn">
                                        <div className="search-icon">
                                            <i className="fas fa-search"></i>

                                        </div>
                                        <div className="input-search">
                                            <input
                                                type="text" placeholder="Tìm bác sĩ"
                                            />
                                        </div>
                                    </div>

                                </li>
                                <li className="banner-item-3">
                                    <div className="banner-download">
                                        <div className="android">

                                        </div>
                                        <div className="ios">

                                        </div>
                                    </div>
                                </li>
                                <li className="banner-item-4">
                                    <ul className="list-banner-item-4">
                                        <li className="list--item1">
                                            <div className="banner4-icon1">

                                            </div>
                                            <div className="banner4-title1">
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title411"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title412"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list--item2">
                                            <div className="banner4-icon2">

                                            </div>
                                            <div className="banner4-title2">
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title421"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title422"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list--item3">
                                            <div className="banner4-icon3">

                                            </div>
                                            <div className="banner4-title3">
                                            <div>
                                                    <FormattedMessage
                                                        id="header.title431"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title432"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list--item4">
                                            <div className="banner4-icon4">

                                            </div>
                                            <div className="banner4-title4">
                                            <div>
                                                    <FormattedMessage
                                                        id="header.title441"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title442"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list--item5">
                                            <div className="banner4-icon5">

                                            </div>
                                            <div className="banner4-title5">
                                            <div>
                                                    <FormattedMessage
                                                        id="header.title451"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title452"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list--item6">
                                            <div className="banner4-icon6">

                                            </div>
                                            <div className="banner4-title6">
                                            <div>
                                                    <FormattedMessage
                                                        id="header.title461"
                                                    />
                                                </div>
                                                <div>
                                                    <FormattedMessage
                                                        id="header.title462"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);

