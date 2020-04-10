import React from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  ResultList
} from "@appbaseio/reactivesearch";
import "./styles.css";

const { ResultListWrapper } = ReactiveList;

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
          <div style={{ width: "70%" }}>
            <ReactiveList
              react={{
                and: ["CategorySensor", "SearchSensor"]
              }}
              componentId="SearchResult"
            >
              {({ data, error, loading }) => (
                <ResultListWrapper>
                  {data.map(item => (
                    <ResultList key={item._id}>
                      <ResultList.Image src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
                      <ResultList.Content>
                        <ResultList.Title
                          dangerouslySetInnerHTML={{
                            __html: item.name
                          }}
                        />
                        <p>{item.address}</p>
                        <p>
                          {item.city}, {item.state}
                        </p>
                      </ResultList.Content>
                    </ResultList>
                  ))}
                </ResultListWrapper>
              )}
            </ReactiveList>
          </div>
        </div>
      </div>
    </ReactiveBase>
  );
}
