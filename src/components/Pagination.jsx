import React, { useEffect, useState } from 'react'

function Pagination() {
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [debouncesearch, setDebouncesearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const USERS_PER_PAGE = 2;

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebouncesearch(search)
        }, 1000);
        return () => { clearTimeout(timer) }
    }, [search])

    async function getData() {
        let resp = await fetch("https://jsonplaceholder.typicode.com/users");
        resp = await resp.json()
        console.log(resp);
        setData(resp)
    }

    let filterData = data.filter((ele) => {
        let query = debouncesearch.toLowerCase().trim();
        console.log(query);

        return (
            ele.name.toLowerCase().includes(query)
        )
    })

    const totalPages = Math.ceil(filterData.length / USERS_PER_PAGE);
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;

    const currentUsers = filterData.slice(startIndex, endIndex);

    return (
        <div>
            <input type="text" placeholder='Search Name' onChange={(e) => { setSearch(e.target.value) }} />
            {debouncesearch}

            {currentUsers.length > 0 ? (currentUsers.map((item, index) =>
                <div key={index}>
                    <h1>{item.name}</h1>
                </div>
            )) : <h1>No Data Found</h1>}

            {filterData.length > 0 &&
                (<div>
                    <button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 1} > Previous </button>
                    <span> Page {currentPage} of {totalPages} </span>
                    <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === totalPages} > Next </button>
                </div>
                )}
        </div>
    )
}

export default Pagination
