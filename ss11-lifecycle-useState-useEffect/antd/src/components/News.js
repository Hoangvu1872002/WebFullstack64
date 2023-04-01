
import { List, Avatar } from "antd";


const News = (props) =>{
    const data = props.news;
    return (
        <List
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href="https://ant.design">{item.title}</a>}
              description={item.feed}
            />
          </List.Item>
        )}
      />
    )
}
export default News;