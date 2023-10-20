/* eslint-disable no-unused-vars */
import { React,useState } from 'react'

const Application = () => {
    const [showJoinForm, setShowJoinForm] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [name, setName] = useState('');
    const [adminId, setAdminId] = useState('');
    const [tournamentId, setTournamentId] = useState('');
    const [tournamentGameId, setTournamentGameId] = useState('');
    const [boys,setBoys] = useState('');
    const [girls,setGirls] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [showPlayers, setShowPlayers] = useState(false);

    const [players, setPlayers] = useState([
      { name: "Pranay Bhagat", tournamentId: "T123"},
      { name: "Dhiraj Jadhav", tournamentId: "T123"},
      { name: "Vishal Bhoye", tournamentId: "T123"},
    ]);
    
    const handleJoinClick = () => {
       setShowJoinForm(true);
       setShowCreateForm(false);
       
      };

     const handleJoinButtonClick = () => {
      setShowPlayers(true);
      setShowJoinForm(false);
      const playerData = { name, tournamentId };
  setPlayers([...players, playerData]);
  // Clear the form fields after submission
  setName('');
  setTournamentId('');
     }

      const handleCreateClick = () => {
        setShowCreateForm(true);
        setShowJoinForm(false);
       
        
      };

      const handleJoinSubmit = () => {
        
      };

    return(
        <section class="text-gray-600 body-font relative bg-gray-300 rounded-lg">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Join Your Dream Team Now</h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Play the sport you love with your own team.</p>
            <div className="mt-4">
            <button className="mr-16 text-orange-500 underline" onClick={handleCreateClick}>
              Create Team
            </button>
            <button className=" text-orange-500 underline" onClick={handleJoinClick}>
              Join Team
            </button>
          </div>
          </div>
          
          
          
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
            {showJoinForm && ( 
              <div className="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 font-bold text-sm text-gray-600">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 font-bold text-sm text-gray-600">Admin_ID</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Tournament_ID</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={tournamentId}
                     onChange={(e) => setTournamentId(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Tournament Game_ID</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={tournamentGameId}
                     onChange={(e) => setTournamentGameId(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Number of boys</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={boys}
                     onChange={(e) => setBoys(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Number of girls</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={girls}
                     onChange={(e) => setGirls(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              
              
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">User unique_ID</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={uniqueId}
                     onChange={(e) => setUniqueId(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              
              
              <div class="p-2 w-full">
                <button 
                   class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded-lg text-lg"
                   onClick={handleJoinButtonClick}
                   >Join</button>
              </div>
              </div>
              )}




{showCreateForm && ( 
              <div className="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 font-bold text-sm text-gray-600">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 font-bold text-sm text-gray-600">Admin_ID</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Tournament_ID</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={tournamentId}
                     onChange={(e) => setTournamentId(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Tournament Game_ID</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={tournamentGameId}
                     onChange={(e) => setTournamentGameId(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Number of boys</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={boys}
                     onChange={(e) => setBoys(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="message" class="leading-7 font-bold text-sm text-gray-600">Number of girls</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     value={girls}
                     onChange={(e) => setGirls(e.target.value)}
                     class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
              </div>
              <div class="p-2 w-full">
                <button 
                   class="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded-lg text-lg"
                   onClick={handleCreateClick}
                   >Create</button>
              </div>
              </div>
              )}
              
              {showPlayers && (
              <div class="p-2 w-full">
                <div class="relative">
                  <h2 className="leading-7 font-bold text-xl text-gray-600">Players in Team</h2>
                  <ul className="mt-2">
                    {players.map((player, index) => (
                      <li key={index} className="text-gray-600">
                        {index + 1}. Name: {player.name}, Tournament ID: {player.tournamentId}
                       </li>
                    ))}
                  </ul>
                </div>
              </div>
              )}
              <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a class="text-orange-500">KCPD.Group@gmail.com</a>
                <p class="leading-normal my-5">49 Smith St.
                  <br/>Saint Cloud, MN 56301
                </p>
                <span class="inline-flex">
                  <a class="text-orange-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-orange-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-orange-500">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-orange-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    );
}

export default Application;