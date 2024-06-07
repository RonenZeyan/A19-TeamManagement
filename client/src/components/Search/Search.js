
import React,{ useState } from 'react'

/**
 * @component
 * this component used for reuse the search because many pages have a search and we reuse it by make it as a indepdent component 
 * @param {Object} props - The properties object.
 * @param {Array<string>} props.searchByList - A list of fields to search by.
 * @param {Function} props.setData - Function to set the filtered data.
 * @param {Array<Object>} props.allData - The original unfiltered data.
 * @param {string} props.initialSearchState - The initial search field.
 * @returns {JSX.Element} - a rendered search component. 
 */

export default function SearchCompo({searchByList,setData,allData,initialSearchState}){




    // let isPressed=false
    const [isPressed,setIspressed] = useState(false)
    const [searchBy,setSearchBy] = useState(initialSearchState)
    const [searchTXT,setSearchTXT] = useState('')

    function handleOnClickSearch()
    {
        setIspressed(!isPressed)
        if(!searchTXT ||isPressed)
        {
            setSearchTXT('')
            setData(allData)
        }
        else
        {
            const filteredUsers = allData.filter(user => {
                return user[searchBy].includes(searchTXT.toLowerCase());
            });
            setData(filteredUsers)
        }
    }

return(
<div className="flex flex-col md:flex-row m-auto gap-4 md:gap-32 font-serif my-6">
    <div className="flex items-center gap-4 ">
        <label for="searchBy" className="font-bold font-sans">Search By:</label>
        <div className='shadow-sm'>
            <select onChange={(e)=>{setSearchBy(e.target.value)}} className="font-bold font-sans p-2 m-auto border border-inherit shadow-sm rounded-xl border-black text-black" id="searchBy" name="searchBy">
                {/* <option value="id">id</option>
                <option value="employeeName">name</option>
                <option value="Phone">phone</option>
                <option value="Email">email</option> */}
                { 
                searchByList.map((searchType) => (
                <option className='border-inherit' value={searchType}>{searchType}</option>  
                    )
                )}
            </select>
        </div>
    </div>
    <div className='shadow-sm'>
        <input onChange={(e)=>{setSearchTXT(e.target.value)}} className="bg-gray-100 text-black w-full text-sm font-sans px-3 py-2 mr-10 shadow-sm border border-inherit rounded-md outline-blue-600" id="searchText" placeholder="search" type="text" value={searchTXT}/>
    </div>
    <button
      onClick={handleOnClickSearch}
      id="searchBut"
      className={`inline-flex items-center justify-center rounded-md font-sans px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isPressed ? 'bg-red-600' : 'bg-indigo-600'}`}
    >
      {isPressed ? 'X' : 'Search'}
    </button>
</div>
)

}