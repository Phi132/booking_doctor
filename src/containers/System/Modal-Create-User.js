import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { createUser } from '../../services/createUser';
class ModalCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            mess: '',
            isValid: false
        }
    }

    toggle = (modal) => {
        this.props.toggle(modal)
    }



    handleChange = (e, id) => {
        let copyData = { ...this.state };
        copyData[id] = e.target.value;
        this.setState({
            ...copyData
        })


    }

    checkInputCreate = () => {
        let arrInput = ['email', 'password', 'firstName']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                this.setState({
                    isValid: false
                })
                alert("Mời Nhập : " + arrInput[i]);
            }
            else {
                this.setState({
                    isValid: true
                })
            }
        }
    }

    onSubmitCreate = async (modal) => {
        try {
            if (!this.state.isValid) {
                this.checkInputCreate();

            } else {
                let onCreateUser = await createUser(this.state.email, this.state.password, this.state.firstName)
                if (onCreateUser.data.err !== 0) {
                    this.setState({
                        mess: onCreateUser.data.mess
                    })

                }
                this.props.toggle(modal)
            }


        } catch (e) {
            console.log(e);
        }
    }




    render() {
        let { modal } = this.props
        return (
            <>
                <div>
                    <Button color="danger" onClick={() => this.toggle(modal)}>Create</Button>
                    <Modal isOpen={modal} toggle={() => this.toggle(modal)} className="">
                        <ModalHeader toggle={() => this.toggle(modal)}>Create User</ModalHeader>
                        <ModalBody>
                            <div className="container">
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className="">
                                            <label htmlFor="inputEmail4">Email</label>
                                            <input type="text" className="form-control"
                                                name="email" id="inputEmail4"
                                                onChange={(e) => { this.handleChange(e, 'email') }}
                                                placeholder="Email" />
                                        </div>
                                        <div className="">
                                            <label htmlFor="inputPassword4">Password</label>
                                            <input type="password" className="form-control"
                                                name="password" id="inputPassword4"
                                                onChange={(e) => { this.handleChange(e, 'password') }}
                                                placeholder="Password" />
                                        </div>
                                        <div className="">
                                            <label htmlFor="inputFirstName">FirstName</label>
                                            <input type="text" className="form-control"
                                                name="firstName" id="inputFirstName"
                                                onChange={(e) => { this.handleChange(e, 'firstName') }}
                                                placeholder="First Name" />
                                        </div>
                                        <div className="">
                                            <label htmlFor="inputLastName">LastName</label>
                                            <input type="text" className="form-control" name="lastName" id="inputLastName"
                                                placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">

                                        <div className="">
                                            <label htmlFor="inputAddress">Address</label>
                                            <input type="text" className="form-control" name="address" id="inputAddress" placeholder="Address" />
                                        </div>
                                        <div className="">
                                            <label htmlFor="inputPhoneNumber">Phone Number</label>
                                            <input type="text" className="form-control" name="phonenumber" id="inputPhoneNumber"
                                                placeholder="Phone Number" />
                                        </div>
                                        <div className="">
                                            <label htmlFor="inputPositionid">Positionid</label>
                                            <input type="text" className="form-control" name="positionid" id="inputPositionid"
                                                placeholder="Phone Number" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label htmlFor="inputState">Gender</label>
                                        <select id="inputState" name="gender" className="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Famale</option>
                                            <option value="2">Orther</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 style={{ color: "green" }}>
                                    {this.state.mess}
                                </h3>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.onSubmitCreate(modal)}>Create</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggle(modal)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);
