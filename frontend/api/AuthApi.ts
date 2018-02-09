import axios, { AxiosError } from 'axios'
import { convertUserJson, User } from '../models/User'

export interface IUserRegisterDetails {
  email: string
  password: string
  nickname?: string
}

export interface IAuthData {
  user: User
  token: string
}

export class AuthApi {
  public static async authenticateUser(username: string, password: string) {
    try {
      const response = await axios.post('http://localhost:5000/auth/sign_in', {
        email: username,
        password,
      })

      const authResponse: IAuthData = {
        user: convertUserJson(response.data.data),
        token: response.headers['access-token'],
      }

      return authResponse
    } catch (error) {
      return await this.handleError(error)
    }
  }

  public static async registerNewUser(userFormFields: IUserRegisterDetails) {
    try {
      const response = await axios.post(
        'http://localhost:5000/auth/sign_in',
        userFormFields
      )
      return convertUserJson(response.data.data)
    } catch (error) {
      return await this.handleError(error)
    }
  }

  private static handleError = async (error: AxiosError) => {
    const { status, data } = error.response

    console.error(error.response)

    switch (status) {
      case 401:
      case 422:
        return Promise.reject(data.errors)
      case 500:
        return Promise.reject(['Server down!'])
      default:
        return Promise.reject(['Unknown error'])
    }
  }
}
