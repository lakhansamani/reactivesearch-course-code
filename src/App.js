import React from "react";
import { ReactiveBase, DataSearch, MultiList } from "@appbaseio/reactivesearch";
import "./styles.css";

export default function App() {
  return (
    <ReactiveBase
      app="yelp-demo"
      url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
    >
      <div className="App">
        <DataSearch
          componentId="SearchSensor"
          dataField={[
            "name",
            "name.search",
            "name.autosuggest",
            "city",
            "city.search",
            "city.autosuggest"
          ]}
          fieldWeights={[3, 1, 1, 2, 1, 1]}
          onValueSelected={(value, cause, source) => {
            console.log("value", value);
            console.log("source", source);
          }}
        />
        <div style={{ display: "flex", margin: "20px 15px" }}>
          <div style={{ width: "30%" }}>
            <MultiList
              componentId="CategorySensor"
              dataField="categories.keyword"
            />
          </div>
        </div>
      </div>
    </ReactiveBase>
  );
}
