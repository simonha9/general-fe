import React from 'react'
import InternetTrafficDashboardItem from './InternetTrafficDashboardItem'
import RankingItem from './RankingItem'

const url = "https://general.simon9ha4934.workers.dev"
const itrafficUrl = url + "/traffic-change"
const rankingUrl = url + "/popular-domains"
const attacklayerUrl = url + "/attack-layer3"

function Dashboard() {
    return (
        <>
            <InternetTrafficDashboardItem itrafficUrl={itrafficUrl} attacklayerUrl={attacklayerUrl}/>
            <br/>
            <RankingItem url={rankingUrl}/>
        </>
    )
}

export default Dashboard;
