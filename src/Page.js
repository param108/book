import React, { fetch, Component } from 'react';
import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { screenWidth: 0, screenHeight:0, data: '', chapter: '1', fail: false, msg: '', hasPrev: true, hasNext: true };
    this.getChapter = this.getChapter.bind(this);
    this.getError = this.getError.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    /*fetch(this.props.url+this.state.chapter,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => (response.json()))
    .then((jsonResponse) => (this.setState({data:jsonResponse.data, hasPrev: jsonResponse.hasPrev, hasNext: jsonResponse.hasNext})))
    .catch((error) => {
      this.setState({ fail: true, msg: error })
    });*/
  }

  getChapter() {
    return {__html: this.state.data};
  }

  getError() {
    return {__html: '<h1>Error: Please Reload </h1><p>'+this.state.msg+'</p>'};
  }

  updateWindowDimensions() {
    this.setState({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render() {
    if (this.state.fail) {
      return (
        <div className="Page" id="Page" dangerouslySetInnerHTML={this.getError()}>
        </div>
      )
    } else {
      return (
        <div>
        <div className="Page" id="Page" dangerouslySetInnerHTML={this.getChapter()}>
        </div>
        <div style={ {position: 'fixed', left: '80%', top:'20px'} } className="Buttons" id="Buttons">
          {(this.state.hasPrev)?<a><img height='50px' src="/img/backward.png"/></a>:null}
          {(this.state.hasNext)?<a><img height='50px' src="/img/forward.png"/></a>:null}
        </div>
        </div>
      );
    }
  }
}

export default Page;
