import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import './getAllUsers.scss'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {

            dataUser: [],
            isCreateNewUser: false,

        }
    }

    componentDidMount() {
        this.props.GetDataUserStart();

    }
    deleteUser = (e) => {
        this.props.deleteUserStart(e.target.id);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataUserAdmin !== this.props.dataUserAdmin) {
            this.setState({
                dataUser: this.props.dataUserAdmin
            })
        }
    }

    EditUser = (user) => {
        this.props.editUserData(user)
    }

    render() {

        let { dataUser } = this.state;
        return (
            <>
                <div className="container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>PhoneNumber</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataUser && dataUser.length > 0 &&
                                dataUser.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.email}</td>
                                            <td>{value.firstName}</td>
                                            <td>{value.lastName}</td>
                                            <td>{value.address}</td>
                                            <td>{value.phonenumber}</td>
                                            <td className="options">
                                                <span className="EditUser"
                                                    onClick={(e) => { this.EditUser(value) }}
                                                >

                                                    Edit

                                                </span>
                                                <span className="deleteUser"
                                                    id={value.id}
                                                    onClick={(e) => { this.deleteUser(e) }}
                                                >

                                                    Delete

                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                            <tr className="active-row">
                            </tr>
                        </tbody>
                    </table>

                </div>

            </>


        );
    }

}

const mapStateToProps = state => {
    return {
        dataUserAdmin: state.admin.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        GetDataUserStart: () => dispatch(actions.fetchDataUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteDataUserStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
