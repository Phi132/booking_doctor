import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getDataFromServer } from '../../services/getDataServer';
import ModalCreateUser from './Modal-Create-User';
import axios from 'axios';
import './UserManage.scss';
class UserManage extends Component {

    state = {
        dataUser: [],
        modal: false
    }

    async componentDidMount() {
        let testData = await getDataFromServer()
            .then(data => this.setState({
                dataUser: data.data.data
            }))
    }
    toggle = (modal) => {
        this.setState({
            modal: !modal
        })
    }

    render() {

        let { dataUser, modal } = this.state;


        return (
            <>
                <h1 className="text-center">Manage userssss</h1>
                <ModalCreateUser modal={modal}
                    toggle={this.toggle}
                />
                <table>
                    <thead>
                        <tr style={{ backgroundColor: '#00FF00' }}>
                            <th>Email</th>
                            <th>PassWord</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>


                        {(dataUser) && dataUser.map((value, index) => {
                            return (
                                < tr key={value.id} >

                                    <td>{value.email}</td>
                                    <td>{value.password}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <th>
                                        <button>
                                            edit
                                        </button>
                                        <button>
                                            delete
                                        </button>
                                    </th>

                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>

            </>


        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
