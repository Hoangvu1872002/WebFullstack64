import React from "react";
import logo from '../logo.svg';

import { Layout, Col, Row, Image, Input } from "antd";

const { Header } = Layout;
const { Search } = Input;



const HeaderComponent = (props) => {
    
    return (
        <Header>
            <Row>
                <Col span={16}>
                    <Image width={80} src={logo}>

                    </Image>
                </Col>
                <Col span={8}>
                    <Search
                        placeholder={"tim kiem"}
                        enterButton
                        onSearch={props.handlerFillterNews}
                        style={{ width: 250, marginTop: 15 }} />
                </Col>
            </Row>
        </Header>
    )
}
export default HeaderComponent;