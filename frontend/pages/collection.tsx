import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import { Dispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IStoreState } from '../store/StoreState'
import Layout from '../components/Layout'
import { allItems } from '../actions/item/ItemActions'
import { CollectionStateI } from '../reducers/collectionReducer'
import ItemCard from '../components/ItemCard'

interface IProps extends IStoreState {
  allItems: (token: string, client: string, uid: string) => Promise<void>
  collection: CollectionStateI
}
class CollectionPage extends React.Component<IProps> {
<<<<<<< HEAD
  async componentWillMount() {
    const { token, client, uid } = this.props.authentication
    await this.props.allItems(token, client, uid)
=======
  componentDidMount() {
    setTimeout(() => {
      this.props.allItems('fake-token')
    }, 1000)
>>>>>>> :pencil: Fix store import
  }

  render() {
    const items = this.props.collection.items
    const { authentication } = this.props

    return (
      <Layout title="Collection" authentication={authentication}>
        <div id="collage">
          {items && items.map(item => <ItemCard key={item.id} item={item} />)}
          <style jsx>{`
            #collage {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              margin-right: -15px;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
}
const mapStateToProps = (state: IStoreState) => {
  return {
    collection: state.collection,
    authentication: state.authentication,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => {
  return {
    allItems: bindActionCreators(allItems, dispatch),
  }
}

export default withRedux(store, mapStateToProps, mapDispatchToProps)(CollectionPage)
