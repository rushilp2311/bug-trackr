import React, { Component } from "react";
import Modal from "./common/Modal";
class AddBug extends Component {
  state = {
    showModal: false,
  };

  // joinaTeam = async user => {
  //   const result = await joinTeam(user);
  //   if (result) {
  //     this.props.context.updateUserState(user);
  //   } else {
  //     console.log("Team Not Found");
  //   }
  // };
  // handleChange = ({ currentTarget: input }) => {
  //   let teamid = input.value;
  //   this.setState({ teamid });
  // };
  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  render() {
    return (
      <>
        <button
          className='dashboard__controls__button'
          onClick={this.toggleModal}>
          New Bug
        </button>
        {this.state.showModal ? (
          <Modal>
            <div className='modal__container bug__modal__container'>
              <div className='modal__header bug__modal__header'>
                <h1>Add a New Bug</h1>
              </div>
              <div className='modal__body bug__modal__body'>
                <div className='modal__form__controls bug__modal__form__controls'>
                  <div className='group'>
                    <label>Enter the Title</label>
                    <input
                      type='text'
                      onChange={this.handleChange}
                      placeholder='Add a title of your issue'
                    />
                  </div>
                  <div className='group'>
                    <label>Enter Description of Bug</label>
                    <textarea
                      style={{ height: "100px" }}
                      onChange={this.handleChange}
                      placeholder='Give Description'
                    />
                  </div>
                  <div className='btn-group'>
                    <button onClick={this.toggleModal}>Submit New Bug</button>
                    <button onClick={this.toggleModal} className='close-btn'>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}
export default AddBug;
