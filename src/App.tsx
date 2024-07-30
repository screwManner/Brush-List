import React,{ useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import WebList from './utils'

type MenuItem = Required<MenuProps>["items"][number];

const isIframe = (input: HTMLElement | null): input is HTMLIFrameElement =>
  input !== null && input.tagName === 'IFRAME';

function App() {

  const [items,setItems] = useState<MenuItem[]>([]);
  const [iframeSrc,setIframeSrc] = useState<string>()

  useEffect(()=>{
    // 处理左侧菜单数据
    const temporarilyList = [...WebList];
    const resultList = temporarilyList.map((item)=>{
      return {
        ...item,
        label:item.name
      }
    })
    setItems(resultList)
  },[])

  const onClick: MenuProps['onClick'] = (e) => {
    const temporarilyData = WebList.filter((item)=>{
      return item.key === e.key
    })
    console.log('处理后的数组',temporarilyData)
    setIframeSrc(temporarilyData[0].address);
    // document.getElementById('myframe')?.contentWindow?.location.reload(true);
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body className="App-body">
        <div className="left-menu">
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
        <div className="right-content">
          {/* <div className="top-menu"></div>
          <div className="right-container"></div> */}
          {/* <p>网站地址{iframeSrc}</p> */}
          <iframe width={'100%'} height={'98%'} src={iframeSrc} title="网站" id="myIframe" frameBorder={0}></iframe>
        </div>
      </body>
    </div>
  );
}

export default App;
