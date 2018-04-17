import * as React from 'react'
import { VolkaButton } from './VolkaButton'
import AuthApi from '../api/AuthApi'

interface IState {
  isEditing: boolean
  currentPassword: string
  newPassword: string
  confirmPassword: string
  passwordsMatch: boolean
  message?: string
}

class EditPassword extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
      passwordsMatch: true,
    }
  }

  private onSubmit = async () => {
    try {
      await AuthApi.updatePassword(
        this.state.currentPassword,
        this.state.newPassword,
        this.state.confirmPassword
      )
      this.setState({ message: 'Password changed', isEditing: false })
    } catch (error) {
      this.setState({ message: error.message, isEditing: false })
    }
  }

  private newPasswordChange = event => {
    this.setState({ newPassword: event.target.value })
  }

  private confirmPasswordChange = event => {
    const matching = this.state.newPassword === event.target.value
    this.setState({
      confirmPassword: event.target.value,
      passwordsMatch: matching,
    })
  }

  render() {
    const { isEditing, confirmPassword, newPassword, currentPassword } = this.state
    return (
      <div className={isEditing ? 'editable-field is-editing' : 'editable-field'}>
        {!isEditing && (
          <div id="change-password-action">
            <span>{this.state.message}</span>
            <div className="button">
              <VolkaButton
                title="Change password"
                onClick={() => this.setState({ isEditing: true })}
              />
            </div>
          </div>
        )}

        {isEditing && (
          <div id="change-password-container">
            <div className="button">
              <VolkaButton
                title="Cancel"
                className="danger"
                onClick={() => this.setState({ isEditing: false })}
              />
            </div>
            <div className="button">
              <VolkaButton title="Change password" onClick={this.onSubmit} />
            </div>
            <div className="content">
              <label>Current password</label>
              <input
                autoFocus
                type="password"
                onChange={event => this.setState({ currentPassword: event.target.value })}
                value={currentPassword}
              />
            </div>
            <div className="content">
              <label>New Password</label>
              <input
                type="password"
                onChange={this.newPasswordChange}
                value={newPassword}
              />
            </div>
            <div className="content">
              <label style={{ color: this.state.passwordsMatch ? 'black' : 'red' }}>
                Confirm Password
              </label>
              <input
                type="password"
                onChange={this.confirmPasswordChange}
                value={confirmPassword}
              />
            </div>
          </div>
        )}
        <style jsx>{`
          .button {
            padding-left: 10px;
            padding-bottom: 10px;
            display: inline-block;
          }

          .content {
            border: solid 1px #bbb;
            margin-bottom: 10px;
            border-radius: 5px;
            width: 400px;
            display: flex;
            background: #f9f9f9;
            font-size: 0.9em;
            text-align: center;
          }

          label {
            font-weight: bold;
            margin-right: 10px;
            padding: 5px 10px 5px 10px;
            white-space: nowrap;
            border-right: solid 1px #bbb;
            min-width: 160px;
          }

          input {
            border: none;
            margin-right: 10px;
            flex: 1;
            padding: 5px 10px 5px 0;
            background: transparent;
          }
        `}</style>
      </div>
    )
  }
}

export default EditPassword