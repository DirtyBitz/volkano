import * as React from 'react'
import Link from 'next/link'
import { User } from '../models/User'
interface Props {
  userData?: User
}

export default class Navigation extends React.Component<Props> {
  render() {
    const { userData } = this.props
    return (
      <nav>
        <div id="main-nav">
          <Link href="/">
            <a id="home-link">
              Vol<span>kano</span>
            </a>
          </Link>
        </div>
        <div id="user-nav">
          {!userData && (
            <div>
              <Link href="/signin">
                <a id="signin-link">Sign in</a>
              </Link>

              <Link href="/signup">
                <a id="signup-link">Sign up</a>
              </Link>
            </div>
          )}
          {userData && (
            <Link href="/profile">
              <a id="profile-link">{this.props.userData.email}</a>
            </Link>
          )}
        </div>

        <style jsx>{`
          nav {
            display: flex;
            justify-content: space-between;
            background: #1c222a;
            padding: 15px;
            align-items: center;

            #main-nav,
            #user-nav {
              a {
                color: #fff;
                text-decoration: none;
              }
            }
          }

          #home-link {
            font-size: 1.2em;
            span {
              color: #ce1a1a;
            }
          }

          #signin-link,
          #signup-link {
            display: inline-block;
            padding: 10px 20px;
            background: #54b45f;
            margin-left: 15px;
            border-radius: 25px;
          }
        `}</style>
      </nav>
    )
  }
}
