// import logo from './logo.svg';
import React from 'react';
// import './App.css';
// import { Button } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import HeaderComponent from './components/Hearder';
import FooterComponent from './components/Footer';
import News from './components/News';
import newsJson from './news.json'

const { Content } = Layout;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsData: newsJson,
            newsFillter : newsJson
        }
    }

    handlerFillterNews = (keyword) => {
        console.log(keyword);
        const fillterData = this.state.newsData.filter((e)=>{
            return e.title.indexOf(keyword) > -1;
        });
        this.setState({newsFillter: fillterData})
    }

    render() {
        return (
            <Layout className='layout'>
                <HeaderComponent handlerFillterNews={this.handlerFillterNews} />

                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <News news={this.state.newsFillter} />
                    </div>
                </Content>

                <FooterComponent />
            </Layout>
        )
    }
}

export default App;
