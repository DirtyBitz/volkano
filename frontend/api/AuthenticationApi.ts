import { convertUserJson, IUser } from '../models/User'
import VolkanoRequest, { VolkanoHTTPError, VolkanoHTTPResponse } from './VolkanoRequest';

enum ErrorState {
  SERVER_ERROR = 'Server is down',
  NETWORK_ERROR = 'Network error',
  UNKNOWN_ERROR = 'Unknown error'
}

export interface IUserRegisterDetails {
  email: string
  password: string
  nickname?: string
}

export class AuthenticationApi {
  public static async authenticateUser(login: string, password: string): Promise<IUser | string[]> {
    try {
      const response: VolkanoHTTPResponse = await this.requester.post('/auth/sign_in', {
        params: {
          login,
          password,
        }
      })

      const user: IUser = convertUserJson(response.data)

      return user
    } catch (error) {
      return await this.handleError(error)
    }
  }

  public static async registerNewUser(userFormFields: IUserRegisterDetails): Promise<void | string[]> {
    const userParams = {
      ...userFormFields,
      confirm_success_url: 'http://localhost:3000/accountcreated',
    }

    try {
      await this.requester.post('/auth', { params: userParams })
    } catch (error) {
      return await this.handleError(error)
    }
  }

  // Stub for testing
  private static get requester() {
    return VolkanoRequest
  }

  private static handleError = async (error: VolkanoHTTPError): Promise<string[]> => {
    if (error.message === 'Network Error') {
      return Promise.reject([ErrorState.NETWORK_ERROR])
    }

    const { status, data } = error
    let errors = []
    if (Array.isArray(data.errors)) {
      errors = data.errors
    } else {
      errors = data.errors.full_messages
    }

    switch (status) {
      case 401:
      case 422:
        return Promise.reject(errors)
      case 500:
        return Promise.reject([ErrorState.SERVER_ERROR])
      default:
        return Promise.reject([ErrorState.UNKNOWN_ERROR])
    }
  }
}