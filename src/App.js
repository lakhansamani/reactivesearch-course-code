import React from "react";
import { ReactiveBase } from "@appbaseio/reactivesearch";
import "./styles.css";

export default function App() {
  return (
    <ReactiveBase
      app="yelp-demo"
      url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
    >
      <div className="App">
        <h1>Hello from ReactiveSearch</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </ReactiveBase>
  );
}
