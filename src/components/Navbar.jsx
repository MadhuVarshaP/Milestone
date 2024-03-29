import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useAppContext } from "../utils/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import navbg from "../assets/navbg.jpeg";

export default function Navbar() {
  const { connectWallet, appState, disconnectWallet, getTokenData } =
    useAppContext();
  const navigate = useNavigate();
  const [profileState, setProfileState] = useState(false);

  //   useEffect(() => {
  //     console.log("UE", appState);
  //   }, []);

  const CheckConnect = async () => {
    await connectWallet();
    await getTokenData();
    if (profileState == true) {
      console.log("THis is from home");
      navigate("/home");
    } else {
      console.log("This is from profile");
      navigate("/createprofile");
    }
  };

  return (
    <div class="">
      <section class="relative mx-auto">
        <nav class="flex justify-between bg-gray-900 text-black w-full bg-hero">
          <div class="px-5 py-6 flex w-full items-center">
            <a class="text-3xl font-bold font-heading" href="/">
              Milestone
            </a>
            <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <a class="hover:text-gray-200" href="/">
                  Dashboard
                </a>
              </li>
              <li>
                <a class="hover:text-gray-200" href="/">
                  Help
                </a>
              </li>
            </ul>
            <div class="hidden xl:flex items-center space-x-5 items-center px-10">
              {appState.loggedIn === true && (
                <Link to="/profile">
                  <a class="flex items-center hover:text-gray-200" href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 hover:text-gray-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </a>
                </Link>
              )}
            </div>
            <div className="flex flex-row items-center justify-center gap-x-6">
              {appState.loggedIn === false ? (
                <div className="hidden lg:flex">
                  <Button onPress={() => CheckConnect()}>Connect Wallet</Button>
                </div>
              ) : (
                <div className="flex flex-row items-center justify-center gap-x-6">
                  <div>
                    <p>
                      {appState.address.address.slice(0, 10) +
                        "..." +
                        appState.address.address.slice(-4)}
                    </p>
                    <Button onPress={disconnectWallet}>
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <a class="xl:hidden flex mr-6 items-center" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </a>
          <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 hover:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </a>
        </nav>
      </section>
    </div>
  );
}
