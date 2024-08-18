import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Item from '../Item'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Main extends Component {
  state = {
    travelData: [],
    apiStatus: apiStatusConstants?.initial,
  }

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const travelGuidePackagesApiUrl = 'https://apis.ccbp.in/tg/packages'
    const option = {
      method: 'GET',
    }
    const response = await fetch(travelGuidePackagesApiUrl, option)
    // console.log('response===', response)

    if (response.ok) {
      const data = await response.json()
      console.log('data===', data.packages)
      const travelDataList = data.packages.map(each => ({
        id: each.id,
        name: each.name,
        description: each.description,
        imageUrl: each.image_url,
      }))
      // console.log('travelDataList===', travelDataList)
      this.setState({
        travelData: travelDataList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  RenderMainContent = () => {
    const {travelData, apiStatus} = this.state
    return (
      <>
        <h1 className="pageHeading">Travel Guide</h1>
        {apiStatus === 'IN_PROGRESS' ? (
          <div className="loader" data-testid="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="travelCardContainer">
            {travelData.map(each => (
              <Item data={each} key={each.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    const content = this.RenderMainContent()
    return <div className="mainContentContainer">{content}</div>
  }
}
export default Main
