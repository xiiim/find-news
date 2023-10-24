"use client"

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, TextField } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import axios from "axios"
import { useState } from "react"
import NewsList from "./components/NewsList";
import { News } from "./type/news";

export default function Home() {

  const NEWS_API_KEY = "4cd177d9313f499cb28974cf15f9c276"
  const NEWS_API_URL = "https://newsapi.org/v2/everything"

  const [searchTag, setSearchTag] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [results, setResults] = useState([])
  const [currentPage, setCurrentPage] = useState(1) 
  const [selectedNews, setSelectedNews] = useState(null)

  const handleSearch = async () => {
    // @ts-ignore
    const fromDateStr = fromDate ? fromDate.toISOString().split('T')[0] : ''
    // @ts-ignore
    const toDateStr = toDate ? toDate.toISOString().split('T')[0] : ''
    try {
      const response = await axios.get(`${NEWS_API_URL}`, {
        params: {
          q: searchTag,
          from: fromDateStr,
          to: toDateStr,
          sortBy: 'publishedAt',
          apiKey: NEWS_API_KEY
        }
      })

      setResults(response.data.articles)
    } catch (error) {
      console.error('Error in Fetching data:', error)
    }
  }

  const handlePagination = (page: number) => {
    setCurrentPage(page)
    handleSearch()
  }

  const handleListItemClick = (newsItem: News) => {
    // @ts-ignore
    setSelectedNews(newsItem)
  }

  const handleClose = () => {
    setSelectedNews(null)
  }

  return (
    <main className="h-full mx-auto p-4">
      <div className="flex items-center justify-center mb-4">
        <TextField 
          label='Search News'
          variant="outlined"
          className="mr-4"
          value={searchTag}
          onChange={e => setSearchTag(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label='From'
            value={fromDate}
            onChange={date => setFromDate(date)}
            className="mr-4"
          />
          <DatePicker 
            label='To'
            value={toDate}
            onChange={date => setToDate(date)}
            className="mr-4"
          />
        </LocalizationProvider>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSearch} 
          className="bg-blue-500"
        >
          Search
        </Button>
      </div>
      <NewsList 
        newsList={results.slice((currentPage-1)*10, currentPage*10)}
        onClickHandler={handleListItemClick}
      />
      <div className="flex justify-center mt-4">
        <Button 
          variant="outlined"
          color="primary"
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous
        </Button>
        <Button 
          variant="outlined"
          color="primary"
          className="ml-2"
          disabled={currentPage === Math.ceil(results.length / 10)}
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      <Dialog open={selectedNews !== null} onClose={handleClose}>
        {
          // @ts-ignore
          <DialogTitle>{selectedNews?.title}</DialogTitle>
        }
        <DialogContent>
          <img 
            src={
              // @ts-ignore
              selectedNews?.urlToImage
            }
            alt={
              // @ts-ignore
              selectedNews?.title
            }
            width={300}
            height={300}
          />
          <DialogContentText>
            {
              // @ts-ignore
              selectedNews?.description
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  )
}
