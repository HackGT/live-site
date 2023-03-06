import { SearchableTable,apiUrl, Service, ErrorScreen } from "@hex-labs/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const limit = 50;
const columns = [
    {
        key:0,
        header: "Title",
        accessor: (row:any) => row.title,
    },
    {
        key:1,
        header:"Description",
        accessor: (row:any) => row.content,

    },
    {
        key:2,
        header:"Slug",
        accessor: (row:any) => row.slug,

    }

  ];

const BlocksTable: React.FC = () => {
    const [offset, setOffset] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState();
    const [data, setData] = useState<any[]>([]);
    const onPreviousClicked = () => {
        setOffset(offset - limit);
    };
    
    const onNextClicked = () => {
        setOffset(offset + limit);
    };
    const onSearchTextChange = (event: any) => {
        setSearchText(event.target.value);
        setOffset(0);
    };
    
    
    useEffect(() => { 
        const getData = async() => {
            try {
                const res = await axios.get(
                    apiUrl(Service.HEXATHONS, `/blocks`),
                    { params: {hexathon: String(process.env.REACT_APP_HEXATHON_ID), search: searchText} }
                  );
                setData(res.data) 
            } catch(e: any) {
           setError(e);
            } 
        } 
        getData();
}, [searchText]);
if (error) {
    return <ErrorScreen error={error} />;
  }


    return(
        <SearchableTable
        title="Blocks"
        data={data}
        columns={columns}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        onPreviousClicked={onPreviousClicked}
        onNextClicked={onNextClicked}
        offset={offset}
        total={data.length}
      />
    );
}
export default BlocksTable;