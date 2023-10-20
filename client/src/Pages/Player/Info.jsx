import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaTrophy } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BiLinkExternal } from 'react-icons/bi';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
function description() {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    
  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
    return (
        <section class="text-gray-600 body-font bg-gray-100">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div>
      <div className="md:flex container">
      <img class="object-cover object-center rounded-lg lg:w-1/2 h-fit max-w-16 mb-8 sm:w-full md:w-1/2" alt="hero" src="/eaa.jpg"/>
      <div class="p-4 xl:w-1/2 md:w-1/3 w-full ml-16 mb-40 lg:fixed right-0">
        <div class=" h-96 p-8 rounded-lg border-4 border-gray-300 flex flex-col relative overflow-hidden w-96 lg:ml-44">
          <h2 class="text-sm tracking-widest title-font mb-1 font-medium">TOURNAMENT</h2>
          <h1 class="text-5xl text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">SUMMARY</h1>
          <p class="flex items-center text-gray-600 mb-4">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-orange-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Start Date - June 15th,2023
          </p>
          <p class="flex items-center text-gray-600 mb-4">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-orange-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>End Date - June 28th,2023
          </p>
          <p class="flex items-center text-gray-600 mb-6">
            <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-orange-500 text-white rounded-full flex-shrink-0">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" class="w-3 h-3" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </span>Venue - Alpha Loop Turf
          </p>
          <button class="flex items-center mt-auto text-white bg-orange-500 border-0 py-2 px-4 w-full focus:outline-none rounded-lg" onClick={()=> navigate("/p/apply")}>APPLY NOW
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-auto" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          <p class="text-xs text-gray-500 mt-3">Register now and play your favourite sport.</p>
        </div>
      </div>
      </div>
      <div className="ml-8 w-1/2">
        <h2 className="sm:text-5xl text-2xl font-bold title-font mb-4 mt-8 text-black"> <FaTrophy className="inline-block mr-3" />Tournament Flow</h2>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Team Registration: </strong> Teams interested in participating in the tournament register themselves by providing necessary information such as team name, contact details, and player details.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Fixtures and Schedule:  </strong> The tournament organizers create a fixture or schedule that determines the dates, venues, and match-ups for each team throughout the tournament. This schedule is usually shared with the participating teams and made available to the public.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Opening Ceremony: </strong> Many tournaments begin with an opening ceremony that includes performances, speeches, and sometimes celebrity appearances. It serves as an official start to the tournament, creating excitement and setting the stage for the matches.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Group Stage Matches: </strong>The tournament typically starts with a group stage where teams are divided into groups. Each team plays against the other teams in its group, accumulating points based on the results of the matches (win, loss, or tie). The group stage usually follows a round-robin format or a combination of round-robin and knockout stages.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Knockout Stage: </strong>After the group stage, the top-performing teams from each group advance to the knockout stage. The knockout stage usually includes matches like quarter-finals, semi-finals, and a final. In knockout matches, teams compete against each other, and the losing team is eliminated from the tournament.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Tiebreakers and Super Overs: </strong> In case of tied matches, tiebreakers or super overs may be used to determine the winner. These are additional mini-matches or rules designed to break the tie and determine the team that progresses to the next stage.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Awards and Recognitions:</strong> At the end of the tournament, various awards and recognitions are given out, such as Player of the Tournament, Best Batsman, Best Bowler, Fair Play Award, etc. These awards acknowledge outstanding performances and contributions throughout the tournament.</p>
        <p className='font-normal text-gray-800 text-2xl pt-4 pr-4 border-l-4 pl-4 border-orange-500'><strong>Closing Ceremony:</strong> Some tournaments conclude with a closing ceremony, where the winning team is awarded the tournament trophy, and participants, organizers, and sponsors are acknowledged and celebrated.</p>
        
    </div>
    </div>

    

      
      

    {/* <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
        <br class="hidden lg:inline-block"/>readymade gluten
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
        <button class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Button</button>
      </div>
    </div> */}
  </div>

    
   
    <footer class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">SportsX</span>
      </a>
      <p class="mt-2 text-sm text-gray-500">Contact us at</p>
    </div>
    <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-orange-500 tracking-widest text-sm mb-3"><FiMail className="inline-block mr-2" />EMAIL</h2>
        <nav class="list-none mb-10">
          <li>
            <p>Cricket group's email</p>
          </li>
          <li className="font-bold">
            <a class="text-gray-600 hover:text-gray-800">nr027737@gmail.com</a>
          </li>
          
          
        </nav>
      </div>
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-orange-500 tracking-widest text-sm mb-3"><BiLinkExternal className="inline-block mr-2" />WEBSITE</h2>
        <nav class="list-none mb-10">
          <li>
            <p>Cricket group's Website</p>
          </li>
          <li className="font-bold">
            <a class="text-gray-600 hover:text-gray-800">https://cricheroes.in/cricket-tournament-organiser-handbook</a>
          </li>
          
          
        </nav>
      </div>
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-orange-500 tracking-widest text-sm mb-3"><FaInstagram className="inline-block mr-2" />INSTAGRAM</h2>
        <nav class="list-none mb-10">
          <li>
            <p>Cricket group's instagram</p>
          </li>
          <li className="font-bold">
            <a class="text-gray-600 hover:text-gray-800">https://www.instagram.com/</a>
          </li>
          
          
        </nav>
      </div>
      <div class="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 class="title-font font-medium text-orange-500 tracking-widest text-sm mb-3"><FaTwitter className="inline-block mr-2" />TWITTER</h2>
        <nav class="list-none mb-10">
          <li>
            <p>Cricket group's twitter</p>
          </li>
          <li className="font-bold">
            <a class="text-gray-600 hover:text-gray-800">https://twitter.com/i/flow/login</a>
          </li>
          
          
        </nav>
      </div>
    </div>
  </div>
  <div class="bg-gray-100">
    <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p class="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" class="text-gray-600 ml-1" target="_blank">@knyttneve</a>
      </p>
      <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a class="text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
          </svg>
        </a>
        <a class="ml-3 text-gray-500">
          <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
            <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
            <circle cx="4" cy="4" r="2" stroke="none"></circle>
          </svg>
        </a>
      </span>
    </div>
  </div>
</footer>
    

  

</section>
    )
}
export default description