import React, { Component } from 'react';
import './Page.css';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { chapter: 1, story: '', screenWidth: 0, screenHeight:0, data: '', chapter: '1', fail: false, msg: '', hasPrev: true, hasNext: true };
    this.getChapter = this.getChapter.bind(this);
    this.getError = this.getError.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.clickPrev = this.clickPrev.bind(this);
    this.clickNext = this.clickNext.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.chapter != this.state.chapter) {
      console.log(prevState.chapter,this.state.chapter);
      fetch('/read/'+this.state.story+'/chapter/'+this.state.chapter+'/?_r='+Math.random().toString(36).substring(15),{
        method:'GET',
        headers: {
          'Accept': 'application/json',
        }
      }).then((response) => (response.json()))
      .then((jsonResponse) => {
        window.location.hash='#'+this.state.chapter;
        this.setState({data:jsonResponse.data, hasPrev: jsonResponse.hasPrev, hasNext: jsonResponse.hasNext});
      })
      .catch((error) => {
        this.setState({ fail: true, msg: error })
      });
    }
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
    var path = window.location.pathname;
    var hash = window.location.hash;
    if (hash === "") {
	     hash = "1";
       window.location.hash='#1';
    } else {
	     hash = hash.replace("#","");
    }
    var pathElements = path.split("/");
    var story = pathElements[2];
    var url = '/read/'+story+'/chapter/'+hash;
    fetch(url+'/?_r='+Math.random().toString(36).substring(15),{
      method:'GET',
      headers: {
        'Accept': 'application/json',
      }
    }).then((response) => (response.json()))
    .then((jsonResponse) => (this.setState({chapter:parseInt(hash), story: story, data:jsonResponse.data, hasPrev: jsonResponse.hasPrev, hasNext: jsonResponse.hasNext})))
    .catch((error) => {
      this.setState({ fail: true, msg: error })
    });
  }

  clickPrev() {
    this.setState({chapter: (this.state.chapter - 1)});
    return false;
  }

  clickNext() {
    this.setState({chapter: (this.state.chapter + 1)});
    return false;
  }

  render() {
    if (this.state.fail) {
      return (
        <div className={this.props.pagestyle} id="Page" dangerouslySetInnerHTML={this.getError()}>
        </div>
      )
    } else {
      return (
        <div>
        <div className={this.props.pagestyle} id="Page" dangerouslySetInnerHTML={this.getChapter()}>
        </div>
        <div style={ {position: 'fixed', left: '80%', top:'20px'} } className="Buttons" id="Buttons">
          {(this.state.hasPrev)?<a onClick={this.clickPrev}><img height='50px' src="/static/img/backward.png"/></a>:null}
          {(this.state.hasNext)?<a onClick={this.clickNext}><img height='50px' src="/static/img/forward.png"/></a>:null}
        </div>
        </div>
      );
    }
  }
}

export default Page;
