import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import {
  exchangeSelector,
  tokenSelector,
  accountSelector,
  web3Selector,
  buyOrderSelector,
  sellOrderSelector
} from '../store/selectors'
import {
  buyOrderAmountChanged,
  buyOrderPriceChanged,
  sellOrderAmountChanged,
  sellOrderPriceChanged,
} from '../store/actions'
import {
  makeBuyOrder,
  makeSellOrder
} from '../store/interactions'

const showForm = (props) => {
  const {
    dispatch,
    buyOrder,
    exchange,
    token,
    web3,
    account,
    sellOrder,
    showBuyTotal,
    showSellTotal
  } = props

  return(
    <Tabs defaultActiveKey="acheter" className="bg-dark text-white">

      <Tab eventKey="acheter" title="Acheter" className="bg-dark">

          <form onSubmit={(event) => {
            event.preventDefault()
            makeBuyOrder(dispatch, exchange, token, web3, buyOrder, account)
          }}>
          <div className="form-group small">
            <label>Montant Achat (GCT)</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-white"
                placeholder="Montant Achat"
                onChange={(e) => dispatch( buyOrderAmountChanged( e.target.value ) )}
                required
              />
            </div>
          </div>
          <div className="form-group small">
            <label>Prix d achat</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm bg-dark text-white"
                placeholder="Prix Achat"
                onChange={(e) => dispatch( buyOrderPriceChanged( e.target.value ) )}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-sm btn-block">Placer Commander</button>
          { showBuyTotal ? <small>Total: {buyOrder.amount * buyOrder.price} ETH</small> : null }
        </form>

      </Tab>

      <Tab eventKey="vendre" title="Vendre" className="bg-dark">

        <form onSubmit={(event) => {
          event.preventDefault()
          makeSellOrder(dispatch, exchange, token, web3, sellOrder, account)
        }}>
        <div className="form-group small">
          <label>Montant vente (GCT)</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm bg-dark text-white"
              placeholder="Montant vente"
              onChange={(e) => dispatch( sellOrderAmountChanged( e.target.value ) )}
              required
            />
          </div>
        </div>
        <div className="form-group small">
          <label>Prix vente</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-sm bg-dark text-white"
              placeholder="Prix vente"
              onChange={(e) => dispatch( sellOrderPriceChanged( e.target.value ) )}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-sm btn-block">Placer Commande</button>
        { showSellTotal ? <small>Total: {sellOrder.amount * sellOrder.price} ETH</small> : null }
      </form>

      </Tab>
    </Tabs>
  )
}

class NewOrder extends Component {

  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-header">
          Nouvelle Commande
        </div>
        <div className="card-body">
          {this.props.showForm ? showForm(this.props) : <Spinner />}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const buyOrder = buyOrderSelector(state)
  const sellOrder = sellOrderSelector(state)

  return {
    account: accountSelector(state),
    exchange: exchangeSelector(state),
    token: tokenSelector(state),
    web3: web3Selector(state),
    buyOrder,
    sellOrder,
    showForm: !buyOrder.making && !sellOrder.making,
    showBuyTotal: buyOrder.amount && buyOrder.price,
    showSellTotal: sellOrder.amount && sellOrder.price
  }
}

export default connect(mapStateToProps)(NewOrder)
