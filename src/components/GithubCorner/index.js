import GithubCorner from './GithubCorner'
import injectProps from 'utils/injectProps'

const mapToProps = state => ({
  repository: process.env.REACT_APP_REPOSITORY
})

export default injectProps(mapToProps)(GithubCorner)
