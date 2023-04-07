'use client'
import styled from 'styled-components';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaidIcon from '@mui/icons-material/Paid';
import EventIcon from '@mui/icons-material/Event';
import Image from 'next/image';
import { ethers } from 'ethers';
import CampaignFactory from '../artifacts/contracts/Campaign.sol/CampaignFactory.json'
import { useEffect, useState } from 'react';
import {Footer} from '../components'
import Link from 'next/link';

export default function Dashboard() {
  const [campaignsData, setCampaignsData] = useState([]);

  useEffect(() => {
    const Request = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const Address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_RPC_URL
      );
  
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_ADDRESS,
        CampaignFactory.abi,
        provider
      );
  
      const getAllCampaigns = contract.filters.campaignCreated(null, null, Address);
      const AllCampaigns = await contract.queryFilter(getAllCampaigns);
      const AllData = AllCampaigns.map((e) => {
      return {
        title: e.args.title,
        image: e.args.imgURI,
        owner: e.args.owner,
        timeStamp: parseInt(e.args.timestamp),
        amount: ethers.utils.formatEther(e.args.requiredAmount),
        address: e.args.campaignAddress
      }
      })  
      setCampaignsData(AllData)
    }
    Request();
  }, [])

  return (
    <>
    <div className='flex flex-col justify-between bg-primary-black'>
    <div className='flex flex-col align-center items-center justify-center bg-primary-black pb-6'>
    <p className='font-excratch text-[20px] my-4 text-secondary-white bg-primary-black'>My DASHBOARD</p>
    
    <HomeWrapper  className='bg-primary-black flex flex-col align-center items-center pb-6'>

      {/* Cards Container */}
      <CardsWrapper className='flex flex-wrap m-2 justify-between gap-x-4 gap-y-4'>

      {/* Card */}
      {campaignsData.map((e) => {
        return (
          <Card className='h-[464px] w-[420.86px]' key={e.title}>
          <CardImg className='w-[390.8px]  h-[240.66px] relative'>
            <Image
              className='object-cover  align-center rounded my-2  mx-4'
              alt="raiserocket dapp"

              layout='fill' 
              src={"https://raiserocket.infura-ipfs.io/ipfs/" + e.image} 
            />
          </CardImg>
          <Title className='font-kinetica text-[12px] uppercase text-secondary-white cursor-pointer ml-3 mt-6 '>
            {e.title}
          </Title>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3 pt-2 relative'>
            <Text className='text-#828282 font-kross text-secondary-white fixed bottom-[25%]'>Owner</Text> 
            <Text className='text-green font-kross fixed bottom-[25%] left-[13%]'>{e.owner.slice(0,6)}...{e.owner.slice(39)}</Text>
          </CardData>
          <CardData className='font-kross text-[12px] flex ml-3 space-x-2 mb-3 pt-2 relative'>
            <Text className='font-kross text-secondary-white fixed bottom-[20%]'>Amount</Text> 
            <Text className='font-kross text-secondary-white fixed bottom-[20%] left-[13%]'>{e.amount} Matic</Text>
          </CardData>
          <CardData  className='font-kross text-[12px] flex ml-3 space-x-2 relative'>
            <Text><img className='fixed bottom-[12%]' src="Calendar.png"/></Text>
            <Text className='mt-1.5 fixed bottom-[13%] text-secondary-white left-[10%]'>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
          </CardData>
          <Link passHref href={'/'+ e.address}><Button className='absolute right-5 transition-all duration-300 cursor-pointer fixed bottom-4
        inline-flex items-center  space-x-2 text-green hover:img hover:text-primary-black border
         border-green hover:bg-green  px-2 py-2.5 text-sm focus:outline-none focus:ring-green-300 font-excratch 
         rounded-lg text-green  dark:border-green dark:text-green dark:hover:text-primary-black dark:hover:bg-green dark:focus:ring-green w-[186.23px] h-[45.24px]'>
            Go to Campaign
          </Button></Link>
        </Card>
        )
      })}
        {/* Card */}

      </CardsWrapper>
    </HomeWrapper>
    </div>
    <footer>
    <Footer  />
    </footer>
    </div>
    </>
  )
}



const HomeWrapper = styled.div`
 
`
const CardsWrapper = styled.div`
  
`
const Card = styled.div`
background: rgba( 84, 84, 84, 0.4);
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 4.5px );
-webkit-backdrop-filter: blur( 4.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
  &:hover{
    transform: translateY(-10px);
    transition: transform 0.5s;
  }
  
  &:not(:hover){
    transition: transform 0.5s;
  }
`
const CardImg = styled.div`
  
`
const Title = styled.h2`
 
`
const CardData = styled.div`
  
  `
const Text = styled.p`
 
`
const Button = styled.button`
 
`