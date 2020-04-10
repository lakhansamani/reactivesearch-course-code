import React from "react";
import {
  ReactiveBase,
  DataSearch,
  MultiList,
  ReactiveList,
  ResultList
} from "@appbaseio/reactivesearch";
import { ReactiveOpenStreetMap } from "@appbaseio/reactivemaps";
import "./styles.css";

const { ResultListWrapper } = ReactiveList;

export default function App() {
  return (
    <div className="App">
      <ReactiveBase
        app="yelp-demo"
        url="https://xe6N9nDRV:51ea7a8a-6354-4b5f-83e1-12dce3b7ec47@arc-cluster-appbase-demo-ps1pgt.searchbase.io"
      >
        <nav
          style={{
            padding: "10px 20px",
            background: "#efefefef",
            height: 70,
            display: "flex",
            alignItems: "center",
            fontSize: 18,
            fontWeight: "bolder",
            justifyContent: "space-between"
          }}
        >
          <div>Yelp</div>
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
            style={{ width: "70%" }}
          />
        </nav>
        <div style={{ display: "flex", margin: "20px 15px" }}>
          <div style={{ width: "30%" }}>
            <MultiList
              componentId="CategorySensor"
              dataField="categories.keyword"
            />
          </div>
          <div style={{ width: "70%" }}>
            <div>
              <ReactiveOpenStreetMap
                componentId="SearchResult"
                react={{
                  and: ["CategorySensor", "SearchSensor"]
                }}
                dataField="location"
                defaultZoom={3}
                renderAllData={(
                  hits,
                  streamHits,
                  loadMore,
                  renderMap,
                  renderPagination,
                  triggerAnalytics
                ) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap"
                      }}
                    >
                      <ResultListWrapper
                        style={{
                          widht: "50%",
                          height: "80vh",
                          overflow: "auto"
                        }}
                      >
                        {hits.map(item => (
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
                        <button
                          onClick={() => {
                            loadMore();
                          }}
                          style={{
                            background: "dodgerblue",
                            color: "white",
                            padding: 10,
                            border: 0,
                            borderRadius: 4,
                            margin: 5,
                            cursor: "pointer"
                          }}
                        >
                          Load more{" "}
                        </button>
                      </ResultListWrapper>
                      <div style={{ width: "50%" }}>{renderMap()}</div>
                    </div>
                  );
                }}
              />
            </div>
          </div>
        </div>
      </ReactiveBase>
    </div>
  );
}
