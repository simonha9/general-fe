import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './DashboardItem.css'

async function getData(url) {
    const response = await fetch(url)
    var data = await response.json()
    return data
}


export default function RankingItem( {url} ) {
    const [data, setData] = useState([])
    useEffect(() => {
        getData(url).then((res) => {
            setData(res.rankingEntries)
        })
    }, [])

    return (
        <>
            <div>
                <div className='ranking'>
                    <p style={{width: 650}}>The following table shows a list of popular domains ranked by domain rank and indicates which domains have changed compared to data from the previous 30 day mark.</p>
                    <div>
                        <TableContainer sx={{ width: 450, maxHeight: 400, overflow: 'auto' }} component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ranking No.</TableCell>
                                        <TableCell align="right">Ranking Change</TableCell>
                                        <TableCell align="right">Domain</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map(row => {
                                        return <TableRow key={row.domain}>
                                                <TableCell>{parseInt(row.rank) + 1}</TableCell>
                                                <TableCell align="right">{row.rankChange}</TableCell>
                                                <TableCell align="right">{row.domain}</TableCell>
                                                <TableCell align="right">{row.Category}</TableCell>
                                            </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
        
    )
}
