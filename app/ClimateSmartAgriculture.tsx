"use client";
import { BackgroundLines } from '@/components/ui/BackgroundLines';
import React from 'react';
import styled from 'styled-components';



const BackgroundImage = styled.div`
  background-image: url('https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const TransparentBox = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  color: white;
  padding: 5rem;
  font-size: 4rem;
  font-weight: bold;
  border-radius: 2.5rem;
  text-align: center;
  text-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  width: 80%;
  max-width: 900px;
  margin: 0 auto;
`;
export const ClimateSmartAgriculture = () => {
    return (
      <BackgroundImage>
        
        <TransparentBox>
        
          Climate Smart Agriculture
        </TransparentBox>
        
      </BackgroundImage>
    );
  };
  