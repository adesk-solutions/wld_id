'use client' // for Next.js app router
import React from 'react';
import Image from "next/image";
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit';
import handleVerify from './src/verify';

const onSuccess = (result: any) => {
  console.log('Verification successful:', result);
  // console.log('test 5');
  // sessionStorage.setItem('crowdfunding_loggedin', 'true');

  window.location.href = "http://localhost:5173/";
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Crowdfunding App</h1> {/* Added heading */}

      <IDKitWidget
        app_id="app_staging_2f2709de046e97d0a27204edfa0cb044" // obtained from the Developer Portal
        action="sign-up-staging" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        verification_level={VerificationLevel.Orb}
      >
        {({ open }) => 
          // This is the button that will open the IDKit modal
          <button 
            onClick={open} 
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-200"
          >
            Verify with World ID
          </button>
        }
      </IDKitWidget>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold">World ID</h3>
          <p>A digital identity that proves you are a real and unique person while fully protecting your privacy.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold">Zero-Knowledge Proofs</h3>
          <p>Cryptographic proofs that allow you to verify your identity without revealing personal information.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold">Privacy Protection</h3>
          <p>Your identity is securely stored on your device, ensuring that verifications cannot be linked across applications.</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h3 className="font-bold">Membership Verification</h3>
          <p>Proves you are a member of a verified identities list without disclosing your exact identity.</p>
        </div>
      </div>

      <a 
        href="https://worldcoin.org/download" 
        className="mt-4 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700 transition duration-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download World App
      </a>
    </div>
  );
}